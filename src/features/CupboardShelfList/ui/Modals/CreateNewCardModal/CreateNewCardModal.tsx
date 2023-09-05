import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/Modal/Modal';
import { ListBox } from '@/shared/ui/Popup';
import { HStack, VStack } from '@/shared/ui/Stack';
import { MyText, TextArea } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { MutableRefObject, UIEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './CreateNewCardModal.module.scss';
import { getCupboardIsLoading, getCupboardError } from '../../../model/selectors/getCupboardShelfList';
import { HDialog } from '@/shared/ui/HDialog';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { useWindowSize } from '@/shared/lib/helpers/hooks/useWindowHeight';
import { ShadowTextArea } from '@/shared/ui/Typography/TextArea/ShadowTextArea';
import { useMainContentMaxHeightAndAreaRows } from '@/shared/lib/helpers/hooks/useMainContentMaxHeightAndAreaRows';
import { Editor } from '@/shared/ui/Editor';
import { EditorState } from 'lexical';
const emptyEditorState = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'

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
	const [shadowAreaQuestionHeight, setShadowAreaQuestionHeight] = useState(0)
	const [shadowAreaAnswerHeight, setShadowAreaAnswerHeight] = useState(0)

	const shelvesAndBoxesRef = useRef<HTMLDivElement>(null)
	const modalButtonsRef = useRef<HTMLDivElement>(null)

	const { textAreaRows, mainContentMaxHeight } = useMainContentMaxHeightAndAreaRows({
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
		dispatch(cupboardShelfListActions.setQuestionText(JSON.stringify(editorState.toJSON())))
		// isOpen && dispatch(cupboardShelfListActions.setQuestionText(JSON.stringify(editorState.toJSON())))
	}, [dispatch])
	// const onChangeQuestion = useCallback((text: string) => {
	// 	editorState
	// 	isOpen && dispatch(cupboardShelfListActions.setQuestionText(text))
	// }, [dispatch, isOpen])

	const onCloseCardModal = useCallback(() => {
		dispatch(cupboardShelfListActions.setIsCreateNewCardModalOpen(false))
	}, [dispatch])
	const onChangeAnswer = useCallback((editorState: EditorState) => {
		dispatch(cupboardShelfListActions.setAnswerText(JSON.stringify(editorState.toJSON())))
		// isOpen && dispatch(cupboardShelfListActions.setQuestionText(JSON.stringify(editorState.toJSON())))
	}, [dispatch])
	// const onChangeAnswer = useCallback((text: string) => {
	// 	dispatch(cupboardShelfListActions.setAnswerText(text))
	// }, [dispatch])

	const onChangeShelf = useCallback((shelfId: string) => {
		dispatch(cupboardShelfListActions.setShelfIdCardModal(shelfId))
	}, [dispatch])

	const onChangeBox = useCallback((boxIndex: number) => {
		dispatch(cupboardShelfListActions.setBoxIndexCardModal(boxIndex))
	}, [dispatch])


	const shadowAreaQuestion = (
		<div className={cls.shadowAreaWrapper} >
			<ShadowTextArea
				getCurrentHeight={setShadowAreaQuestionHeight}
				value={questionTextCardModal}
				className={cls.shadowArea}
				rows={textAreaRows}
			/>
		</div>
	)

	const shadowAreaAnswer = (
		<div className={cls.shadowAreaWrapper} >
			<ShadowTextArea
				getCurrentHeight={setShadowAreaAnswerHeight}
				value={answerTextCardModal}
				className={cls.shadowArea}
				rows={textAreaRows}
			/>
		</div>
	)

	let shelvesAndBoxes;
	if (cupboardIsLoading) {
		shelvesAndBoxes = (
			<div className={cls.grid} key='shelvesAndBoxes' >
				<Skeleton width={200} height={67} />
				<Skeleton width={200} height={67} />
			</div>
		)
	} else {
		shelvesAndBoxes = (
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
	}


	const questionEditor = <Editor onChange={onChangeQuestion} id={'QQQQQQQQQQQQ'} initialState={questionTextCardModal} />
	const answerEditor = <Editor onChange={onChangeAnswer} id={'skafjwieo2222'} initialState={answerTextCardModal} />

	return (
		<HDialog
			// isOpen={true}
			isOpen={isOpen}
			onClose={onCloseCardModal}
			className={cls.cardModalPanel}
			onSubmit={() => alert('Создаю новую карточку')}
			panelWithMainPadding={false}
		// panelWithBackground={false}
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
						<div>
							{shadowAreaQuestion}
							{shadowAreaAnswer}
							<div className={cls.areaAndLabelWrapper} >
								<MyText text={t('question')} />
								{questionEditor}
								{/* <TextArea
									rows={textAreaRows}
									value={questionTextCardModal}
									onChangeString={onChangeQuestion}
									heightValue={shadowAreaQuestionHeight}
									focus
								/> */}
							</div>
						</div>
						<div className={cls.areaAndLabelWrapper} >
							<MyText text={t('answer')} />
							{answerEditor}
							{/* <TextArea
								rows={textAreaRows}
								value={answerTextCardModal}
								onChangeString={onChangeAnswer}
								heightValue={shadowAreaAnswerHeight}
							/> */}
						</div>

					</div>
				</div>


				<div className={cls.emptySpace_bottom} />

				<div ref={modalButtonsRef}>
					<ModalButtons
						justify='end'
						className={cls.actions}
						onClose={onCloseCardModal}
						onSubmit={() => alert('Создаю новую карточку')}
					/>
				</div>

			</div>
		</HDialog>
	)
})




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