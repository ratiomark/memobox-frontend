import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './UserDataBlock.module.scss';
import { ReactNode } from 'react';
import { Button } from '@/shared/ui/Button';
import { ProfileRowData } from '../ProfileRowData/ProfileRowData';
import { useSelector } from 'react-redux';
import {
	getUserEmail,
	getUserEmailVerified,
	getUserName
} from '@/entities/User';
import { MyText } from '@/shared/ui/Typography';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { profilePageWidgetActions } from '../..';
import { HStack } from '@/shared/ui/Stack';
import CheckIcon from '@/shared/assets/icons/checkIcon.svg'
import { Icon } from '@/shared/ui/Icon';

interface UserDataBlockProps {
	className?: string
}

export const UserDataBlock = (props: UserDataBlockProps) => {
	const {
		className
	} = props

	const dispatch = useAppDispatch()
	const userName = useSelector(getUserName)
	const email = useSelector(getUserEmail)
	const isEmailVerified = useSelector(getUserEmailVerified)
	const { t } = useTranslation('profile')

	const onNameChangeClick = () => {
		dispatch(profilePageWidgetActions.setIsChangeNameModalOpen(true))
	}

	const onEmailChangeClick = () => {
		dispatch(profilePageWidgetActions.setIsChangeEmailModalOpen(true))
	}

	const onPasswordChangeClick = () => {
		dispatch(profilePageWidgetActions.setIsChangePasswordModalOpen(true))
	}

	const nameRow = (<ProfileRowData
		title={t('name')}
		content={<MyText text={userName} />}
		buttons={<Button className={cls.button} onClick={onNameChangeClick}>{t('edit')}</Button>}
	/>)

	const emailContentBlock = isEmailVerified
		? (
			<HStack gap='gap_10'>
				<MyText text={email} />
				<Icon
					className={cls.iconCheck}
					type='main'
					Svg={CheckIcon}
				/>
			</HStack>)
		: (
			<HStack gap='gap_8'>
				<MyText text={email} />
				<MyText size='s' text={t('waiting for confirmation')} />
			</HStack>)

	const emailButtonsBlock = isEmailVerified
		? <Button>{t('edit')}</Button>
		: (
			<HStack gap='gap_20'>
				<Button className={cls.button} variant='filled'>{t('confirm email')}</Button>
				<Button className={cls.button} onClick={onEmailChangeClick}>{t('edit')}</Button>
			</HStack>)

	const emailRow = (<ProfileRowData
		title={t('email')}
		content={emailContentBlock}
		buttons={emailButtonsBlock}
	/>)

	const passwordRow = (<ProfileRowData
		title={t('password')}
		content={<MyText text={'*******'} />}
		buttons={<Button className={cls.button} onClick={onPasswordChangeClick}>{t('edit')}</Button>}
	/>)

	return (
		<div className={cls.UserDataBlock}>
			{nameRow}
			{emailRow}
			{passwordRow}
		</div>
	)
}