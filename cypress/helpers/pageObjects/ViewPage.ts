/// <reference types="cypress" />
import { TEST_BUTTONS_IDS, TEST_ENTITY_NAMES, TEST_INPUTS_IDS, TEST_USER_DATA } from '../../../src/shared/const/testConsts'; // Импортируем константы
import { generateDataTestIdSelector } from '..';
// import { generateDataTestIdSelector } from '../commands';
// TEST_BUTTONS_IDS.trash.restoreButton
type ModifiedLabelsObject = Omit<typeof TEST_ENTITY_NAMES.labels, 'labelInfo'>;
type Labels = keyof ModifiedLabelsObject;
export class ViewPage {
	visit() {
		cy.visit('/view');
	}
	pageReadyCheck() {
		cy.getByTestId(TEST_ENTITY_NAMES.skeleton).should('not.exist');
		cy.wait(800);
	}
	// TEST_ENTITY_NAMES.commonShelf}]
	// 'data-testid': TEST_ENTITY_NAMES.shelfItemViewPage
	checkShelfExistByName(shelfName: string) {
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItemViewPage).contains('li', shelfName).should('exist');
	}
	
	clickShelfByName(shelfName: string) {
		cy.getByTestId(TEST_ENTITY_NAMES.shelfItemViewPage)
			.contains('li', shelfName)
			.click()
	}
	clickBox(box: keyof typeof TEST_ENTITY_NAMES.boxes | number) {
		if (typeof box === 'number' ) {
			cy.getByTestId(TEST_ENTITY_NAMES.boxItem).eq(box-1).click();
		} else {
			cy.getByTestId(box).click()
		}
	}
	checkLabel(label: Labels = 'allLabel', checkValue: number) {
		const expectedText = checkValue.toString();
		cy.getByTestId(label)
			.findByTestId(TEST_ENTITY_NAMES.labels.labelInfo)
			.should('have.text', expectedText)
	}

	// clickRemoveItem() {
	// 	cy.getByTestId(TEST_ENTITY_NAMES.shelfItemTrash).first().findByTestId(TEST_BUTTONS_IDS.trash.removeButton).click();
	// }

	// clickRestoreItem() {
	// 	cy.clickByTestId(TEST_BUTTONS_IDS.trash.restoreButton)
	// }

	getAllShelves() {
		return cy.getByTestId(TEST_ENTITY_NAMES.shelfItemTrash)
	}
	getAllShelvesCount() {
		return this.getAllShelves().then($list => $list.length)
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

export const ViewPageTest = new ViewPage();
