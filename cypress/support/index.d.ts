declare namespace Cypress {
	interface Chainable {
		/**
		 * Custom command to select DOM element by data-testid attribute.
		 * @example cy.getByTestId('loginButton')
		 */
		getByTestId(testId: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>): Chainable<Element>;

		/**
		 * Custom command to click on a DOM element by data-testid attribute.
		 * @example cy.clickByTestId('submitButton')
		 */
		clickByTestId(testId: string, options?: Partial<Cypress.ClickOptions & Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>): Chainable<Element>;

		/**
		 * Custom command to type text into a DOM element by data-testid attribute.
		 * @example cy.typeByTestId('inputField', 'Hello, World!')
		 */
		typeByTestId(testId: string, text: string, options?: Partial<Cypress.TypeOptions & Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>): Chainable<Element>;
	}
}