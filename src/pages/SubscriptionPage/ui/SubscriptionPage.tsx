import { Page } from '@/widgets/Page';
import { SubscriptionWidget } from '@/widgets/SubscriptionWidget';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const SubscriptionPage = memo(() => {
	// const { t, i18n } = useTranslation()

	return (
		<Page>
			<SubscriptionWidget />
		</Page>
	)
})
SubscriptionPage.displayName = 'SubscriptionPage'
export default SubscriptionPage;