import { Page } from '@/widgets/Page';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const SubscriptionPage = memo(() => {
	const { t, i18n } = useTranslation()

	return (
		<Page>
			<p>Страница подписки</p>
		</Page>
	)
})
SubscriptionPage.displayName = 'SubscriptionPage'
export default SubscriptionPage;