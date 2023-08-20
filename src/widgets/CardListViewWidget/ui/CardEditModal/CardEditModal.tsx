import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/Modal/Modal';
import { ListBox } from '@/shared/ui/Popup';
import { HStack, VStack } from '@/shared/ui/Stack';
import { MyText, TextArea } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { KeyboardEvent, MutableRefObject, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { cupboardShelfListActions, getCupboardState } from '../../../model/slice/cupboardShelfListSlice';
import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './CardEditModal.module.scss';
// import { getCupboardIsLoading, getCupboardError } from '../../../model/selectors/getCupboardShelfList';
import { HDialog } from '@/shared/ui/HDialog';
import { useGetShelvesQuery } from '@/entities/Cupboard';
import { getCardModalHeights, getViewPageCardEditedListIds, getViewPageCardDataOriginal, getViewPageEditModalIsOpen, getViewPageCardDataEdited, getViewPageIsCardInModalEdited, viewPageActions } from '@/features/ViewPageInitializer';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '@/features/CupboardShelfList';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { useWindowSize } from '@/shared/lib/helpers/hooks/useWindowHeight';


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
	const [showOriginalData, setShowOriginalData] = useState(false)
	const shelvesAndBoxesRef = useRef<HTMLDivElement>(null)
	const [mainContentHeight, setMainContentHeight] = useState('500px')
	const { windowHeight } = useWindowSize()

	const isOpen = useSelector(getViewPageEditModalIsOpen) ?? false
	const isCardEdited = useSelector(getViewPageIsCardInModalEdited)
	const cardHeightsData = useSelector(getCardModalHeights)
	const dispatch = useAppDispatch()

	// Edited data
	const cardEditedData = useSelector(getViewPageCardDataEdited)
	const questionTextEdited = cardEditedData?.question
	const answerTextEdited = cardEditedData?.answer
	const editedShelf = cardEditedData?.shelf
	const editedBox = cardEditedData?.box

	// Original data
	const cardOriginalData = useSelector(getViewPageCardDataOriginal)
	const questionTextOriginal = cardOriginalData?.question
	const answerTextOriginal = cardOriginalData?.answer
	const cardId = cardOriginalData?._id
	const originalShelf = cardOriginalData?.shelf
	const originalBox = cardOriginalData?.box


	const onToggleShowData = () => setShowOriginalData(prev => !prev)

	useEffect(() => {
		const onToggleShowDataByHotKey = (e: globalThis.KeyboardEvent) => {
			console.log('Обработка горячки')
			if (e.altKey && e.code === 'KeyC') {
				onToggleShowData()
			}
		}
		window.addEventListener('keydown', onToggleShowDataByHotKey)

		return () => {
			window.removeEventListener('keydown', onToggleShowDataByHotKey)
		}
	}, [])

	useEffect(() => {
		if (isOpen) {
			const mainContentHeight = windowHeight * 0.8 - 55
			setMainContentHeight(`${mainContentHeight}px`)
		}
	}, [windowHeight, isOpen])

	useEffect(() => {
		if (!isOpen) {
			setShowOriginalData(false)
		}
	}, [isOpen])

	const shelfItems = useMemo(() => {
		if (isShelvesLoading) return []
		return shelvesData?.map(shelfItem => {
			return ({
				value: shelfItem.id,
				content: shelfItem.title
			})
		})
	}, [shelvesData, isShelvesLoading])

	const boxItems = useMemo(() => {
		if (isShelvesLoading) return []
		const currentShelf = shelvesData?.find(shelf => shelf.id === editedShelf)
		const itemsList = currentShelf?.boxesData.map(box => {
			let content;
			switch (box.specialType) {
				case 'none':
					content = `${t('box text')} ${box.index}`
					break;
				case 'new':
					content = t('new cards')
					break
				default:
					content = t('learnt cards')
					break;
			}
			return {
				value: box.index,
				content,
			}
		})
		return itemsList
	}, [isShelvesLoading, shelvesData, editedShelf, t ])


	const onChangeShelf = useCallback((shelfId: string) => {
		dispatch(viewPageActions.setCardShelfId(shelfId))
	}, [dispatch])
	
	const onChangeBox = useCallback((boxIndex: number) => {
		dispatch(viewPageActions.setCardBoxId(boxIndex))
	}, [dispatch])

	const onChangeQuestion = useCallback((text: string) => {
		dispatch(viewPageActions.setCardQuestionText(text))
	}, [dispatch])

	const onChangeAnswer = useCallback((text: string) => {
		dispatch(viewPageActions.setCardAnswerText(text))
	}, [dispatch])

	const onSaveQuestionHeight = (height: number) => {
		dispatch(viewPageActions.setCurrentHeightQuestion(height))
	}
	const onSaveQuestionMinHeight = (height: number) => {
		dispatch(viewPageActions.setMinHeighQuestion(height))
	}
	const onSaveAnswerHeight = (height: number) => {
		dispatch(viewPageActions.setCurrentHeightAnswer(height))
	}
	const onSaveAnswerMinHeight = (height: number) => {
		dispatch(viewPageActions.setMinHeighAnswer(height))
	}

	const onCloseEditModal = () => {
		dispatch(viewPageActions.setIsCardEditModalOpen(false))
	}

	const onSaveCardData = () => {
		// VAR: тут сохранение новых даннных
		alert('Сохраняю новые даннные для карточки')
		dispatch(viewPageActions.setIsCardEditModalOpen(false))
	}

	const areaQuestionOriginal = (
		<TextArea
			comparerData={`Вопрос оригинал  ${cardId?.slice(7,)}`}
			rows={5}
			disabled
			heightValue={cardHeightsData?.currentHeightQuestion}
			value={questionTextOriginal}
			onChangeString={onChangeQuestion}
		/>
	)

	const areaQuestionEdited = (
		<TextArea
			comparerData={`Вопрос текущий  ${cardId?.slice(7,)}`}
			rows={5}
			useInitialHeightAsMinimal
			getCurrentHeight={onSaveQuestionHeight}
			getInitialHeight={onSaveQuestionMinHeight}
			minHeightValue={cardHeightsData?.minHeightQuestion}
			value={questionTextEdited}
			onChangeString={onChangeQuestion}
			focus
		/>
	)

	const areaAnswerOriginal = (
		<TextArea
			comparerData={`Ответ оригинал  ${cardId?.slice(7,)}`}
			rows={5}
			disabled
			heightValue={cardHeightsData?.currentHeightAnswer}
			value={answerTextOriginal}
			onChangeString={onChangeAnswer}
		/>
	)

	const areaAnswerEdited = (
		<TextArea
			comparerData={`Ответ текущий  ${cardId?.slice(7,)}`}
			rows={5}
			useInitialHeightAsMinimal
			getInitialHeight={onSaveAnswerMinHeight}
			getCurrentHeight={onSaveAnswerHeight}
			minHeightValue={cardHeightsData?.minHeightAnswer}
			value={answerTextEdited}
			onChangeString={onChangeAnswer}
		/>
	)

	let shelvesAndBoxes;
	let shelvesAndBoxesOriginal;
	if (isShelvesLoading) {
		shelvesAndBoxes = (
			<div className={cls.grid} >
				<Skeleton width={200} height={67} />
				<Skeleton width={200} height={67} />
			</div>
		)
	} else {
		shelvesAndBoxes = (
			<div className={cls.grid} >
				<div className={cls.listBoxWrapper}>
					<ListBox
						label={t('shelf')}
						value={editedShelf}
						items={shelfItems}
						onChange={onChangeShelf}
						max
						sameWidth
					/>
				</div>
				<div className={cls.listBoxWrapper}>
					<ListBox
						label={t('box text')}
						value={editedBox}
						items={boxItems}
						onChange={onChangeBox}
						max
						sameWidth
					/>
				</div>
			</div>)
		shelvesAndBoxesOriginal = (
			<div className={cls.grid} >
				<div className={cls.listBoxWrapper}>
					<ListBox
						label={t('shelf')}
						value={originalShelf}
						items={shelfItems}
						onChange={onChangeShelf}
						max
						sameWidth
						readonly
					/>
				</div>
				<div className={cls.listBoxWrapper}>
					<ListBox
						label={t('box text')}
						value={originalBox}
						items={boxItems}
						onChange={onChangeBox}
						max
						sameWidth
						readonly
					/>
				</div>
			</div>)
	}

	const compareButton = isCardEdited
		? <Button onClick = { onToggleShowData }>{ t('compare data') }</Button>
		: <div />
					

	return (
		<HDialog
			isOpen={isOpen}
			onClose={onCloseEditModal}
			// max
			onSubmit={() => alert('Сохраняю изменения в карточке')}
			// lazy
			panelWithMainPadding={false}
			className={cls.cardModalPanel}
		>
			<div
				className={cls.cardModal}
			>
				<div className={cls.emptySpace} />
				<div
					className={cls.mainContentWrapper}
				>
					<VStack
						className={cls.mainContent}
						max
						align='left'
						gap='gap_32'
						style={{ maxHeight: mainContentHeight }}
						// style={{ height: mainContentHeight }}
					>
						{showOriginalData
							? <MyText variant='accent' text='Оригинальнал' />
							: <MyText variant='accent' text='Редактируемая часть' />
						}
						<div
							ref={shelvesAndBoxesRef}
							// className={cls.shelvesAndBoxesWrapper}
						>
							{showOriginalData
								? shelvesAndBoxesOriginal
								: shelvesAndBoxes
							}
						</div>
						<div>
							<MyText text={t('question')} />
							{showOriginalData
								? areaQuestionOriginal
								: areaQuestionEdited
							}
						</div>
						<div>
							<MyText text={t('answer')} />
							{showOriginalData
								? areaAnswerOriginal
								: areaAnswerEdited
							}
						</div>

					</VStack>
				</div>
				<div className={cls.emptySpace} />
				<div className={cls.actions} >
					{compareButton}
					<ModalButtons
						justify='end'
						textCloseButton={t('back button')}
						onClose={onCloseEditModal}
						onSubmit={onSaveCardData}
						isSubmitDisabled={!isCardEdited}
						className={cls.modalButtons}
					/>
				</div>
			</div>
		</HDialog>
	)
})
CardEditModal.displayName = 'CardEditModal'



