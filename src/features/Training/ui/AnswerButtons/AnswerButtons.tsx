import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { MouseEvent } from 'react';

import cls from './AnswerButtons.module.scss';
import { useHotkeys } from 'react-hotkeys-hook';
import { AnswerType } from '../TrainingContent/TrainingContent';
import { AnswerButtonsVariants } from './AnswerButtonsVariants';

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

	useHotkeys('space', onShowAnswerClick, { keyup: true, enabled: !showAnswer })

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
			onClick={onShowAnswerClick}
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