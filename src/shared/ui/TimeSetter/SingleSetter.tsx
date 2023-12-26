import clsx from 'clsx';
import cls from './SingleSetter.module.scss';
import { WheelEvent, useEffect, useRef } from 'react';
import { Icon } from '../Icon';
import { MyText } from '../Typography';
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg'
import { dataAttrTimeSetterSingle } from '@/shared/const/idsAndDataAttributes';


type OnWheelScrollGlobal = (e: globalThis.WheelEvent) => void
type OnWheelScrollEvent = (e: WheelEvent<HTMLElement>) => void
interface TimeSetterProps {
	className?: string
	time: number | string
	maxTime: number,
	minTime?: number
	title?: string
	onUpClick: () => void
	onDownClick: () => void
	onWheelScroll: OnWheelScrollGlobal | OnWheelScrollEvent
	disabled?: boolean
}

export const SingleSetter = (props: TimeSetterProps) => {
	const {
		time,
		maxTime,
		minTime = 0,
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
			// @ts-ignore
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
					time == minTime || time == '00' ? cls.iconDisabled : ''
				)}
			type={time == minTime || time == '00' ? 'disabled' : 'main'}
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
			data-time-setter={`${dataAttrTimeSetterSingle}`}
		>
			{title && <MyText variant={disabled ? 'hint' : 'primary'} className={cls.title} text={title} />}

			{arrowUp}
			<MyText align='center' text={time} variant={disabled ? 'hint' : 'accent'} />
			{arrowDown}

		</div>

	)
}