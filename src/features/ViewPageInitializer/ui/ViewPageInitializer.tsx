import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { ReactNode, memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { viewPageActions, viewPageReducer } from '../model/slice/viewPageSlice';
import { fetchCards } from '../model/services/fetchCards';
import { useSelector } from 'react-redux';
import { getViewPageIsMounted } from '../model/selectors/getViewPageInitializer';
import { useGetAllCardsQuery } from '@/entities/Card';
import cls from './ViewPageInitializer.module.scss';
import { obtainRouteViewEmpty } from '@/app/providers/router/config/routeConfig/routeConfig';

interface ViewPageInitializerProps {
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
		shelvesListViewPageBlock,
		statsAndActionsViewPageBlock,
		cardListViewPageBlock,
		sortControllerViewPageBlock,
		boxListViewPageBlock,
	} = props
	const navigate = useNavigate()
	const { isLoading, data } = useGetAllCardsQuery()
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })
	const { shelfId, boxId } = useParams<{ shelfId: string, boxId: string }>()
	const viewPageIsMounter = useSelector(getViewPageIsMounted)

	useEffect(() => {
		// console.log('Эффект')
		if (!viewPageIsMounter && !isLoading && data) {
			// console.log('Эффект Зашел')
			const boxIdChecked = boxId ?? 'new'
			const shelfIdChecked = shelfId ?? 'all'
			console.log(boxIdChecked)
			console.log(shelfIdChecked)
			console.log(data)
			dispatch(viewPageActions.setViewPageIsMounted())
			dispatch(viewPageActions.setFetchedData(data))
			dispatch(viewPageActions.setActiveShelfId(shelfIdChecked))
			dispatch(viewPageActions.setActiveBoxId(boxIdChecked))
			// dispatch(fetchCards({ shelfId: shelfIdChecked, boxId: boxIdChecked, data }))
			navigate(obtainRouteViewEmpty(), { replace: true })
		}
	}, [shelfId, navigate, boxId, dispatch, viewPageIsMounter, isLoading, data])

	useEffect(() => {
		// console.log('2 Эффект')
		if (viewPageIsMounter && shelfId && boxId) {
			// console.log('2 Эффект Зашел')
			dispatch(viewPageActions.setActiveShelfId(shelfId))
			dispatch(viewPageActions.setActiveBoxId(boxId))
			navigate(obtainRouteViewEmpty(), { replace: true })
		}
	}, [shelfId, navigate, boxId, dispatch, viewPageIsMounter])

	useEffect(() => {
		if (viewPageIsMounter && !isLoading && data) {
			dispatch(viewPageActions.setFetchedData(data))
		}
	}, [isLoading, data, dispatch, viewPageIsMounter])

	return (
		<div className={cls.viewPageInitializer}>
			{statsAndActionsViewPageBlock}
			{shelvesListViewPageBlock}
			{boxListViewPageBlock}
			{sortControllerViewPageBlock}
			{cardListViewPageBlock}
		</div>
	)
})

ViewPageInitializer.displayName = 'ViewPageInitializer'



// dispatch(saveUserJsonData({ viewPageBoxId: boxIdChecked, viewPageShelfId: shelfId }))
// useEffect(() => {
// 	if (boxId) {
// 		dispatch(viewPageActions.setBoxId(boxId))
// 	}
// }, [boxId, dispatch])
