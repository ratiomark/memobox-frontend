import { Page } from '@/widgets/Page';
import { StatsAndActionsCupboardWidget } from '@/widgets/StatsAndActionsCupboardWidget';
import { StatsKnowledgeLevelsWidget } from '@/widgets/StatsKnowledgeLevelsWidget';
import { StatsMainDataWidget } from '@/widgets/StatsMainDataWidget';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const StatsPage = memo(() => {

	return (
		<Page>
			<StatsMainDataWidget />
			<StatsKnowledgeLevelsWidget />
		</Page>
	)
})

StatsPage.displayName = 'StatsPage'
export default StatsPage;