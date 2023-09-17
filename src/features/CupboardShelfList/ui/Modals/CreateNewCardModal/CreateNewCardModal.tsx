import { useTranslation } from 'react-i18next';
import { ListBox } from '@/shared/ui/Popup';
import { MyText } from '@/shared/ui/Typography';
import { useSelector } from 'react-redux';
import {
	getAnswerCardModal,
	getBoxIndexCardModal,
	getIsOpenCardModal,
	getQuestionCardModal,
	getShelfIdCardModal
} from '../../../model/selectors/getCreateNewCardModal';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions, getCupboardState } from '../../../model/slice/cupboardShelfListSlice';
import { Skeleton, TextEditorSkeleton } from '@/shared/ui/Skeleton';
import { getCupboardIsLoading, getCupboardError } from '../../../model/selectors/getCupboardShelfList';
import { HDialog } from '@/shared/ui/HDialog';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { EditorState } from 'lexical';
import { useEditorMinHeight } from '@/shared/lib/helpers/hooks/useEditorMinHeight';
import { memo, useRef, useMemo, useCallback, Suspense } from 'react';
import cls from '@/shared/styles/CardEditAndCreateModal.module.scss';
import { EditorUniversal } from '@/shared/ui/lexical-playground/src/EditorUniversal';

export const CreateNewCardModal = memo(() => {
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

	const shelvesAndBoxesRef = useRef<HTMLDivElement>(null)
	const modalButtonsRef = useRef<HTMLDivElement>(null)

	const { mainContentMaxHeight, editorMinHeight } = useEditorMinHeight({
		isOpen,
		modalButtonsRef: modalButtonsRef.current,
		shelvesAndBoxesRef: shelvesAndBoxesRef.current,
	})

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
				// value: box._id,
				content,
			}
		})
		return itemsList
	}, [cupboardIsLoading, shelfIdCardModal, cupboardShelves, t])

	const onChangeQuestion = useCallback((editorState: EditorState) => {
		// console.log(editorState.toJSON())
		// console.log(JSON.stringify(editorState.toJSON()))
		dispatch(cupboardShelfListActions.setQuestionText(JSON.stringify(editorState.toJSON())))
	}, [dispatch])

	const onChangeAnswer = useCallback((editorState: EditorState) => {
		dispatch(cupboardShelfListActions.setAnswerText(JSON.stringify(editorState.toJSON())))
	}, [dispatch])

	const onCloseCardModal = useCallback((isOpen: boolean) => {
		dispatch(cupboardShelfListActions.setIsCreateNewCardModalOpen(isOpen))
	}, [dispatch])

	const onChangeShelf = useCallback((shelfId: string) => {
		dispatch(cupboardShelfListActions.setShelfIdCardModal(shelfId))
	}, [dispatch])

	const onChangeBox = useCallback((boxIndex: number) => {
		dispatch(cupboardShelfListActions.setBoxIndexCardModal(boxIndex))
	}, [dispatch])

	const shelvesAndBoxes = useMemo(() => {
		if (cupboardIsLoading) {
			return (
				<div className={cls.grid} key='shelvesAndBoxes' >
					<Skeleton width={200} height={67} />
					<Skeleton width={200} height={67} />
				</div>
			)
		}
		return (
			<div className={cls.grid} key='shelvesAndBoxes' >
				<div className={cls.listBoxWrapper}>
					<ListBox
						label={t('shelf')}
						value={shelfIdCardModal}
						items={shelfItems}
						onChange={onChangeShelf}
						max
						sameWidth
					/>
				</div>
				<div className={cls.listBoxWrapper}>
					<ListBox
						label={t('box text')}
						value={boxIdCardModal}
						items={boxItems}
						onChange={onChangeBox}
						max
						sameWidth
					/>
				</div>
			</div>)
	}, [cupboardIsLoading, t, boxIdCardModal, boxItems, onChangeBox, onChangeShelf, shelfIdCardModal, shelfItems])

	const editorBlockQuestion = useMemo(() => {
		return (
			<div className={cls.areaAndLabelWrapper} >
				<MyText text={t('question')} />
				<Suspense fallback={
					<TextEditorSkeleton editorMinHeight={editorMinHeight} />
				}>
					<EditorUniversal
						heightValue={editorMinHeight}
						onChange={onChangeQuestion}
						editorState={questionTextCardModal}
						autoFocus
					/>
				</Suspense>
			</div>
		)
	}, [onChangeQuestion, questionTextCardModal, editorMinHeight, t])

	const editorBlockAnswer = useMemo(() => {
		return (
			// <div key='editorBlockAnswer' >
			<div className={cls.areaAndLabelWrapper}>
				<MyText text={t('answer')} />
				<Suspense fallback={
					<TextEditorSkeleton editorMinHeight={editorMinHeight} />
				}>
					<EditorUniversal
						heightValue={editorMinHeight}
						onChange={onChangeAnswer}
						editorState={answerTextCardModal}
					/>
				</Suspense>
			</div>
			// </div>
		)
	}, [onChangeAnswer, answerTextCardModal, editorMinHeight, t])


	return (
		<HDialog
			className={cls.cardModalPanel}
			panelWithMainPadding={false}
			isOpen={isOpen}
			onOpenChange={onCloseCardModal}
			onSubmit={() => alert('Создаю новую карточку')}
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
						<div ref={shelvesAndBoxesRef}>
							{shelvesAndBoxes}
						</div>
						{editorBlockQuestion}
						{editorBlockAnswer}
					</div>
				</div>

				<div className={cls.emptySpace_bottom} />
				<div ref={modalButtonsRef}>
					<ModalButtons
						justify='end'
						className={cls.actions}
						onClose={() => onCloseCardModal(false)}
						onSubmit={() => alert('Создаю новую карточку')}
					/>
				</div>
			</div>
		</HDialog>
	)
})