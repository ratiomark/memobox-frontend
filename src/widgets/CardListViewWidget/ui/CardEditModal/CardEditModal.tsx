import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { ListBox } from '@/shared/ui/Popup';
import { MyText } from '@/shared/ui/Typography';
import { Button, } from '@/shared/ui/Button';
import { Suspense, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Skeleton, TextEditorSkeleton } from '@/shared/ui/Skeleton';
import cls from '@/shared/styles/CardEditAndCreateModal.module.scss';
import { HDialog } from '@/shared/ui/HDialog';
import {
	getViewPageCardDataOriginal,
	getViewPageEditModalIsOpen,
	getViewPageCardDataEdited,
	getViewPageIsCardInModalEdited,
	viewPageActions,
	getViewPageBoxItemsEditCardModal,
	getViewPageIsLoading,
} from '@/features/ViewPageInitializer';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { useEditorMinHeight } from '@/shared/lib/helpers/hooks/useEditorMinHeight';
import { EditorUniversal } from '@/shared/ui/LexicalEditor';
import { getViewPageShelfItems } from '@/features/ViewPageInitializer';
import { updateCardThunk } from '@/features/ViewPageInitializer';

export const CardEditModal = memo(() => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const isLoading = useSelector(getViewPageIsLoading)
	const isOpen = useSelector(getViewPageEditModalIsOpen) ?? false
	const isCardEdited = useSelector(getViewPageIsCardInModalEdited)
	const shelfItems = useSelector(getViewPageShelfItems)
	const boxItems = useSelector(getViewPageBoxItemsEditCardModal)
	const [showOriginalData, setShowOriginalData] = useState(false)

	const shelvesAndBoxesRef = useRef<HTMLDivElement>(null)
	const modalButtonsRef = useRef<HTMLDivElement>(null)

	const { mainContentMaxHeight, editorMinHeight } = useEditorMinHeight({
		isOpen,
		modalButtonsRef: modalButtonsRef.current,
		shelvesAndBoxesRef: shelvesAndBoxesRef.current,
	})

	// Edited data
	const cardEditedData = useSelector(getViewPageCardDataEdited)
	const questionTextEdited = cardEditedData?.question
	const answerTextEdited = cardEditedData?.answer
	const editedShelf = cardEditedData?.shelfId
	const editedBox = cardEditedData?.boxId

	// Original data
	const cardOriginalData = useSelector(getViewPageCardDataOriginal)!
	const cardId = cardOriginalData?.id
	const questionTextOriginal = cardOriginalData?.question
	const answerTextOriginal = cardOriginalData?.answer
	const originalShelf = cardOriginalData?.shelfId
	const originalBox = cardOriginalData?.boxId

	const onToggleShowData = () => setShowOriginalData(prev => !prev)

	useEffect(() => {
		const onToggleShowDataByHotKey = (e: globalThis.KeyboardEvent) => {
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


	const onChangeShelf = useCallback((shelfId: string) => {
		dispatch(viewPageActions.setCardShelfId(shelfId))
	}, [dispatch])

	// const onChangeBox = useCallback((boxIndex: number) => {
	// 	dispatch(viewPageActions.setCardBoxId(boxIndex))
	// }, [dispatch])

	const onChangeBox = useCallback((boxId: string) => {
		dispatch(viewPageActions.setCardBoxId(boxId))
	}, [dispatch])

	const onChangeQuestion = useCallback((editorState: string) => {
		// const onChangeQuestion = useCallback((editorState: EditorState) => {
		dispatch(viewPageActions.setCardQuestionText(editorState))
		// dispatch(viewPageActions.setCardQuestionText(JSON.stringify(editorState.toJSON())))
	}, [dispatch])

	const onChangeAnswer = useCallback((editorState: string) => {
		// const onChangeAnswer = useCallback((editorState: EditorState) => {
		dispatch(viewPageActions.setCardAnswerText(editorState))
		// dispatch(viewPageActions.setCardAnswerText(JSON.stringify(editorState.toJSON())))
	}, [dispatch])

	const onCloseCardModal = useCallback((isOpen: boolean) => {
		dispatch(viewPageActions.setIsCardEditModalOpen(isOpen))
	}, [dispatch])


	const onSaveCardData = () => {
		// VAR: тут сохранение новых даннных
		// alert('Сохраняю новые даннные для карточки')
		dispatch(updateCardThunk({
			cardId,
			question: questionTextEdited ?? null,
			answer: answerTextEdited ?? null,
			shelfId: editedShelf ?? '',
			boxId: editedBox ?? '',
			previousBoxId: originalBox,
		}))
		dispatch(viewPageActions.setIsCardEditModalOpen(false))
	}
	// console.log('questionTextOriginal   ', questionTextOriginal?.length)
	// console.log('questionTextEdited   ', questionTextEdited?.length,)
	// console.log('editorMinHeight:  ', editorMinHeight)

	const editorBlockQuestionOriginal = useMemo(() => (
		<EditorUniversal
			heightValue={editorMinHeight}
			editorState={questionTextOriginal}
			editable={false}
		/>
	), [questionTextOriginal, editorMinHeight,])

	const editorBlockQuestionEdited = useMemo(() => (
		<EditorUniversal
			heightValue={editorMinHeight}
			onChange={onChangeQuestion}
			editorState={questionTextEdited}
			autoFocus
		/>
	), [onChangeQuestion, questionTextEdited, editorMinHeight,])

	const editorBlockAnswerOriginal = useMemo(() => (
		<EditorUniversal
			editorState={answerTextOriginal}
			heightValue={editorMinHeight}
			editable={false}
		/>
	), [answerTextOriginal, editorMinHeight,])

	const editorBlockAnswerEdited = useMemo(() => (
		<EditorUniversal
			onChange={onChangeAnswer}
			editorState={answerTextEdited}
			heightValue={editorMinHeight}
		/>
	), [onChangeAnswer, answerTextEdited, editorMinHeight,])




	const shelvesAndBoxesSkeleton = useMemo(() => (
		<div className={cls.grid} key='shelvesAndBoxes'>
			<Skeleton width={200} height={67} />
			<Skeleton width={200} height={67} />
		</div>
	), [])

	const shelvesAndBoxesOriginal = useMemo(() => {
		if (isLoading) return shelvesAndBoxesSkeleton
		// if (isShelvesLoading) return shelvesAndBoxesSkeleton
		return (
			<div className={cls.grid} key='shelvesAndBoxes'>
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
	}, [boxItems, onChangeBox, onChangeShelf, originalBox, originalShelf, shelfItems, t, isLoading, shelvesAndBoxesSkeleton])

	const shelvesAndBoxesCurrent = useMemo(() => {
		// if (isShelvesLoading) return shelvesAndBoxesSkeleton
		if (isLoading) return shelvesAndBoxesSkeleton
		return (
			<div className={cls.grid} key='shelvesAndBoxes'>
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
	}, [boxItems, onChangeBox, onChangeShelf, editedBox, editedShelf, shelfItems, t, isLoading, shelvesAndBoxesSkeleton])
	// }, [boxItems, onChangeBox, onChangeShelf, editedBox, editedShelf, shelfItems, t, isShelvesLoading, shelvesAndBoxesSkeleton])

	const compareButton = isCardEdited
		? <Button onClick={onToggleShowData}>{t('compare data')}</Button>
		: <div />

	return (
		<HDialog
			className={cls.cardModalPanel}
			panelWithMainPadding={false}
			isOpen={isOpen}
			onOpenChange={onCloseCardModal}
			onSubmit={() => alert('Сохраняю изменения в карточке')}
		>
			<div
				className={cls.cardModal}
			>
				<div className={cls.emptySpace_top} />
				<div className={cls.mainContentWrapper}>

					<div
						className={cls.mainContent}
						style={{ maxHeight: mainContentMaxHeight }}
					>
						{/* {showOriginalData
							? <MyText variant='accent' text='Оригинальнал' />
							: <MyText variant='accent' text='Редактируемая часть' />
						} */}
						<div ref={shelvesAndBoxesRef}	>
							{showOriginalData
								? shelvesAndBoxesOriginal
								: shelvesAndBoxesCurrent
							}
						</div>
						<div className={cls.areaAndLabelWrapper} >
							<MyText text={t('question')} />
							<Suspense fallback={
								<TextEditorSkeleton editorMinHeight={editorMinHeight} />
							}>
								{showOriginalData && editorBlockQuestionOriginal}
								{!showOriginalData && editorBlockQuestionEdited}
							</Suspense>
						</div>
						<div className={cls.areaAndLabelWrapper} >
							<MyText text={t('answer')} />
							<Suspense fallback={
								<TextEditorSkeleton editorMinHeight={editorMinHeight} />
							}>
								{showOriginalData && editorBlockAnswerOriginal}
								{!showOriginalData && editorBlockAnswerEdited}
							</Suspense>
						</div>
					</div>

				</div>
				<div className={cls.emptySpace_bottom} />

				<div className={clsx(cls.actions, cls.actionsCardEditModal)} ref={modalButtonsRef}>
					{compareButton}
					<ModalButtons
						// justify='end'
						textCloseButton={t('back button')}
						onClose={() => onCloseCardModal(false)}
						onSubmit={onSaveCardData}
						isSubmitDisabled={!isCardEdited}
						className={cls.modalButtons}
					/>
				</div>
			</div>
		</HDialog>
	)
})