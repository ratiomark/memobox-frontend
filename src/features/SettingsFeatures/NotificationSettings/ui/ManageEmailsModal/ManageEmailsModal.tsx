import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ManageEmailsModal.module.scss';
import { useSelector } from 'react-redux';
import { getUserNotificationEmailList, getUserNotificationSettings, getUserSettingsAwaitingResponse, getUserSettingsIsLoading, updateNotificationSettingsThunk } from '@/entities/User';
import { Card } from '@/shared/ui/Card';
import { Heading, MyText } from '@/shared/ui/Typography';
import { Switcher } from '@/shared/ui/Switcher';
import { SingleSetter } from '@/shared/ui/TimeSetter/SingleSetter';
import { WheelEvent, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { settingsFeaturesActions } from '../../../model/slice/settingsFeaturesSlice';
import { getIsManageEmailsModalOpen } from '../../../model/selectors/getModals';
import TrashIcon from '@/shared/assets/icons/trashIcon2.svg'
import { Icon } from '@/shared/ui/Icon';
import { CreateNewEmailModal } from '../CreateNewEmailModal/CreateNewEmailModal';
// если есть хотя бы один подтвержденный мейл, то у всех других появляется кнопка удалить. Если есть > двух подтвержденных мейлов, то у всех появляется кнопка удалить.

export const ManageEmailsModal = () => {
	const isOpen = useSelector(getIsManageEmailsModalOpen)
	const { t } = useTranslation()
	const { t: t2 } = useTranslation('settings')
	const [addingNewEmail, setAddingNewEmail] = useState(false)
	const dispatch = useAppDispatch()
	const onClose = () => {
		dispatch(settingsFeaturesActions.setIsManageEmailsModalOpen(false))
		dispatch(settingsFeaturesActions.setIsNotificationModalOpen(true))
	}

	const isLoading = useSelector(getUserSettingsIsLoading)
	const notificationEmailList = useSelector(getUserNotificationEmailList)


	if (!notificationEmailList || isLoading) return null

	const removeButton = (
		<Icon
			Svg={TrashIcon}
			type='cancel'
			clickable
			withFill={false}
			width={22}
			height={22}
			onClick={() => { }}
			buttonSameSize={false}
			className={clsx(cls.icon, cls.removeIcon)}
		/>)

	const emailsVerifiedCount = notificationEmailList.filter(emailObj => emailObj.verified).length
	let emailListRendered;
	switch (emailsVerifiedCount) {
		case 0:
			emailListRendered = (
				<>
					{notificationEmailList.map(emailObj => (
						<Card className={cls.emailCard} key={emailObj.email}>
							<MyText text={emailObj.email} />
							{removeButton}
						</Card>
					))}
				</>)

			break;
		case 1:
			emailListRendered = (
				<>
					{notificationEmailList.map(emailObj => {
						if (emailObj.verified) {
							return (<Card className={cls.emailCard} key={emailObj.email}>
								<MyText text={emailObj.email} />
							</Card>)
						}
						return (
							<Card className={cls.emailCard} key={emailObj.email}>
								<MyText text={emailObj.email} />
								{removeButton}
							</Card>
						)
					})}
				</>)
			break;
		default:
			emailListRendered = (
				<>
					{notificationEmailList.map(emailObj => (
						<Card className={cls.emailCard} key={emailObj.email}>
							<MyText text={emailObj.email} />
						</Card>
					))}
				</>)
			break;
	}

	const onAddNewEmailClick = () => {
		dispatch(settingsFeaturesActions.setIsCreateNewEmailModalOpen(true))
		dispatch(settingsFeaturesActions.setIsManageEmailsModalOpen(false))
	}

	return (
		<>
			<HDialogHeadless
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={onAddNewEmailClick}
			>
				<div className={cls.ManageEmailsWrapper}
				>
					{emailListRendered}
					<Button
						onClick={onAddNewEmailClick}
					>
						{t2('add notification email')}
					</Button>
					<Button
						variant='back'
						onClick={onClose}
					>
						{t('back button')}
					</Button>
				</div>

				{/* <ModalButtons
					onClose={onClose}
					onSubmit={onAddNewEmailClick}
					textSubmitButton='Add email'
				/> */}
			</HDialogHeadless>
			<CreateNewEmailModal />
		</>
	)
}

