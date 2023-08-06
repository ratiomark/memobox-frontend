import { StateSchema } from '@/app/providers/StoreProvider';


export const getSettingsInitialShelfTemplate = (state: StateSchema) => state.settingsShelfTemplate?.initialTemplate
export const getSettingsCurrentShelfTemplate = (state: StateSchema) => state.settingsShelfTemplate?.currentShelfTemplate
export const getSettingsShelfTemplateMode = (state: StateSchema) => state.settingsShelfTemplate?.mode
export const getSettingsShelfTemplateChanged = (state: StateSchema) => state.settingsShelfTemplate?.changed


// export const getBoxIsTimeSetterOpen = (state: StateSchema, id: number | string) => state.settingsShelfTemplate?.boxTimeSetterModal.isOpen
// export const getBoxIsTimeSetterOpen = (state: StateSchema, id: number | string) => state.settingsShelfTemplate?.currentShelfTemplate.find(item => item.id === id)?.isOpen