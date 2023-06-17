import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './SingleSetter.module.scss';
import { WheelEvent, useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';
import { MyText } from '../Typography';
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg'
import { Button } from '../Button';
interface TimeSetterProps {
	className?: string
	time: number
	maxTime: number,
	title: string
	onUpClick: () => void
	onDownClick: () => void
	onWheelScroll: (e: WheelEvent<HTMLElement>) => void
}

export const SingleSetter = (props: TimeSetterProps) => {
	const {
		className,
		time,
		maxTime,
		onUpClick,
		onDownClick,
		onWheelScroll,
		title,
	} = props

	return (
		<div
			className={cls.timeWrapper}
			onWheel={onWheelScroll}
			data-time-setter="time-setter"
		>
			<MyText className={cls.title} text={title} />
			<Icon
				clickable
				type={time === maxTime ? 'disabled' : 'main'}
				className={
					clsx(
						cls.iconRotated,
						time === maxTime ? cls.iconDisabled : ''
					)}
				onClick={onUpClick}
				Svg={ArrowBottomIcon}
				width={28}
				height={28}
			/>
			{/* {time === maxTime
				? <div className={cls.empty} />
				: <MyText align='center' className={cls.smallTime} text={time + 1} />
			} */}
			<MyText align='center' text={time} variant='accent' />
			{/* {time === 0
				? <div className={cls.empty} />
				: <MyText align='center' className={cls.smallTime} text={time - 1} />
			} */}
			<Icon
				className={
					clsx(
						time === 0 ? cls.iconDisabled : ''
					)}
				type={time === 0 ? 'disabled' : 'main'}
				clickable
				onClick={onDownClick}
				Svg={ArrowBottomIcon}
				width={28}
				height={28}
			/>
		</div>

	)
}