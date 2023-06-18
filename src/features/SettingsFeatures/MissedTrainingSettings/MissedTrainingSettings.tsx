import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './MissedTrainingSettings.module.scss';
import { HDialog } from '@/shared/ui/HDialog';
import { useSelector } from 'react-redux';
import { getUserMissedTrainingSettings } from '@/entities/User';
import { MyRadioGroup } from '@/shared/ui/MyRadioGroup';
import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';

interface MissedTrainingSettingsProps {
	className?: string
	isOpen: boolean
	onClose: () => void
}

export const MissedTrainingSettings = (props: MissedTrainingSettingsProps) => {
	const {
		className,
		isOpen,
		onClose,
	} = props
	// const missedTrainingSetting = useSelector(getUserMissedTrainingSettings)
	const items = ['none', 'additional', 'backwards']
	const [value, setValue] = useState(items[0])
	const { t } = useTranslation()

	return (

		<HDialog
			isOpen={isOpen}
			onClose={onClose}
			lazy
		>
			<div className={clsx(
				cls.MissedTrainingSettings,
				className)}
			>
				<MyRadioGroup
					items={items}
					onChange={setValue}
					value={value}
					className={cls.radioGroup} 
				/>
				<HStack justify='between' max>

					<Button onClick={onClose}>{t('cancel')}</Button>
					<Button variant='filled'>{t('save')}</Button>
				</HStack>
			</div>
		</HDialog>
	)
}