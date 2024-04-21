export const loadCountries = async (locale: 'en' | 'ru'): Promise<string[]> => {
	const module = await import(`./countries-${locale}`);
	return module.countries;
};