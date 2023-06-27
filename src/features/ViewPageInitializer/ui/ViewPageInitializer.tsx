import { obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import clsx from 'clsx';
import { ReactNode, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBoxesDataByShelfId } from '../model/services/fetchBoxesDataByShelfId';
import { viewPageActions, viewPageReducer } from '../model/slice/viewPageSlice';
import cls from './ViewPageInitializer.module.scss';
import { fetchCards } from '../model/services/fetchCards';
// import { useSelector } from 'react-redux';
// import { getJsonSavedData } from '@/entities/User';
// import { saveUserJsonData } from '@/entities/User/model/services/saveUserJsonData';

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


	useEffect(() => {
		const boxIdChecked = boxId ?? 'new'
		const shelfIdChecked = shelfId ?? 'all'
		dispatch(viewPageActions.setViewPageIsMounted())
		dispatch(fetchCards({ shelfId: shelfIdChecked, boxId: boxIdChecked }))
		// dispatch(fetchBoxesDataByShelfId({ shelfId: shelfIdChecked, boxId: boxIdChecked }))

	}, [shelfId, navigate, boxId, dispatch])

	// dispatch(saveUserJsonData({ viewPageBoxId: boxIdChecked, viewPageShelfId: shelfId }))
	// useEffect(() => {
	// 	if (boxId) {
	// 		dispatch(viewPageActions.setBoxId(boxId))
	// 	}
	// }, [boxId, dispatch])

	// console.log(shelfId, boxId)

	const { t } = useTranslation()

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