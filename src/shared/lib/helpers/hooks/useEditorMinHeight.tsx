import { useState, useEffect } from 'react'
import { useModalVariables } from './useModalVariables'
import { useWindowSize } from './useWindowHeight'

interface useEditorMinHeightProps {
	isOpen: boolean
	shelvesAndBoxesRef: HTMLDivElement | null
	modalButtonsRef: HTMLDivElement | null
}

export const useEditorMinHeight = (props: useEditorMinHeightProps) => {
	const {
		isOpen,
		shelvesAndBoxesRef,
		modalButtonsRef,
	} = props
	const [checked, setChecked] = useState(false)
	const [textAreaRows, setTextAreaRows] = useState(2)
	const [editorMinHeight, setEditorMinHeight] = useState(300)
	const variables = useModalVariables()
	const { windowHeight } = useWindowSize()
	const [mainContentMaxHeight, setMainContentMaxHeight] = useState(`${windowHeight * 0.9 - 68 - 55.6 - 20}px`)

	useEffect(() => {

		const {
			paddingTextareaTopAndBottom,
			emptySpaceTopHeight,
			emptySpaceBottomHeight,
			gapBetweenLabelAndTextarea,
			areaAndLabelWrapperPaddingBottom,
			mainContentVerticalGap,
			maxPercentOfScreenForMainContent,
			areaBorders,
			lineHeight
		} = variables

		const shelvesAndBoxesHeight = shelvesAndBoxesRef ? shelvesAndBoxesRef.scrollHeight : 68
		const buttonsHeight = modalButtonsRef ? modalButtonsRef.scrollHeight : 55.6
		const mainContentMaxHeightCalculated = getMainContentMaxHeight({
			windowHeight,
			maxPercentOfScreenForMainContent,
			emptySpaceBottomHeight,
			emptySpaceTopHeight,
			buttonsHeight,
		})
		const areasAndLabelsHeightNew = mainContentMaxHeightCalculated - shelvesAndBoxesHeight


		const areaHeight = areasAndLabelsHeightNew / 2 -
			(lineHeight + gapBetweenLabelAndTextarea + mainContentVerticalGap + areaAndLabelWrapperPaddingBottom)

		setEditorMinHeight(areaHeight)
		setMainContentMaxHeight(`${mainContentMaxHeightCalculated}px`)
		setChecked(true)
	}, [windowHeight, isOpen, modalButtonsRef, shelvesAndBoxesRef, variables])

	return { textAreaRows, checked, mainContentMaxHeight, editorMinHeight }

}


type GetMainContentMaxHeightArg = {
	windowHeight: number
	maxPercentOfScreenForMainContent: number
	buttonsHeight: number
	emptySpaceTopHeight: number
	emptySpaceBottomHeight: number
}
type GetMainContentMaxHeightFn = (arg: GetMainContentMaxHeightArg) => number
const getMainContentMaxHeight: GetMainContentMaxHeightFn = (arg) => {
	const {
		windowHeight,
		maxPercentOfScreenForMainContent,
		emptySpaceTopHeight,
		emptySpaceBottomHeight,
		buttonsHeight,
	} = arg
	return windowHeight * maxPercentOfScreenForMainContent - emptySpaceTopHeight - emptySpaceBottomHeight - buttonsHeight
}

type GetAreaAndLabelsHeightArg = {
	mainContentMaxHeight: number
	shelvesAndBoxesHeight: number
	mainContentVerticalGap: number
}
type GetAreaAndLabelsHeightFn = (arg: GetAreaAndLabelsHeightArg) => number
const getAreaAndLabelsHeight: GetAreaAndLabelsHeightFn = (arg) => {
	const {
		mainContentMaxHeight,
		mainContentVerticalGap,
		shelvesAndBoxesHeight,
	} = arg
	return mainContentMaxHeight - shelvesAndBoxesHeight
	// return mainContentMaxHeight - shelvesAndBoxesHeight - mainContentVerticalGap * 2
}

