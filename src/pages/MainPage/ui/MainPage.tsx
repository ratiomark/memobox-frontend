import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { StatsAndActionsCupboardWidget } from '@/widgets/StatsAndActionsCupboardWidget'
import { CupboardShelfList } from '@/features/CupboardShelfList'
import { CardModalNewCard } from '@/features/CupboardShelfList'
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
