import { Page } from '@/widgets/Page'
import { getUserAuthData } from '@/entities/User'
import { useSelector } from 'react-redux'
import { LoginScreen } from '@/features/AuthByUsername'

const MainPage = () => {
	const auth = useSelector(getUserAuthData)
	if (!auth) {
		return (
			<Page data-testid='MainPage'>
				<LoginScreen />
			</Page>
		)
	}

	return (
		<Page data-testid='MainPage'>
		</Page>
	)
}
export default MainPage
