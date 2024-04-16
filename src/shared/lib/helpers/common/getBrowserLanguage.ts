import { Langs, languages } from '@/shared/types/languages';

export const getBrowserLanguage = (): Langs => {
	const lang = navigator.language.split('-')[0];
	if (languages.includes(lang as Langs)) {
		return lang as Langs;
	}
	return 'en';
}