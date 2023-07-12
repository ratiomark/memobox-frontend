import { motion } from 'framer-motion';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const TrashPage = memo(() => {
	const { t, i18n } = useTranslation()

	return (
		<motion.div
			animate={{ x: ['20%', '0%', '40%', '0%'] }}
			transition={{ duration: 2 }}
		>
			{t('about')}
		</motion.div>
	)
})
TrashPage.displayName = 'TrashPage'
export default TrashPage;