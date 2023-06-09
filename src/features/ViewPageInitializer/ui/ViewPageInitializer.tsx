import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ViewPageInitializer.module.scss';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { useParams } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { viewPageActions, viewPageReducer } from '../model/slice/viewPageSlice';

interface ViewPageInitializerProps {
	className?: string
	shelvesListViewPageBlock: ReactNode
}
const reducers: ReducersList = {
	viewPage: viewPageReducer
}
export const ViewPageInitializer = (props: ViewPageInitializerProps) => {
	const {
		className,
		shelvesListViewPageBlock
	} = props
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })

	const { shelfId, boxId } = useParams<{ shelfId: string, boxId: string }>()
	
	useEffect(() => {
		if (shelfId) {
			dispatch(viewPageActions.setShelfId(shelfId))
		}
	}, [shelfId, dispatch])
	
	useEffect(() => {
		if (boxId) {
			dispatch(viewPageActions.setShelfId(boxId))
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
		</div>
	)
}