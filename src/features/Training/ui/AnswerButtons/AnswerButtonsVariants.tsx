import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { MouseEvent, useLayoutEffect } from 'react';

import cls from './AnswerButtons.module.scss';
import { useHotkeys } from 'react-hotkeys-hook';
import { AnswerType } from '../TrainingContent/TrainingContent';
import { DataAnswerType } from '@/shared/const/trainingConsts';
import { TEST_BUTTONS_IDS } from '@/shared/const/testConsts';

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

	useHotkeys('z', () => onAnswerHotKeyHandle(DataAnswerType.bad), { keyup: true, enabled: showAnswer })
	useHotkeys('x', () => onAnswerHotKeyHandle(DataAnswerType.middle), { keyup: true, enabled: showAnswer })
	useHotkeys('c', () => onAnswerHotKeyHandle(DataAnswerType.good), { keyup: true, enabled: showAnswer })

	const { t } = useTranslation('training')

	return (
		<>
			<Button
				onClick={onAnswerClick}
				variant='filled'
				color='attention'
				data-answer-type={DataAnswerType.bad}
				data-button-type="training-answer-button"
				data-testid={TEST_BUTTONS_IDS.training.badAnswerButton}
			>
				{t('bad')}
			</Button>
			<Button
				onClick={onAnswerClick}
				variant='filled'
				color='wait'
				data-answer-type={DataAnswerType.middle}
				data-button-type="training-answer-button"
				data-testid={TEST_BUTTONS_IDS.training.middleAnswerButton}
			>
				{t('middle')}
			</Button>
			<Button
				onClick={onAnswerClick}
				variant='filled'
				data-answer-type={DataAnswerType.good}
				data-button-type="training-answer-button"
				data-testid={TEST_BUTTONS_IDS.training.goodAnswerButton}
			>
				{t('good')}
			</Button>
		</>
	)

}