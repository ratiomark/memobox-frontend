/// <reference types="cypress" />
import { generateDataTestIdSelector } from '#/helpers';
import '@4tw/cypress-drag-drop';
// https://on.cypress.io/custom-commands

Cypress.Commands.add('getByTestId', (testId, ...args) => {
	return cy.get(generateDataTestIdSelector(testId), ...args);
});

// @ts-ignore
Cypress.Commands.add('findByTestId', { prevSubject: ['element'] }, (subject, testId, ...args) => {
	// @ts-ignore
	return subject.find(generateDataTestIdSelector(testId), ...args);
});

Cypress.Commands.add('clickByTestId', (testId, ...args) => {
	return cy.get(generateDataTestIdSelector(testId), ...args).click();
});

Cypress.Commands.add('typeByTestId', (testId, text, ...args) => {
	return cy.get(generateDataTestIdSelector(testId), ...args).type(text);
	// return cy.get(`[data-testid="${testId}"]`, ...args).type(text);
});

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }