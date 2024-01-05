import clsx from 'clsx';
import { memo } from 'react';
import { SmallDataLabel } from '../SmallDataLabels/SmallDataLabel';
import cls from './CompleteSmallDataLabels.module.scss';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useSelector } from 'react-redux';

interface CompleteSmallDataLabelsProps {
	className?: string
	data?: {
		wait: number
		all: number
		train: number
	}
	isLoading?: boolean
	isRefetchingSelectorFn?: (state: StateSchema) => boolean
}

export const CompleteSmallDataLabels = memo((props: CompleteSmallDataLabelsProps) => {
	const {
		className,
		data,
		isLoading = true,
		isRefetchingSelectorFn
	} = props

	if (isRefetchingSelectorFn) {
		return (
			<CompleteSmallDataLabelsWithSelector
				data={data}
				className={className}
				isRefetchingSelectorFn={isRefetchingSelectorFn}
			/>)
	}

	return (
		<div className={clsx(
			cls.CompleteSmallDataLabels,
			[className])}
		>
			<SmallDataLabel isLoading={isLoading} cardsCount={data?.all} type='all' />
			<SmallDataLabel isLoading={isLoading} cardsCount={data?.train} type='train' />
			<SmallDataLabel isLoading={isLoading} cardsCount={data?.wait} type='wait' />
		</div>
	)
})

interface CompleteSmallDataLabelsWithSelectorProps {
	className?: string
	data?: {
		wait: number
		all: number
		train: number
	}
	isRefetchingSelectorFn: (state: StateSchema) => boolean
}
const CompleteSmallDataLabelsWithSelector = (props: CompleteSmallDataLabelsWithSelectorProps) => {
	const {
		className,
		data,
		isRefetchingSelectorFn,
	} = props
	const isLoading = useSelector(isRefetchingSelectorFn)
	return (
		<div className={clsx(
			cls.CompleteSmallDataLabels,
			[className])}
		>
			<SmallDataLabel isLoading={isLoading} cardsCount={data?.all} type='all' />
			<SmallDataLabel isLoading={isLoading} cardsCount={data?.train} type='train' />
			<SmallDataLabel isLoading={isLoading} cardsCount={data?.wait} type='wait' />
		</div>
	)
}

CompleteSmallDataLabels.displayName = 'CompleteSmallDataLabels'