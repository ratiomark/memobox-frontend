import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ActionsButtons.module.scss';
import { Button } from '@/shared/ui/Button';
import { useHotkeys } from 'react-hotkeys-hook';

interface ActionsButtonsProps {
	className?: string
	onPreviousCardClick: () => void
	onNextCardClick: () => void
	onCloseTraining: () => void
}

export const ActionsButtons = (props: ActionsButtonsProps) => {
	const {
		className,
		onPreviousCardClick,
		onNextCardClick,
		onCloseTraining,
	} = props
	useHotkeys('esc', onCloseTraining)
	useHotkeys('b', onPreviousCardClick)
	useHotkeys('m', onNextCardClick)
	const { t } = useTranslation('training')

	return (
		<div className={clsx(
			cls.ActionsButtons,
			className)}
		>
			<div className={clsx(cls.buttons, 'container')} >
				<Button
					color='trainingAction'
					onClick={onCloseTraining}
				>
					{t('end training')}
				</Button>
				<Button
					variant='filled'
					color='trainingAction'
					onClick={onPreviousCardClick}
				>
					{t('previous card')}
				</Button>
				<Button
					variant='filled'
					color='trainingAction'
					onClick={onNextCardClick}
				>
					{t('next card')}

				</Button>
				<Button
					color='trainingAction'
				>
					{t('edit card')}
				</Button>
			</div>
		</div>
	)
}