import { Page } from '@/widgets/Page';
import { SettingsPageWidget } from '@/widgets/SettingsPageWidget';
import { memo } from 'react';

const SettingsPage = memo(() => {
	return (
		<Page>
			<SettingsPageWidget />
		</Page>
	)
})
SettingsPage.displayName = 'SettingsPage'
export default SettingsPage;