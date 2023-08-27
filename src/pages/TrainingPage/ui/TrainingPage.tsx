import { Training } from '@/features/Training';
import { Page } from '@/widgets/Page';
import { TrainingWrapper } from '@/widgets/TrainingWrapper';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const TrainingPage = memo(() => {
	// const { t, i18n } = useTranslation()

	return (
		
		<TrainingWrapper />
	)
})
TrainingPage.displayName = 'TrainingPage'
export default TrainingPage;