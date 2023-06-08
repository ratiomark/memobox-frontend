import React, { FC } from 'react'

import clsx from 'clsx'
import { MyText } from '../../Typography'
import { Skeleton } from '../../Skeleton'
import cls from './SmallDataLabel.module.scss'
import Spinner from '@/shared/assets/icons/spinner.svg'
export const SmallDataLabelType = {
	all: 'all',
	train: 'train',
	wait: 'wait',
} as const

export type SmallDataLabelType = keyof typeof SmallDataLabelType

interface SmallDataLabelProps {
	className?: string;
	type: SmallDataLabelType
	cardsCount?: number
	isLoading: boolean
}

export const SmallDataLabel = (props: SmallDataLabelProps) => {
	const {
		className,
		type,
		cardsCount,
		isLoading,
		...otherProps
	} = props

	if (isLoading) {
		return (
			<div
				className={clsx(cls.SmallDataLabel, [className], cls[type])}
				{...otherProps}
			> 
				<Spinner width={24} height={24} className={cls[type]} />
			</div>
		)

	}

	return (
		<div
			className={clsx(cls.SmallDataLabel, [className], cls[type])}
			{...otherProps}
		>
			<MyText drop text={cardsCount} className={cls.smallDataLabelText} />
		</div>
	)
}


