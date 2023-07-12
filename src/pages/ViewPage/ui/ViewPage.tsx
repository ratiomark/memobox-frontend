import { getJsonSavedData, getUserAuthData } from '@/entities/User';
import { ViewPageInitializer } from '@/features/ViewPageInitializer';
import { BoxesListViewWidget } from '@/widgets/BoxesListViewWidget';
import { CardListViewWidget } from '@/widgets/CardListViewWidget';
import { Page } from '@/widgets/Page';
import { ShelvesListViewWidget } from '@/widgets/ShelvesListViewWidget';
import { SortControllerViewPageWidget } from '@/widgets/SortControllerViewPageWidget';
import { StatsAndActionsViewPageWidget } from '@/widgets/StatsAndActionsViewPageWidget';
import { memo } from 'react';

const ViewPage = memo(() => {
	// const { t, i18n } = useTranslation()

	return (
		<>
			<Page saveScroll={false} data-testid='MainPage'>
				<ViewPageInitializer
					statsAndActionsViewPageBlock={<StatsAndActionsViewPageWidget />}
					shelvesListViewPageBlock={<ShelvesListViewWidget />}
					boxListViewPageBlock={<BoxesListViewWidget />}
					sortControllerViewPageBlock={<SortControllerViewPageWidget />}
					cardListViewPageBlock={<CardListViewWidget />}
				/>
			</Page>
		</>
	)
})
ViewPage.displayName = 'ViewPage'
export default ViewPage;