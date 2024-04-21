import { useTranslation } from 'react-i18next';
import cls from './AppearanceModal.module.scss';
import { getIsCupboardInfoOpen } from '../../../model/selectors/getCupboardShelfList';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { cupboardShelfListActions } from '../../../model/slice/cupboardShelfListSlice';
import { FAQItem } from '@/shared/ui/FAQItem';
import { MyText } from '@/shared/ui/Typography';
import { useEffect, useMemo, useState } from 'react';
import { useWindowSize } from '@/shared/lib/helpers/hooks/useWindowHeight';
import { Button } from '@/shared/ui/Button';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { getUserSavedDataCupboard, getUserSavedDataIsDelimiterEnabled, userActions, getUserSavedDataIsStartTrainingHotKeyVisible } from '@/entities/User';
import { UiComponentEnabler } from '@/shared/ui/UiVariableCustomizer';

interface CupboardInfoModalProps {
	className?: string
}
const faqDataList = [
	{ questionKey: 'FAQ question', answerKey: 'FAQ answer' },
	{ questionKey: 'FAQ question', answerKey: 'FAQ answer' },
	{ questionKey: 'FAQ question', answerKey: 'FAQ answer' },
	{ questionKey: 'FAQ question', answerKey: 'FAQ answer' },
]


const DelimiterController = () => {
	const dispatch = useAppDispatch()
	const cupboard = useSelector(getUserSavedDataCupboard)
	const isDelimiterEnabled = useSelector(getUserSavedDataIsDelimiterEnabled)
	const onToggle = () => {
		dispatch(userActions.updateJsonSavedData({ cupboard: { ...cupboard, isDelimiterEnabled: !isDelimiterEnabled } }))
	}
	return <UiComponentEnabler entityName='delimiter' isEnabled={isDelimiterEnabled} onToggleClick={onToggle} />
}
const TrainingHotKeyVisibilitySwitcher = () => {
	const dispatch = useAppDispatch()
	const cupboard = useSelector(getUserSavedDataCupboard)
	const isStartTrainingHotKeyVisible = useSelector(getUserSavedDataIsStartTrainingHotKeyVisible)
	const onToggle = () => {
		dispatch(userActions.updateJsonSavedData({ cupboard: { ...cupboard, isStartTrainingHotKeyVisible: !isStartTrainingHotKeyVisible } }))
		dispatch(cupboardShelfListActions.addShelvesCount())
		// state.createNewShelfModal.shelvesCreated++
	}
	return <UiComponentEnabler entityName='Training hot key visibility' isEnabled={isStartTrainingHotKeyVisible} onToggleClick={onToggle} />
}

export const AppearanceModal = (props: CupboardInfoModalProps) => {
	const {
		className
	} = props
	const { t } = useTranslation('info')
	const { t: t2 } = useTranslation()
	const dispatch = useAppDispatch()
	const isOpen = useSelector(getIsCupboardInfoOpen)
	const [mainContentMaxHeight, setMainContentMaxHeight] = useState('600px')
	const { windowHeight } = useWindowSize()


	// useEffect(() => {
	// 	const maxHeight = windowHeight * 0.6
	// 	setMainContentMaxHeight(`${maxHeight > 600 ? 600 : maxHeight}px`)
	// }, [windowHeight])

	// const questionListRendered = useMemo(() => {
	// 	const list = faqDataList.map((faqDataItem, index) => {
	// 		const question = <MyText saveOriginal text={t(`faq.${faqDataItem.questionKey}`) + ` ${index}`} />
	// 		const answer = <MyText saveOriginal text={t(`faq.${faqDataItem.answerKey}`)} />
	// 		return (
	// 			<FAQItem
	// 				key={index}
	// 				question={question}
	// 				answer={answer}
	// 			/>
	// 		)
	// 	})
	// 	return list
	// }, [t])

	const onCloseModal = () => {
		dispatch(cupboardShelfListActions.setIsCupboardAppearanceModalOpen(false))
	}

	return (
		<HDialogHeadless
			// isOpen={true}
			isOpen={isOpen}
			onClose={onCloseModal}
			className={cls.cardModalPanel}
			panelWithMainPadding={false}
		// panelWithBackground={false}
		>
			<div
				className={cls.cardModal}
			>
				<div className={cls.emptySpace_top} >
					<DelimiterController />
					<TrainingHotKeyVisibilitySwitcher />
				</div>
			</div>

		</HDialogHeadless>
	)
}