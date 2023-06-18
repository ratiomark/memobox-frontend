import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserSettings = (state: StateSchema) => state.user.authData?.userSettings
export const getUserMissedTrainingSettings = (state: StateSchema) => state.user.authData?.userSettings.missedTrainingAction
export const getUserNotificationSettings = (state: StateSchema) => state.user.authData?.userSettings.notifications
export const getUserShelfTemplateSettings = (state: StateSchema) => state.user.authData?.userSettings.shelfTemplate
// export const getUserShelfTemplateSettings = (state: StateSchema) => state.user.authData?.userSetting.shelfTemplate
// export const getUserMissedTrainingSettings = (state: StateSchema) => state.user.authData?.userSetting.missedTrainingAction