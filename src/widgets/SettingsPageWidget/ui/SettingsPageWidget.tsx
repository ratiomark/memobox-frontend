import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './SettingsPageWidget.module.scss';
import { ShelfTemplateSettings } from '@/features/SettingsFeatures';
import { VStack } from '@/shared/ui/Stack';
import { Heading } from '@/shared/ui/Typography';
import { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { getUserSettings } from '@/entities/User';
import { useSelector } from 'react-redux';

interface SettingsPageWidgetProps {
	className?: string
}

export const SettingsPageWidget = (props: SettingsPageWidgetProps) => {
	// const { t, i18n } = useTranslation()
	const userSettings = useSelector(getUserSettings)
	const [isShelfTemplateOpen, setIsShelfTemplateOpen] = useState(false)
	const openShelfTemplate = () => setIsShelfTemplateOpen(true)
	const closeShelfTemplate = () => setIsShelfTemplateOpen(false)

	return (
		<VStack>
			<Card
				horizontal
				padding='8'
				onClick={openShelfTemplate}>
				<Heading as='h2' title='коробки' />
			</Card>
			<ShelfTemplateSettings
				isOpen={isShelfTemplateOpen}
				onClose={closeShelfTemplate}
			/>
		</VStack>
	)
	// const {
	// 	className
	// } = props

	// const { t } = useTranslation()

	// return (
	// 	<div className={clsx(
	// 		cls.settingsPageWidget,
	// 		className)}
	// 	>

	// 	</div>
	// )
}