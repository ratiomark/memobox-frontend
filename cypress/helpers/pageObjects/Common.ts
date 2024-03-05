/// <reference types="cypress" />
import { TEST_BUTTONS_IDS, TEST_ENTITY_NAMES, TEST_INPUTS_IDS, TEST_USER_DATA } from '../../../src/shared/const/testConsts'; // Импортируем константы
import { generateDataTestIdSelector } from '..';
// import { generateDataTestIdSelector } from '../commands';
// TEST_BUTTONS_IDS.trash.restoreButton
type ModifiedLabelsObject = Omit<typeof TEST_ENTITY_NAMES.labels, 'labelInfo'>;
type Labels = keyof ModifiedLabelsObject;
export class Common {

	checkLabel(label: Labels = 'allLabel', checkValue: number) {
		const expectedText = checkValue.toString();
		cy.getByTestId(label)
			.findByTestId(TEST_ENTITY_NAMES.labels.labelInfo)
			.should('have.text', expectedText)
	}
	
	getLabelValue(label: Labels = 'allLabel') {
		return cy.getByTestId(label)
			.findByTestId(TEST_ENTITY_NAMES.labels.labelInfo)
			.invoke('text')
	}

	
}

export const CommonTest = new Common();