// const modalContentRendered = (
// 	<div
// 		className={cls.cardModal}
// 	>
// 		<div className={cls.mainContentWrapper} >
// 			<VStack
// 				className={cls.mainContent}
// 				max
// 				align='left'
// 				gap='gap_32'
// 			>
// 				{showOriginalData
// 					? <MyText variant='accent' text='Оригинальнал' />
// 					: <MyText variant='accent' text='Редактируемая часть' />
// 				}

// 				{/* <HStack
// 						className={cls.shelvesAndBoxesWrapper}
// 						max
// 					>
// 						{shelvesAndBoxes}
// 					</HStack> */}
// 				<div>
// 					<MyText text={t('question')} />
// 					{showOriginalData
// 						? areaQuestionOriginal
// 						: areaQuestionEdited
// 					}
// 				</div>
// 				<div>
// 					<MyText text={t('answer')} />
// 					{showOriginalData
// 						? areaAnswerOriginal
// 						: areaAnswerEdited
// 					}
// 				</div>

// 			</VStack>
// 		</div>
// 		<div className={cls.actions} >
// 			{
// 				isCardEdited
// 					? <Button onClick={toggleData}>{t('compare data')}</Button>
// 					: <div />
// 			}
// 			<ModalButtons
// 				justify='end'
// 				textCloseButton={t('back button')}
// 				onClose={onCloseEditModal}
// 				onSubmit={onSaveCardData}
// 				isSubmitDisabled={!isCardEdited}
// 				className={cls.modalButtons}
// 			/>
// 		</div>
// 	</div>
// )
	
