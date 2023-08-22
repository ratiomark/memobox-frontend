import { useState, useEffect } from 'react'
import { useWindowSize } from './useWindowHeight'

interface ModalVariables {
	paddingTextareaTopAndBottom: number
	paddingTextareaLeftAndRight: number
	emptySpaceTopHeight: number
	emptySpaceBottomHeight: number
	gapBetweenLabelAndTextarea: number
	areaAndLabelWrapperPaddingBottom: number
	mainContentVerticalGap: number
	maxPercentOfScreenForMainContent: number
	areaBorders: number
	lineHeight: number
}
export const useModalVariables = () => {
	const [variables, setVariables] = useState<ModalVariables>({
		paddingTextareaTopAndBottom: 0,
		paddingTextareaLeftAndRight: 0,
		emptySpaceTopHeight: 0,
		emptySpaceBottomHeight: 0,
		gapBetweenLabelAndTextarea: 0,
		areaAndLabelWrapperPaddingBottom: 0,
		mainContentVerticalGap: 0,
		maxPercentOfScreenForMainContent: 0,
		areaBorders: 0,
		lineHeight: 0,
	})

	const { windowHeight } = useWindowSize()

	useEffect(() => {
		const root = document.querySelector('#root') as HTMLElement
		const rootStyles = getComputedStyle(root)
		const paddingTextareaTopAndBottom = parseInt(rootStyles.getPropertyValue('--padding-textarea-top-and-bottom'))
		const paddingTextareaLeftAndRight = parseInt(rootStyles.getPropertyValue('--padding-textarea-left-and-right'))
		const emptySpaceTopHeight = parseInt(rootStyles.getPropertyValue('--empty-space-top-height'))
		const emptySpaceBottomHeight = parseInt(rootStyles.getPropertyValue('--empty-space-bottom-height'))
		const gapBetweenLabelAndTextarea = parseInt(rootStyles.getPropertyValue('--gap-between-label-and-textarea'))
		const areaAndLabelWrapperPaddingBottom = parseInt(rootStyles.getPropertyValue('--area-and-label-wrapper-padding-bottom'))
		const mainContentVerticalGap = parseInt(rootStyles.getPropertyValue('--main-content-vertical-gap'))
		const maxPercentOfScreenForMainContent = Number(rootStyles.getPropertyValue('--max-percent-of-screen-for-main-content'))
		setVariables({
			paddingTextareaTopAndBottom,
			paddingTextareaLeftAndRight,
			emptySpaceTopHeight,
			emptySpaceBottomHeight,
			gapBetweenLabelAndTextarea,
			areaAndLabelWrapperPaddingBottom,
			mainContentVerticalGap,
			maxPercentOfScreenForMainContent,
			areaBorders: 1.6,
			lineHeight: 24,
		})
	}, [windowHeight])

	return variables
}