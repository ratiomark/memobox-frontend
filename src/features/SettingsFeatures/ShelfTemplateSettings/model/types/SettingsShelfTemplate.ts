import { BoxCoordinates } from '@/entities/Box'
import { ExtendedTimingBlock, TimingBlock } from '@/shared/types/DataBlock'


// export type ExtendedTimingBlock = TimingBlock & {
// 	index?: number
// 	isSaved?: boolean
// 	keyId?: string
// 	id: number | string
// 	isOpen: boolean
// }

export type SettingsShelfTemplateMods = 'initial' | 'choosingBoxPlace' | 'settingTimeToNewBox' | 'waitingForSaving'

export interface SettingsShelfTemplate {
	mode: SettingsShelfTemplateMods
	isCurrentTemplateEqualToInitial: boolean
	initialTemplate: TimingBlock[]
	currentShelfTemplate: ExtendedTimingBlock[]
	boxesSettingsListEdges: {
		leftSide: boolean
		rightSide: boolean
	}
	boxTimeSetterModal: {
		isOpen: boolean
		boxCoordinates: BoxCoordinates
		boxTimingData: TimingBlock
		boxId: string
	},
}