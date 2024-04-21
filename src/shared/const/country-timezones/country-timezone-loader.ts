import { CountryTimeZoneMap } from './types';

// Функция для динамической загрузки данных о часовых поясах
export const loadCountryTimeZones = async (locale: 'en' | 'ru'): Promise<CountryTimeZoneMap> => {
	let module;
	switch (locale) {
		case 'en':
			module = await import('./country-timezones-en');
			break
		case 'ru':
			module = await import('./country-timezones-ru');
			break
		default:
			module = await import('./country-timezones-en');
			break
	}
	return module.countryTimeZonesMap;
};