// const onChangeShelf = useCallback((shelfId: string) => {
// 	dispatch(viewPageActions.setCardShelfId(shelfId))
// }, [dispatch])
// const onChangeBox = useCallback((boxIndex: number) => {
// 	dispatch(viewPageActions.setBoxIndexCardModal(boxIndex))
// }, [dispatch])
// const onChangeBox = useCallback((boxId: string) => {
// 	dispatch(cupboardShelfListActions.setBoxIdCardModal(boxId))
// }, [dispatch])
// console.log(shelfIdCardModal)
// let shelvesAndBoxes;
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


// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import { Modal } from '@/shared/ui/Modal/Modal';
// import { ListBox } from '@/shared/ui/Popup';
// import { HStack, VStack } from '@/shared/ui/Stack';
// import { MyText, TextArea } from '@/shared/ui/Typography';
// import { Button } from '@/shared/ui/Button';
// import { MutableRefObject, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
// // import { cupboardShelfListActions, getCupboardState } from '../../../model/slice/cupboardShelfListSlice';
// import { Skeleton } from '@/shared/ui/Skeleton';
// import cls from './CardEditModal.module.scss';
// // import { getCupboardIsLoading, getCupboardError } from '../../../model/selectors/getCupboardShelfList';
// import { HDialog } from '@/shared/ui/HDialog';
// import { useGetShelvesQuery } from '@/entities/Cupboard';
// import { getViewPageCardEditedListIds, getViewPageCardDataOriginal, getViewPageEditModalIsOpen, getViewPageCardDataEdited, viewPageActions } from '@/features/ViewPageInitializer';
// import { useSelector } from 'react-redux';
// import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
// import { cupboardShelfListActions } from '@/features/CupboardShelfList';
// import { ModalButtons } from '@/shared/ui/ModalButtons';


