import { StateSchema } from '@/app/providers/StoreProvider';
import { notificationsMock, shelfTemplateMock, timeSleepMock } from '../mockData/userSettingsData';

export const getUserSettings = (state: StateSchema) => state.user.userSettings

export const getUserMissedTrainingSettings = (state: StateSchema) => state.user.userSettings?.missedTrainingValue ?? 'none'

export const getUserNotificationSettings = (state: StateSchema) => state.user.userSettings?.notifications ?? notificationsMock

export const getUserShelfTemplateSettings = (state: StateSchema) => state.user.userSettings?.shelfTemplate ?? shelfTemplateMock

export const getUserTimeSleepSettings = (state: StateSchema) => state.user.userSettings?.timeSleep ?? timeSleepMock

// export const getUserShelfTemplateSettings = (state: StateSchema) => state.user.authData?.userSetting.shelfTemplate
// export const getUserMissedTrainingSettings = (state: StateSchema) => state.user.authData?.userSetting.missedTrainingValue
// import { StateSchema } from '@/app/providers/StoreProvider';
// export const getUserSettings = (state: StateSchema) => state.user.authData?.userSettings
// export const getUserMissedTrainingSettings = (state: StateSchema) => state.user.authData?.userSettings.missedTrainingValue ?? 'none'
// export const getUserNotificationSettings = (state: StateSchema) => state.user.authData?.userSettings.notifications
// export const getUserShelfTemplateSettings = (state: StateSchema) => state.user.authData?.userSettings.shelfTemplate
// export const getUserTimeSleepSettings = (state: StateSchema) => state.user.authData?.userSettings.timeSleep
// // export const getUserShelfTemplateSettings = (state: StateSchema) => state.user.authData?.userSetting.shelfTemplate
// // export const getUserMissedTrainingSettings = (state: StateSchema) => state.user.authData?.userSetting.missedTrainingValue