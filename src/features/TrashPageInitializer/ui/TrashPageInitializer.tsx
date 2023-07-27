import clsx from 'clsx'
import cls from './TrashPageInitializer.module.scss'
import { ReactNode } from 'react';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { trashPageReducer } from '../model/slice/trashPageSlice';

interface TrashPageInitializerProps {
	className?: string;
	entitySwitcherWidget: ReactNode
	contentShowerWidget?: ReactNode
}

const reducers: ReducersList = {
	trashPage: trashPageReducer
}

export const TrashPageInitializer = (props: TrashPageInitializerProps) => {
	const {
		className,
		entitySwitcherWidget,
		contentShowerWidget,
	} = props

	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })

	return (
		<div className={clsx(cls.TrashPageInitializer, [className])} >
			{entitySwitcherWidget}
			{contentShowerWidget}
		</div>
	)
}