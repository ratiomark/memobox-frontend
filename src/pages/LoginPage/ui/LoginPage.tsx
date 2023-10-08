import { getUserAuthData } from '@/entities/User';
import { LoginScreen } from '@/features/AuthByUsername';
import { Page } from '@/widgets/Page';
import { useSelector } from 'react-redux';

export const LoginPage = () => {
	// const auth = useSelector(getUserAuthData)

	return (
		<Page data-testid='MainPage'>
			<LoginScreen />
		</Page>
	)
}
