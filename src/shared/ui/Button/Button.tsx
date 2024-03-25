import { ButtonHTMLAttributes, forwardRef, memo, ReactNode } from 'react'
import clsx from 'clsx'
import { FontWeight } from '@/shared/types/StyleTypes'
import { mapFontWeightToClass } from '@/shared/lib/helpers/mappers/mapFontWeightToClass'
import cls from './Button.module.scss'

export type ButtonVariant =
	| 'empty'
	| 'outline'
	| 'filled'
	| 'filledBox'
	| 'cancel'
	| 'back'
	| 'link'
// | 'listBox'

export type ButtonColor =
	| 'main'
	| 'attention'
	| 'wait'
	| 'trainingAction'

export type ButtonSize =
	| 'size_s'
	| 'size_14'
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
	| 'borderRadius_main'

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
	fontWeight?: FontWeight
	flex?: boolean
}
// interface ButtonProps2 extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
// 	children?: ReactNode
// 	className?: string
// 	variant?: ButtonVariant
// 	borderRadius?: ButtonBorderRadius
// 	color?: ButtonColor
// 	size?: ButtonSize
// 	disabled?: boolean
// 	addonLeft?: ReactNode
// 	addonRight?: ReactNode
// 	fontWeight?: FontWeight
// 	flex?: boolean
// }

// VAR: переделал кнопку, сейчас она не обернута в мемо, потому что не ясно как использоваь memo в данном случае
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
	const {
		className,
		children,
		flex,
		variant = 'empty',
		size = 'size_m',
		color = 'main',
		borderRadius = 'borderRadius_main',
		disabled,
		addonLeft,
		addonRight,
		fontWeight,
		...otherProps
	} = props

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
			// disabled={disabled}
			className={clsx(
				cls.Button,
				mods,
				disabled ? '' : cls[variant],
				fontWeight ? mapFontWeightToClass[fontWeight] : '',
				cls[size],
				cls[borderRadius],
				cls[color],
				className
			)}
			disabled={disabled}
			{...otherProps}
		>
			{addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
			{children}
			{addonRight && <div className={cls.addonRight}>{addonRight}</div>}
		</button>
	)
})
// Button.displayName = 'Button'