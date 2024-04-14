import clsx from 'clsx';
import IconEye from '@/shared/assets/icons/eye-20-20.svg'
import cls from './Icon.module.scss';
import { ButtonHTMLAttributes, MouseEvent, forwardRef } from 'react';
import { ICON_SIZE_DEFAULT } from '@/shared/const/iconSizes';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>

// базовые пропсы для всех СВГ, неважно кликалбельные или нет
interface IconBaseProps extends SvgProps {
	className?: string
	Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
	type?: 'main' | 'hint' | 'cancel' | 'disabled'
	withFill?: boolean
}

interface UnClickableProps extends IconBaseProps {
	clickable?: false
}

interface ClickableProps extends IconBaseProps {
	clickable: true
	onClick: (() => void) | ((e: MouseEvent<any>) => void)
	buttonSameSize?: boolean
	buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

type IconProps = UnClickableProps | ClickableProps

function isClickableProps(props: IconProps): props is ClickableProps {
	return props.clickable === true;
}

export const Icon = forwardRef<HTMLButtonElement | SVGSVGElement, IconProps>((props, ref) => {
	const {
		className,
		Svg = IconEye,
		width = ICON_SIZE_DEFAULT,
		height = ICON_SIZE_DEFAULT,
		type = 'main',
		clickable = false,
		withFill = true,
		...otherProps
	} = props;

	if (isClickableProps(props)) { // Использование Type Guard
		const { buttonSameSize = false, buttonProps = {}, ...restProps } = { ...otherProps };
		return (
			<button
				ref={ref as React.Ref<HTMLButtonElement>} // Cast ref
				style={buttonSameSize ? { width, height } : undefined}
				type={buttonProps.type ? buttonProps.type : 'button'}
				onClick={props.onClick}
				className={clsx(cls.button, className)}
				{...buttonProps}
			>
				<Svg
					className={clsx(
						cls.Icon,
						cls[type],
						{ [cls[type + '_fill']]: withFill },
					)}
					// style={!fill ? { fill: '' } : {}}
					width={width}
					height={height}
					{...restProps}
					onClick={undefined}
				/>
			</button>
		);
	}

	const { buttonSameSize = false, ...restProps } = { ...otherProps }
	return (
		<Svg
			ref={ref as React.Ref<SVGSVGElement>} // Cast ref
			className={clsx(
				cls.Icon,
				cls[type],
				{ [cls[type + '_fill']]: withFill },
				className,
			)}
			width={width}
			height={height}
			{...restProps}
		/>)
});






// export const Icon = (props: IconProps) => {
// 	const {
// 		className,
// 		Svg = IconEye,
// 		width = ICON_SIZE_DEFAULT,
// 		height = ICON_SIZE_DEFAULT,
// 		type = 'main',
// 		clickable = false,
// 		withFill = true,
// 		...otherProps
// 	} = props

// 	if (props.clickable) {
// 		const { buttonSameSize = false, buttonProps = {}, ...restProps } = { ...otherProps }
// 		return (
// 			<button
// 				style={buttonSameSize ? { width, height } : undefined}
// 				type={buttonProps.type ? buttonProps.type : 'button'}
// 				onClick={props.onClick}
// 				className={clsx(cls.button, className)}
// 				{...buttonProps}
// 			>
// 				<Svg
// 					className={clsx(
// 						cls.Icon,
// 						cls[type],
// 						{ [cls[type + '_fill']]: withFill },
// 					)}
// 					// style={!fill ? { fill: '' } : {}}
// 					width={width}
// 					height={height}
// 					{...restProps}
// 					onClick={undefined}
// 				/>
// 			</button>
// 		)
// 	}
// 	const { buttonSameSize = false, ...restProps } = { ...otherProps }
// 	return (
// 		<Svg
// 			className={clsx(
// 				cls.Icon,
// 				cls[type],
// 				{ [cls[type + '_fill']]: withFill },
// 				className,
// 			)}
// 			width={width}
// 			height={height}
// 			{...restProps}
// 		/>)
// }

// export const Icon = (props: IconProps) => {
// 	const {
// 		className,
// 		Svg = IconEye,
// 		width = ICON_SIZE_DEFAULT,
// 		height = ICON_SIZE_DEFAULT,
// 		type = 'main',
// 		clickable = false,
// 		withFill = true,
// 		...otherProps
// 	} = props

// 	if (props.clickable) {
// 		const { buttonSameSize = false, buttonProps = {}, ...restProps } = { ...otherProps }
// 		return (
// 			<button
// 				style={buttonSameSize ? { width, height } : undefined}
// 				type={buttonProps.type ? buttonProps.type : 'button'}
// 				onClick={props.onClick}
// 				className={clsx(cls.button, className)}
// 				{...buttonProps}
// 			>
// 				<Svg
// 					className={clsx(
// 						cls.Icon,
// 						cls[type],
// 						{ [cls[type + '_fill']]: withFill },
// 					)}
// 					// style={!fill ? { fill: '' } : {}}
// 					width={width}
// 					height={height}
// 					{...restProps}
// 					onClick={undefined}
// 				/>
// 			</button>
// 		)
// 	}
// 	const { buttonSameSize = false, ...restProps } = { ...otherProps }
// 	return (
// 		<Svg
// 			className={clsx(
// 				cls.Icon,
// 				cls[type],
// 				{ [cls[type + '_fill']]: withFill },
// 				className,
// 			)}
// 			width={width}
// 			height={height}
// 			{...restProps}
// 		/>)
// }