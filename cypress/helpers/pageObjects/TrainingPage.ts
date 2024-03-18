/// <reference types="cypress" />
import { TEST_BUTTONS_IDS, TEST_ENTITY_NAMES, TEST_INPUTS_IDS, TEST_USER_DATA } from '../../../src/shared/const/testConsts'; // Импортируем константы
import { generateDataTestIdSelector } from '..';
// import { generateDataTestIdSelector } from '../commands';
// TEST_BUTTONS_IDS.trash.restoreButton
type ModifiedLabelsObject = Omit<typeof TEST_ENTITY_NAMES.labels, 'labelInfo'>;
type Labels = keyof ModifiedLabelsObject;
export class ViewPage {
	visit() {
		cy.visit('/training/all/all');
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
	
	clickShowAnswer() {
		cy.getByTestId(TEST_BUTTONS_IDS.training.shownAnswerButton).click();
	}
	clickBadAnswer() {
		cy.getByTestId(TEST_BUTTONS_IDS.training.badAnswerButton).click();
	}
	clickMiddleAnswer() {
		cy.getByTestId(TEST_BUTTONS_IDS.training.middleAnswerButton).click();
	}
	clickGoodAnswer() {
		cy.getByTestId(TEST_BUTTONS_IDS.training.goodAnswerButton).click();
	}
	clickEndTraining() {
		cy.getByTestId(TEST_BUTTONS_IDS.training.endTrainingButton).click();
	}
	clickPreviousCard() { 
		cy.getByTestId(TEST_BUTTONS_IDS.training.previousCardButton).click();
	}
	clickSkipCard() {
		cy.getByTestId(TEST_BUTTONS_IDS.training.skipCardButton).click();
	}
	clickEditCardButton() {
		cy.getByTestId(TEST_BUTTONS_IDS.training.editCardButton).click();
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
