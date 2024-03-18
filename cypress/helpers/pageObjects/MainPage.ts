/// <reference types="cypress" />
import { TEST_BUTTONS_IDS, TEST_ENTITY_NAMES, TEST_INPUTS_IDS, TEST_USER_DATA } from '../../../src/shared/const/testConsts'; // Импортируем константы
import { generateDataTestIdSelector, generateRandomString } from '..';
import { Labels, ShelfBox } from '#/types';
// import { generateDataTestIdSelector } from '../commands';
// type ShelfBox = 'new' | 'learnt' | number;

export class MainPage {
	visit() {
		cy.visit('/');
	}
	pageReadyCheck() {
		this.getAllShelves().should('exist')
		cy.getByTestId(TEST_BUTTONS_IDS.shelf.skeletonButtons).should('not.exist');
	}

	clickBoxTraining(box: ShelfBox) {
		if (typeof box === 'number' ) {
			cy.getByTestId(TEST_ENTITY_NAMES.boxItem)
				.eq(box - 1)
				.findByTestId(TEST_BUTTONS_IDS.shelf.trainButton)
				.click();
		} else {
			cy.getByTestId(TEST_ENTITY_NAMES.boxes[box])
				.findByTestId(TEST_BUTTONS_IDS.shelf.trainButton)
				.click()
		}
	}


	checkLabelOnBoxFirstShelf(box: ShelfBox, label: Labels = 'allLabel', checkValue: number) {
		const expectedText = checkValue.toString();
		if (typeof box === 'number' ) {
			cy.getByTestId(TEST_ENTITY_NAMES.boxItem)
				.eq(box - 1)
				.findByTestId(label)
				// .findByTestId(TEST_ENTITY_NAMES.labels.labelInfo)
				.should('have.text', expectedText)
				// .click();
		} else {
			cy.getByTestId(TEST_ENTITY_NAMES.boxes[box])
				.find(generateDataTestIdSelector(label))
				.should('have.text', expectedText)
		}
	}

	clickBox(box: 'new'|'learnt'| number) {
		if (typeof box === 'number' ) {
			cy.getByTestId(TEST_ENTITY_NAMES.boxItem).eq(box-1).click();
		} else {
			cy.getByTestId(box).click()
		}
	}
	unfoldFirstShelf() {
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItem)
			.first()
			.invoke('attr', 'data-shelf-is-collapsed-testid')
			.then(isCollapsed => {
				if (isCollapsed === 'true') {
					cy.getByTestId(TEST_BUTTONS_IDS.shelf.collapseButton).first().click();
				} 
			});
	}

	unfoldShelfByName(shelfName: string) {
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItem)
			.contains('h3', shelfName) // Находим заголовок h3 с именем полки
			.closest('li') // Находим ближайший элемент li, который является родителем для h3
			.then($li => { // Теперь $li - это jQuery объект, представляющий li элемент
				const isCollapsed = $li.attr('data-shelf-is-collapsed-testid'); // Получаем значение атрибута
				if (isCollapsed === 'true') {
					// Если полка свёрнута, находим кнопку для её разворачивания внутри этого же li и кликаем по ней
					cy.wrap($li)
						.findByTestId(TEST_BUTTONS_IDS.shelf.collapseButton)
						.click();
				}
			});
	}
	
	clickShelfViewByName(shelfName: string) {
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItem)
			.contains('h3', shelfName)
			.closest('li') // Находим ближайший элемент li, который является родителем для h3
			.findByTestId(TEST_BUTTONS_IDS.shelf.viewButton) // Находим кнопку внутри этого li
			.click(); // Кликаем по кнопке
	}

	clickShelfTrainByName(shelfName: string) {
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItem)
			.contains('h3', shelfName)
			.closest('li') // Находим ближайший элемент li, который является родителем для h3
			.find(generateDataTestIdSelector(TEST_BUTTONS_IDS.shelf.trainButton)) // Находим кнопку внутри этого li
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
	// removeAllShelfExceptLast3() {
	// 	cy.getByTestId(TEST_ENTITY_NAMES.shelfItem).then($all => {
	// 		cy.wrap($all).each(($el, index, $list) => {
	// 			if (index !== $list.length - 1) {
	// 				cy.wrap($el).findByTestId(TEST_BUTTONS_IDS.shelf.shelfSettingsButton).click();
	// 				cy.getByTestId(TEST_ENTITY_NAMES.dropdownItems).findByTestId(TEST_BUTTONS_IDS.shelf.removeShelfButton).click();
	// 			}
	// 		})
	// 	})
	// }
	removeAllShelfExceptLast() {
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItem).each(($el, index, $list) => {
			if (index !== $list.length - 1) {
				cy.wrap($el).findByTestId(TEST_BUTTONS_IDS.shelf.shelfSettingsButton).click();
				cy.getByTestId(TEST_ENTITY_NAMES.dropdownItems).findByTestId(TEST_BUTTONS_IDS.shelf.removeShelfButton).click();
			}
		})
	}
	// removeAllShelfExceptLast2() {
	// 	cy.getByTestId(TEST_ENTITY_NAMES.shelfItem).then($all => {
	// 		cy.wrap($all).each(($el, index, $list) => {
	// 			if (index !== $list.length - 1) {
	// 				cy.wrap($el).findByTestId(TEST_BUTTONS_IDS.shelf.shelfSettingsButton).click();
	// 				cy.getByTestId(TEST_ENTITY_NAMES.dropdownItems).findByTestId(TEST_BUTTONS_IDS.shelf.removeShelfButton).click();
	// 			}
	// 		})
	// 	})

	// 	// const deleteShelf = () => {
	// 	// 	cy.getByTestId(TEST_ENTITY_NAMES.shelfItem).then($list => {
	// 	// 		if ($list.length > 1) { // Проверяем, что полок больше двух
	// 	// 			cy.wrap($list).first().findByTestId(TEST_BUTTONS_IDS.shelf.shelfSettingsButton).click();
	// 	// 			cy.getByTestId(TEST_ENTITY_NAMES.dropdownItems).findByTestId(TEST_BUTTONS_IDS.shelf.removeShelfButton).click();

	// 	// 			deleteShelf(); // Рекурсивно вызываем функцию, чтобы удалить следующую полку
	// 	// 		}
	// 	// 	});
	// 	// };

	// 	// deleteShelf();
	// 	// Проверяем, что осталось только две полки
	// 	cy.getByTestId(TEST_ENTITY_NAMES.shelfItem).should('have.length', 1);
	// }

	submitModal() {
		cy.getByTestId(TEST_ENTITY_NAMES.modalOpen)
			.first()
			.findByTestId(TEST_BUTTONS_IDS.submitButton)
			.click()
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
