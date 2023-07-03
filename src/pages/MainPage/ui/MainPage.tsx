import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { StatsAndActionsCupboardWidget } from '@/widgets/StatsAndActionsCupboardWidget'
import { Header } from '@/widgets/Sidebar'
// eslint-disable-next-line custom-fsd-checker-plugin/public-api-imports
import { CupboardShelfList } from '@/features/CupboardShelfList'
import { CardModalNewCard } from '@/features/CupboardShelfList'
import { CupboardShelfListWrapper } from '@/features/CupboardShelfList'


// const data = { wait: 40, all: 40, train: 33 }
const MainPage = () => {
	const { t } = useTranslation()
	// const { data, isLoading, error } = useGetShelvesQuery()

	// useEffect(() => {
	// 	const buttons = document.querySelectorAll('[data-button-type="shelf-train"]')
	// 	console.log(buttons)
	// 	// data-button-type='shelf-train'

	// }, [])

	// if (isLoading) return <p>Загрузка</p>

	return (
		<>
			{/* <Header /> */}
			<Page data-testid='MainPage'>
				<StatsAndActionsCupboardWidget />
				<CupboardShelfListWrapper />
				{/* <CardModalNewCard /> */}
				{/* <CupboardShelvesWidget /> */}
			</Page>
		</>
	)
}
export default MainPage
