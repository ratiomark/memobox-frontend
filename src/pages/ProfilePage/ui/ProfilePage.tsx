import { Page } from '@/widgets/Page';
import { ProfilePageWidget } from '@/widgets/ProfilePageWidget';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const ProfilePage = memo(() => {

	return (
		<Page>
			<ProfilePageWidget />
		</Page>
	)
})

ProfilePage.displayName = 'ProfilePage'
export default ProfilePage;