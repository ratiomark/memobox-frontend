export interface DataBlock {
	wait: number
	all: number
	train: number
}

export interface TimingBlock {
	minutes: number
	hours: number
	days: number
	weeks: number
	months: number
}

export type ExtendedTimingBlock = TimingBlock & {
	index: number
	isSaved: boolean
	isRemoved?: boolean
	keyId: 'initial' | 'unsaved'
	id: string
	isOpen: boolean
}

export type MissedTrainingValues = 'none' | 'additional' | 'backwards'