import clsx from 'clsx';
import { HTMLAttributes, memo, ReactNode } from 'react';
import cls from './Card.module.scss';
import { motion, HTMLMotionProps, } from 'framer-motion'

type CardVariant =
	| 'normal'
	| 'outlined'
	| 'light'

type CardPadding = '0' | '4' | '8' | '10' | '12' | '14' | '16' | '28' | '20' | '22' | '24'

const mapPaddingClass: Record<CardPadding, string> = {
	'0': 'padding_0',
	'4': 'padding_4',
	'8': 'padding_8',
	'10': 'padding_10',
	'12': 'padding_12',
	'14': 'padding_14',
	'16': 'padding_16',
	'28': 'padding_28',
	'20': 'padding_20',
	'22': 'padding_22',
	'24': 'padding_24',
}

interface CardProps extends HTMLMotionProps<'div'> {
	className?: string
	children: ReactNode
	variant?: CardVariant
	padding?: CardPadding
	horizontal?: boolean
	max?: boolean
	withHover?: boolean
}

export const Card = memo((props: CardProps) => {
	const {
		className,
		children,
		variant = 'normal',
		max,
		horizontal,
		padding = '8',
		withHover,
		...otherProps
	} = props
	const paddingClass = mapPaddingClass[padding]
	return (

		<motion.div
			whileHover={{ scale: withHover ? 1.03 : 1 }}
			transition={{ duration: 0.3 }}
			className={clsx(
				cls.Card,
				cls[variant],
				cls[paddingClass],
				{
					[cls.max]: max,
					[cls.horizontal]: horizontal,
				},
				className
			)}
			{...otherProps}
		>
			{children}
		</motion.div>
	)
})
Card.displayName = 'Card'