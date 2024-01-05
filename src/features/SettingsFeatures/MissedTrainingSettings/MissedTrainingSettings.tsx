import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './MissedTrainingSettings.module.scss';
import { useSelector } from 'react-redux';
import {
	MissedTrainingValue,
	getUserMissedTrainingSettings,
	getUserSettingsAwaitingResponse,
	getUserSettingsIsLoading,
	updateMissedTrainingThunk,
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
import { Skeleton } from '@/shared/ui/Skeleton';
import { toastsActions } from '@/shared/ui/Toast';
import { settingsFeaturesActions } from '../model/slice/settingsFeaturesSlice';
import { getIsMissedTrainingModalOpen } from '../model/selectors/getModals';


export const MissedTrainingSettingsModal = () => {
	const isOpen = useSelector(getIsMissedTrainingModalOpen)
	const missedTrainingSetting = useSelector(getUserMissedTrainingSettings)
	const settingsAwaitingResponseObj = useSelector(getUserSettingsAwaitingResponse)
	// const [updateMissedTraining, { isLoading: isLoadingMutation, data, isSuccess, isError }] = useUpdateMissedTrainingMutation()
	// useMissedTrainingSettingsStatusUpdate({ isSuccess, isError })

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

	// useEffect(() => {
	// 	if (data) {
	// 		dispatch(userActions.setSettingsMissedTraining(data.missedTraining))
	// 	}
	// }, [data, dispatch])

	const [value, setValue] = useState(
		items.find(item => item.value === missedTrainingSetting) ?? items[0]
	)

	const onClose = () => {
		dispatch(settingsFeaturesActions.setIsMissedTrainingModalOpen(false))
	}

	const onCloseHandle = () => {
		setValue(items.find(item => item.value === missedTrainingSetting) ?? items[0])
		onClose()
	}

	const onSubmitHandle = () => {
		dispatch(updateMissedTrainingThunk({ missedTraining: value.value }))
		onClose()
	}

	if (isLoading || !missedTrainingSetting) return (
		null
		// <div className={clsx(
		// 	cls.MissedTrainingSettings,
		// 	className)}
		// >
		// 	<Skeleton width={1000} height={399}/>
		// </div>
	)

	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={onCloseHandle}
			onSubmit={onSubmitHandle}
		>
			<div className={cls.MissedTrainingSettings}
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
					isSubmitDisabled={settingsAwaitingResponseObj['missedTraining']}
				/>
			</div>
		</HDialogHeadless>
	)
}


