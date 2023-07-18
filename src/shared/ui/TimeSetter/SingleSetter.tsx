import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './SingleSetter.module.scss';
import { WheelEvent, useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';
import { MyText } from '../Typography';
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg'
import { Button } from '../Button';
import { useThrottle } from '@/shared/lib/helpers/hooks/useThrottle';
interface TimeSetterProps {
	className?: string
	time: number | string
	maxTime: number,
	title?: string
	onUpClick: () => void
	onDownClick: () => void
	onWheelScroll: (e: WheelEvent<HTMLElement> | globalThis.WheelEvent) => void
	disabled?: boolean
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
		disabled,
	} = props
	
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const div = divRef.current;
		if (!div || disabled) return;

		const onWheelHandler = (e: globalThis.WheelEvent) => {
			e.preventDefault();
			onWheelScroll(e);
		};

		div.addEventListener('wheel', onWheelHandler, { passive: false });

		return () => {
			div.removeEventListener('wheel', onWheelHandler);
		};
	}, [disabled, onWheelScroll]);

	let arrowUp: JSX.Element;
	let arrowDown: JSX.Element;
	if (disabled) {
		arrowUp = (<Icon
			className={
				clsx(
					cls.iconRotated,

				)}
			type={'disabled'}
			Svg={ArrowBottomIcon}
			width={28}
			height={28}
		/>)
		arrowDown = (<Icon
			type={'disabled'}
			Svg={ArrowBottomIcon}
			width={28}
			height={28}
		/>)
	} else {
		arrowUp = (<Icon
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
		/>)
		arrowDown = (<Icon
			className={
				clsx(
					time == 0 || time == '00' ? cls.iconDisabled : ''
				)}
			type={time == 0 || time == '00' ? 'disabled' : 'main'}
			clickable
			onClick={onDownClick}
			Svg={ArrowBottomIcon}
			width={28}
			height={28}
		/>)
	}

	return (
		<div
			className={cls.timeWrapper}
			ref={divRef}
			data-time-setter="time-setter"
		>
			{title && <MyText className={cls.title} text={title} />}
			{arrowUp}

			<MyText align='center' text={time} variant={disabled ? 'hint' : 'accent'} />
			{arrowDown}

		</div>

	)
}
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './SingleSetter.module.scss';
// import { WheelEvent, useEffect, useRef, useState } from 'react';
// import { Icon } from '../Icon';
// import { MyText } from '../Typography';
// import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg'
// import { Button } from '../Button';
// interface TimeSetterProps {
// 	className?: string
// 	time: number | string
// 	maxTime: number,
// 	title?: string
// 	onUpClick: () => void
// 	onDownClick: () => void
// 	onWheelScroll: (e: WheelEvent<HTMLElement>) => void
// 	disabled?: boolean
// }

// export const SingleSetter = (props: TimeSetterProps) => {
// 	const {
// 		className,
// 		time,
// 		maxTime,
// 		onUpClick,
// 		onDownClick,
// 		onWheelScroll,
// 		title,
// 		disabled,
// 	} = props


// 	let arrowUp: JSX.Element;
// 	let arrowDown: JSX.Element;
// 	if (disabled) {
// 		arrowUp = (<Icon
// 			className={
// 				clsx(
// 					cls.iconRotated,
// 					// cls.iconDisabled
// 				)}
// 			type={'disabled'}
// 			Svg={ArrowBottomIcon}
// 			width={28}
// 			height={28}
// 		/>)
// 		arrowDown = (<Icon
// 			// className={cls.iconDisabled}
// 			type={'disabled'}
// 			Svg={ArrowBottomIcon}
// 			width={28}
// 			height={28}
// 		/>)
// 	} else {
// 		arrowUp = (<Icon
// 			clickable
// 			type={time === maxTime ? 'disabled' : 'main'}
// 			className={
// 				clsx(
// 					cls.iconRotated,
// 					time === maxTime ? cls.iconDisabled : ''
// 				)}
// 			onClick={onUpClick}
// 			Svg={ArrowBottomIcon}
// 			width={28}
// 			height={28}
// 		/>)
// 		arrowDown = (<Icon
// 			className={
// 				clsx(
// 					time == 0 || time == '00' ? cls.iconDisabled : ''
// 				)}
// 			type={time == 0 || time == '00' ? 'disabled' : 'main'}
// 			clickable
// 			onClick={onDownClick}
// 			Svg={ArrowBottomIcon}
// 			width={28}
// 			height={28}
// 		/>)
// 	}
// 	const onWheelHandler = (e: WheelEvent<HTMLDivElement>) => {
// 		e.stopPropagation()
// 		e.preventDefault()
// 		onWheelScroll(e)
// 	}




// 	return (
// 		<div
// 			className={cls.timeWrapper}
// 			// onWheelCapture={e=>console.log(e)}
// 			onWheelCapture={disabled ? undefined : onWheelHandler}
// 			data-time-setter="time-setter"
// 		>
// 			{title && <MyText className={cls.title} text={title} />}
// 			{arrowUp}

// 			{/* {time === maxTime
// 				? <div className={cls.empty} />
// 				: <MyText align='center' className={cls.smallTime} text={time + 1} />
// 			} */}
// 			<MyText align='center' text={time} variant={disabled ? 'hint' : 'accent'} />
// 			{arrowDown}
// 			{/* {time === 0
// 				? <div className={cls.empty} />
// 				: <MyText align='center' className={cls.smallTime} text={time - 1} />
// 			} */}
// 			{/* <Icon
// 				className={
// 					clsx(
// 						time === 0 ? cls.iconDisabled : ''
// 					)}
// 				type={time === 0 ? 'disabled' : 'main'}
// 				clickable
// 				onClick={onDownClick}
// 				Svg={ArrowBottomIcon}
// 				width={28}
// 				height={28}
// 			/> */}
// 		</div>

// 	)
// }