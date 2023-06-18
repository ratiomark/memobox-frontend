import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/Modal/Modal';
import { ListBox } from '@/shared/ui/Popup';
import { HStack, VStack } from '@/shared/ui/Stack';
import { MyText, TextArea } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	getAnswerCardModal,
	getBoxIndexCardModal,
	// getBoxIdCardModal,
	getIsOpenCardModal, getQuestionCardModal, getShelfIdCardModal
} from '../../model/selectors/getCardModal';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions, getCupboardState } from '../../model/slice/cupboardShelfListSlice';
import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './CardModalNewCard.module.scss';
import { getCupboardIsLoading, getCupboardError } from '../../model/selectors/getCupboardShelfList';
import { HDialog } from '@/shared/ui/HDialog';


interface CardModalNewCardProps {
	className?: string
}

export const CardModalNewCard = memo((props: CardModalNewCardProps) => {
	const {
		className,
	} = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const cupboardIsLoading = useSelector(getCupboardIsLoading)
	// const cupboardError = useSelector(getCupboardError)
	const cupboardShelves = useSelector(getCupboardState.selectAll)
	const isOpen = useSelector(getIsOpenCardModal)
	const questionTextCardModal = useSelector(getQuestionCardModal)
	const answerTextCardModal = useSelector(getAnswerCardModal)
	const shelfIdCardModal = useSelector(getShelfIdCardModal) ?? cupboardShelves[0].id
	const boxIdCardModal = useSelector(getBoxIndexCardModal)

	const shelfItems = useMemo(() => {
		if (cupboardIsLoading) return []
		return cupboardShelves.map(shelf => {
			return {
				content: shelf.title,
				value: shelf.id
			}
		})
	}, [cupboardIsLoading, cupboardShelves])


	const boxItems = useMemo(() => {
		if (cupboardIsLoading) return []
		const currentShelf = cupboardShelves.find(shelf => shelf.id === shelfIdCardModal)
		const itemsList = currentShelf!.boxesData.map(box => {
			let content
			if (box.specialType === 'none') content = `Kоробка ${box.index}`
			else if (box.specialType === 'new') content = 'Новые карточки'
			else content = 'Изученные'
			return {
				value: box.index,
				// value: box._id,
				content,
			}
		})
		return itemsList
	}, [cupboardIsLoading, shelfIdCardModal, cupboardShelves])


	const onChangeQuestion = useCallback((text: string) => {
		dispatch(cupboardShelfListActions.setQuestionText(text))
	}, [dispatch])

	const onCloseCardModal = useCallback(() => {
		dispatch(cupboardShelfListActions.setCardModalIsOpen(false))
	}, [dispatch])

	const onChangeAnswer = useCallback((text: string) => {
		dispatch(cupboardShelfListActions.setAnswerText(text))
	}, [dispatch])

	const onChangeShelf = useCallback((shelfId: string) => {
		dispatch(cupboardShelfListActions.setShelfIdCardModal(shelfId))
	}, [dispatch])

	const onChangeBox = useCallback((boxIndex: number) => {
		dispatch(cupboardShelfListActions.setBoxIndexCardModal(boxIndex))
	}, [dispatch])
	// const onChangeBox = useCallback((boxId: string) => {
	// 	dispatch(cupboardShelfListActions.setBoxIdCardModal(boxId))
	// }, [dispatch])
	// console.log(shelfIdCardModal)
	let shelvesAndBoxes;
	if (cupboardIsLoading) {
		shelvesAndBoxes = (
			<div className={cls.grid} >
				<Skeleton width={200} height={67} />
				<Skeleton width={200} height={67} />
			</div>
		)
	} else {
		shelvesAndBoxes = (
			<div className={cls.grid} >
				<ListBox
					label='shelf'
					value={shelfIdCardModal}
					items={shelfItems}
					onChange={onChangeShelf}
					max
					sameWidth
				/>
				<ListBox
					label='shelf'
					value={boxIdCardModal}
					items={boxItems}
					onChange={onChangeBox}
					max
					sameWidth
				/>
			</div>)
	}


	return (
		<HDialog
			isOpen={isOpen}
			onClose={onCloseCardModal}
			max
		// lazy
		>
			<div
				className={cls.cardModal}
			>
				<VStack
					className={cls.mainContent}
					max
					align='left'
					gap='gap_32'
				>
					<HStack
						className={cls.shelvesAndBoxesWrapper}
						max
					>
						{shelvesAndBoxes}
					</HStack>
					<div>
						<MyText text={'question'} />
						<TextArea
							rows={5}
							value={questionTextCardModal}
							onChangeString={onChangeQuestion}
							autoFocus
						/>
					</div>
					<div>
						<MyText text={'answer'} />
						<TextArea
							rows={5}
							value={answerTextCardModal}
							onChangeString={onChangeAnswer}
						/>
					</div>

				</VStack>
				<div className={cls.actions} >
					<Button>{t('Назад')}</Button>
					<Button>{t('Сохранить')}</Button>
				</div>
			</div>
		</HDialog>
	)
	// return (
	// 	<Modal
	// 		lazy
	// 		isOpen={isOpen}
	// 		onClose={onCloseCardModal}
	// 	>
	// 		<div
	// 			className={cls.cardModal}
	// 		>
	// 			<VStack
	// 				className={cls.mainContent}
	// 				max
	// 				align='left'
	// 				gap='gap_32'
	// 			>
	// 				<HStack
	// 					className={cls.shelvesAndBoxesWrapper}
	// 					max
	// 				>
	// 					{shelvesAndBoxes}
	// 				</HStack>
	// 				<div>
	// 					<MyText text={'question'} />
	// 					<TextArea
	// 						rows={5}
	// 						value={questionTextCardModal}
	// 						onChangeString={onChangeQuestion}
	// 					/>
	// 				</div>
	// 				<div>
	// 					<MyText text={'answer'} />
	// 					<TextArea
	// 						rows={5}
	// 						value={answerTextCardModal}
	// 						onChangeString={onChangeAnswer}
	// 					/>
	// 				</div>

	// 			</VStack>
	// 			<div className={cls.actions} >
	// 				<Button>{t('Назад')}</Button>
	// 				<Button>{t('Сохранить')}</Button>
	// 			</div>
	// 		</div>
	// 	</Modal>
	// )
})
CardModalNewCard.displayName = 'CardModalNewCard'