import { TimingBlock } from '@/shared/types/DataBlock'


export type ExtendedTimingBlock = TimingBlock & {
	index?: number
	isSaved?: boolean
	keyId?: string
	id: number | string
	isOpen: boolean
}

export type SettingsShelfTemplateMods = 'initial' | 'choosingBoxPlace' | 'settingTimeToNewBox'

export interface SettingsShelfTemplate {
	mode: SettingsShelfTemplateMods
	changed: boolean
	initialTemplate: TimingBlock[]
	currentShelfTemplate: ExtendedTimingBlock[]
}