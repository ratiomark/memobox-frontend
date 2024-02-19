import { LoginScreen, loginReducer } from '@/features/AuthByUsername';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { Page } from '@/widgets/Page';

const initialReducers: ReducersList = {
	loginForm: loginReducer,
}

export const LoginPage = () => {
	useAsyncReducer({
		reducers: initialReducers,
		removeAfterUnmount: false,
	})

	return (
		<Page data-testid='MainPage'>
			<LoginScreen />
		</Page>
	)
}
