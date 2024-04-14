export const getBrowserLanguage = () => {
	return navigator.language.split('-')[0];
}