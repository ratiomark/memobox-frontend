import { Page } from '@/widgets/Page';
import { SubscriptionWidget } from '@/widgets/SubscriptionWidget';
import { memo } from 'react';

const SubscriptionPage = memo(() => {
	return (
		<Page>
			<SubscriptionWidget />
		</Page>
	)
})
SubscriptionPage.displayName = 'SubscriptionPage'
export default SubscriptionPage;