import { useTranslation } from 'react-i18next';
import { ListBox } from '@/shared/ui/Popup';
import { MyText } from '@/shared/ui/Typography';
import { useSelector } from 'react-redux';
import {
	getAnswerCardModal,
	getBoxIndexCardModal,
	getIsOpenCardModal,
	getQuestionCardModal,
	getShelfIdCardModal,
	getShelfBoxesItems,
	getCreateNewCardRequestStatus,
	getBoxIdCheckedCardModal,
} from '../../../model/selectors/getCreateNewCardModal';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions, getCupboardState } from '../../../model/slice/cupboardShelfListSlice';
import { Skeleton, TextEditorSkeleton } from '@/shared/ui/Skeleton';
import { getCupboardIsLoading, getShelfItems } from '../../../model/selectors/getCupboardShelfList';
import { HDialog } from '@/shared/ui/HDialog';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { useEditorMinHeight } from '@/shared/lib/helpers/hooks/useEditorMinHeight';
import { memo, useRef, useMemo, useCallback, Suspense } from 'react';
import { StateSchema } from '@/app/providers/StoreProvider';
import { EditorUniversal } from '@/shared/ui/LexicalEditor';
import { createNewCardThunk } from '../../../model/services/createNewCardThunk';
import { genRandomId } from '@/shared/lib/helpers/common/genRandomId';
import cls from '@/shared/styles/CardEditAndCreateModal.module.scss';

interface CreateNewCardModalProps {
	cardModalSkeleton: JSX.Element
	editorMinHeight: number
	mainContentMaxHeight: string
}

const CreateNewCardModal = memo((props: CreateNewCardModalProps) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const isOpen = useSelector(getIsOpenCardModal)
	const cupboardIsLoading = useSelector(getCupboardIsLoading)
	const cupboardShelves = useSelector(getCupboardState.selectAll)
	const questionTextCardModal = useSelector(getQuestionCardModal)
	const answerTextCardModal = useSelector(getAnswerCardModal)
	const shelfIdCardModal = useSelector(getShelfIdCardModal) ?? cupboardShelves[0].id
	const boxIndexCardModal = useSelector(getBoxIndexCardModal)
	const boxIdChecked = useSelector(getBoxIdCheckedCardModal)!
	const createNewCardRequestStatus = useSelector(getCreateNewCardRequestStatus)
	const shelfItems = useSelector((state: StateSchema) => getShelfItems(state))
	const boxItems = useSelector((state: StateSchema) => getShelfBoxesItems(state))
	const shelvesAndBoxesRef = useRef<HTMLDivElement>(null)
	const modalButtonsRef = useRef<HTMLDivElement>(null)

	const { mainContentMaxHeight, checked, editorMinHeight } = useEditorMinHeight({
		isOpen,
		modalButtonsRef: modalButtonsRef.current,
		shelvesAndBoxesRef: shelvesAndBoxesRef.current,
	})

	const onChangeQuestion = useCallback((editorState: string) => {
		// const onChangeQuestion = useCallback((editorState: EditorState) => {
		dispatch(cupboardShelfListActions.setQuestionText(editorState))
		// dispatch(cupboardShelfListActions.setQuestionText(JSON.stringify(editorState.toJSON())))
	}, [dispatch])

	const onChangeAnswer = useCallback((editorState: string) => {
		// const onChangeAnswer = useCallback((editorState: EditorState) => {
		dispatch(cupboardShelfListActions.setAnswerText(editorState))
		// dispatch(cupboardShelfListActions.setAnswerText(JSON.stringify(editorState.toJSON())))
	}, [dispatch])

	const onCloseCardModal = useCallback((isOpen: boolean) => {
		dispatch(cupboardShelfListActions.setIsCreateNewCardModalOpen(isOpen))
	}, [dispatch])

	const onChangeShelf = useCallback((shelfId: string) => {
		dispatch(cupboardShelfListActions.setShelfIdCardModal(shelfId))
	}, [dispatch])

	// const onChangeBox = useCallback((boxId: string) => {
	// 	dispatch(cupboardShelfListActions.setBoxIdCardModal(boxId))
	// }, [dispatch])
	const onChangeBox = useCallback((boxIndex: number) => {
		dispatch(cupboardShelfListActions.setBoxIndexAndBoxIdCardModal(boxIndex))
	}, [dispatch])

	const onSubmit = useCallback(() => {
		dispatch(createNewCardThunk(genRandomId()))
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
					<ListBox<number>
						label={t('box text')}
						// value={boxIdChecked}
						value={boxIndexCardModal}
						items={boxItems}
						onChange={onChangeBox}
						max
						sameWidth
					/>
				</div>
			</div>)
		// }, [cupboardIsLoading, t, boxIdChecked, boxItems, onChangeBox, onChangeShelf, shelfIdCardModal, shelfItems])
	}, [cupboardIsLoading, t, boxIndexCardModal, boxItems, onChangeBox, onChangeShelf, shelfIdCardModal, shelfItems])

	const editorBlockQuestion = useMemo(() => {
		return (
			<div className={cls.areaAndLabelWrapper} >
				<MyText text={t('question')} />
				<Suspense fallback={
					<TextEditorSkeleton editorMinHeight={checked ? editorMinHeight : props.editorMinHeight} />
				}>
					<EditorUniversal
						heightValue={checked ? editorMinHeight : props.editorMinHeight}
						onChange={onChangeQuestion}
						editorState={questionTextCardModal}
						autoFocus
					/>
				</Suspense>
			</div>
		)
	}, [onChangeQuestion, questionTextCardModal, editorMinHeight, t, props.editorMinHeight, checked])

	const editorBlockAnswer = useMemo(() => {
		return (
			<div className={cls.areaAndLabelWrapper}>
				<MyText text={t('answer')} />
				<Suspense fallback={
					<TextEditorSkeleton editorMinHeight={checked ? editorMinHeight : props.editorMinHeight} />
				}>
					<EditorUniversal
						heightValue={checked ? editorMinHeight : props.editorMinHeight}
						onChange={onChangeAnswer}
						editorState={answerTextCardModal}
					/>
				</Suspense>
			</div>
		)
	}, [onChangeAnswer, answerTextCardModal, editorMinHeight, t, props.editorMinHeight, checked])

	// if (!checked) {
	// 	console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')
	// 	return props.cardModalSkeleton
	// }

	return (
		<HDialog
			className={cls.cardModalPanel}
			panelWithMainPadding={false}
			isOpen={isOpen}
			onOpenChange={onCloseCardModal}
			onSubmit={onSubmit}
		// onSubmit={() => alert('Создаю новую карточку')}
		>
			<div
				className={cls.cardModal}
			>
				<div className={cls.emptySpace_top} />
				<div className={cls.mainContentWrapper}>

					<div
						className={cls.mainContent}
						style={{ maxHeight: checked ? mainContentMaxHeight : props.mainContentMaxHeight }}
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
						isSubmitDisabled={
							(!questionTextCardModal && !answerTextCardModal)
							|| createNewCardRequestStatus === 'pending'
						}
						onSubmit={onSubmit}
						textSubmitButton={t('add new card')}
					// onSubmit={() => alert('Создаю новую карточку')}
					/>
				</div>
			</div>
		</HDialog>
	)
})
CreateNewCardModal.displayName = 'CreateNewCardModal'
export default CreateNewCardModal