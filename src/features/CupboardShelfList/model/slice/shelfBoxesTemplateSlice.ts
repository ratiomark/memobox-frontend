import { createSlice, PayloadAction, } from '@reduxjs/toolkit'
import { ExtendedTimingBlock, TimingBlock } from '@/shared/types/DataBlock'
import { timingDataDefault } from '@/shared/const/timingBlock'
import { BoxCoordinates, RegularAndLearntCardsBox } from '@/entities/Box'
import { ShelfBoxesTemplateSchema } from '../types/shelfBoxesTemplateSchema'
import { SettingsShelfTemplateMod } from '@/shared/types/SettingsShelfTemplateMod'


const initialState: ShelfBoxesTemplateSchema = {
	mode: 'initial',
	isOpen: false,
	shelfId: '',
	isCurrentTemplateEqualToInitial: true,
	initialTemplate: [],
	currentShelfTemplate: [],
	boxesSettingsListEdges: {
		leftSide: false,
		rightSide: false,
	},
	boxTimeSetterModal: {
		isOpen: false,
		boxTimingData: timingDataDefault,
		boxId: '',
		boxCoordinates: {
			x: 0,
			y: 0,
		},
	},
}
// _id: string
// specialType: 'none' | 'learnt',
// index: number
// data: DataBlock
// timing: TimingBlock
// missedTrainingAction ?: MissedTrainingValues
const isCurrentTemplateEqualToInitial = (initialState: RegularAndLearntCardsBox[], currentState: ExtendedTimingBlock[]) => {
	if (initialState.length !== currentState.length) return false
	if (currentState.some(box => box.keyId === 'unsaved')) return false
	return true
}

const ShelfBoxesTemplateSettings = createSlice({
	name: 'shelfBoxesTemplateModal',
	initialState,
	reducers: {
		setInitialTemplate: (state, action: PayloadAction<RegularAndLearntCardsBox[]>) => {
			state.initialTemplate = action.payload
			// if (state.currentShelfTemplate.length === 0) {
			state.currentShelfTemplate = action.payload.map((box) => {
				return ({
					isSaved: true,
					keyId: 'initial',
					id: box._id,
					isOpen: false, 
					index: box.index,
					...box.timing
				})
			})
			// }
		},

		// 
		setIsLeftSideActive: (state, action: PayloadAction<boolean>) => {
			state.boxesSettingsListEdges.leftSide = action.payload
		},
		setIsRightSideActive: (state, action: PayloadAction<boolean>) => {
			state.boxesSettingsListEdges.rightSide = action.payload
		},

		// time setter modal
		setTimingSetterModalIsOpen: (state, action: PayloadAction<boolean>) => {
			state.boxTimeSetterModal.isOpen = action.payload
		},
		setTimingSetterModalBoxId: (state, action: PayloadAction<string>) => {
			state.boxTimeSetterModal.boxId = action.payload
		},
		setTimingSetterBoxTimingData: (state, action: PayloadAction<TimingBlock>) => {
			state.boxTimeSetterModal.boxTimingData = action.payload
		},
		setTimingSetterBoxCoordinates: (state, action: PayloadAction<BoxCoordinates>) => {
			state.boxTimeSetterModal.boxCoordinates = {
				x: action.payload.x,
				y: action.payload.y
			}
		},
		setCurrentTemplate: (state, action: PayloadAction<ExtendedTimingBlock[]>) => {
			state.currentShelfTemplate = action.payload.map((box, index) => ({ ...box, index }))
			// state.isCurrentTemplateEqualToInitial = isCurrentTemplateEqualToInitial(state.initialTemplate, state.currentShelfTemplate)
		},
		setMode: (state, action: PayloadAction<SettingsShelfTemplateMod>) => {
			state.mode = action.payload
		},
		openTimeSetter: (state, action: PayloadAction<number | string>) => {
			state.currentShelfTemplate = state.currentShelfTemplate.map(box => {
				if (box.id === action.payload) {
					return { ...box, isOpen: true }
				}
				return box
			})
		},
		setTimeToBoxById: (state, action: PayloadAction<{ boxId: number | string, timeObject: TimingBlock }>) => {
			state.currentShelfTemplate = state.currentShelfTemplate.map(box => {
				if (box.id === action.payload.boxId) {
					return { ...box, isOpen: false, isSaved: true, keyId: 'unsaved', ...action.payload.timeObject }
				}
				return box
			})
			state.mode = 'waitingForSaving'
			// state.isCurrentTemplateEqualToInitial = isCurrentTemplateEqualToInitial(state.initialTemplate, state.currentShelfTemplate)
		},
		closeTimeSetter: (state, action: PayloadAction<number | string>) => {
			state.currentShelfTemplate = state.currentShelfTemplate.map(box => {
				if (box.id === action.payload) {
					return { ...box, isOpen: false }
				}
				return box
			})
			state.mode = 'waitingForSaving'
			// state.isCurrentTemplateEqualToInitial = isCurrentTemplateEqualToInitial(state.initialTemplate, state.currentShelfTemplate)
			// state.currentShelfTemplate = action.payload.map((box, index) => ({ ...box, index }))
		},
		removeAddedBox: (state) => {
			if (state.mode === 'initial') return
			const newCurrentShelfTemplate = state.currentShelfTemplate
				.filter(box => box.isSaved)
				.map((box, index) => ({ ...box, index }))
			state.currentShelfTemplate = newCurrentShelfTemplate
			// state.isCurrentTemplateEqualToInitial = isCurrentTemplateEqualToInitial(state.initialTemplate, newCurrentShelfTemplate)
			state.mode = 'waitingForSaving'
			// state.currentShelfTemplate = state.currentShelfTemplate
			// 	.filter(box => box.isSaved)
			// 	.map((box, index) => ({ ...box, index }))
			// state.isCurrentTemplateEqualToInitial = isCurrentTemplateEqualToInitial(state.initialTemplate, state.currentShelfTemplate)
		},
		reset: (state) => {
			state.mode = 'initial'
			state.currentShelfTemplate = state.initialTemplate.map((box) => {
				return ({
					isSaved: true,
					keyId: 'initial',
					id: box._id,
					isOpen: false,
					...box.timing
				})
			})
			state.isCurrentTemplateEqualToInitial = true
			state.boxesSettingsListEdges.leftSide = false
			state.boxesSettingsListEdges.rightSide = false
		},
		setIsCurrentTemplateEqualToInitial: (state, action: PayloadAction<boolean>) => {
			state.isCurrentTemplateEqualToInitial = action.payload
		},
	}
})

export const { actions: shelfBoxesTemplateSettingsActions } = ShelfBoxesTemplateSettings
export const { reducer: shelfBoxesTemplateSettingsReducer } = ShelfBoxesTemplateSettings