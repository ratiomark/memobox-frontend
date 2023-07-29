import clsx from 'clsx'
import cls from './TrashPageInitializer.module.scss'
import { ReactNode, useEffect } from 'react';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { trashPageReducer } from '../model/slice/trashPageSlice';
import { useGetTrashQuery } from '@/entities/Trash';

interface TrashPageInitializerProps {
	className?: string;
	entitySwitcherWidget: ReactNode
	contentPresenterWidget?: ReactNode
}

const reducers: ReducersList = {
	trashPage: trashPageReducer
}

export const TrashPageInitializer = (props: TrashPageInitializerProps) => {
	const {
		className,
		entitySwitcherWidget,
		contentPresenterWidget,
	} = props
	const { isLoading, data, isError } = useGetTrashQuery()

	useEffect(() => {
		if (data) {
			console.log(data)
		}


	}, [data])

	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })

	return (
		<div className={clsx(cls.TrashPageInitializer, [className])} >
			{entitySwitcherWidget}
			{contentPresenterWidget}
		</div>
	)
}