import { Theme } from '@/shared/types/Theme';

export interface JsonSettings {
	theme?: Theme
	isFirstVisit?: boolean
	// settingsPageHasBeenOpen?: boolean
	postRegistrationStep: PostRegistrationStep
	hasCreatedFirstShelf: boolean
	// postRegistrationStep: {
	// 	isLanguageSte
	// }
}
export type PostRegistrationStep = 'LANGUAGE_CONFIRMATION' | 'TIMEZONE_CONFIRMATION' | 'TIMEZONE_SETUP' | 'COMPLETED'
