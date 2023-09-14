import clsx from 'clsx';
import IconEye from '@/shared/assets/icons/eye-20-20.svg'
import cls from './Icon.module.scss';
import { ButtonHTMLAttributes, MouseEvent } from 'react';
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

export const Icon = (props: IconProps) => {
	const {
		className,
		Svg = IconEye,
		width = ICON_SIZE_DEFAULT,
		height = ICON_SIZE_DEFAULT,
		type = 'main',
		clickable = false,
		withFill = true,
		...otherProps
	} = props

	if (props.clickable) {
		const { buttonSameSize = false, buttonProps = {}, ...restProps } = { ...otherProps }
		return (
			<button
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
		)
	}

	return (
		<Svg
			className={clsx(
				cls.Icon,
				cls[type],
				{ [cls[type + '_fill']]: withFill },
				className,
			)}
			width={width}
			height={height}
			{...otherProps}
		/>)
}