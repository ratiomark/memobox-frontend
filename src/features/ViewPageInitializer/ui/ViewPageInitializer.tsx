import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ViewPageInitializer.module.scss';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactNode, memo, useEffect } from 'react';
import { viewPageActions, viewPageReducer } from '../model/slice/viewPageSlice';
import { fetchBoxesDataByShelfId } from '../model/services/fetchBoxesDataByShelfId';
import { obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
// import { useSelector } from 'react-redux';
// import { getJsonSavedData } from '@/entities/User';
// import { saveUserJsonData } from '@/entities/User/model/services/saveUserJsonData';

interface ViewPageInitializerProps {
	className?: string
	shelvesListViewPageBlock: ReactNode
	boxListViewPageBlock: ReactNode
	statsAndActionsViewPageBlock: ReactNode
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
		boxListViewPageBlock,
	} = props
	const navigate = useNavigate()
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })
	const { shelfId, boxId } = useParams<{ shelfId: string, boxId: string }>()


	useEffect(() => {
		if (!shelfId) navigate(obtainRouteView('1', 'new'))
		const boxIdChecked = boxId ? boxId : 'new'
		const shelfIdChecked = shelfId ?? '1'
		dispatch(viewPageActions.setViewPageIsMounted())
		dispatch(fetchBoxesDataByShelfId({ shelfId: shelfIdChecked, boxId: boxIdChecked }))

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
			{shelvesListViewPageBlock}
			{boxListViewPageBlock}
			{statsAndActionsViewPageBlock}
			{cardListViewPageBlock}
		</div>
	)
})
ViewPageInitializer.displayName = 'ViewPageInitializer'