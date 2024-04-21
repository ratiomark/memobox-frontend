import clsx from 'clsx'
import cls from './LogoutComponent.module.scss'
import { logoutThunk } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';


export const LogoutComponent = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const onLogoutClick = async () => {
		await dispatch(logoutThunk())
	}

	return (
		<HStack max align='center' justify='center' style={{ paddingTop: 20 }}>
			<Button
				variant='link'
				// className={clsx(cls.logoutButton, className)}
				onClick={onLogoutClick}
			>
				{t('log out full text')}
			</Button>
		</HStack>


	)
}