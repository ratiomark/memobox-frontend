import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { MouseEvent, useLayoutEffect } from 'react';

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
	
	useLayoutEffect(() => {
		const buttons = document.querySelectorAll('[data-button-type="training-answer-button"]') as NodeListOf<HTMLButtonElement>
		const buttonsWidthList: number[] = [150]
		buttons.forEach(button => buttonsWidthList.push(button.clientWidth))
		const maxButtonWidth = Math.ceil(Math.max(...buttonsWidthList))
		buttons.forEach(button => button.style.minWidth = `${maxButtonWidth + 10}px`)
	}, [])

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
				data-button-type="training-answer-button"
			>
				{t('bad')}
			</Button>
			<Button
				data-answer-type="middle"
				onClick={onAnswerClick}
				variant='filled'
				color='wait'
				data-button-type="training-answer-button"
			>
				{t('middle')}
			</Button>
			<Button
				data-answer-type="good"
				onClick={onAnswerClick}
				variant='filled'
				data-button-type="training-answer-button"
			>
				{t('good')}
			</Button>
		</>
	)

}