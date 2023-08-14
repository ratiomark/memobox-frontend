import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ProfilePageWidget.module.scss';
import { UserDataBlock } from './UserDataBlock/UserDataBlock';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { profilePageWidgetReducer } from '..';
import { ChangeNameModal } from './Modals/ChangeNameModal/ChangeNameModal';
import { ChangePasswordModal } from './Modals/ChangePasswordModal/ChangePasswordModal';
import { ChangeEmailModal } from './Modals/ChangeEmailModal/ChangeEmailModal';
import { SubscriptionDataBlock } from './SubscriptionDataBlock/SubscriptionDataBlock';
import { LanguageDataBlock } from './LanguageDataBlock/LanguageDataBlock';
import { ChangeLanguageModal } from './Modals/ChangeLanguageModal/ChangeLanguageModal';

interface ProfilePageWidgetProps {
	className?: string
}
const reducers: ReducersList = {
	profilePage: profilePageWidgetReducer
}
export const ProfilePageWidget = (props: ProfilePageWidgetProps) => {
	const {
		className
	} = props
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })

	const { t } = useTranslation()

	return (
		<>
			<div className={clsx(
				cls.profilePageWidget,
				className)}
			>
				<UserDataBlock />
				<SubscriptionDataBlock />
				<LanguageDataBlock />
			</div>
			<ChangeNameModal />
			<ChangeEmailModal />
			<ChangePasswordModal />
			<ChangeLanguageModal />
		</>
	)
}