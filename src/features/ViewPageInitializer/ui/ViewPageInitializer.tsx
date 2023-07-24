import clsx from 'clsx';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { ReactNode, memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { viewPageActions, viewPageReducer } from '../model/slice/viewPageSlice';
import { fetchCards } from '../model/services/fetchCards';
import { useSelector } from 'react-redux';
import { getViewPageIsMounted } from '../model/selectors/getViewPageInitializer';
import cls from './ViewPageInitializer.module.scss';

interface ViewPageInitializerProps {
	className?: string
	shelvesListViewPageBlock: ReactNode
	boxListViewPageBlock: ReactNode
	statsAndActionsViewPageBlock: ReactNode
	sortControllerViewPageBlock: ReactNode
	cardListViewPageBlock: ReactNode
}

const reducers: ReducersList = {
	viewPage: viewPageReducer
}

export const ViewPageInitializer = memo((props: ViewPageInitializerProps) => {
	const {
		className,
		shelvesListViewPageBlock,
		statsAndActionsViewPageBlock,
		cardListViewPageBlock,
		sortControllerViewPageBlock,
		boxListViewPageBlock,
	} = props
	const navigate = useNavigate()

	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })
	const { shelfId, boxId } = useParams<{ shelfId: string, boxId: string }>()
	const viewPageIsMounter = useSelector(getViewPageIsMounted)

	useEffect(() => {
		// console.log('Эффект')
		if (!viewPageIsMounter) {
			const boxIdChecked = boxId ?? 'new'
			const shelfIdChecked = shelfId ?? 'all'
			dispatch(viewPageActions.setViewPageIsMounted())
			dispatch(fetchCards({ shelfId: shelfIdChecked, boxId: boxIdChecked }))
			navigate('/view', { replace: true })
		}
		// dispatch(fetchBoxesDataByShelfId({ shelfId: shelfIdChecked, boxId: boxIdChecked }))
	}, [shelfId, navigate, boxId, dispatch, viewPageIsMounter])

	useEffect(() => {
		if (viewPageIsMounter && shelfId && boxId) {
			// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
			dispatch(viewPageActions.setActiveShelfId(shelfId))
			dispatch(viewPageActions.setActiveBoxId(boxId))
			navigate('/view', { replace: true })
		}
	}, [shelfId, navigate, boxId, dispatch, viewPageIsMounter])

	// dispatch(saveUserJsonData({ viewPageBoxId: boxIdChecked, viewPageShelfId: shelfId }))
	// useEffect(() => {
	// 	if (boxId) {
	// 		dispatch(viewPageActions.setBoxId(boxId))
	// 	}
	// }, [boxId, dispatch])

	return (
		<div className={clsx(
			cls.viewPageInitializer,
			className)}
		>
			{statsAndActionsViewPageBlock}
			{shelvesListViewPageBlock}
			{boxListViewPageBlock}
			{sortControllerViewPageBlock}
			{cardListViewPageBlock}
		</div>
	)
})

ViewPageInitializer.displayName = 'ViewPageInitializer'