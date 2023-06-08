import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { StatsAndActionsCupboardWidget } from '@/widgets/StatsAndActionsCupboardWidget'
import { Header } from '@/widgets/Sidebar'
// eslint-disable-next-line custom-fsd-checker-plugin/public-api-imports
import { CupboardShelvesWidget } from '@/widgets/CupboardShelvesWidget'


// const data = { wait: 40, all: 40, train: 33 }
const MainPage = () => {
	const { t } = useTranslation()
	// const { data, isLoading, error } = useGetShelvesQuery()


	// if (isLoading) return <p>Загрузка</p>

	return (
		<>
			<Header />
			<Page data-testid='MainPage'>
				<StatsAndActionsCupboardWidget />
				<CupboardShelvesWidget />
			</Page>
		</>
	)
}
export default MainPage
