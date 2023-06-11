
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CupboardShelvesWidget.module.scss';
import { CommonShelf } from '@/features/CommonShelf';
import { Shelf, ShelfSkeleton } from '@/entities/Shelf';
import { Skeleton } from '@/shared/ui/Skeleton';
import { MyTransition } from '@/shared/ui/Transition';
import { CardModal, cardModalActions } from '@/features/CardModal';
// import { getCardModal } from '@/features/CardModal/model/selectors/getCardModal';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ShelvesWrapper } from './ShelvesWrapper/ShelvesWrapper';
import { useGetShelvesQuery, useGetCupboardDataQuery } from '@/entities/Cupboard';

interface CupboardShelvesWidgetProps {
	className?: string
}

export const CupboardShelvesWidget = (props: CupboardShelvesWidgetProps) => {
	const {
		className
	} = props
	const { data: shelvesData, isLoading: isShelvesLoading, isSuccess } = useGetShelvesQuery()
	const { isLoading: isCupboardLoading, data: cupboardData } = useGetCupboardDataQuery()


	// const { isOpen } = useSelector(getCardModal)
	const dispatch = useAppDispatch()

	const items = shelvesData?.map(shelfItem => {
		return {
			value: shelfItem._id,
			content: shelfItem.title
		}
	})

	// make all train buttons same width
	useEffect(() => {
		if (!isShelvesLoading && !isCupboardLoading) {
			const trainButtons = document.querySelectorAll('[data-button-type="shelf-train"]') as NodeListOf<HTMLButtonElement>
			const buttonsWidthList: number[] = []
			trainButtons.forEach(button => buttonsWidthList.push(button.clientWidth))
			const maxButtonWidth = Math.ceil(Math.max(...buttonsWidthList))
			trainButtons.forEach(button => button.style.minWidth = `${maxButtonWidth + 2}px`)
		}
	}, [isShelvesLoading, isCupboardLoading])


	// const onAddNewCardClick = useCallback((shelfId: string) => {
	// 	dispatch(cardModalActions.setShelf(shelfId))
	// 	dispatch(cardModalActions.openModalNewCard())
	// }, [dispatch])

	// const onChangeAnswer = useCallback((value: string) => {
	// 	dispatch(cardModalActions.setAnswerText(value))
	// }, [dispatch])

	// const onChangeShelf = useCallback((value: string) => {
	// 	dispatch(cardModalActions.setShelf(value))
	// }, [dispatch])


	let shelvesRendered;
	if (isShelvesLoading && isCupboardLoading) {
		shelvesRendered = (
			<>
				<ShelfSkeleton />
				<ShelfSkeleton />
				<ShelfSkeleton />
			</>
		)
	} else if (isShelvesLoading && cupboardData) {
		shelvesRendered = new Array(cupboardData.shelvesCount).fill(0).map((_, index) => <ShelfSkeleton key={index} />)
	} else if (shelvesData) {
		shelvesRendered = <ShelvesWrapper isShelvesLoading={false} shelvesData={shelvesData} />
	}

	return (
		<div className={clsx(
			cls.cupboardShelvesWidget,
			className)}
		>
			<CommonShelf data={cupboardData} isLoading={isCupboardLoading} />
			{shelvesRendered}

		</div>

	)
}










// let content;
// if (isShelvesLoading && isCupboardLoading) {
// 	content = (
// 		<>
// 			<MyTransition appear={true} show={isCupboardLoading}>
// 				<ShelfSkeleton />
// 				<ShelfSkeleton />
// 				<ShelfSkeleton />
// 			</MyTransition>
// 		</>
// 	)
// } else if (isShelvesLoading && cupboardData) {
// 	content = (
// 		<MyTransition appear={true} show={Boolean(cupboardData)}>
// 			{new Array(cupboardData.shelvesCount).fill(<ShelfSkeleton />)}
// 		</MyTransition>
// 	)
// } else if (shelvesData) {
// 	content = (
// 		<MyTransition appear={true} show={Boolean(shelvesData)}>
// 			{shelvesData?.map(dataItem => (
// 				<Shelf
// 					id={dataItem._id}
// 					data={dataItem.data}
// 					isLoading={isShelvesLoading}
// 					title={dataItem.title}
// 					position={dataItem.index + 1}
// 					key={dataItem.title}
// 				/>))}
// 		</MyTransition>
// 	)


// }






// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './CupboardShelvesWidget.module.scss';
// import { CommonShelf } from '@/features/CommonShelf';
// import { Shelf } from '@/entities/Shelf';
// import { useGetShelvesQuery } from '@/features/GetCupboardData';

// interface CupboardShelvesWidgetProps {
// 	className?: string
// }

// export const CupboardShelvesWidget = (props: CupboardShelvesWidgetProps) => {
// 	const {
// 		className
// 	} = props
// 	const { data, isLoading, isSuccess } = useGetShelvesQuery()
// 	// const { t } = useTranslation()
// 	// if (isLoading) return <p>Загрузка</p>
// 	// if (!isSuccess) return <p>Неудача</p>
// 	return (
// 		<div className={clsx(
// 			cls.cupboardShelvesWidget,
// 			className)}
// 		>
// 			<CommonShelf />
// 			{data?.map(dataItem => (
// 				<Shelf
// 					id={dataItem._id}
// 					data={dataItem.data}
// 					isLoading={isLoading}
// 					title={dataItem.title}
// 					position={dataItem.index + 1}
// 					key={dataItem.title}
// 				/>

// 			))}
// 		</div>
// 	)
// }