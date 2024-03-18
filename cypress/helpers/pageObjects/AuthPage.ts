/// <reference types="cypress" />
import { TEST_BUTTONS_IDS, TEST_INPUTS_IDS, TEST_USER_DATA } from '../../../src/shared/const/testConsts'; // Импортируем константы

export class AuthPage {
	visit() {
		cy.visit('/login');
		return this;
	}

	goToLogin() {
		cy.clickByTestId(TEST_BUTTONS_IDS.goToLogin)
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

export const AuthPageTest = new AuthPage();

// email: TEST_USER_DATA.email,
// 	password: TEST_USER_DATA.password,
// 		name: TEST_USER_DATA.name,