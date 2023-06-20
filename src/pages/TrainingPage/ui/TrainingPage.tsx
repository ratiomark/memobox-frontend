import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const TrainingPage = memo(() => {
	const { t, i18n } = useTranslation()

	return (
		<div>
			{t('about')}
		</div>
	)
})
TrainingPage.displayName = 'TrainingPage'
export default TrainingPage;