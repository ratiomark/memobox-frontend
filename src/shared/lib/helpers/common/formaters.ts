import { ExtendedTimingBlock } from '@/shared/types/DataBlock'

export const formatDate = (ISODate: string) => {
	const date = new Date(ISODate)
	const day = date.getUTCDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	const minutes = date.getUTCMinutes()
	const hours = date.getUTCHours()
	return `${day}.${month}.${year}\n${hours}:${minutes < 10 ? '0' + minutes : minutes}`
}


export const getTiming = (box: ExtendedTimingBlock) => {
	const { months, weeks, days, hours, minutes } = box
	const monthsStr = months === 0 ? '' : `${months}m. `
	const weeksStr = weeks === 0 ? '' : `${weeks}w. `
	const daysStr = days === 0 ? '' : `${days}d. `
	const hoursStr = hours === 0 ? '' : `${hours}h. `
	const minutesStr = minutes === 0 ? '' : `${minutes}min. `
	return monthsStr + weeksStr + daysStr + hoursStr + minutesStr
}