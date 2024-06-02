import { LoginScreen, loginReducer } from '@/features/AuthByUsername';
import { TEST_PAGES_IDS } from '@/shared/const/testConsts';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { Page } from '@/widgets/Page';
import cls from './LoginPage.module.scss'
import { LangSwitcherIcon } from '@/shared/ui/SwitchLanguageIcon/SwitchLanguageIcon';
const initialReducers: ReducersList = {
	loginForm: loginReducer,
}

export const LoginPage = () => {
	useAsyncReducer({
		reducers: initialReducers,
		removeAfterUnmount: false,

	})

	return (
		<Page
			className={cls.loginPageBase}
			data-testid={TEST_PAGES_IDS.loginPage}>
			<LoginScreen />

		</Page>
	)
}
