/* eslint-disable custom-fsd-checker-plugin/layer-import-sequence */
import { TimeSleepAtomicDataObject } from '@/entities/User';
import { getTimeRepresentation } from '../common/getTimeRepresentation';



export const mapHoursMinutesObjectToStartTimeString = (timeSleepObject: TimeSleepAtomicDataObject): string => {
	const { hours, minutes } = timeSleepObject
	return `${getTimeRepresentation(hours)}:${getTimeRepresentation(minutes)}`
}