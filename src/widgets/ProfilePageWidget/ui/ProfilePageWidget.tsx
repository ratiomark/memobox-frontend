import cls from './ProfilePageWidget.module.scss';
import { UserDataBlock } from './UserDataBlock/UserDataBlock';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { profilePageWidgetReducer } from '../model/slice/profilePageWidgetSlice';
import { ChangeNameModal } from './Modals/ChangeNameModal/ChangeNameModal';
import { ChangePasswordModal } from './Modals/ChangePasswordModal/ChangePasswordModal';
import { ChangeEmailModal } from './Modals/ChangeEmailModal/ChangeEmailModal';
import { SubscriptionDataBlock } from './SubscriptionDataBlock/SubscriptionDataBlock';
import { LanguageDataBlock } from './LanguageDataBlock/LanguageDataBlock';
import { ChangeLanguageModal } from './Modals/ChangeLanguageModal/ChangeLanguageModal';

const reducers: ReducersList = {
	profilePage: profilePageWidgetReducer
}
export const ProfilePageWidget = () => {

	useAsyncReducer({ reducers, removeAfterUnmount: false })

	return (
		<>
			<div className={cls.profilePageWidget}>
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