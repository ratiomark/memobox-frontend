import { useTranslation } from 'react-i18next';
import cls from './AppearanceModal.module.scss';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { MyText } from '@/shared/ui/Typography';
import { useEffect, useMemo, useState } from 'react';
import { useWindowSize } from '@/shared/lib/helpers/hooks/useWindowHeight';
import { Button } from '@/shared/ui/Button';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { getUserSavedDataCupboard, getUserSavedDataIsDelimiterEnabled, userActions, getUserSavedDataIsStartTrainingHotKeyVisible, updateJsonSavedDataThunk } from '@/entities/User';
import { UiComponentEnabler } from '@/shared/ui/UiVariableCustomizer';
import { cupboardShelfListActions, getIsCupboardAppearanceModalOpen } from '@/features/CupboardShelfList';


const DelimiterController = () => {
	const dispatch = useAppDispatch()
	const cupboard = useSelector(getUserSavedDataCupboard)
	const isDelimiterEnabled = useSelector(getUserSavedDataIsDelimiterEnabled)
	const onToggle = () => {
		dispatch(userActions.updateJsonSavedData({ cupboard: { ...cupboard, isDelimiterEnabled: !isDelimiterEnabled } }))
		dispatch(updateJsonSavedDataThunk())
	}
	return <UiComponentEnabler entityName='Разделитель "Мои полки"' isEnabled={isDelimiterEnabled} onToggleClick={onToggle} />
}


const TrainingHotKeyVisibilitySwitcher = () => {
	const dispatch = useAppDispatch()
	const cupboard = useSelector(getUserSavedDataCupboard)
	const isStartTrainingHotKeyVisible = useSelector(getUserSavedDataIsStartTrainingHotKeyVisible)
	const onToggle = () => {
		dispatch(userActions.updateJsonSavedData({ cupboard: { ...cupboard, isStartTrainingHotKeyVisible: !isStartTrainingHotKeyVisible } }))
		dispatch(cupboardShelfListActions.addShelvesCount())
		dispatch(updateJsonSavedDataThunk())
		// state.createNewShelfModal.shelvesCreated++
	}
	return <UiComponentEnabler entityName='Текст горячих клавиш (t+n)' isEnabled={isStartTrainingHotKeyVisible} onToggleClick={onToggle} />
}

export const AppearanceModal = () => {

	const { t } = useTranslation()
	// const { t: t2 } = useTranslation()
	const dispatch = useAppDispatch()
	// const isOpen = true
	const isOpen = useSelector(getIsCupboardAppearanceModalOpen)
	// const [mainContentMaxHeight, setMainContentMaxHeight] = useState('600px')
	// const { windowHeight } = useWindowSize()


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
				className={cls.mainContent}
			>
				<MyText align='center' saveOriginal text={t('Настройки внешнего вида шкафа')} />
				<DelimiterController />
				<TrainingHotKeyVisibilitySwitcher />
			</div>

		</HDialogHeadless>
	)
}