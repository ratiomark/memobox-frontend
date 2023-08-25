import React, { FC } from 'react'

import clsx from 'clsx'
import { MyText } from '../../Typography'
import { Skeleton } from '../../Skeleton'
import cls from './SmallDataLabel.module.scss'
import Spinner from '@/shared/assets/icons/spinner.svg'

export type SmallDataLabelType =
	| 'all'
	| 'train'
	| 'wait'

interface SmallDataLabelProps {
	className?: string;
	type: SmallDataLabelType
	cardsCount?: number | string
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


