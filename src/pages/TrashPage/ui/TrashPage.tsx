import { TrashPageInitializer } from '@/features/TrashPageInitializer';
import { EntitySwitcherTrashPageWidget } from '@/widgets/EntitySwitcherTrashPageWidget';
import { Page } from '@/widgets/Page';
import { motion } from 'framer-motion';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const TrashPage = memo(() => {

	return (
		<Page>
			<TrashPageInitializer
				entitySwitcherWidget={<EntitySwitcherTrashPageWidget />}
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