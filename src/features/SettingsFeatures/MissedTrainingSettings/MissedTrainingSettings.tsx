import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './MissedTrainingSettings.module.scss';
import { HDialog } from '@/shared/ui/HDialog';
import { useSelector } from 'react-redux';
import { getUserMissedTrainingSettings } from '@/entities/User';
import { MyRadioGroup } from '@/shared/ui/MyRadioGroup';
import { useMemo, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';

interface MissedTrainingSettingsProps {
	className?: string
	isOpen: boolean
	onClose: () => void,
	missedTrainingSetting: string
	onSubmit?: () => void
}



export const MissedTrainingSettings = (props: MissedTrainingSettingsProps) => {
	const {
		className,
		isOpen,
		onClose,
		missedTrainingSetting,
	} = props

	const { t } = useTranslation()

	const items = useMemo(() => ([
		{ value: 'none', content: t('missedTrainingSettings.none') },
		{ value: 'additional', content: t('missedTrainingSettings.additional') },
		{ value: 'backwards', content: t('missedTrainingSettings.backwards') }
	]), [t])

	const [value, setValue] = useState(
		items.find(item => item.value === missedTrainingSetting) ?? items[0]
	)

	const onCloseHandle = () => {
		setValue(items.find(item => item.value === missedTrainingSetting) ?? items[0])
		onClose()
	}

	return (
		<HDialog
			isOpen={isOpen}
			onClose={onCloseHandle}
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
					<Button onClick={onCloseHandle}>{t('cancel')}</Button>
					<Button variant='filled'>{t('save')}</Button>
				</HStack>
			</div>
		</HDialog>
	)
}