import { useSetUserLangMutation } from '@/entities/User';
import { localDataService } from '@/shared/lib/helpers/common/localDataService';
import { Langs } from '@/shared/types/languages';
import { useTranslation } from 'react-i18next';
// import moment from 'moment-timezone';
// import { getBrowserLanguage } from '@/shared/lib/helpers/common/getBrowserLanguage';
// import { loadCountries } from '@/shared/const/country-timezones/country-loader';
// import { loadCountryTimeZones } from '@/shared/const/country-timezones/country-timezone-loader';
// export const Langs = {
// 	en: 'en',
// 	ru: 'ru'
// } as const;

// export type Langs = keyof typeof Langs;


export const useCustomTranslate = (nameSpaceTranslation?: string) => {
	const { t, i18n } = useTranslation(nameSpaceTranslation)
	const [setUserLang] = useSetUserLangMutation()
	const setLang = async (lang: Langs) => {
		i18n.changeLanguage(lang)
		setUserLang({
			userId: localDataService.getUserId(),
			language: lang
		})
	}
	const currentLang = i18n.language as Langs

	let allLangs = i18n.options.supportedLngs as Langs[]
	if (Array.isArray(allLangs)) {
		allLangs = allLangs.slice(0, allLangs.length - 1).sort()
	} else {
		allLangs = Object.values(Langs).sort()
	}

	return { setLang, t, currentLang, allLangs }
}