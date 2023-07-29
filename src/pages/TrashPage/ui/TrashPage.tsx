import { TrashPageInitializer } from '@/features/TrashPageInitializer';
import { ContentPresenterTrashPageWidget } from '@/widgets/ContentPresenterTrashPageWidget';
import { EntitySwitcherTrashPageWidget } from '@/widgets/EntitySwitcherTrashPageWidget';
import { Page } from '@/widgets/Page';
import { memo } from 'react';

const TrashPage = memo(() => {

	return (
		<Page>
			<TrashPageInitializer
				entitySwitcherWidget={<EntitySwitcherTrashPageWidget />}
				contentPresenterWidget={<ContentPresenterTrashPageWidget />}
			/>
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