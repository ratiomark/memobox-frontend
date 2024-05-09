import { ExtendedTimingBlock } from '@/shared/types/DataBlock'

export const formatDate = (utcDateString: string | null) => {
	if (!utcDateString || utcDateString === '---') return '—'
	const date = new Date(utcDateString);

	const pad = (num: number) => (num < 10 ? '0' + num : num);

	const day = pad(date.getDate());
	const month = pad(date.getMonth() + 1); // Месяцы начинаются с 0
	const year = date.getFullYear();

	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());

	return `${day}.${month}.${year}\n${hours}:${minutes}`;
}
export const formatDateLastTraining = (utcDateString: string | null) => {
	if (!utcDateString || utcDateString === '---') return '---'
	const date = new Date(utcDateString);

	return date.toLocaleDateString('ru-RU', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}
export function timeLeft(utcTime: string) {
	console.log(utcTime, '---------------')
	const eventTime = new Date(utcTime);
	const currentTime = new Date();
	// @ts-ignore
	const diff = eventTime - currentTime;
	if (diff < 0 || utcTime === '---') return 'пора'
	// Конвертируем разницу в секунды, минуты, часы и дни
	const diffSeconds = Math.floor(diff / 1000);
	const diffMinutes = Math.floor(diffSeconds / 60);
	const diffHours = Math.floor(diffMinutes / 60);
	const diffDays = Math.floor(diffHours / 24);

	if (diffDays > 1) {
		return `${diffDays} дн.`;
	} else if (diffHours > 0) {
		return `${diffHours} ч.`;
	} else if (diffMinutes > 0) {
		return `${diffMinutes} мин.`;
	} else {
		return '< минуты';
	}
}


export const formatUtcOffset = (offset: number) => {
	// Определяем знак смещения
	const sign = offset >= 0 ? '+' : '-';

	// Преобразуем смещение в абсолютное значение для упрощения вычислений
	const absoluteOffset = Math.abs(offset);

	// Вычисляем количество полных часов и минут
	const hours = Math.floor(absoluteOffset / 60);
	const minutes = absoluteOffset % 60;

	// Формируем строку с ведущими нулями, если необходимо
	const formattedHours = hours.toString().padStart(2, '0');
	const formattedMinutes = minutes.toString().padStart(2, '0');

	return `${sign}${formattedHours}:${formattedMinutes}`;
}

// export const formatDate = (ISODate: string | null | Date) => {
// 	// return ISODate ?? '---'

// 	if (!ISODate) return '---'
// 	const date = new Date(ISODate)
// 	const day = date.getUTCDate()
// 	const month = date.getMonth() + 1
// 	const year = date.getFullYear()
// 	const minutes = date.getUTCMinutes()
// 	const hours = date.getUTCHours()
// 	return `${day}.${month}.${year}\n${hours}:${minutes < 10 ? '0' + minutes : minutes}`
// }


export const getTiming = (box: ExtendedTimingBlock) => {
	const { months, weeks, days, hours, minutes } = box
	const monthsStr = months === 0 ? '' : `${months}m. `
	const weeksStr = weeks === 0 ? '' : `${weeks}w. `
	const daysStr = days === 0 ? '' : `${days}d. `
	const hoursStr = hours === 0 ? '' : `${hours}h. `
	const minutesStr = minutes === 0 ? '' : `${minutes}min. `
	return monthsStr + weeksStr + daysStr + hoursStr + minutesStr
}