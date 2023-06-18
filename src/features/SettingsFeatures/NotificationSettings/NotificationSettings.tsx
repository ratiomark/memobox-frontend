import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { HDialog } from '@/shared/ui/HDialog';
import cls from './NotificationSettings.module.scss';
import { useSelector } from 'react-redux';
import { getUserNotificationSettings } from '@/entities/User';

interface NotificationSettingsProps {
	className?: string
	isOpen: boolean
	onClose: () => void
}

export const NotificationSettings = (props: NotificationSettingsProps) => {
	const {
		className,
		isOpen,
		onClose

	} = props
	// const notificationsSettings = useSelector(getUserNotificationSettings)
	const { t } = useTranslation()

	return (
		<HDialog
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className={clsx(
				cls.NotificationSettings,
				className)}
			>

			</div>
		</HDialog>

	)
}