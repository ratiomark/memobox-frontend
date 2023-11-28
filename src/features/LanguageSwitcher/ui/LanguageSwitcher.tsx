import { useTranslation } from 'react-i18next';

export const Langs = {
	en: 'en',
	ru: 'ru'
} as const;

export type Langs = keyof typeof Langs;

export const useCustomTranslate = (nameSpaceTranslation?: string) => {
	const { t, i18n } = useTranslation(nameSpaceTranslation)
	const setLang = (lang: Langs) => i18n.changeLanguage(lang)
	const currentLang = i18n.language as Langs

	let allLangs = i18n.options.supportedLngs
	if (Array.isArray(allLangs)) {
		allLangs = allLangs!.slice(0, allLangs!.length - 1).sort()
	} else {
		allLangs = Object.values(Langs).sort()
	}

	return { setLang, t, currentLang, allLangs }
}