import { Page } from '@/widgets/Page'
import { StatsAndActionsCupboardWidget } from '@/widgets/StatsAndActionsCupboardWidget'
import { CupboardShelfListWrapper } from '@/features/CupboardShelfList'
import { getUserAuthData } from '@/entities/User'
import { useSelector } from 'react-redux'
import { LoginScreen } from '@/features/AuthByUsername'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { LoginPage } from '@/pages/LoginPage'
import { TEST_PAGES_IDS } from '@/shared/const/testConsts'

const MainPage = () => {
	const auth = useSelector(getUserAuthData)
	const navigate = useNavigate();

	useEffect(() => {
		if (!auth) {
			navigate('/login')
		}
	}, [auth, navigate])
	// if (!auth) {
	// 	navigate('/login'); // Перенаправление на страницу логина
	// }
	if (!auth) {
		return (
			<LoginPage />
			// 		<Page data-testid='MainPage'>
			// 			<LoginScreen />
			// 		</Page>
		)
	}

	// без StatsAndActionsCupboardWidget не будет работать CupboardShelfListWrapper из-за перерасчета ширины кнопок
	return (
		<Page data-testid={TEST_PAGES_IDS.mainPage}>
			<StatsAndActionsCupboardWidget />
			<CupboardShelfListWrapper />
		</Page>
	)
}
export default MainPage
