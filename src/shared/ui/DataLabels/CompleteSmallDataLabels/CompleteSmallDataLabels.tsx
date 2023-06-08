import clsx from 'clsx';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { SmallDataLabel } from '../SmallDataLabels/SmallDataLabel';
import cls from './CompleteSmallDataLabels.module.scss';

interface CompleteSmallDataLabelsProps {
	className?: string
	data?: {
		wait: number
		all: number
		train: number
	}
	isLoading: boolean
}

export const CompleteSmallDataLabels = memo((props: CompleteSmallDataLabelsProps) => {
	const {
		className,
		data,
		isLoading
	} = props

	// if (isLoading || !data) {
	// 	return 
	// }

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
CompleteSmallDataLabels.displayName = 'CompleteSmallDataLabels'