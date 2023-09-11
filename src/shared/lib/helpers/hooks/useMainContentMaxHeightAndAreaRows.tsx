import { useState, useEffect } from 'react'
import { useModalVariables } from './useModalVariables'
import { useWindowSize } from './useWindowHeight'

interface useMainContentMaxHeightAndAreaRowsProps {
	isOpen: boolean
	shelvesAndBoxesRef: HTMLDivElement | null
	modalButtonsRef: HTMLDivElement | null
}

export const useMainContentMaxHeightAndAreaRows = (props: useMainContentMaxHeightAndAreaRowsProps) => {
	const {
		isOpen,
		shelvesAndBoxesRef,
		modalButtonsRef,
	} = props
	const [mainContentMaxHeight, setMainContentMaxHeight] = useState('500px')
	const [textAreaRows, setTextAreaRows] = useState(2)
	const variables = useModalVariables()

	const { windowHeight } = useWindowSize()
	useEffect(() => {

		if (isOpen && shelvesAndBoxesRef && modalButtonsRef) {
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

			const shelvesAndBoxesHeight = shelvesAndBoxesRef.scrollHeight
			// console.log('shelvesAndBoxesHeight:  ', shelvesAndBoxesHeight)
			const buttonsHeight = modalButtonsRef.scrollHeight
			// console.log('buttonsHeight:  ', buttonsHeight)
			console.log('maxPercentOfScreenForMainContent   ', maxPercentOfScreenForMainContent)
			const mainContentMaxHeightCalculated = getMainContentMaxHeight({
				windowHeight,
				maxPercentOfScreenForMainContent,
				emptySpaceBottomHeight,
				emptySpaceTopHeight,
				buttonsHeight,
			})
			const areasAndLabelsHeight = getAreaAndLabelsHeight({
				mainContentMaxHeight: mainContentMaxHeightCalculated,
				shelvesAndBoxesHeight,
				mainContentVerticalGap,
			})
			console.log('areasAndLabelsHeight  ', areasAndLabelsHeight)
			const areaAndLabelHeight = areasAndLabelsHeight / 2
			const maxHeightForTextArea = getMaxHeightForTextArea({
				areaAndLabelHeight,
				areaAndLabelWrapperPaddingBottom,
				areaBorders,
				lineHeight,
				paddingTextareaTopAndBottom,
				gapBetweenLabelAndTextarea
			})
			const rows = Math.ceil(maxHeightForTextArea / lineHeight)
			// const rows = Math.floor(maxHeightForTextArea / lineHeight)
			setTextAreaRows(rows)
			setMainContentMaxHeight(`${mainContentMaxHeightCalculated}px`)
		}
	}, [windowHeight, isOpen, modalButtonsRef, shelvesAndBoxesRef, variables])

	return { textAreaRows, mainContentMaxHeight }

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
	return mainContentMaxHeight - shelvesAndBoxesHeight - mainContentVerticalGap * 3
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