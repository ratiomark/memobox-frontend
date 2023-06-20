import { ButtonHTMLAttributes, forwardRef, memo, ReactNode } from 'react'
import cls from './Button.module.scss'
import clsx from 'clsx'
import { FontWeight } from '@/shared/types/StyleTypes'
import { mapFontWeightToClass } from '@/shared/lib/helpers/mappers/mapFontWeightToClass'

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