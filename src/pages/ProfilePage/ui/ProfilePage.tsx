import { Page } from '@/widgets/Page';
import { ProfilePageWidget } from '@/widgets/ProfilePageWidget';
import { memo } from 'react';

const ProfilePage = memo(() => {
	return (
		<Page>
			<ProfilePageWidget />
		</Page>
	)
})

ProfilePage.displayName = 'ProfilePage'
export default ProfilePage;