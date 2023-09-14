import { Page } from '@/widgets/Page'
import { StatsAndActionsCupboardWidget, StatsAndActionsCupboardWidgetSkeleton } from '@/widgets/StatsAndActionsCupboardWidget'
import { CupboardShelfListWrapper } from '@/features/CupboardShelfList'

const MainPage = () => {

	return (
		<>
			{/* <StatsAndActionsCupboardWidgetSkeleton /> */}
			<Page data-testid='MainPage'>
				<StatsAndActionsCupboardWidget />
				<CupboardShelfListWrapper />
			</Page>
		</>
	)
}
export default MainPage
