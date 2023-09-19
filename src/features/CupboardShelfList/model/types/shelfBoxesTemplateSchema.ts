import { BoxCoordinates, RegularAndLearntCardsBox } from '@/entities/Box'
import { ExtendedTimingBlock, TimingBlock } from '@/shared/types/DataBlock'
import { SettingsShelfTemplateMod } from '@/shared/types/SettingsShelfTemplateMod'


export interface ShelfBoxesTemplateSchema {
	mode: SettingsShelfTemplateMod
	isOpen: boolean
	isCurrentTemplateEqualToInitial: boolean
	shelfId: string
	initialTemplate: RegularAndLearntCardsBox[]
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
		boxData?: ExtendedTimingBlock
	},
}