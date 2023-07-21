import clsx from 'clsx';
import IconEye from '@/shared/assets/icons/eye-20-20.svg'
import cls from './Icon.module.scss';
import { MouseEvent } from 'react';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>

// базовые пропсы для всех СВГ, неважно кликалбельные или нет
interface IconBaseProps extends SvgProps {
	className?: string
	Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
	type?: 'main' | 'hint' | 'cancel' | 'disabled'
}

interface UnClickableProps extends IconBaseProps {
	clickable?: false
}

interface ClickableProps extends IconBaseProps {
	clickable: true
	onClick: (() => void) | ((e: MouseEvent<any>) => void)
	// preventClick?: boolean
}

type IconProps = UnClickableProps | ClickableProps

export const Icon = (props: IconProps) => {
	const {
		className,
		Svg = IconEye,
		width = 32,
		height = 32,
		type = 'main',
		clickable = false,
		...otherProps
	} = props

	if (props.clickable) {
		return (
			<button
				style={{ width, height }}
				type='button'
				onClick={	props.onClick}
				className={clsx(cls.button, className)}
			>
				<Svg
					className={clsx(
						cls.Icon,
						cls[type]
					)}
					width={width}
					height={height}
					{...otherProps}
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
				className
			)}
			width={width}
			height={height}
			{...otherProps}
		/>)
}