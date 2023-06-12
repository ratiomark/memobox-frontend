import { ButtonHTMLAttributes, forwardRef, memo, ReactNode } from 'react'
import cls from './Button.module.scss'
import clsx from 'clsx'

export type ButtonVariant =
	| 'empty'
	| 'outline'
	| 'filled'
	| 'cancel'
// | 'listBox'

type ButtonColor =
	| 'main'
	| 'attention'
	| 'wait'

type ButtonFontWeight =
	| '300'
	| '500'
	| '600'
	| '700'

export type ButtonSize =
	| 'size_s'
	| 'size_m'
	| 'size_l'
	| 'size_xl'

type ButtonBorderRadius =
	| 'borderRadius_4'
	| 'borderRadius_6'
	| 'borderRadius_8'
	| 'borderRadius_10'
	| 'borderRadius_12'
	| 'borderRadius_16'
	| 'borderRadius_34'
	| 'borderRadius_max'

const mapFontWeightToClass: Record<ButtonFontWeight, string> = {
	'300': 'fw_300',
	'500': 'fw_500',
	'600': 'fw_600',
	'700': 'fw_700',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode
	className?: string
	variant?: ButtonVariant
	borderRadius?: ButtonBorderRadius
	color?: ButtonColor
	size?: ButtonSize
	disabled?: boolean
	addonLeft?: ReactNode
	addonRight?: ReactNode
	fontWeight?: ButtonFontWeight
	flex?: boolean
}

// VAR: переделал кнопку, сейчас она не обернута в мемо, потому что не ясно как использоваь memo в данном случае
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
	const {
		className,
		children,
		flex,
		variant = 'empty',
		size = 'size_m',
		color = 'main',
		borderRadius = 'borderRadius_4',
		disabled,
		addonLeft,
		addonRight,
		fontWeight,
		...otherProps
	} = props
	console.log(fontWeight ? mapFontWeightToClass[fontWeight] : 'нема')
	const mods: Record<string, boolean | undefined> = {
		[cls.disabled]: disabled,
		[cls.flex]: flex,
		[cls.paddingDefault]: (!addonLeft && !addonRight),
		[cls.paddingWithBothAddon]: (Boolean(addonLeft) && Boolean(addonRight)),
		[cls.paddingWithLeftAddon]: (Boolean(addonLeft) && !addonRight),
		[cls.paddingWithRightAddon]: (!addonLeft && Boolean(addonRight))

	}

	return (
		<button
			ref={forwardedRef}
			className={clsx(
				cls.Button,
				mods,
				cls[variant],
				cls[size],
				cls[borderRadius],
				cls[color],
				fontWeight ? mapFontWeightToClass[fontWeight] : '',
				className
			)}
			{...otherProps}
		>
			{addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
			{children}
			{addonRight && <div className={cls.addonRight}>{addonRight}</div>}
		</button>
	)
})
// Button.displayName = 'Button'