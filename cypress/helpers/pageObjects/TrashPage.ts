/// <reference types="cypress" />
import { TEST_BUTTONS_IDS, TEST_ENTITY_NAMES, TEST_INPUTS_IDS, TEST_USER_DATA } from '../../../src/shared/const/testConsts'; // Импортируем константы
import { generateDataTestIdSelector } from '..';
// import { generateDataTestIdSelector } from '../commands';
// TEST_BUTTONS_IDS.trash.restoreButton
export class TrashPage {
	visit() {
		cy.visit('/trash');
	}
	pageReadyCheck() {
		cy.getByTestId(TEST_ENTITY_NAMES.skeleton).should('not.exist');
		cy.wait(800);
	}

	checkShelfExistByName(shelfName: string) {
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItemTrash).contains('h3', shelfName).should('exist');
	}

	clickRemoveItem() {
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItemTrash).first().findByTestId(TEST_BUTTONS_IDS.trash.removeButton).click();
	}
	clickRestoreItem() {
		cy.clickByTestId(TEST_BUTTONS_IDS.trash.restoreButton)
	}

	getAllShelves() {
		return cy.getByTestId(TEST_ENTITY_NAMES.shelfItemTrash)
	}
	getAllShelvesCount() {
		return this.getAllShelves().then($list => $list.length)
	}
	// removeFirstShelf() {
	// 	cy.getByTestId(TEST_ENTITY_NAMES.shelfItem).first().findByTestId(TEST_BUTTONS_IDS.shelf.shelfSettingsButton).click();
	// 	cy.getByTestId(TEST_ENTITY_NAMES.dropdownItems).findByTestId(TEST_BUTTONS_IDS.shelf.removeShelfButton).click();
	// }
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
	// removeAllShelfExceptLast() {
	// 	cy.getByTestId(TEST_ENTITY_NAMES.shelfItem).each(($el, index, $list) => {
	// 		if (index !== $list.length - 1) {
	// 			cy.wrap($el).findByTestId(TEST_BUTTONS_IDS.shelf.shelfSettingsButton).click();
	// 			cy.getByTestId(TEST_ENTITY_NAMES.dropdownItems).findByTestId(TEST_BUTTONS_IDS.shelf.removeShelfButton).click();
	// 		}
	// 	})
	// }
	removeAll() {
		// cy.getByTestId(TEST_BUTTONS_IDS.trash.removeButton).click({ multiple: true })
		cy.document().then(doc => {
			const elements = doc.querySelectorAll(generateDataTestIdSelector(TEST_ENTITY_NAMES.shelfItemTrash));
			console.log('elements!!!!!!!!!!!!!!!!!!!!', elements)
			console.log('elements!!!!!!!!!!!!!!!!!!!!length', elements.length)
			if (elements.length > 0) {
				cy.getByTestId(TEST_ENTITY_NAMES.shelfItemTrash, { log: false, }).then($all => {
					cy.wrap($all).each(($el, index, $list) => {
						cy.wrap($el).findByTestId(TEST_BUTTONS_IDS.trash.removeButton).click();
						cy.wait(300);
					})
				})
				// cy.wrap(elements).each(($el, index, $list) => {
				// 	cy.wrap($el).findByTestId(TEST_BUTTONS_IDS.trash.removeButton).click();
				// 	cy.wait(200);
				// });
			}
		});
		// cy.getByTestId(TEST_ENTITY_NAMES.shelfItemTrash, { log: false, }).then($all => {
		// cy.wrap($all).each(($el, index, $list) => {
		// 	cy.wrap($el).findByTestId(TEST_BUTTONS_IDS.trash.removeButton).click();
		// 	cy.wait(200);
		// })
		// })


		// cy.getByTestId(TEST_ENTITY_NAMES.shelfItemTrash).should('not.exist');
	}

	submitModal() {
		cy.getByTestId(TEST_ENTITY_NAMES.modalOpen)
			.first()
			.findByTestId(TEST_BUTTONS_IDS.submitButton)
			.click()
	}



	login(email = TEST_USER_DATA.email, password = TEST_USER_DATA.password) {
		cy.getByTestId(TEST_INPUTS_IDS.authInputEmail).clear()
		cy.typeByTestId(TEST_INPUTS_IDS.authInputEmail, email)
		cy.getByTestId(TEST_INPUTS_IDS.authInputPassword).clear()
		cy.typeByTestId(TEST_INPUTS_IDS.authInputPassword, password)
		cy.clickByTestId(TEST_BUTTONS_IDS.loginButton)
	}
}

export const TrashPageTest = new TrashPage();
