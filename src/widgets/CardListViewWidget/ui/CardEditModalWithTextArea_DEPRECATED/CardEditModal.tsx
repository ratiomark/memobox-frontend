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
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { ShadowTextArea } from '@/shared/ui/Typography/TextArea/ShadowTextArea';
import { useMainContentMaxHeightAndAreaRows } from '@/shared/lib/helpers/hooks/useMainContentMaxHeightAndAreaRows';


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
	const [shadowAreaQuestionHeight, setShadowAreaQuestionHeight] = useState(0)
	const [shadowAreaAnswerHeight, setShadowAreaAnswerHeight] = useState(0)


	const isOpen = useSelector(getViewPageEditModalIsOpen) ?? false
	const isCardEdited = useSelector(getViewPageIsCardInModalEdited)
	const cardHeightsData = useSelector(getCardModalHeights)
	const dispatch = useAppDispatch()

	const mainContentRef = useRef<HTMLDivElement>(null)
	const shelvesAndBoxesRef = useRef<HTMLDivElement>(null)
	const modalButtonsRef = useRef<HTMLDivElement>(null)

	const { textAreaRows, mainContentMaxHeight } = useMainContentMaxHeightAndAreaRows({
		isOpen,
		modalButtonsRef: modalButtonsRef.current,
		shelvesAndBoxesRef: shelvesAndBoxesRef.current,
	})

	// Edited data
	const cardEditedData = useSelector(getViewPageCardDataEdited)
	const questionTextEdited = cardEditedData?.question
	const answerTextEdited = cardEditedData?.answer
	const editedShelf = cardEditedData?.shelfId
	const editedBox = cardEditedData?.boxIndex

	// Original data
	const cardOriginalData = useSelector(getViewPageCardDataOriginal)
	const questionTextOriginal = cardOriginalData?.question
	const answerTextOriginal = cardOriginalData?.answer
	const cardId = cardOriginalData?.id
	const originalShelf = cardOriginalData?.shelfId
	const originalBox = cardOriginalData?.boxIndex


	const onToggleShowData = () => setShowOriginalData(prev => !prev)

	useEffect(() => {
		const onToggleShowDataByHotKey = (e: globalThis.KeyboardEvent) => {
			// console.log('Обработка горячки')
			// const container = mainContentRef.current;
			// if (container) {
			// 	const scrollTop = container.scrollTop; // Сохраняем текущую позицию прокрутки

			// 	// Восстанавливаем позицию прокрутки после того, как браузер обработает ввод
			// 	requestAnimationFrame(() => {
			// 		container.scrollBy(0, scrollTop) 
			// 	});
			// }
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
	}, [isShelvesLoading, shelvesData, editedShelf, t])

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
			rows={textAreaRows}
			disabled
			heightValue={cardHeightsData?.currentHeightQuestion}
			value={questionTextOriginal}
			onChangeString={onChangeQuestion}
		/>
	)

	const areaQuestionEdited = (
		<TextArea
			comparerData={`Вопрос текущий  ${cardId?.slice(7,)}`}
			rows={textAreaRows}
			useInitialHeightAsMinimal
			getCurrentHeight={onSaveQuestionHeight}
			getInitialHeight={onSaveQuestionMinHeight}
			minHeightValue={cardHeightsData?.minHeightQuestion}
			heightValue={shadowAreaQuestionHeight}
			value={questionTextEdited}
			onChangeString={onChangeQuestion}
			focus
		/>
	)

	const shadowAreaQuestionEdited = (
		<div className={cls.shadowAreaWrapper} >
			<ShadowTextArea
				className={cls.shadowArea}
				getCurrentHeight={setShadowAreaQuestionHeight}
				comparerData={`Вопрос текущий  ${cardId?.slice(7,)}`}
				rows={textAreaRows}
				value={questionTextEdited}
			/>
		</div>
	)

	const areaAnswerOriginal = (
		<TextArea
			comparerData={`Ответ оригинал  ${cardId?.slice(7,)}`}
			rows={textAreaRows}
			disabled
			heightValue={cardHeightsData?.currentHeightAnswer}
			value={answerTextOriginal}
			onChangeString={onChangeAnswer}
		/>
	)

	const areaAnswerEdited = (
		<TextArea
			comparerData={`Ответ текущий  ${cardId?.slice(7,)}`}
			rows={textAreaRows}
			useInitialHeightAsMinimal
			getInitialHeight={onSaveAnswerMinHeight}
			getCurrentHeight={onSaveAnswerHeight}
			minHeightValue={cardHeightsData?.minHeightAnswer}
			heightValue={shadowAreaAnswerHeight}
			value={answerTextEdited}
			onChangeString={onChangeAnswer}
		/>
	)

	const shadowAreaAnswerEdited = (
		<div className={cls.shadowAreaWrapper} >
			<ShadowTextArea
				className={cls.shadowArea}
				getCurrentHeight={setShadowAreaAnswerHeight}
				comparerData={`Ответ текущий  ${cardId?.slice(7,)}`}
				rows={textAreaRows}
				value={answerTextEdited}
			/>
		</div>
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
		? <Button onClick={onToggleShowData}>{t('compare data')}</Button>
		: <div />


	return (
		<HDialog
			isOpen={isOpen}
			onClose={onCloseEditModal}
			onSubmit={() => alert('Сохраняю изменения в карточке')}
			panelWithMainPadding={false}
			className={cls.cardModalPanel}
		>
			<div
				className={cls.cardModal}
			>
				<div className={cls.emptySpace_top} />
				<div
					className={cls.mainContentWrapper}
				>
					<div
						className={cls.mainContent}
						ref={mainContentRef}
						style={{ maxHeight: mainContentMaxHeight }}
					>
						{/* {showOriginalData
							? <MyText variant='accent' text='Оригинальнал' />
							: <MyText variant='accent' text='Редактируемая часть' />
						} */}
						<div ref={shelvesAndBoxesRef}	>
							{showOriginalData
								? shelvesAndBoxesOriginal
								: shelvesAndBoxes
							}
						</div>

						<div >
							{shadowAreaQuestionEdited}
							{shadowAreaAnswerEdited}
							{/* {showOriginalData
								? <MyText variant='accent' text='Оригинальнал' />
								: <MyText variant='accent' text='Редактируемая часть' />
							} */}
							<div className={cls.areaAndLabelWrapper} >
								<MyText text={t('question')} />
								{showOriginalData
									? areaQuestionOriginal
									: areaQuestionEdited
								}
							</div>
						</div>

						<div className={cls.areaAndLabelWrapper} >
							<MyText text={t('answer')} />
							{showOriginalData
								? areaAnswerOriginal
								: areaAnswerEdited
							}
						</div>

					</div>
				</div>
				<div className={cls.emptySpace_bottom} />
				<div className={cls.actions} ref={modalButtonsRef}>
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