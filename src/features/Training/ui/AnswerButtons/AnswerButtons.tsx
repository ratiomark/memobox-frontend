import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { MouseEvent } from 'react';

import cls from './AnswerButtons.module.scss';
import { useHotkeys } from 'react-hotkeys-hook';
import { AnswerType } from '../TrainingContent/TrainingContent';
import { AnswerButtonsVariants } from './AnswerButtonsVariants';
import { TEST_BUTTONS_IDS } from '@/shared/const/testConsts';
import { ActionMethod } from '@/entities/Shelf';
import { analyticsTrackEvent } from '@/shared/lib/analytics';

interface AnswerButtonsProps {
	className?: string
	showAnswer: boolean
	onAnswerClick: (e: MouseEvent<HTMLButtonElement>) => void
	onAnswerHotKeyHandle: (answerValue: AnswerType) => void
	onShowAnswerClick: () => void
}

export const AnswerButtons = (props: AnswerButtonsProps) => {
	const {
		className,
		showAnswer,
		onShowAnswerClick,
		onAnswerHotKeyHandle,
		onAnswerClick,
	} = props


	const onShowAnswerClickHandle = (method: ActionMethod) => {
		analyticsTrackEvent('training_answer_showed', {
			method,
		});
		onShowAnswerClick()
	}
	useHotkeys('space', () => onShowAnswerClickHandle('hotkey'), { keyup: true, enabled: !showAnswer })

	const { t } = useTranslation('training')

	if (showAnswer) return (
		<AnswerButtonsVariants
			onAnswerClick={onAnswerClick}
			onAnswerHotKeyHandle={onAnswerHotKeyHandle}
			showAnswer={showAnswer}
		/>
	)

	return (
		<Button
			variant='filled'
			onClick={() => onShowAnswerClickHandle('click')}
			data-testid={TEST_BUTTONS_IDS.training.shownAnswerButton}
		>
			{t('show answer')}
		</Button>
	)
}


// {
// 	return (
// 		<>
// 			<Button
// 				data-answer-type="bad"
// 				onClick={onAnswerClick}
// 				variant='filled'
// 				color='attention'
// 			>
// 				{t('bad')}
// 			</Button>
// 			<Button
// 				data-answer-type="middle"
// 				onClick={onAnswerClick}
// 				variant='filled'
// 				color='wait'
// 			>
// 				{t('middle')}
// 			</Button>
// 			<Button
// 				data-answer-type="good"
// 				onClick={onAnswerClick}
// 				variant='filled'
// 			>
// 				{t('good')}
// 			</Button>
// 		</>
// 	)
// }