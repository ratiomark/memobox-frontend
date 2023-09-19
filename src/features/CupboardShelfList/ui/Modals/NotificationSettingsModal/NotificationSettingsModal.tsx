import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './NotificationSettingsModal.module.scss';
import { useSelector } from 'react-redux';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { getNotificationModalIsOpen, getNotificationModalShelfId, getShelfNotificationSetting } from '../../../model/selectors/getNotificationShelfModal';
import { Switcher } from '@/shared/ui/Switcher';
import { cupboardShelfListActions } from '../../../model/slice/cupboardShelfListSlice';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Card } from '@/shared/ui/Card';
import { MyText } from '@/shared/ui/Typography';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { useState } from 'react';



export const NotificationSettingsModal = () => {

	const dispatch = useAppDispatch()
	const isOpen = useSelector(getNotificationModalIsOpen)
	const shelfId = useSelector(getNotificationModalShelfId)
	const shelfNotificationsEnabledStore = useSelector(getShelfNotificationSetting)
	const [notificationEnabled, setNotificationEnabled] = useState(shelfNotificationsEnabledStore)

	const onClose = () => {
		dispatch(cupboardShelfListActions.setNotificationModalIsOpen(false))
		setNotificationEnabled(shelfNotificationsEnabledStore)
	}

	const { t } = useTranslation()


	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={() => alert('Сохраняю уведомления')}
		>
			<Card className={cls.notificationCard} >
				<Switcher
					className={cls.switcher}
					title={t('Уведомления для полки')}
					isChecked={notificationEnabled}
					onClickSwitcher={() => setNotificationEnabled(prev => !prev)}
				/>
			</Card>
			<MyText text={t('Уведомления для полки')} />
			<HStack justify='between' max>
				<Button onClick={onClose}>{t('cancel')}</Button>
				<Button variant='filled'>{t('save')}</Button>
			</HStack>
		</HDialogHeadless>
	)
}