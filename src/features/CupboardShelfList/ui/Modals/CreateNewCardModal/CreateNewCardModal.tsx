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
import { Skeleton } from '@/shared/ui/Skeleton';
import { getCupboardIsLoading, getCupboardError } from '../../../model/selectors/getCupboardShelfList';
import { HDialog } from '@/shared/ui/HDialog';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { EditorState } from 'lexical';
import { EditorV2 } from '@/shared/ui/lexical-playground/src/Editor';
import { useEditorMinHeight } from '@/shared/lib/helpers/hooks/useEditorMinHeight';
import { memo, useRef, useMemo, useCallback, Suspense } from 'react';
import cls from './CreateNewCardModal.module.scss';

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
			<div key='editorBlockQuestion'>
				<div className={cls.areaAndLabelWrapper} >
					<MyText text={t('question')} />
					<Suspense fallback={<Skeleton width={1200} borderRadius='4px' height={editorMinHeight} />}>
						<EditorV2
							heightValue={editorMinHeight}
							onChange={onChangeQuestion}
							initialState={questionTextCardModal}
							autoFocus
						/>
					</Suspense>
				</div>
			</div>)
	}, [onChangeQuestion, questionTextCardModal, editorMinHeight, t])

	const editorBlockAnswer = useMemo(() => {
		return (
			<div key='editorBlockAnswer' className={cls.areaAndLabelWrapper} >
				<MyText text={t('answer')} />
				<Suspense fallback={<Skeleton width={1200} borderRadius='4px' height={editorMinHeight} />}>
					<EditorV2
						heightValue={editorMinHeight}
						onChange={onChangeAnswer}
						initialState={answerTextCardModal}
					/>
				</Suspense>
			</div>
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



// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import { Modal } from '@/shared/ui/Modal/Modal';
// import { ListBox } from '@/shared/ui/Popup';
// import { HStack, VStack } from '@/shared/ui/Stack';
// import { MyText, TextArea } from '@/shared/ui/Typography';
// import { Button } from '@/shared/ui/Button';
// import { MutableRefObject, UIEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
// import {
// 	getAnswerCardModal,
// 	getBoxIndexCardModal,
// 	getIsOpenCardModal,
// 	getQuestionCardModal,
// 	getShelfIdCardModal
// } from '../../../model/selectors/getCreateNewCardModal';
// import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
// import { cupboardShelfListActions, getCupboardState } from '../../../model/slice/cupboardShelfListSlice';
// import { Skeleton } from '@/shared/ui/Skeleton';
// import cls from './CreateNewCardModal.module.scss';
// import { getCupboardIsLoading, getCupboardError } from '../../../model/selectors/getCupboardShelfList';
// import { HDialog } from '@/shared/ui/HDialog';
// import { ModalButtons } from '@/shared/ui/ModalButtons';
// import { useWindowSize } from '@/shared/lib/helpers/hooks/useWindowHeight';
// import { ShadowTextArea } from '@/shared/ui/Typography/TextArea/ShadowTextArea';
// // import { useMainContentMaxHeightAndAreaRows } from '@/shared/lib/helpers/hooks/useMainContentMaxHeightAndAreaRows';
// // import { Editor } from '@/shared/ui/Editor';
// import { EditorState } from 'lexical';
// import { EditorV2 } from '@/shared/ui/lexical-playground/src/Editor';
// import { useEditorMinHeight } from '@/shared/lib/helpers/hooks/useEditorMinHeight';

// export const CreateNewCardModal = memo(() => {
// 	const { t } = useTranslation()
// 	const dispatch = useAppDispatch()
// 	const cupboardIsLoading = useSelector(getCupboardIsLoading)
// 	// const cupboardError = useSelector(getCupboardError)
// 	const cupboardShelves = useSelector(getCupboardState.selectAll)
// 	const isOpen = useSelector(getIsOpenCardModal)
// 	const questionTextCardModal = useSelector(getQuestionCardModal)
// 	const answerTextCardModal = useSelector(getAnswerCardModal)
// 	const shelfIdCardModal = useSelector(getShelfIdCardModal) ?? cupboardShelves[0].id
// 	const boxIdCardModal = useSelector(getBoxIndexCardModal)
// 	const [shadowAreaQuestionHeight, setShadowAreaQuestionHeight] = useState(96)
// 	const [shadowAreaAnswerHeight, setShadowAreaAnswerHeight] = useState(96)

// 	const shelvesAndBoxesRef = useRef<HTMLDivElement>(null)
// 	const modalButtonsRef = useRef<HTMLDivElement>(null)

// 	const { textAreaRows, mainContentMaxHeight, editorMinHeight } = useEditorMinHeight({
// 		isOpen,
// 		modalButtonsRef: modalButtonsRef.current,
// 		shelvesAndBoxesRef: shelvesAndBoxesRef.current,
// 	})

// 	// const { textAreaRows, mainContentMaxHeight } = useMainContentMaxHeightAndAreaRows({
// 	// 	isOpen,
// 	// 	modalButtonsRef: modalButtonsRef.current,
// 	// 	shelvesAndBoxesRef: shelvesAndBoxesRef.current,
// 	// })

// 	const shelfItems = useMemo(() => {
// 		if (cupboardIsLoading) return []
// 		return cupboardShelves.map(shelf => {
// 			return {
// 				content: shelf.title,
// 				value: shelf.id
// 			}
// 		})
// 	}, [cupboardIsLoading, cupboardShelves])

// 	const boxItems = useMemo(() => {
// 		if (cupboardIsLoading) return []
// 		const currentShelf = cupboardShelves.find(shelf => shelf.id === shelfIdCardModal)
// 		const itemsList = currentShelf!.boxesData.map(box => {
// 			let content;
// 			switch (box.specialType) {
// 				case 'none':
// 					content = `${t('box text')} ${box.index}`
// 					break;
// 				case 'new':
// 					content = t('new cards')
// 					break
// 				default:
// 					content = t('learnt cards')
// 					break;
// 			}
// 			return {
// 				value: box.index,
// 				// value: box._id,
// 				content,
// 			}
// 		})
// 		return itemsList
// 	}, [cupboardIsLoading, shelfIdCardModal, cupboardShelves, t])

// 	const onChangeQuestion = useCallback((editorState: EditorState) => {
// 		dispatch(cupboardShelfListActions.setQuestionText(JSON.stringify(editorState.toJSON())))
// 		// isOpen && dispatch(cupboardShelfListActions.setQuestionText(JSON.stringify(editorState.toJSON())))
// 	}, [dispatch])
// 	// const onChangeQuestion = useCallback((text: string) => {
// 	// 	editorState
// 	// 	isOpen && dispatch(cupboardShelfListActions.setQuestionText(text))
// 	// }, [dispatch, isOpen])

// 	const onCloseCardModal = useCallback((isOpen: boolean) => {
// 		dispatch(cupboardShelfListActions.setIsCreateNewCardModalOpen(isOpen))
// 	}, [dispatch])
// 	// const onCloseCardModal2 = useCallback(() => {
// 	// 	dispatch(cupboardShelfListActions.setIsCreateNewCardModalOpen(false))
// 	// }, [dispatch])
// 	const onChangeAnswer = useCallback((editorState: EditorState) => {
// 		dispatch(cupboardShelfListActions.setAnswerText(JSON.stringify(editorState.toJSON())))
// 		// isOpen && dispatch(cupboardShelfListActions.setQuestionText(JSON.stringify(editorState.toJSON())))
// 	}, [dispatch])
// 	// const onChangeAnswer = useCallback((text: string) => {
// 	// 	dispatch(cupboardShelfListActions.setAnswerText(text))
// 	// }, [dispatch])

// 	const onChangeShelf = useCallback((shelfId: string) => {
// 		dispatch(cupboardShelfListActions.setShelfIdCardModal(shelfId))
// 	}, [dispatch])

// 	const onChangeBox = useCallback((boxIndex: number) => {
// 		dispatch(cupboardShelfListActions.setBoxIndexCardModal(boxIndex))
// 	}, [dispatch])


// 	// const shadowAreaQuestion = (
// 	// 	<div className={cls.shadowAreaWrapper} >
// 	// 		<ShadowTextArea
// 	// 			getCurrentHeight={setShadowAreaQuestionHeight}
// 	// 			value={questionTextCardModal}
// 	// 			className={cls.shadowArea}
// 	// 			rows={textAreaRows}
// 	// 		/>
// 	// 	</div>
// 	// )

// 	// const shadowAreaAnswer = (
// 	// 	<div className={cls.shadowAreaWrapper} >
// 	// 		<ShadowTextArea
// 	// 			getCurrentHeight={setShadowAreaAnswerHeight}
// 	// 			value={answerTextCardModal}
// 	// 			className={cls.shadowArea}
// 	// 			rows={textAreaRows}
// 	// 		/>
// 	// 	</div>
// 	// )

// 	const shelvesAndBoxes = useMemo(() => {
// 		if (cupboardIsLoading) {
// 			return (
// 				<div className={cls.grid} key='shelvesAndBoxes' >
// 					<Skeleton width={200} height={67} />
// 					<Skeleton width={200} height={67} />
// 				</div>
// 			)
// 		}
// 		return (
// 			<div className={cls.grid} key='shelvesAndBoxes' >
// 				<div className={cls.listBoxWrapper}>
// 					<ListBox
// 						label={t('shelf')}
// 						value={shelfIdCardModal}
// 						items={shelfItems}
// 						onChange={onChangeShelf}
// 						max
// 						sameWidth
// 					/>
// 				</div>
// 				<div className={cls.listBoxWrapper}>
// 					<ListBox
// 						label={t('box text')}
// 						value={boxIdCardModal}
// 						items={boxItems}
// 						onChange={onChangeBox}
// 						max
// 						sameWidth
// 					/>
// 				</div>
// 			</div>)
// 	}, [cupboardIsLoading, t, boxIdCardModal, boxItems, onChangeBox, onChangeShelf, shelfIdCardModal, shelfItems])

// 	// let shelvesAndBoxes;
// 	// if (cupboardIsLoading) {
// 	// 	shelvesAndBoxes = (
// 	// 		<div className={cls.grid} key='shelvesAndBoxes' >
// 	// 			<Skeleton width={200} height={67} />
// 	// 			<Skeleton width={200} height={67} />
// 	// 		</div>
// 	// 	)
// 	// } else {
// 	// 	shelvesAndBoxes = (
// 	// 		<div className={cls.grid} key='shelvesAndBoxes' >


// 	// 			<div className={cls.listBoxWrapper}>
// 	// 				<ListBox
// 	// 					label={t('shelf')}
// 	// 					value={shelfIdCardModal}
// 	// 					items={shelfItems}
// 	// 					onChange={onChangeShelf}
// 	// 					max
// 	// 					sameWidth
// 	// 				/>
// 	// 			</div>
// 	// 			<div className={cls.listBoxWrapper}>

// 	// 				<ListBox
// 	// 					label={t('box text')}
// 	// 					value={boxIdCardModal}
// 	// 					items={boxItems}
// 	// 					onChange={onChangeBox}
// 	// 					max
// 	// 					sameWidth
// 	// 				/>
// 	// 			</div>
// 	// 		</div>)
// 	// }


// 	// const questionEditor = isOpen ? (
// 	// 	<EditorV2
// 	// 		heightValue={editorMinHeight}
// 	// 		onChange={onChangeQuestion}
// 	// 		initialState={questionTextCardModal}
// 	// 		autoFocus
// 	// 	/>
// 	// ) : null;

// 	// const answerEditor = isOpen ? (
// 	// 	<EditorV2
// 	// 		heightValue={editorMinHeight}
// 	// 		onChange={onChangeAnswer}
// 	// 		initialState={answerTextCardModal}
// 	// 	/>
// 	// ) : null;
// 	console.log('editorMinHeight   ', editorMinHeight)
// 	console.log('mainContentMaxHeight   ', mainContentMaxHeight)
// 	const questionEditor = <EditorV2
// 		heightValue={editorMinHeight}
// 		// heightValue={textAreaRows * 24}
// 		// heightValue={shadowAreaQuestionHeight}
// 		onChange={onChangeQuestion}
// 		initialState={questionTextCardModal}
// 		autoFocus
// 	/>
// 	const answerEditor = <EditorV2
// 		heightValue={editorMinHeight}
// 		// heightValue={textAreaRows * 24}
// 		// heightValue={shadowAreaAnswerHeight}
// 		onChange={onChangeAnswer}
// 		initialState={answerTextCardModal}
// 	/>
// 	// const questionEditor = <Editor onChange={onChangeQuestion} id={'QQQQQQQQQQQQ'} initialState={questionTextCardModal} />
// 	// const answerEditor = <Editor onChange={onChangeAnswer} id={'skafjwieo2222'} initialState={answerTextCardModal} />

// 	return (
// 		<HDialog
// 			// isOpen={true}
// 			isOpen={isOpen}
// 			stayInDom
// 			// onClose={onCloseCardModal2}
// 			onOpenChange={onCloseCardModal}
// 			className={cls.cardModalPanel}
// 			onSubmit={() => alert('Создаю новую карточку')}
// 			panelWithMainPadding={false}
// 		// panelWithBackground={false}
// 		>
// 			<div
// 				className={cls.cardModal}
// 			>
// 				<div className={cls.emptySpace_top} />

// 				<div className={cls.mainContentWrapper}>
// 					<div
// 						className={cls.mainContent}
// 						style={{ maxHeight: mainContentMaxHeight }}
// 					>
// 						<div ref={shelvesAndBoxesRef}>
// 							{shelvesAndBoxes}
// 						</div>
// 						<div>
// 							{/* {shadowAreaQuestion} */}
// 							{/* {shadowAreaAnswer} */}
// 							<div className={cls.areaAndLabelWrapper} >
// 								<MyText text={t('question')} />
// 								{questionEditor}
// 								{/* <TextArea
// 									rows={textAreaRows}
// 									value={questionTextCardModal}
// 									onChangeString={onChangeQuestion}
// 									heightValue={shadowAreaQuestionHeight}
// 									focus
// 								/> */}
// 							</div>
// 						</div>
// 						<div className={cls.areaAndLabelWrapper} >
// 							<MyText text={t('answer')} />
// 							{answerEditor}
// 							{/* <TextArea
// 								rows={textAreaRows}
// 								value={answerTextCardModal}
// 								onChangeString={onChangeAnswer}
// 								heightValue={shadowAreaAnswerHeight}
// 							/> */}
// 						</div>

// 					</div>
// 				</div>


// 				<div className={cls.emptySpace_bottom} />

// 				<div ref={modalButtonsRef}>
// 					<ModalButtons
// 						justify='end'
// 						className={cls.actions}
// 						onClose={() => onCloseCardModal(false)}
// 						onSubmit={() => alert('Создаю новую карточку')}
// 					/>
// 				</div>

// 			</div>
// 		</HDialog>
// 	)
// })



