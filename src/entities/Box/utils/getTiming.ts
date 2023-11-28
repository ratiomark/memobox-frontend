import { TimingBlock } from '@/shared/types/DataBlock';

const timeUnits = {
	en: {
		months: 'mo',
		weeks: 'w',
		days: 'd',
		hours: 'h',
		minutes: 'm'
	},
	ru: {
		months: 'мес',
		weeks: 'н',
		days: 'д',
		hours: 'ч',
		minutes: 'м'
	}
	
};

export default function formatTiming(timing: TimingBlock, lang: keyof typeof timeUnits = 'en'): string {
	const { months, weeks, days, hours, minutes } = timing;
	let result = '';

	if (months > 0) result += `${months}${timeUnits[lang]['months']} `;
	if (weeks > 0) result += `${weeks}${timeUnits[lang]['weeks']} `;
	if (days > 0) result += `${days}${timeUnits[lang]['days']} `;
	if (hours > 0) result += `${hours}${timeUnits[lang]['hours']} `;
	if (minutes > 0) result += `${minutes}${timeUnits[lang]['minutes']} `;

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