type GetMaxHeightForTextAreaArg = {
	areaAndLabelHeight: number
	paddingTextareaTopAndBottom: number
	lineHeight: number
	areaAndLabelWrapperPaddingBottom: number
	gapBetweenLabelAndTextarea: number
	areaBorders: number
}
type GetMaxHeightForTextAreaFn = (arg: GetMaxHeightForTextAreaArg) => number
const getMaxHeightForTextArea: GetMaxHeightForTextAreaFn = (arg) => {
	const {
		areaAndLabelHeight,
		areaAndLabelWrapperPaddingBottom,
		areaBorders,
		lineHeight,
		paddingTextareaTopAndBottom,
		gapBetweenLabelAndTextarea,
	} = arg
	return areaAndLabelHeight - (lineHeight * 2 + gapBetweenLabelAndTextarea + areaAndLabelWrapperPaddingBottom + paddingTextareaTopAndBottom + areaBorders)
}
// import { useState, useEffect } from 'react'
// import { useModalVariables } from './useModalVariables'
// import { useWindowSize } from './useWindowHeight'

// interface useEditorMinHeightProps {
// 	isOpen: boolean
// 	shelvesAndBoxesRef: HTMLDivElement | null
// 	modalButtonsRef: HTMLDivElement | null
// }

// export const useEditorMinHeight = (props: useEditorMinHeightProps) => {
// 	const {
// 		isOpen,
// 		shelvesAndBoxesRef,
// 		modalButtonsRef,
// 	} = props
// 	const [mainContentMaxHeight, setMainContentMaxHeight] = useState('500px')
// 	const [textAreaRows, setTextAreaRows] = useState(2)
// 	const [editorMinHeight, setEditorMinHeight] = useState(300)
// 	const variables = useModalVariables()

// 	const { windowHeight } = useWindowSize()
// 	useEffect(() => {

// 		if (isOpen && shelvesAndBoxesRef && modalButtonsRef) {
// 			const {
// 				paddingTextareaTopAndBottom,
// 				emptySpaceTopHeight,
// 				emptySpaceBottomHeight,
// 				gapBetweenLabelAndTextarea,
// 				areaAndLabelWrapperPaddingBottom,
// 				mainContentVerticalGap,
// 				maxPercentOfScreenForMainContent,
// 				areaBorders,
// 				lineHeight
// 			} = variables

// 			const shelvesAndBoxesHeight = shelvesAndBoxesRef.scrollHeight
// 			// console.log('shelvesAndBoxesHeight:  ', shelvesAndBoxesHeight)
// 			const buttonsHeight = modalButtonsRef.scrollHeight
// 			// console.log('buttonsHeight:  ', buttonsHeight)
// 			console.log('areaAndLabelWrapperPaddingBottom   ', areaAndLabelWrapperPaddingBottom)
// 			// console.log('maxPercentOfScreenForMainContent   ', maxPercentOfScreenForMainContent)
// 			const mainContentMaxHeightCalculated = getMainContentMaxHeight({
// 				windowHeight,
// 				maxPercentOfScreenForMainContent,
// 				emptySpaceBottomHeight,
// 				emptySpaceTopHeight,
// 				buttonsHeight,
// 			})
// 			const areasAndLabelsHeightNew = mainContentMaxHeightCalculated - shelvesAndBoxesHeight
// 			console.log('areasAndLabelsHeightNew:  ', areasAndLabelsHeightNew)

