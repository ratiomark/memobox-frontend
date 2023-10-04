import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { ListBox } from '@/shared/ui/Popup';
import { MyText } from '@/shared/ui/Typography';
import { Button, } from '@/shared/ui/Button';
import { Suspense, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Skeleton, TextEditorSkeleton } from '@/shared/ui/Skeleton';
import cls from '@/shared/styles/CardEditAndCreateModal.module.scss';
import { HDialog } from '@/shared/ui/HDialog';
import { useGetShelvesQuery } from '@/entities/Cupboard';
import { getViewPageCardDataOriginal, getViewPageEditModalIsOpen, getViewPageCardDataEdited, getViewPageIsCardInModalEdited, viewPageActions } from '@/features/ViewPageInitializer';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import type { EditorState } from 'lexical';
import { useEditorMinHeight } from '@/shared/lib/helpers/hooks/useEditorMinHeight';
import { EditorUniversal } from '@/shared/ui/LexicalEditor';
import { getViewPageShelfItems } from '@/features/ViewPageInitializer';

export const CardEditModal = memo(() => {
	const { t } = useTranslation()
	// const cupboardError = useSelector(getCupboardError)
	// тут нужно использовать кастомный хук, который вернет shelfItems boxItems
	const { data: shelvesData, isLoading: isShelvesLoading } = useGetShelvesQuery()
	const [showOriginalData, setShowOriginalData] = useState(false)

	const isOpen = useSelector(getViewPageEditModalIsOpen) ?? false
	const isCardEdited = useSelector(getViewPageIsCardInModalEdited)
	const dispatch = useAppDispatch()
	const shelfItems = useSelector(getViewPageShelfItems)
	// const mainContentRef = useRef<HTMLDivElement>(null)
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
	const editedBox = cardEditedData?.boxIndex

	// Original data
	const cardOriginalData = useSelector(getViewPageCardDataOriginal)
	const questionTextOriginal = cardOriginalData?.question
	// const questionTextOriginal = cardOriginalData?.question
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

	// const shelfItems = useMemo(() => {
	// 	if (isShelvesLoading) return []
	// 	return shelvesData?.map(shelfItem => {
	// 		return ({
	// 			value: shelfItem.id,
	// 			content: shelfItem.title
	// 		})
	// 	})
	// }, [shelvesData, isShelvesLoading])

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

	const onChangeQuestion = useCallback((editorState: EditorState) => {
		dispatch(viewPageActions.setCardQuestionText(JSON.stringify(editorState.toJSON())))
	}, [dispatch])

	const onChangeAnswer = useCallback((editorState: EditorState) => {
		dispatch(viewPageActions.setCardAnswerText(JSON.stringify(editorState.toJSON())))
	}, [dispatch])

	const onCloseCardModal = useCallback((isOpen: boolean) => {
		dispatch(viewPageActions.setIsCardEditModalOpen(isOpen))
	}, [dispatch])


	const onSaveCardData = () => {
		// VAR: тут сохранение новых даннных
		alert('Сохраняю новые даннные для карточки')
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
		if (isShelvesLoading) return shelvesAndBoxesSkeleton
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
	}, [boxItems, onChangeBox, onChangeShelf, originalBox, originalShelf, shelfItems, t, isShelvesLoading, shelvesAndBoxesSkeleton])

	const shelvesAndBoxesCurrent = useMemo(() => {
		if (isShelvesLoading) return shelvesAndBoxesSkeleton
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
	}, [boxItems, onChangeBox, onChangeShelf, editedBox, editedShelf, shelfItems, t, isShelvesLoading, shelvesAndBoxesSkeleton])

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