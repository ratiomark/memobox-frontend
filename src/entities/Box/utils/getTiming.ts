import { TimingBlock } from '@/shared/types/DataBlock';

const timeUnits = {
	en: {
		months: 'm',
		weeks: 'w',
		days: 'd',
		hours: 'h',
		minutes: 'min'
	},
	ru: {
		months: 'м',
		weeks: 'н',
		days: 'д',
		hours: 'ч',
		minutes: 'мин'
	}

};

import i18n from 'i18next'
export default function formatTiming(timing: TimingBlock, lang: keyof typeof timeUnits = 'en'): string {
	// const lang i18n.resolvedLanguage
	const langChecked = (i18n.resolvedLanguage in timeUnits
		? i18n.resolvedLanguage
		: 'en'
	) as keyof typeof timeUnits;
	const { months, weeks, days, hours, minutes } = timing;
	let result = '';

	if (months > 0) result += `${months}${timeUnits[langChecked]['months']} `;
	if (weeks > 0) result += `${weeks}${timeUnits[langChecked]['weeks']} `;
	if (days > 0) result += `${days}${timeUnits[langChecked]['days']} `;
	if (hours > 0) result += `${hours}${timeUnits[langChecked]['hours']} `;
	if (minutes > 0) result += `${minutes}${timeUnits[langChecked]['minutes']} `;

	return result.trim();
}


// export default (box: RegularAndLearntCardsBox) => {
// 	const { months, weeks, days, hours, minutes } = box.timing
// 	const monthsStr = months === 0 ? '' : `${months}mo `
// 	const weeksStr = weeks === 0 ? '' : `${weeks}w `
// 	const daysStr = days === 0 ? '' : `${days}d `
// 	const hoursStr = hours === 0 ? '' : `${hours}h `
// 	const minutesStr = minutes === 0 ? '' : `${minutes}m `
// 	return monthsStr + weeksStr + daysStr + hoursStr + minutesStr
// }
