import { StateSchema } from '@/app/providers/StoreProvider';


export const getTimeSleepEnabled = (state: StateSchema) => state.settingsTimeSleep?.isTimeSleepEnabled ?? true
export const getDayByDayOptionEnabled = (state: StateSchema) => state.settingsTimeSleep?.isDayByDayOptionEnabled
export const getGeneralTimeSleepData = (state: StateSchema) => state.settingsTimeSleep?.generalTimeSleepData
export const getDayByDayTimeSleepData = (state: StateSchema) => state.settingsTimeSleep?.dayByDayTimeSleepData