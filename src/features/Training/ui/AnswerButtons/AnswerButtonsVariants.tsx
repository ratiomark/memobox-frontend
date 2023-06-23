import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { MouseEvent } from 'react';

import cls from './AnswerButtons.module.scss';
import { useHotkeys } from 'react-hotkeys-hook';
import { AnswerType } from '../TrainingContent/TrainingContent';

interface AnswerButtonsProps {
	showAnswer: boolean
	onAnswerClick: (e: MouseEvent<HTMLButtonElement>) => void
	onAnswerHotKeyHandle: (answerValue: AnswerType) => void
}

export const AnswerButtonsVariants = (props: AnswerButtonsProps) => {
	const {
		showAnswer,
		onAnswerHotKeyHandle,
		onAnswerClick,
	} = props

	useHotkeys('z', () => onAnswerHotKeyHandle('bad'), { keyup: true, enabled: showAnswer })
	useHotkeys('x', () => onAnswerHotKeyHandle('middle'), { keyup: true, enabled: showAnswer })
	useHotkeys('c', () => onAnswerHotKeyHandle('good'), { keyup: true, enabled: showAnswer })

	const { t } = useTranslation('training')

	return (
		<>
			<Button
				data-answer-type="bad"
				onClick={onAnswerClick}
				variant='filled'
				color='attention'
			>
				{t('bad')}
			</Button>
			<Button
				data-answer-type="middle"
				onClick={onAnswerClick}
				variant='filled'
				color='wait'
			>
				{t('middle')}
			</Button>
			<Button
				data-answer-type="good"
				onClick={onAnswerClick}
				variant='filled'
			>
				{t('good')}
			</Button>
		</>
	)

}