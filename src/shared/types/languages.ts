export const Langs = {
	en: 'en',
	ru: 'ru'
} as const;

export type Langs = keyof typeof Langs;
export const languages: Langs[] = ['en', 'ru']