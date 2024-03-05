import { TEST_BUTTONS_IDS, TEST_PAGES_IDS, TEST_INPUTS_IDS, TEST_USER_DATA } from '@/shared/const/testConsts'; // Импортируем константы
import { AuthPage, AuthPageTest } from '#/helpers/pageObjects/AuthPage'
import { generateDataTestIdSelector } from '#/helpers';
// import { AuthPage, AuthPageTest } from '../pageObjects/AuthPage'

describe('Login page', () => {
	it('Should render login page', () => {
		cy.visit('/');
		cy.getByTestId(TEST_PAGES_IDS.loginPage).should('exist'); // Проверяет наличие элемента
	});
	it('User can login, after login go to main page', () => {
		// console.log(Cypress.env())
		AuthPageTest.visit()
		AuthPageTest.goToLogin()
		AuthPageTest.login()
		cy.getByTestId(TEST_PAGES_IDS.mainPage).should('exist')
	});
});