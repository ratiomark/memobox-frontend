// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { useCustomTranslate, } from '@/features/LanguageSwitcher'
import { dataAttrButtonTypeAddCard, dataAttrButtonTypeAddCardButtonGeneral, dataAttrButtonTypeTrain } from '@/shared/const/idsAndDataAttributes';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getCreateNewShelfCounter } from '../selectors/getCreateNewShelfModal';
import { getIsCupboardLoading, getIsCupboardRefetching } from '../selectors/getCupboardShelfList';

const useCupboardButtonsSizes = () => {
	const { currentLang } = useCustomTranslate()
	const isLoading = useSelector(getIsCupboardRefetching)
	const createNewShelfCounter = useSelector(getCreateNewShelfCounter)

	useEffect(() => {
		const resetButtonSizes = () => {
			const trainButtons = document.querySelectorAll(`[data-button-type="${dataAttrButtonTypeTrain}"]`) as NodeListOf<HTMLButtonElement>
			const addCardButtons = document.querySelectorAll(`[data-button-type="${dataAttrButtonTypeAddCard}"]`) as NodeListOf<HTMLButtonElement>
			const addCardButtonGeneral = document.querySelector(`[data-button-type="${dataAttrButtonTypeAddCardButtonGeneral}"]`) as HTMLButtonElement
			trainButtons.forEach(button => button.style.minWidth = 'auto');
			addCardButtons.forEach(button => button.style.minWidth = 'auto');
			addCardButtonGeneral.style.minWidth = 'auto';
		};
		const updateSizes = () => {
			if (isLoading) return
			resetButtonSizes(); // reset button sizes before update 
			const trainButtons = document.querySelectorAll(`[data-button-type="${dataAttrButtonTypeTrain}"]`) as NodeListOf<HTMLButtonElement>
			const addCardButtons = document.querySelectorAll(`[data-button-type="${dataAttrButtonTypeAddCard}"]`) as NodeListOf<HTMLButtonElement>
			const addCardButtonGeneral = document.querySelector(`[data-button-type="${dataAttrButtonTypeAddCardButtonGeneral}"]`) as HTMLButtonElement
			const buttonsWidthList: number[] = []
			const addCardsButtonsWidthList: number[] = []
			buttonsWidthList.push(addCardButtonGeneral.clientWidth)
			trainButtons.forEach(button => buttonsWidthList.push(button.clientWidth))
			addCardButtons.forEach(button => addCardsButtonsWidthList.push(button.clientWidth))
			const maxButtonWidth = Math.ceil(Math.max(...buttonsWidthList))
			const addCardMaxButtonWidth = Math.ceil(Math.max(...addCardsButtonsWidthList))
			trainButtons.forEach(button => button.style.minWidth = `${maxButtonWidth + 2}px`)
			addCardButtons.forEach(button => button.style.minWidth = `${addCardMaxButtonWidth + 2}px`)
			addCardButtonGeneral.style.minWidth = `${maxButtonWidth + 2}px`
		}
		if (document.readyState === 'complete') {
			updateSizes();
		} else {
			window.addEventListener('load', updateSizes);
			return () => window.removeEventListener('load', updateSizes);
		}
	}, [isLoading, currentLang, createNewShelfCounter])
}
export default useCupboardButtonsSizes