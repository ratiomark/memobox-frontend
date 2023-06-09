import { ViewPageInitializer } from '@/features/ViewPageInitializer';
import { CardListViewWidget } from '@/widgets/CardListViewWidget';
import { Page } from '@/widgets/Page';
import { ShelvesListViewWidget } from '@/widgets/ShelvesListViewWidget';
import { Header } from '@/widgets/Sidebar';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const ViewPage = memo(() => {
	// const { t, i18n } = useTranslation()

	return (
		<>
			{/* <Header /> */}
			<Page data-testid='MainPage'>
				<ViewPageInitializer
					shelvesListViewPageBlock={<ShelvesListViewWidget />}
					cardListViewPageBlock={<CardListViewWidget />}
				/>
			</Page>
		</>
	)
})
ViewPage.displayName = 'ViewPage'
export default ViewPage;