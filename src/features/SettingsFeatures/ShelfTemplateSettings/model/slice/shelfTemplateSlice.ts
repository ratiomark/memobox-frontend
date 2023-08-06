import { createSlice, PayloadAction, } from '@reduxjs/toolkit'
import { SettingsShelfTemplate, SettingsShelfTemplateMods } from '../types/SettingsShelfTemplate'
import { ExtendedTimingBlock, TimingBlock } from '@/shared/types/DataBlock'
import { isEqual } from 'lodash'
import { timingDataDefault } from '@/shared/const/timingBlock'
import { BoxCoordinates } from '@/entities/Box'


const initialState: SettingsShelfTemplate = {
	mode: 'initial',
	changed: false,
	initialTemplate: [],
	currentShelfTemplate: [],
	boxTimeSetterModal: {
		isOpen: false,
		boxTimingData: timingDataDefault,
		boxId: '',
		boxCoordinates: {
			x: 0,
			y: 0,
		},
	},
	// 	dispatch(settingsShelfTemplateActions.setTimingSetterBoxCoordinates(coordinates))
	// 	dispatch(settingsShelfTemplateActions.setTimingSetterModalIsOpen(true))
	// 	dispatch(settingsShelfTemplateActions.setTimingSetterModalBoxId(boxId))
	// 	dispatch(settingsShelfTemplateActions.setTimingSetterBoxTimingData(timingData))
	// currentShelfTemplate: [],
}


const settingsShelfTemplate = createSlice({
	name: 'settingsShelfTemplate',
	initialState,
	reducers: {
		setInitialTemplate: (state, action: PayloadAction<TimingBlock[]>) => {
			state.initialTemplate = action.payload
			if (state.currentShelfTemplate.length === 0) {
				state.currentShelfTemplate = action.payload.map((timingBlock, index) => ({
					...timingBlock,
					index,
					isSaved: true,
					keyId: 'initial',
					id: Math.random() * Math.random(),
					isOpen: false,
				}))
			}
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
			state.changed = !isEqual(state.initialTemplate, state.currentShelfTemplate)
		},
		setMode: (state, action: PayloadAction<SettingsShelfTemplateMods>) => {
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
					return { ...box, isOpen: false, isSaved: true, ...action.payload.timeObject }
				}
				return box
			})
			state.changed = !isEqual(state.initialTemplate, state.currentShelfTemplate)
		},
		closeTimeSetter: (state, action: PayloadAction<number | string>) => {
			state.currentShelfTemplate = state.currentShelfTemplate.map(box => {
				if (box.id === action.payload) {
					return { ...box, isOpen: false }
				}
				return box
			})
			state.changed = !isEqual(state.initialTemplate, state.currentShelfTemplate)
			// state.currentShelfTemplate = action.payload.map((box, index) => ({ ...box, index }))
		},
		removeAddedBox: (state) => {
			if (state.mode === 'initial') return
			state.currentShelfTemplate = state.currentShelfTemplate
				.filter(box => box.isSaved)
				.map((box, index) => ({ ...box, index }))
			state.changed = !isEqual(state.initialTemplate, state.currentShelfTemplate)
		},
		reset: (state) => {
			state.mode = 'initial'
			state.changed = false
			state.currentShelfTemplate = state.initialTemplate.map((timingBlock, index) => ({
				...timingBlock,
				index,
				isSaved: true,
				keyId: 'initial',
				id: Math.random() * Math.random(),
				isOpen: false,
			}))
			state.changed = false
		},
		setChanged: (state, action: PayloadAction<boolean>) => {
			state.changed = action.payload
		},
	}
})

export const { actions: settingsShelfTemplateActions } = settingsShelfTemplate
export const { reducer: settingsShelfTemplateReducer } = settingsShelfTemplate