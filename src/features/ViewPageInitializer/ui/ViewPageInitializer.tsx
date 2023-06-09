import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ViewPageInitializer.module.scss';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { useParams } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { viewPageActions, viewPageReducer } from '../model/slice/viewPageSlice';
import { fetchBoxesDataByShelfId } from '../model/services/fetchBoxesDataByShelfId';
import { useSelector } from 'react-redux';
import { getJsonSavedData } from '@/entities/User';

interface ViewPageInitializerProps {
	className?: string
	shelvesListViewPageBlock: ReactNode
	cardListViewPageBlock: ReactNode
}
const reducers: ReducersList = {
	viewPage: viewPageReducer
}
export const ViewPageInitializer = (props: ViewPageInitializerProps) => {
	const {
		className,
		shelvesListViewPageBlock,
		cardListViewPageBlock,
	} = props
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })
	const { shelfId, boxId } = useParams<{ shelfId: string, boxId: string }>()
	const jsonSavedData = useSelector(getJsonSavedData)

	useEffect(() => {
		console.log('getJsonSavedData  ', jsonSavedData)
	}, [jsonSavedData])

	useEffect(() => {
		if (shelfId) {
			dispatch(viewPageActions.setShelfId(shelfId))
			dispatch(fetchBoxesDataByShelfId(shelfId))
		}
	}, [shelfId, dispatch])

	useEffect(() => {
		if (boxId) {
			dispatch(viewPageActions.setBoxId(boxId))
		}
	}, [boxId, dispatch])

	console.log(shelfId, boxId)

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.viewPageInitializer,
			className)}
		>
			{shelvesListViewPageBlock}
			{cardListViewPageBlock}
		</div>
	)
}