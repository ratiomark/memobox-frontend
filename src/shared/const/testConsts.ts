export const TEST_PAGES_IDS = {
	mainPage: 'mainPage',
	loginPage: 'loginPage',
	viewPage: 'viewPage',
	viewEmptyPage: 'viewEmptyPage',
	settingsPage: 'settingsPage',
	statsPage: 'statsPage',
	trashPage: 'trashPage',
	trainingPage: 'trainingPage',
	subscriptionPage: 'subscriptionPage',
	profilePage: 'profilePage',
	aboutPage: 'aboutPage',
	confirmEmailPage: 'confirmEmailPage',
	forbiddenPage: 'forbiddenPage',
	notFoundPage: 'notFoundPage',
} as const;

export const TEST_BUTTONS_IDS = {
	loginButton: 'loginButton',
	goToLogin: 'goToLogin',
	goToRegister: 'goToRegister',
	registerButton: 'registerButton',
	forgotPasswordLink: 'forgotPasswordLink',
	// main page
	createNewShelfOpen: 'createNewShelfOpen',
	createNewCardOpen: 'createNewCardOpen',
	shelf: {
		addCardButton: 'addCardButton',
		shelfSettingsButton: 'shelfSettingsButton',
		viewButton: 'viewButton',
		trainButton: 'trainButton',
		collapseButton: 'collapseButton',
		dragButton: 'dragButton',
		skeletonButtons: 'skeletonButtons',
		// shelf settings buttons
		removeShelfButton: 'removeShelfButton',
	},
	trash: {
		restoreButton: 'restoreButton',
		removeButton: 'removeButton',
		collapseButton: 'collapseButton',
	},
	view: {
		commonShelf: 'commonShelf',
		shelfItem: 'shelfItem',
	},
	training: {
		shownAnswerButton: 'shownAnswerButton',
		badAnswerButton: 'badAnswerButton',
		goodAnswerButton: 'goodAnswerButton',
		middleAnswerButton: 'middleAnswerButton',
		endTrainingButton: 'endTrainingButton',
		previousCardButton:'previousCardButton',
		skipCardButton:'skipCardButton',
		editCardButton:'editCardButton',
	},
	// common
	cancelButton: 'cancelButton',
	submitButton: 'submitButton',

}

export const TEST_INPUTS_IDS = {
	loginInputPassword: 'loginInputPassword',
	loginInputEmail: 'loginInputEmail',
	registerInputPassword: 'registerInputPassword',
	registerInputFirstName: 'registerInputFirstName',
	registerInputEmail: 'registerInputEmail',
	authInputPassword: 'authInputPassword',
	authInputEmail: 'authInputEmail',
	// mainPage
	createNewShelfModalInput: 'createNewShelfModalInput',

	common: {
		inputShowError: 'inputShowError'
	}

}

export const TEST_USER_DATA = {
	email: 'john.doe@example.com',
	password: 'secret',
	name: 'John Doe',
}

export const TEST_ENTITY_NAMES = {
	shelfItem: 'shelfItem',
	shelfItemTrash: 'shelfItemTrash',
	shelfItemDeleting: 'shelfItemDeleting',
	shelfItemViewPage: 'shelfItemViewPage',
	commonShelf: 'commonShelf',
	cardItem: 'cardItem',
	boxItem: 'boxItem',
	boxes: {
		all: 'all',
		new: 'new',
		learning: 'learning',
		learnt: 'learnt',
	},
	labels: {
		allLabel: 'allLabel',
		trainLabel: 'trainLabel',
		waitLabel: 'waitLabel',
		labelInfo: 'labelInfo',
	},
	modalOpen: 'modalOpen',
	modalClose: 'modalClose',
	dropdownItems: 'dropdownItems',
	lexical: 'lexical',
	listBoxTriggerShelf: 'listBoxTriggerShelf',
	listBoxTriggerBox: 'listBoxTriggerBox',
	listBoxItem: 'listBoxItem',
	skeleton: 'skeleton',
}
export const TEST_NAVIGATION_IDS = {
	navigateView: 'navigateView',
	navigateTrash: 'navigateTrash',
	navigateSettings: 'navigateSettings',
	navigateStats: 'navigateStats',
	navigateSubscription: 'navigateSubscription',
	navigateMain: 'navigateMain',
	navigateLogin: 'navigateLogin',
} as const