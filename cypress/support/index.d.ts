/// <reference types="cypress" />
declare namespace Cypress {
	interface Chainable {

		/**
			 * Custom command to get a DOM element by data-testid attribute.
			 */
		getByTestId(testId: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>): Chainable<JQuery<HTMLElement>>;

		/**
		 * Custom command to click on a DOM element by data-testid attribute.
		 */
		clickByTestId(testId: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>): Chainable<JQuery<HTMLElement>>;


		/**
		 * Custom command to type into a DOM element by data-testid attribute.
		 */
		typeByTestId(testId: string, text: string, options?: Partial<Cypress.TypeOptions & Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>): Chainable<JQuery<HTMLElement>>;


		/**
		 * Finds an element by data-testid attribute within a parent element.
		 * @example cy.get('body').findByTestId('submitButton')
		 */
		findByTestId(testId: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>): Chainable<JQuery<HTMLElement>>;
	}
}