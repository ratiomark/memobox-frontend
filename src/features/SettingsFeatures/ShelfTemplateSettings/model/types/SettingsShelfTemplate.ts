import { BoxCoordinates } from '@/entities/Box'
import { ExtendedTimingBlock, TimingBlock } from '@/shared/types/DataBlock'
import { SettingsShelfTemplateMod } from '@/shared/types/SettingsShelfTemplateMod'



export interface SettingsShelfTemplate {
	mode: SettingsShelfTemplateMod
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