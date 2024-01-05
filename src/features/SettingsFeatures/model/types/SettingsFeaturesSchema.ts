export interface SettingsFeaturesSchema {
	shelfTemplateModal: {
		isOpen: boolean
	}
	notificationModal: {
		isOpen: boolean
	}
	timeSleepModal: {
		isOpen: boolean
	}
	missedTrainingModal: {
		isOpen: boolean
	}
	manageEmailsModal: {
		isOpen: boolean
	}
	createNewEmailModal: {
		isOpen: boolean
		emailValue: string
	}
}