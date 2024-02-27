/// <reference types="cypress" />
import { TEST_BUTTONS_IDS, TEST_ENTITY_NAMES, TEST_PAGES_IDS } from '../../../src/shared/const/testConsts'; // Импортируем константы
import { MainPageTest } from '../../support/pageObjects/MainPage'
import { AuthPage, AuthPageTest } from '../../support/pageObjects/AuthPage'

describe('Проверка главной страницы', () => {
	let localStorageData = {};

	beforeEach(() => {
		// Восстановление данных localStorage перед каждым тестом
		Object.keys(localStorageData).forEach(key => {
			window.localStorage.setItem(key, localStorageData[key]);
		});
	});

	afterEach(() => {
		// Сохранение данных localStorage после каждого теста
		localStorageData = {};
		Object.keys(window.localStorage).forEach(key => {
			localStorageData[key] = window.localStorage.getItem(key);
		});
	});

	it('User can login, after login go to main page', () => {
		AuthPageTest.visit()
		AuthPageTest.goToLogin()
		AuthPageTest.login()
		cy.getByTestId(TEST_PAGES_IDS.mainPage).should('exist')
	});
	it('User can login, after login go to main page', () => {
		const now = Date.now()
		const shelfName = `testShelf - ${now}`
		MainPageTest.visit()
		cy.getByTestId(TEST_PAGES_IDS.mainPage).should('exist')
		MainPageTest.clickCreateNewShelf()
		MainPageTest.typeShelfName(shelfName)
		MainPageTest.submitModal()
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItem)
	});
});