import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ActionButtons.module.scss';
import { Button } from '@/shared/ui/Button';
import { useHotkeys } from 'react-hotkeys-hook';
import { useLayoutEffect } from 'react';
import { TEST_BUTTONS_IDS } from '@/shared/const/testConsts';
import { ActionMethod } from '@/entities/Shelf';
import { analyticsTrackEvent } from '@/shared/lib/analytics';

interface ActionButtonsProps {
	className?: string
	onPreviousCardClick: () => void
	onNextCardClick: () => void
	onCloseTraining: () => void
}

export const ActionButtons = (props: ActionButtonsProps) => {
	const {
		className,
		onPreviousCardClick,
		onNextCardClick,
		onCloseTraining,
	} = props

	useLayoutEffect(() => {
		const buttons = document.querySelectorAll('[data-button-type="training-bottom-actions"]') as NodeListOf<HTMLButtonElement>
		const buttonsWidthList: number[] = [150]
		buttons.forEach(button => buttonsWidthList.push(button.clientWidth))
		const maxButtonWidth = Math.ceil(Math.max(...buttonsWidthList))
		buttons.forEach(button => button.style.minWidth = `${maxButtonWidth + 10}px`)
	}, [])

	const onCloseTrainingHandle = (method: ActionMethod) => {
		analyticsTrackEvent('training_closed', {
			method,
		});
		onCloseTraining()
	}
	const onPreviousCardClickHandle = (method: ActionMethod) => {
		analyticsTrackEvent('training_previous_card_navigated', {
			method,
		});
		onPreviousCardClick()
	}
	const onNextCardClickHandle = (method: ActionMethod) => {
		analyticsTrackEvent('training_next_card_navigated', {
			method,
		});
		onNextCardClick()
	}

	useHotkeys('esc', () => onCloseTrainingHandle('hotkey'))
	useHotkeys('b', () => onPreviousCardClickHandle('hotkey'))
	useHotkeys('m', () => onNextCardClickHandle('hotkey'))
	const { t } = useTranslation('training')

	return (
		<div className={clsx(
			cls.ActionButtons,
			className)}
		>
			<div className={clsx(cls.buttons, 'container')} >
				<Button
					color='trainingAction'
					onClick={() => onCloseTrainingHandle('click')}
					data-button-type="training-bottom-actions"
					data-testid={TEST_BUTTONS_IDS.training.endTrainingButton}
				>
					{t('end training')}
				</Button>
				<Button
					variant='filled'
					color='trainingAction'
					onClick={() => onPreviousCardClickHandle('click')}
					data-button-type="training-bottom-actions"
					data-testid={TEST_BUTTONS_IDS.training.previousCardButton}
				>
					{t('previous card')}
				</Button>
				<Button
					variant='filled'
					color='trainingAction'
					onClick={() => onNextCardClickHandle('click')}
					data-button-type="training-bottom-actions"
					data-testid={TEST_BUTTONS_IDS.training.skipCardButton}
				>
					{t('next card')}

				</Button>
				<Button
					color='trainingAction'
					data-button-type="training-bottom-actions"
					data-testid={TEST_BUTTONS_IDS.training.editCardButton}
				>
					{t('edit card')}
				</Button>
			</div>
		</div>
	)
}