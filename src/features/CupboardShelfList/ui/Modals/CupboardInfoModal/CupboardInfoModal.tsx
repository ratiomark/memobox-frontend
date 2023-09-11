import { useTranslation } from 'react-i18next';
import cls from './CupboardInfoModal.module.scss';
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

interface CupboardInfoModalProps {
	className?: string
}
const faqDataList = [
	{ questionKey: 'FAQ question', answerKey: 'FAQ answer' },
	{ questionKey: 'FAQ question', answerKey: 'FAQ answer' },
	{ questionKey: 'FAQ question', answerKey: 'FAQ answer' },
	{ questionKey: 'FAQ question', answerKey: 'FAQ answer' },
]
export const CupboardInfoModal = (props: CupboardInfoModalProps) => {
	const {
		className
	} = props
	const { t } = useTranslation('info')
	const { t: t2 } = useTranslation()
	const dispatch = useAppDispatch()
	const isOpen = useSelector(getIsCupboardInfoOpen)
	const [mainContentMaxHeight, setMainContentMaxHeight] = useState('600px')
	const { windowHeight } = useWindowSize()

	useEffect(() => {
		const maxHeight = windowHeight * 0.6
		setMainContentMaxHeight(`${maxHeight > 600 ? 600 : maxHeight}px`)
	}, [windowHeight])

	const questionListRendered = useMemo(() => {
		const list = faqDataList.map((faqDataItem, index) => {
			const question = <MyText saveOriginal text={t(`faq.${faqDataItem.questionKey}`) + ` ${index}`} />
			const answer = <MyText saveOriginal text={t(`faq.${faqDataItem.answerKey}`)} />
			return (
				<FAQItem
					key={index}
					question={question}
					answer={answer}
				/>
			)
		})
		return list
	}, [t])

	const onCloseModal = () => {
		dispatch(cupboardShelfListActions.setIsCupboardInfoModalOpen(false))
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
				<div className={cls.emptySpace_top} />
				<div className={cls.mainContentWrapper}>
					<div
						className={cls.mainContent}
						style={{ height: mainContentMaxHeight }}
					>
						{questionListRendered}
						<FAQItem
							question={'question'}
							answer={'answer'}
						/>
					</div>
				</div>
				<div className={cls.emptySpace_bottom} />
				<div className={cls.closeButtonWrapper} >
					<Button onClick={onCloseModal}>{t2('Close button')}</Button>

				</div>
			</div>

		</HDialogHeadless>
	)
}