import { StateSchema } from '@/app/providers/StoreProvider'

export const getIsShelfTemplateModalOpen = (state: StateSchema) => state.settingsFeatures?.shelfTemplateModal.isOpen ?? false
export const getIsTimeSleepModalOpen = (state: StateSchema) => state.settingsFeatures?.timeSleepModal.isOpen ?? false
export const getIsNotificationModalOpen = (state: StateSchema) => state.settingsFeatures?.notificationModal.isOpen ?? false
export const getIsMissedTrainingModalOpen = (state: StateSchema) => state.settingsFeatures?.missedTrainingModal.isOpen ?? false
export const getIsManageEmailsModalOpen = (state: StateSchema) => state.settingsFeatures?.manageEmailsModal.isOpen ?? false
export const getIsCreateNewEmailModalOpen = (state: StateSchema) => state.settingsFeatures?.createNewEmailModal.isOpen ?? false
export const getCreateNewEmailValue = (state: StateSchema) => state.settingsFeatures?.createNewEmailModal.emailValue ?? ''
