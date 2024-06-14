import { memo } from 'react';

import { TrashPageInitializer } from '@/features/TrashPageInitializer';
import { ContentPresenterTrashPageWidget, RestoreCardModal } from '@/widgets/ContentPresenterTrashPageWidget';
import { EntitySwitcherTrashPageWidget } from '@/widgets/EntitySwitcherTrashPageWidget';
import { Page } from '@/widgets/Page';

const TrashPage = memo(() => {

	return (
		<Page>
			<TrashPageInitializer
				entitySwitcherWidget={<EntitySwitcherTrashPageWidget />}
				contentPresenterWidget={<ContentPresenterTrashPageWidget />}
				// restoreCardModal={<RestoreCardModal />}
			/>
			{/* <RestoreCardModal /> */}
		</Page>

	)
})
TrashPage.displayName = 'TrashPage'
export default TrashPage;