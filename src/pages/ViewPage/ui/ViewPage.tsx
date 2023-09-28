import { ViewPageInitializer } from '@/features/ViewPageInitializer';
import { BoxesListViewWidget } from '@/widgets/BoxesListViewWidget';
import { CardListViewWidget } from '@/widgets/CardListViewWidget';
import { Page } from '@/widgets/Page';
import { ShelvesListViewWidget } from '@/widgets/ShelvesListViewWidget';
import { SortControllerViewPageWidget } from '@/widgets/SortControllerViewPageWidget';
import { StatsAndActionsViewPageWidget } from '@/widgets/StatsAndActionsViewPageWidget';
import { memo } from 'react';

const ViewPage = memo(() => {
	return (
		<>
			<Page data-testid='ViewPage'>
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