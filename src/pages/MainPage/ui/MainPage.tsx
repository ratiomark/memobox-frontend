import { Page } from '@/widgets/Page'
import { StatsAndActionsCupboardWidget } from '@/widgets/StatsAndActionsCupboardWidget'
import { CupboardShelfListWrapper } from '@/features/CupboardShelfList'

const MainPage = () => {
	return (
		<>
			<Page data-testid='MainPage'>
				<StatsAndActionsCupboardWidget />
				<CupboardShelfListWrapper />
			</Page>
		</>
	)
}
export default MainPage
