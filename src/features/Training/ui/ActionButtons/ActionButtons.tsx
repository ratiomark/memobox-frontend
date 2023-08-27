import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ActionButtons.module.scss';
import { Button } from '@/shared/ui/Button';
import { useHotkeys } from 'react-hotkeys-hook';
import { useLayoutEffect } from 'react';

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

	useHotkeys('esc', onCloseTraining)
	useHotkeys('b', onPreviousCardClick)
	useHotkeys('m', onNextCardClick)
	const { t } = useTranslation('training')

	return (
		<div className={clsx(
			cls.ActionButtons,
			className)}
		>
			<div className={clsx(cls.buttons, 'container')} >
				<Button
					color='trainingAction'
					onClick={onCloseTraining}
					data-button-type="training-bottom-actions"
				>
					{t('end training')}
				</Button>
				<Button
					variant='filled'
					color='trainingAction'
					onClick={onPreviousCardClick}
					data-button-type="training-bottom-actions"
				>
					{t('previous card')}
				</Button>
				<Button
					variant='filled'
					color='trainingAction'
					onClick={onNextCardClick}
					data-button-type="training-bottom-actions"
				>
					{t('next card')}

				</Button>
				<Button
					color='trainingAction'
					data-button-type="training-bottom-actions"
				>
					{t('edit card')}
				</Button>
			</div>
		</div>
	)
}