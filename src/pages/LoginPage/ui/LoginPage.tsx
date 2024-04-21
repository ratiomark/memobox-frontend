import { LoginScreen, loginReducer } from '@/features/AuthByUsername';
import { TEST_PAGES_IDS } from '@/shared/const/testConsts';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { Page } from '@/widgets/Page';
import { useEffect } from 'react';

const initialReducers: ReducersList = {
	loginForm: loginReducer,
}

export const LoginPage = () => {
	useAsyncReducer({
		reducers: initialReducers,
		removeAfterUnmount: false,
		
	})
	
	return (
		<Page data-testid={TEST_PAGES_IDS.loginPage}>
			<LoginScreen />
		</Page>
	)
}
