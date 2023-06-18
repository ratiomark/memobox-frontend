import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './TimeSleepSettings.module.scss';
import { HDialog } from '@/shared/ui/HDialog';

interface TimeSleepSettingsProps {
	className?: string
	isOpen: boolean
	onClose: () => void
}

export const TimeSleepSettings = (props: TimeSleepSettingsProps) => {
	const {
		className,
		isOpen,
		onClose
	} = props

	const { t } = useTranslation()

	return (
		<HDialog
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className={clsx(
				cls.TimeSleepSettings,
				className)}
			>

			</div>
		</HDialog>
	)
}