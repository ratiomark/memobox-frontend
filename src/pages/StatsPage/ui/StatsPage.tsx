import { Page } from '@/widgets/Page';
import { StatsKnowledgeLevelsWidget } from '@/widgets/StatsKnowledgeLevelsWidget';
import { StatsMainDataWidget } from '@/widgets/StatsMainDataWidget';
import { memo } from 'react';

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