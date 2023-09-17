import { RegularAndLearntCardsBox } from '../model/types/BoxSchema'

export default (box: RegularAndLearntCardsBox) => {
	const { months, weeks, days, hours, minutes } = box.timing
	const monthsStr = months === 0 ? '' : `${months}m. `
	const weeksStr = weeks === 0 ? '' : `${weeks}w. `
	const daysStr = days === 0 ? '' : `${days}d. `
	const hoursStr = hours === 0 ? '' : `${hours}h. `
	const minutesStr = minutes === 0 ? '' : `${minutes}min. `
	return monthsStr + weeksStr + daysStr + hoursStr + minutesStr
}