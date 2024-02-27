/// <reference types="cypress" />
import { TEST_BUTTONS_IDS, TEST_PAGES_IDS } from '../../../src/shared/const/testConsts'; // Импортируем константы
import { AuthPage, AuthPageTest } from '../../support/pageObjects/AuthPage'
// import { AuthPageTest } from '../../support/pageObjects/AuthPage'
// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Проверка главной страницы', () => {
	// it('Должен отрисовать loginPage', () => {
	// 	cy.visit('/'); // Заходит на baseUrl указанный в cypress.json
	// 	cy.get(`[data-testid="${TEST_PAGES_IDS.loginPage}"]`).should('exist'); // Проверяет наличие элемента
	// });
	// it('Должен отрисовать loginPage', () => {
	// 	cy.visit('/'); // Заходит на baseUrl указанный в cypress.json
	// 	cy.get(`[data-testid="${TEST_PAGES_IDS.loginPage}"]`).should('exist'); // Проверяет наличие элемента
	// 	cy.clickByTestId(TEST_BUTTONS_IDS.goToLogin)
	// 	// cy.getAllLocalStorage().then(ls => { console.log(ls) })
	// 	// cy.local
	// });
	it('User can login, after login go to main page', () => {
		AuthPageTest.visit()
		AuthPageTest.goToLogin()
		AuthPageTest.login()
		cy.getByTestId(TEST_PAGES_IDS.mainPage).should('exist')
	});
});