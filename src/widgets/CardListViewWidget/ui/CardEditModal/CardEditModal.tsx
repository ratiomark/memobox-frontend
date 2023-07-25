import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/Modal/Modal';
import { ListBox } from '@/shared/ui/Popup';
import { HStack, VStack } from '@/shared/ui/Stack';
import { MyText, TextArea } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { MutableRefObject, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { cupboardShelfListActions, getCupboardState } from '../../../model/slice/cupboardShelfListSlice';
import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './CardEditModal.module.scss';
// import { getCupboardIsLoading, getCupboardError } from '../../../model/selectors/getCupboardShelfList';
import { HDialog } from '@/shared/ui/HDialog';
import { useGetShelvesQuery } from '@/entities/Cupboard';
import { getViewPageCurrentData, getViewPageEditModalIsOpen, getViewPageEditedData, viewPageActions } from '@/features/ViewPageInitializer';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '@/features/CupboardShelfList';


interface CardEditModalProps {
	className?: string
}

export const CardEditModal = memo((props: CardEditModalProps) => {
	const {
		className,
	} = props
	const { t } = useTranslation()
	// const cupboardError = useSelector(getCupboardError)
	const { data: shelvesData, isLoading: isShelvesLoading } = useGetShelvesQuery()
	const [showCurrentData, setShowCurrentData] = useState(true)
	const shelfItems = useMemo(() => {
		if (isShelvesLoading) return []
		return shelvesData?.map(shelfItem => {
			return ({
				value: shelfItem.id,
				content: shelfItem.title
			})
		})
	}, [shelvesData, isShelvesLoading])

	const isOpen = useSelector(getViewPageEditModalIsOpen) ?? false
	const dispatch = useAppDispatch()
	const data = useSelector(getViewPageEditedData)
	const onCloseEditModal = () => {
		dispatch(viewPageActions.setIsCardEditModalOpen(false))
	}
	const cardEditedData = useSelector(getViewPageEditedData)
	const questionText = cardEditedData?.question
	const answerText = cardEditedData?.answer

	const cardCurrentData = useSelector(getViewPageCurrentData)
	const questionTextOriginal = cardCurrentData?.question
	const answerTextOriginal = cardCurrentData?.answer
	// const shelfIdCardModal = useSelector(getShelfIdCardModal) ?? cupboardShelves[0].id
	// const boxIdCardModal = useSelector(getBoxIndexCardModal)


	// const boxItems = useMemo(() => {
	// 	if (cupboardIsLoading) return []
	// 	const currentShelf = cupboardShelves.find(shelf => shelf.id === shelfIdCardModal)
	// 	const itemsList = currentShelf!.boxesData.map(box => {
	// 		let content
	// 		if (box.specialType === 'none') content = `Kоробка ${box.index}`
	// 		else if (box.specialType === 'new') content = 'Новые карточки'
	// 		else content = 'Изученные'
	// 		return {
	// 			value: box.index,
	// 			// value: box._id,
	// 			content,
	// 		}
	// 	})
	// 	return itemsList
	// }, [cupboardIsLoading, shelfIdCardModal, cupboardShelves])

	// useEffect(() => {
	// if (isOpen && refTextArea.current) {
	// refTextArea.current.focus()
	// }

	// })

	const onChangeQuestion = useCallback((text: string) => {
		dispatch(viewPageActions.setCardQuestionText(text))
	}, [dispatch])

	// const onCloseCardModal = useCallback(() => {
	// 	dispatch(viewPageActions.setCardModalIsOpen(false))
	// }, [dispatch])

	const onChangeAnswer = useCallback((text: string) => {
		dispatch(viewPageActions.setCardAnswerText(text))
	}, [dispatch])

	const onChangeShelf = useCallback((shelfId: string) => {
		dispatch(viewPageActions.setCardShelfId(shelfId))
	}, [dispatch])
	const showOriginal = () => setShowCurrentData(false)
	const showCurrent = () => setShowCurrentData(true)
	const toggleData = () => setShowCurrentData(prev=>!prev)
	

	// const onChangeBox = useCallback((boxIndex: number) => {
	// 	dispatch(viewPageActions.setBoxIndexCardModal(boxIndex))
	// }, [dispatch])
	// const onChangeBox = useCallback((boxId: string) => {
	// 	dispatch(cupboardShelfListActions.setBoxIdCardModal(boxId))
	// }, [dispatch])
	// console.log(shelfIdCardModal)
	let shelvesAndBoxes;
	// if (cupboardIsLoading) {
	// 	shelvesAndBoxes = (
	// 		<div className={cls.grid} >
	// 			<Skeleton width={200} height={67} />
	// 			<Skeleton width={200} height={67} />
	// 		</div>
	// 	)
	// } else {
	// 	shelvesAndBoxes = (
	// 		<div className={cls.grid} >
	// 			<ListBox
	// 				label='shelf'
	// 				value={shelfIdCardModal}
	// 				items={shelfItems}
	// 				onChange={onChangeShelf}
	// 				max
	// 				sameWidth
	// 			/>
	// 			<ListBox
	// 				label='shelf'
	// 				value={boxIdCardModal}
	// 				items={boxItems}
	// 				onChange={onChangeBox}
	// 				max
	// 				sameWidth
	// 			/>
	// 		</div>)
	// }


	return (
		<HDialog
			isOpen={isOpen}
			onClose={onCloseEditModal}
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
							// ref={refTextArea}
							rows={5}
							value={showCurrentData ? questionText : questionTextOriginal}
							onChangeString={onChangeQuestion}
							focus
						// autoFocus
						/>
					</div>
					<div>
						<MyText text={'answer'} />
						<TextArea
							rows={5}
							value={showCurrentData ? answerText : answerTextOriginal}
							onChangeString={onChangeAnswer}
						/>
					</div>

				</VStack>
				<div className={cls.actions} >
					<Button>{t('Назад')}</Button>
					{/* <Button onClick={toggleData}>{t('Сравнить')}</Button> */}
					<Button>{t('Сохранить')}</Button>
				</div>
			</div>
		</HDialog>
	)
})
CardEditModal.displayName = 'CardEditModal'