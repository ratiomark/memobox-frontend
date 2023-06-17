import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelfTemplateSettings.module.scss';
import { HDialog } from '@/shared/ui/HDialog';

interface ShelfTemplateSettingsProps {
	className?: string
	isOpen: boolean
	onClose: () => void
}

export const ShelfTemplateSettings = (props: ShelfTemplateSettingsProps) => {
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
				cls.ShelfTemplateSettings,
				className)}
			>

			</div>
		</HDialog>

	)
}