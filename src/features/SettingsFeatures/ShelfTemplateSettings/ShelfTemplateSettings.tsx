import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelfTemplateSettings.module.scss';
import { HDialog } from '@/shared/ui/HDialog';
import { getUserShelfTemplateSettings } from '@/entities/User';
import { useSelector } from 'react-redux';
import { BoxesSettingsContent } from './BoxesSettingsModal/BoxesSettingsContent/BoxesSettingsContent';

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
	const shelfTemplateSettings = useSelector(getUserShelfTemplateSettings)

	const { t } = useTranslation()
	
	if (!shelfTemplateSettings) return <p>Загрузка</p>

	return (
		<HDialog
			isOpen={isOpen}
			onClose={onClose}
			lazy
		>
			<div className={clsx(
				cls.ShelfTemplateSettings,
				className)}
			>
				<BoxesSettingsContent
					shelfTemplate={shelfTemplateSettings}
				/>
			</div>
		</HDialog>

	)
}