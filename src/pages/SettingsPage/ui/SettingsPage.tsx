import { ShelfTemplateSettings } from '@/features/SettingsFeatures';
import { Card } from '@/shared/ui/Card';
import { HDialog } from '@/shared/ui/HDialog';
import { VStack } from '@/shared/ui/Stack';
import { Heading } from '@/shared/ui/Typography';
import { SettingsPageWidget } from '@/widgets/SettingsPageWidget';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SettingsPage = memo(() => {
	return <SettingsPageWidget />
})
SettingsPage.displayName = 'SettingsPage'
export default SettingsPage;