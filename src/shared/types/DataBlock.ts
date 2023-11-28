
// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { MissedTrainingValue } from '@/entities/User'

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
	missedTrainingValue?: MissedTrainingValue
}
