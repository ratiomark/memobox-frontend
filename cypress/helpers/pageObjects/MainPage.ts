/// <reference types="cypress" />
import { TEST_BUTTONS_IDS, TEST_ENTITY_NAMES, TEST_INPUTS_IDS, TEST_USER_DATA } from '../../../src/shared/const/testConsts'; // Импортируем константы
import { generateDataTestIdSelector, generateRandomString } from '..';
// import { generateDataTestIdSelector } from '../commands';

export class MainPage {
	visit() {
		cy.visit('/');
	}
	pageReadyCheck() {
		this.getAllShelves().should('exist')
		cy.getByTestId(TEST_BUTTONS_IDS.shelf.skeletonButtons).should('not.exist');
	}
	// clickShelfViewByName(shelfName: string) {
	// 	cy.getByTestId(TEST_ENTITY_NAMES.shelfItem)
	// 		.contains('h3', shelfName).then($li => {
	// 			cy.wrap($li)
	// 				.find(generateDataTestIdSelector(TEST_BUTTONS_IDS.shelf.viewButton))
	// 				.click();
	// 		});
	// }
	clickShelfViewByName(shelfName: string) {
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItem)
			.contains('h3', shelfName)
			.closest('li') // Находим ближайший элемент li, который является родителем для h3
			.find(generateDataTestIdSelector(TEST_BUTTONS_IDS.shelf.viewButton)) // Находим кнопку внутри этого li
			.click(); // Кликаем по кнопке
	}
	// .first()
	// .findByTestId(TEST_BUTTONS_IDS.shelf.viewButton)
	// .click()
	// clickShelfViewByName(shelfName: string) {
	// 	cy.getByTestId(TEST_ENTITY_NAMES.shelfItem)
	// 		.first()
	// 		.findByTestId(TEST_BUTTONS_IDS.shelf.viewButton)
	// 		.click()
	// }
	checkShelfExistByName(shelfName: string) {
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItem).contains('h3', shelfName).should('exist');
	}
	clickFirstShelfInCreateNewCardModal() {
		cy.getByTestId(TEST_ENTITY_NAMES.listBoxTriggerShelf).click()
		cy.getByTestId(TEST_ENTITY_NAMES.listBoxItem).first().click()
	}
	clickCreateNewShelf() {
		cy.clickByTestId(TEST_BUTTONS_IDS.createNewShelfOpen)
	}
	clickCreateNewCard() {
		cy.clickByTestId(TEST_BUTTONS_IDS.createNewCardOpen)
	}
	fillShelfName(name: string) {
		cy.typeByTestId(TEST_INPUTS_IDS.createNewShelfModalInput, name)
	}
	getAllShelves() {
		return cy.getByTestId(TEST_ENTITY_NAMES.shelfItem)
	}
	getAllShelvesCount() {
		return this.getAllShelves().then($list => $list.length)
	}
	removeFirstShelf() {
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItem).first().findByTestId(TEST_BUTTONS_IDS.shelf.shelfSettingsButton).click();
		cy.getByTestId(TEST_ENTITY_NAMES.dropdownItems).findByTestId(TEST_BUTTONS_IDS.shelf.removeShelfButton).click();
	}
	removeAllShelfExceptLast3() {
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItem).then($all => {
			cy.wrap($all).each(($el, index, $list) => {
				if (index !== $list.length - 1) {
					cy.wrap($el).findByTestId(TEST_BUTTONS_IDS.shelf.shelfSettingsButton).click();
					cy.getByTestId(TEST_ENTITY_NAMES.dropdownItems).findByTestId(TEST_BUTTONS_IDS.shelf.removeShelfButton).click();
				}
			})
		})
	}
	removeAllShelfExceptLast() {
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItem).each(($el, index, $list) => {
			if (index !== $list.length - 1) {
				cy.wrap($el).findByTestId(TEST_BUTTONS_IDS.shelf.shelfSettingsButton).click();
				cy.getByTestId(TEST_ENTITY_NAMES.dropdownItems).findByTestId(TEST_BUTTONS_IDS.shelf.removeShelfButton).click();
			}
		})
	}
	removeAllShelfExceptLast2() {
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItem).then($all => {
			cy.wrap($all).each(($el, index, $list) => {
				if (index !== $list.length - 1) {
					cy.wrap($el).findByTestId(TEST_BUTTONS_IDS.shelf.shelfSettingsButton).click();
					cy.getByTestId(TEST_ENTITY_NAMES.dropdownItems).findByTestId(TEST_BUTTONS_IDS.shelf.removeShelfButton).click();
				}
			})
		})

		// const deleteShelf = () => {
		// 	cy.getByTestId(TEST_ENTITY_NAMES.shelfItem).then($list => {
		// 		if ($list.length > 1) { // Проверяем, что полок больше двух
		// 			cy.wrap($list).first().findByTestId(TEST_BUTTONS_IDS.shelf.shelfSettingsButton).click();
		// 			cy.getByTestId(TEST_ENTITY_NAMES.dropdownItems).findByTestId(TEST_BUTTONS_IDS.shelf.removeShelfButton).click();

		// 			deleteShelf(); // Рекурсивно вызываем функцию, чтобы удалить следующую полку
		// 		}
		// 	});
		// };

		// deleteShelf();
		// Проверяем, что осталось только две полки
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItem).should('have.length', 1);
	}

	submitModal() {
		cy.getByTestId(TEST_ENTITY_NAMES.modalOpen)
			.first()
			.findByTestId(TEST_BUTTONS_IDS.submitButton)
			.click()
	}

	goToRegister() {
		cy.clickByTestId(TEST_BUTTONS_IDS.goToRegister)
	}

	fillQuestion() {
		cy.getByTestId(TEST_ENTITY_NAMES.lexical).first().click().clear().type('question')
	}
	fillAnswer() {
		cy.getByTestId(TEST_ENTITY_NAMES.lexical).last().click().clear().type('answer')
	}


	createNewShelfFull(shelfTitle?: string) {
		const now = Date.now().toString() + generateRandomString()
		const shelfName = `testShelf - ${now}`
		this.clickCreateNewShelf()
		this.fillShelfName(shelfTitle ?? shelfName)
		this.submitModal()
		this.checkShelfExistByName(shelfTitle ?? shelfName)
		return shelfName
	}

	createNewCardFull() {
		this.clickCreateNewCard()
		this.clickFirstShelfInCreateNewCardModal()
		cy.wait(500)
		this.fillQuestion()
		this.fillAnswer()
		this.submitModal()
		cy.wait(500)
		cy.get('body').type('{esc}');
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