// interface CardEditModalProps {
// 	className?: string
// }

// export const CardEditModal = memo((props: CardEditModalProps) => {
// 	const {
// 		className,
// 	} = props
// 	const { t } = useTranslation()
// 	// const cupboardError = useSelector(getCupboardError)
// 	const { data: shelvesData, isLoading: isShelvesLoading } = useGetShelvesQuery()
// 	const [showOriginalData, setShowOriginalData] = useState(true)
// 	// const [showCurrentData, setShowCurrentData] = useState(true)
// 	const [textAreaQuestionHeight, setTextAreaQuestionHeight] = useState(0)
// 	const [textAreaAnswerHeight, setTextAreaAnswerHeight] = useState(0)
// 	const shelfItems = useMemo(() => {
// 		if (isShelvesLoading) return []
// 		return shelvesData?.map(shelfItem => {
// 			return ({
// 				value: shelfItem.id,
// 				content: shelfItem.title
// 			})
// 		})
// 	}, [shelvesData, isShelvesLoading])

// 	const isOpen = useSelector(getViewPageEditModalIsOpen) ?? false
// 	const cardsEditedListIds = useSelector(getViewPageCardEditedListIds)
// 	const dispatch = useAppDispatch()

// 	// Edited data
// 	const cardEditedData = useSelector(getViewPageCardDataEdited)
// 	const questionTextEdited = cardEditedData?.question
// 	const answerTextEdited = cardEditedData?.answer

// 	// Current data
// 	const cardOriginalData = useSelector(getViewPageCardDataOriginal)
// 	const questionTextOriginal = cardOriginalData?.question
// 	const answerTextOriginal = cardOriginalData?.answer
// 	const cardId = cardOriginalData?._id

