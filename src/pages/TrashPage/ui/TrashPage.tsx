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
			{/* <motion.div
				animate={{ x: ['20%', '0%', '40%', '0%'] }}
				transition={{ duration: 2 }}
			>
				{t('about')}
			</motion.div> */}
		</Page>

	)
})
TrashPage.displayName = 'TrashPage'
export default TrashPage;