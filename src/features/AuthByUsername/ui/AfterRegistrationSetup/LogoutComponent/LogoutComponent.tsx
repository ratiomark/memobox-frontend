import clsx from 'clsx'
import cls from './LogoutComponent.module.scss'
import { logoutThunk } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';

interface LogoutComponentProps {
	className?: string;
}

export const LogoutComponent = (props: LogoutComponentProps) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const onLogoutClick = useCallback(() => {
		dispatch(logoutThunk())
	}, [dispatch])
	// content: t('log out'),
	// onClick: onLogoutClick
	const {
		className,
	} = props

	return (
		<HStack max align='center' justify='center' style={{ padding: 20 }}>
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