// 	// console.log(cardOriginalData)
// 	// console.log(cardEditedData)
// 	// const shelfIdCardModal = useSelector(getShelfIdCardModal) ?? cupboardShelves[0].id
// 	// const boxIdCardModal = useSelector(getBoxIndexCardModal)


// 	// const boxItems = useMemo(() => {
// 	// 	if (cupboardIsLoading) return []
// 	// 	const currentShelf = cupboardShelves.find(shelf => shelf.id === shelfIdCardModal)
// 	// 	const itemsList = currentShelf!.boxesData.map(box => {
// 	// 		let content
// 	// 		if (box.specialType === 'none') content = `Kоробка ${box.index}`
// 	// 		else if (box.specialType === 'new') content = 'Новые карточки'
// 	// 		else content = 'Изученные'
// 	// 		return {
// 	// 			value: box.index,
// 	// 			// value: box._id,
// 	// 			content,
// 	// 		}
// 	// 	})
// 	// 	return itemsList
// 	// }, [cupboardIsLoading, shelfIdCardModal, cupboardShelves])


// 	const onCloseEditModal = () => {
// 		// setShowOriginalData(false)
// 		dispatch(viewPageActions.setIsCardEditModalOpen(false))
// 	}

// 	const onSaveCardData = () => {
// 		// VAR: тут сохранение новых даннных
// 		alert('Сохраняю новые даннные для карточки')
// 		dispatch(viewPageActions.setIsCardEditModalOpen(false))
// 	}

// 	const onChangeQuestion = useCallback((text: string) => {
// 		if (showOriginalData) {
// 			setShowOriginalData(false)
// 		}
// 		dispatch(viewPageActions.setCardQuestionText(text))
// 	}, [dispatch, showOriginalData])

// 	const onChangeAnswer = useCallback((text: string) => {
// 		if (showOriginalData) {
// 			setShowOriginalData(false)
// 		}
// 		dispatch(viewPageActions.setCardAnswerText(text))
// 	}, [dispatch, showOriginalData])

// 	const toggleData = () => setShowOriginalData(prev => !prev)

// 	const isCardEdited = cardId && cardsEditedListIds?.includes(cardId)

// 	useEffect(() => {
// 		if (isCardEdited) {
// 			setShowOriginalData(false)
// 		} else {
// 			setShowOriginalData(true)
// 		}
// 	}, [isCardEdited])
// 	// const onChangeShelf = useCallback((shelfId: string) => {
// 	// 	dispatch(viewPageActions.setCardShelfId(shelfId))
// 	// }, [dispatch])


// 	// const onChangeBox = useCallback((boxIndex: number) => {
// 	// 	dispatch(viewPageActions.setBoxIndexCardModal(boxIndex))
// 	// }, [dispatch])
// 	// const onChangeBox = useCallback((boxId: string) => {
// 	// 	dispatch(cupboardShelfListActions.setBoxIdCardModal(boxId))
// 	// }, [dispatch])
// 	// console.log(shelfIdCardModal)
// 	let shelvesAndBoxes;
// 	// if (cupboardIsLoading) {
// 	// 	shelvesAndBoxes = (
// 	// 		<div className={cls.grid} >
// 	// 			<Skeleton width={200} height={67} />
// 	// 			<Skeleton width={200} height={67} />
// 	// 		</div>
// 	// 	)
// 	// } else {
// 	// 	shelvesAndBoxes = (
// 	// 		<div className={cls.grid} >
// 	// 			<ListBox
// 	// 				label='shelf'
// 	// 				value={shelfIdCardModal}
// 	// 				items={shelfItems}
// 	// 				onChange={onChangeShelf}
// 	// 				max
// 	// 				sameWidth
// 	// 			/>
// 	// 			<ListBox
// 	// 				label='shelf'
// 	// 				value={boxIdCardModal}
// 	// 				items={boxItems}
// 	// 				onChange={onChangeBox}
// 	// 				max
// 	// 				sameWidth
// 	// 			/>
// 	// 		</div>)
// 	// }


