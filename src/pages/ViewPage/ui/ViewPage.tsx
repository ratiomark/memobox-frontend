import { getJsonSavedData, getUserAuthData } from '@/entities/User';
import { ViewPageInitializer } from '@/features/ViewPageInitializer';
import { BoxesListViewWidget } from '@/widgets/BoxesListViewWidget';
import { CardListViewWidget } from '@/widgets/CardListViewWidget';
import { Page } from '@/widgets/Page';
import { ShelvesListViewWidget } from '@/widgets/ShelvesListViewWidget';
import { Header } from '@/widgets/Sidebar';
import { SortControllerViewPageWidget } from '@/widgets/SortControllerViewPageWidget';
import { SortControllerWrapper } from '@/widgets/SortControllerViewPageWidget/ui/SortControllerWrapper/SortControllerWrapper';
import { StatsAndActionsViewPageWidget } from '@/widgets/StatsAndActionsViewPageWidget';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const ViewPage = memo(() => {
	// const { t, i18n } = useTranslation()

	return (
		<>
			{/* <Header /> */}
			{/* <Header/> */}
			<Page data-testid='MainPage'>
				<ViewPageInitializer
					shelvesListViewPageBlock={<ShelvesListViewWidget />}
					boxListViewPageBlock={<BoxesListViewWidget />}
					statsAndActionsViewPageBlock={<StatsAndActionsViewPageWidget />}
					sortControllerViewPageBlock={<SortControllerWrapper />}
					// sortControllerViewPageBlock={<SortControllerViewPageWidget />}
					cardListViewPageBlock={<CardListViewWidget />}
				/>
			</Page>
		</>
	)
})
ViewPage.displayName = 'ViewPage'
export default ViewPage;