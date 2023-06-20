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
import { getMissedTrainingModalIsOpen, getMissedTrainingModalShelfId, getMissedTrainingModalBoxId, getMissedTrainingBoxValue, getMissedTrainingShelfValue } from '../../../model/selectors/getMissedTrainingModal';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../../..';

interface MissedTrainingSettingsProps {
	className?: string
}



export const MissedTrainingSettingsModal = (props: MissedTrainingSettingsProps) => {
	const {
		className,
		// onClose,
		// missedTrainingSetting,
	} = props

	const dispatch = useAppDispatch()
	const isOpen = useSelector(getMissedTrainingModalIsOpen)
	const shelfId = useSelector(getMissedTrainingModalShelfId)
	const boxId = useSelector(getMissedTrainingModalBoxId)
	const currentMissedTrainingValue = useSelector((state: StateSchema) => getMissedTrainingShelfValue(state, shelfId))
	// const currentMissedTrainingValueOfBox = useSelector((state: StateSchema) => getMissedTrainingBoxValue(state, shelfId, boxId))

	// const onSubmit = () => {
	// 	if (boxId === '') {
	// 		console.log('Сохраняю занчение для полки ', currentMissedTrainingValue)
	// 	} else {
	// 		console.log('Сохраняю занчение для коробки ', currentMissedTrainingValueOfBox)
	// 	}
	// }
	const onClose = () => {
		dispatch(cupboardShelfListActions.setMissedTrainingModalIsOpen(false))
		// dispatch(cupboardShelfListActions.setMissedTrainingModalIsOpen(true))
	}

	const { t } = useTranslation()

	const items = useMemo(() => ([
		{ value: 'none', content: t('missedTrainingSettings.none') },
		{ value: 'additional', content: t('missedTrainingSettings.additional') },
		{ value: 'backwards', content: t('missedTrainingSettings.backwards') }
	]), [t])

	const [value, setValue] = useState(
		items.find(item => item.value === currentMissedTrainingValue) ?? items[0]
	)

	const onCloseHandle = () => {
		setValue(items.find(item => item.value === currentMissedTrainingValue) ?? items[0])
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