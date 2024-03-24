import clsx from 'clsx'
import { ReactNode, useEffect } from 'react';

import cls from './TrashPageInitializer.module.scss'

import { useGetTrashQuery } from '@/entities/Trash';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';

import { trashPageReducer } from '../model/slice/trashPageSlice';
// import { RestoreCardModal } from '@/widgets/ContentPresenterTrashPageWidget';

interface TrashPageInitializerProps {
	className?: string;
	entitySwitcherWidget: ReactNode
	contentPresenterWidget?: ReactNode
	restoreCardModal?: ReactNode
	// modals?: ReactNode[]
}

const reducers: ReducersList = {
	trashPage: trashPageReducer
}

export const TrashPageInitializer = (props: TrashPageInitializerProps) => {
	const {
		className,
		entitySwitcherWidget,
		contentPresenterWidget,
		// restoreCardModal
		// modals,
	} = props
	// const { isLoading, data, isError } = useGetTrashQuery()

	// useEffect(() => {
	// 	if (data) {
	// 		console.log(data)
	// 	}


	// }, [data])

	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })

	return (
		<div className={clsx(cls.TrashPageInitializer, [className])} >
			{entitySwitcherWidget}
			{contentPresenterWidget}
			{/* {restoreCardModal} */}
			{/* {modals?.map(item => item)} */}
		</div>
	)
}