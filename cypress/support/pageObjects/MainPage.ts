import { obtainRouteLogin } from '@/app/providers/router/config/routeConfig/routeConfig';
import { TEST_BUTTONS_IDS, TEST_ENTITY_NAMES, TEST_INPUTS_IDS, TEST_USER_DATA } from '../../../src/shared/const/testConsts'; // Импортируем константы
import { generateDataTestIdSelector } from '../commands';

export class MainPage {
	visit() {
		cy.visit('/');
	}

	clickCreateNewShelf() {
		cy.clickByTestId(TEST_BUTTONS_IDS.createNewShelfOpen)
	}
	clickCreateNewCard() {
		cy.clickByTestId(TEST_BUTTONS_IDS.createNewCardOpen)
	}
	typeShelfName(name: string) {
		cy.typeByTestId(TEST_INPUTS_IDS.createNewShelfModalInput, name)
	}

	submitModal() {
		cy.get(generateDataTestIdSelector(TEST_ENTITY_NAMES.modalOpen))
			.first()
			.find(generateDataTestIdSelector(TEST_BUTTONS_IDS.submitButton))
			.click()
	}

	goToRegister() {
		cy.clickByTestId(TEST_BUTTONS_IDS.goToRegister)
	}

	fillEmail(email = TEST_USER_DATA.email) {
		cy.getByTestId(TEST_INPUTS_IDS.authInputEmail).clear()
		cy.typeByTestId(TEST_INPUTS_IDS.authInputEmail, email)
	}

	fillPassword(password = TEST_USER_DATA.name) {
		cy.getByTestId(TEST_INPUTS_IDS.authInputPassword).clear()
		cy.typeByTestId(TEST_INPUTS_IDS.authInputPassword, password)
	}


	fillFirstName(name = TEST_USER_DATA.name) {
		cy.getByTestId(TEST_INPUTS_IDS.registerInputFirstName).clear()
		cy.typeByTestId(TEST_INPUTS_IDS.registerInputFirstName, name)
	}

	submit() {
		cy.get('button[type="submit"]').click();
	}

	login(email = TEST_USER_DATA.email, password = TEST_USER_DATA.password) {
		// cy.getByTestId(TEST_INPUTS_IDS.authInputEmail).type(email);
		// cy.getByTestId(TEST_INPUTS_IDS.authInputPassword).type(password);
		cy.getByTestId(TEST_INPUTS_IDS.authInputEmail).clear()
		cy.typeByTestId(TEST_INPUTS_IDS.authInputEmail, email)
		cy.getByTestId(TEST_INPUTS_IDS.authInputPassword).clear()
		cy.typeByTestId(TEST_INPUTS_IDS.authInputPassword, password)
		cy.clickByTestId(TEST_BUTTONS_IDS.loginButton)
		// cy.get('form').submit();
	}
}

export const MainPageTest = new MainPage();
