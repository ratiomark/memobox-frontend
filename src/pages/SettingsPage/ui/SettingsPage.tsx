import { ShelfTemplateSettings } from '@/features/SettingsFeatures';
import { Card } from '@/shared/ui/Card';
import { HDialog } from '@/shared/ui/HDialog';
import { VStack } from '@/shared/ui/Stack';
import { Heading } from '@/shared/ui/Typography';
import { Page } from '@/widgets/Page';
import { SettingsPageWidget } from '@/widgets/SettingsPageWidget';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SettingsPage = memo(() => {
	return (
		<Page>
			<SettingsPageWidget />
		</Page>
	)
})
SettingsPage.displayName = 'SettingsPage'
export default SettingsPage;