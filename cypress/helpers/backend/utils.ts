export const loginAndGetToken = () => {
	return cy.fixture('loginDataBase.json').then(({ email, password }) => {
		return cy
			.request({
				method: 'POST',
				url: `${Cypress.env('API_URL')}/auth/email/login`,
				body: { email, password },
			})
			.then((response) => {
				return response.body.token; // Предполагаем, что токен находится в body ответа
			});
	});
};
export const restoreDb = (token: string) => {
	return cy.request({
		method: 'POST',
		url: `${Cypress.env('API_URL')}/aggregate/restore-db`,
		auth: {
			bearer: token,
		},
	})
}
export const saveDb = (token: string) => {
	return cy.request({
		method: 'POST',
		url: `${Cypress.env('API_URL')}/aggregate/save-db`,
		auth: {
			bearer: token,
		},
	})
}
