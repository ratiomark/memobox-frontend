import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './MissedTrainingSettings.module.scss';
import { useSelector } from 'react-redux';
import {
	MissedTrainingValue,
	getUserMissedTrainingSettings,
	getUserSettingsIsLoading,
	useUpdateMissedTrainingMutation,
	userActions
} from '@/entities/User';
import { MyRadioGroup } from '@/shared/ui/MyRadioGroup';
import { useEffect, useMemo, useState } from 'react';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { Heading } from '@/shared/ui/Typography';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { MissedTrainingItem } from '@/shared/types/MissedTrainingItemType';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';

interface MissedTrainingSettingsProps {
	className?: string
	isOpen: boolean
	onClose: () => void,
	onSubmit?: () => void
}



export const MissedTrainingSettings = (props: MissedTrainingSettingsProps) => {
	const {
		className,
		isOpen,
		onClose,
	} = props

	const missedTrainingSetting = useSelector(getUserMissedTrainingSettings)
	const [updateMissedTraining, { isLoading: isLoadingMutation, data }] = useUpdateMissedTrainingMutation()
	const isLoading = useSelector(getUserSettingsIsLoading)
	const dispatch = useAppDispatch()
	const { t } = useTranslation()

	const items = useMemo<MissedTrainingItem[]>(() => ([
		{ value: 'none', content: t('missedTrainingSettings.none') },
		{ value: 'additional', content: t('missedTrainingSettings.additional') },
		{ value: 'backwards', content: t('missedTrainingSettings.backwards') }
	]), [t])

	useEffect(() => {
		if (missedTrainingSetting) {
			const itemRequired = items.find(item => item.value === missedTrainingSetting)
			setValue(itemRequired!)
		}
	}, [missedTrainingSetting, items])

	useEffect(() => {
		if (data) {
			dispatch(userActions.setSettingsMissedTraining(data.missedTraining))
		}
	}, [data, dispatch])

	const [value, setValue] = useState(
		items.find(item => item.value === missedTrainingSetting) ?? items[0]
	)

	const onCloseHandle = () => {
		setValue(items.find(item => item.value === missedTrainingSetting) ?? items[0])
		onClose()
	}

	const onSubmitHandle = () => {
		updateMissedTraining({ missedTraining: value.value })
		onCloseHandle()
	}

	if (isLoading || isLoadingMutation || !missedTrainingSetting) return null

	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={onCloseHandle}
			onSubmit={onSubmitHandle}
		>
			<div className={clsx(
				cls.MissedTrainingSettings,
				className)}
			>
				<Heading
					align='center'
					size='s'
					title={t('missedTrainingSettings.title')}
				/>
				<MyRadioGroup
					items={items}
					onChange={setValue}
					value={value}
					className={cls.radioGroup}
				/>
				<ModalButtons
					onClose={onCloseHandle}
					onSubmit={onSubmitHandle}
				/>
			</div>
		</HDialogHeadless>
	)
}