// 	return (
// 		<HDialog
// 			isOpen={isOpen}
// 			onClose={onCloseEditModal}
// 			max
// 			onSubmit={() => alert('Сохраняю изменения в карточке')}
// 		// lazy
// 		>
// 			<div
// 				className={cls.cardModal}
// 			>
// 				<VStack
// 					className={cls.mainContent}
// 					max
// 					align='left'
// 					gap='gap_32'
// 				>
// 					{showOriginalData
// 						? <MyText variant='accent' text='Оригинальная' />
// 						: <MyText variant='accent' text='Отредактированная' />
// 					}
// 					{/* {showCurrentData
// 						? <MyText variant='accent' text='Отредактированная' />
// 						: <MyText variant='accent' text='Оригинальная' />
// 					} */}
// 					{/* <HStack
// 						className={cls.shelvesAndBoxesWrapper}
// 						max
// 					>
// 						{shelvesAndBoxes}
// 					</HStack> */}
// 					<div>
// 						<MyText text={t('question')} />
// 						<TextArea
// 							// ref={refTextArea}
// 							rows={5}
// 							heightValue={showOriginalData ? textAreaQuestionHeight : undefined}
// 							// autoHeight={showOriginalData ? false : true}
// 							getCurrentHeight={showOriginalData ? undefined : setTextAreaQuestionHeight}
// 							value={showOriginalData ? questionTextOriginal : questionTextEdited}
// 							onChangeString={onChangeQuestion}
// 							focus
// 						// autoFocus
// 						/>
// 						{/* <TextArea
// 							// ref={refTextArea}
// 							rows={5}
// 							heightValue={!showCurrentData ?  textAreaQuestionHeight : undefined}
// 							autoHeight={showCurrentData ? true : false}
// 							getCurrentHeight={showCurrentData ? setTextAreaQuestionHeight : undefined}
// 							value={showCurrentData ? questionText : questionTextOriginal}
// 							onChangeString={onChangeQuestion}
// 							focus
// 						// autoFocus
// 						/> */}
// 					</div>
// 					<div>
// 						<MyText text={t('answer')} />
// 						<TextArea
// 							// ref={refTextArea}
// 							rows={5}
// 							heightValue={showOriginalData ? textAreaAnswerHeight : undefined}
// 							// autoHeight={showOriginalData ? false : true}
// 							getCurrentHeight={showOriginalData ? undefined : setTextAreaAnswerHeight}
// 							value={showOriginalData ? answerTextOriginal : answerTextEdited}
// 							onChangeString={onChangeAnswer}
// 						// focus
// 						// autoFocus
// 						/>
// 						{/* <TextArea
// 							rows={5}
// 							heightValue={!showCurrentData ? textAreaAnswerHeight : undefined}
// 							autoHeight={showCurrentData ? true : false}
// 							getCurrentHeight={showCurrentData ? setTextAreaAnswerHeight : undefined}
// 							value={showCurrentData ? answerText : answerTextOriginal}
// 							onChangeString={onChangeAnswer}
// 						/> */}
// 					</div>

// 				</VStack>
// 				<div className={cls.actions} >
// 					{
// 						isCardEdited
// 							? <Button onClick={toggleData}>{t('compare data')}</Button>
// 							: <div />
// 					}
// 					<ModalButtons
// 						justify='end'
// 						textCloseButton={t('back button')}
// 						onClose={onCloseEditModal}
// 						onSubmit={onSaveCardData}
// 						isSubmitDisabled={!isCardEdited}
// 						className={cls.modalButtons}
// 					/>
// 					{/* <Button>{t('back button')}</Button> */}
// 					{/* <Button>{t('save')}</Button> */}
// 				</div>
// 			</div>
// 		</HDialog>
// 	)
// })
// CardEditModal.displayName = 'CardEditModal'