// 			const areasAndLabelsHeight = getAreaAndLabelsHeight({
// 				mainContentMaxHeight: mainContentMaxHeightCalculated,
// 				shelvesAndBoxesHeight,
// 				mainContentVerticalGap,
// 			})
// 			// console.log('areasAndLabelsHeight  ', areasAndLabelsHeight)
// 			const areaAndLabelHeight = areasAndLabelsHeight / 2
// 			// const areaHeight = (areasAndLabelsHeightNew -
// 			// 	(lineHeight * 2 + gapBetweenLabelAndTextarea + mainContentVerticalGap * 2 + paddingTextareaTopAndBottom + areaAndLabelWrapperPaddingBottom * 2 + areaBorders * 4)
// 			// ) / 2
// 			const areaHeight = areasAndLabelsHeightNew / 2 -
// 				(lineHeight + gapBetweenLabelAndTextarea + mainContentVerticalGap + areaAndLabelWrapperPaddingBottom)
// 				// + areaBorders * 2)
// 			// console.log('areaAndLabelHeight single  ', areaAndLabelHeight)
// 			const maxHeightForTextArea = getMaxHeightForTextArea({
// 				areaAndLabelHeight,
// 				areaAndLabelWrapperPaddingBottom,
// 				areaBorders,
// 				lineHeight,
// 				paddingTextareaTopAndBottom,
// 				gapBetweenLabelAndTextarea
// 			})
// 			const rows = Math.ceil(maxHeightForTextArea / lineHeight)
// 			// const rows = Math.floor(maxHeightForTextArea / lineHeight)
// 			// console.log('@@@@@@@@@@@@@ ',  windowHeight, maxPercentOfScreenForMainContent)
// 			const res = windowHeight * maxPercentOfScreenForMainContent
// 			const next = (emptySpaceBottomHeight + emptySpaceTopHeight + shelvesAndBoxesHeight + buttonsHeight)
// 			// console.log('max height by window', res)
// 			// console.log('next  ', next)
// 			const res2 = res - next
// 			console.log('res - next  ', res2, res2 / 2)
// 			console.log('areaHeight:  ', areaHeight)
// 			console.log('maxHeightForTextArea:  ', maxHeightForTextArea)
// 			// console.log('res    ', res, res / 2)
// 			// const res2 = res - mainContentVerticalGap - lineHeight * 2 - gapBetweenLabelAndTextarea * 2
// 			// console.log('res2    ', res2, res2 / 2)
// 			setTextAreaRows(rows)
// 			setEditorMinHeight(areaHeight)
// 			// setEditorMinHeight(maxHeightForTextArea)
// 			// setEditorMinHeight(res / 2)
// 			setMainContentMaxHeight(`${mainContentMaxHeightCalculated}px`)
// 		}
// 	}, [windowHeight, isOpen, modalButtonsRef, shelvesAndBoxesRef, variables])

// 	return { textAreaRows, mainContentMaxHeight, editorMinHeight }

// }


// type GetMainContentMaxHeightArg = {
// 	windowHeight: number
// 	maxPercentOfScreenForMainContent: number
// 	buttonsHeight: number
// 	emptySpaceTopHeight: number
// 	emptySpaceBottomHeight: number
// }
// type GetMainContentMaxHeightFn = (arg: GetMainContentMaxHeightArg) => number
// const getMainContentMaxHeight: GetMainContentMaxHeightFn = (arg) => {
// 	const {
// 		windowHeight,
// 		maxPercentOfScreenForMainContent,
// 		emptySpaceTopHeight,
// 		emptySpaceBottomHeight,
// 		buttonsHeight,
// 	} = arg
// 	return windowHeight * maxPercentOfScreenForMainContent - emptySpaceTopHeight - emptySpaceBottomHeight - buttonsHeight
// }

// type GetAreaAndLabelsHeightArg = {
// 	mainContentMaxHeight: number
// 	shelvesAndBoxesHeight: number
// 	mainContentVerticalGap: number
// }
// type GetAreaAndLabelsHeightFn = (arg: GetAreaAndLabelsHeightArg) => number
// const getAreaAndLabelsHeight: GetAreaAndLabelsHeightFn = (arg) => {
// 	const {
// 		mainContentMaxHeight,
// 		mainContentVerticalGap,
// 		shelvesAndBoxesHeight,
// 	} = arg
// 	return mainContentMaxHeight - shelvesAndBoxesHeight
// 	// return mainContentMaxHeight - shelvesAndBoxesHeight - mainContentVerticalGap * 2
// }

// type GetMaxHeightForTextAreaArg = {
// 	areaAndLabelHeight: number
// 	paddingTextareaTopAndBottom: number
// 	lineHeight: number
// 	areaAndLabelWrapperPaddingBottom: number
// 	gapBetweenLabelAndTextarea: number
// 	areaBorders: number
// }
// type GetMaxHeightForTextAreaFn = (arg: GetMaxHeightForTextAreaArg) => number
// const getMaxHeightForTextArea: GetMaxHeightForTextAreaFn = (arg) => {
// 	const {
// 		areaAndLabelHeight,
// 		areaAndLabelWrapperPaddingBottom,
// 		areaBorders,
// 		lineHeight,
// 		paddingTextareaTopAndBottom,
// 		gapBetweenLabelAndTextarea,
// 	} = arg
// 	return areaAndLabelHeight - (lineHeight * 2 + gapBetweenLabelAndTextarea + areaAndLabelWrapperPaddingBottom + paddingTextareaTopAndBottom + areaBorders)
// }