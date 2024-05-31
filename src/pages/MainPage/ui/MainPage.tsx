import { Page } from '@/widgets/Page'
import { StatsAndActionsCupboardWidget } from '@/widgets/StatsAndActionsCupboardWidget'
import { CupboardShelfListWrapper } from '@/features/CupboardShelfList'
import { getUserAuthData, getUserMounted, useJsonSettings } from '@/entities/User'
import { useSelector } from 'react-redux'
import { LoginScreen } from '@/features/AuthByUsername'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { LoginPage } from '@/pages/LoginPage'
import { TEST_PAGES_IDS } from '@/shared/const/testConsts'
import cls from './MainPage.module.scss'
import MainPageNewUser from './MainPageNewUser/MainPageNewUser'
const MainPage = () => {
	const auth = useSelector(getUserAuthData)
	const userMounted = useSelector(getUserMounted)
	const navigate = useNavigate();

	const { postRegistrationStep, hasCreatedFirstShelf } = useJsonSettings()
	useEffect(() => {
		if (userMounted && !auth || postRegistrationStep !== 'COMPLETED') {
			navigate('/login')
		}
	}, [auth, navigate, postRegistrationStep, userMounted])
	// if (!auth) {
	// 	navigate('/login'); // Перенаправление на страницу логина
	// }
	// if (!auth || postRegistrationStep !== 'COMPLETED') {
	// 	console.log('!!!!!!!!!!!!!!!!!!!!!')
	// 	navigate('/login'); // Перенаправление на страницу логина
	// 	// return (
	// 	// 	<LoginPage />
	// 	// 	// 		<Page data-testid='MainPage'>
	// 	// 	// 			<LoginScreen />
	// 	// 	// 		</Page>
	// 	// )
	// }

	if (hasCreatedFirstShelf) {
		// // без StatsAndActionsCupboardWidget не будет работать CupboardShelfListWrapper из-за перерасчета ширины кнопок
		return (
			<Page
				// className={cls.wrapper}
				data-testid={TEST_PAGES_IDS.mainPage}
			>
				<div className={cls.wrapper} >

					<StatsAndActionsCupboardWidget />
					<CupboardShelfListWrapper />
				</div>
			</Page>
		)
	}

	return <MainPageNewUser />

}
export default MainPage
