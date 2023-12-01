import React, { Children, cloneElement, FC, isValidElement, ReactElement } from 'react'
import './Animation.scss'
export type Mods = Record<string, boolean | string | string[]>

export function classNames(cls: string, mods: Mods = {}, additional: string[] = []): string {
	return [
		cls,
		...Object.entries(mods)
			.filter(([_, value]) => Boolean(value))
			.map(([className]) => className),
		...additional.filter(Boolean),
	].join(' ')
}
import { AnimationProps } from './Animation.types'
import { AnimationVariants } from '../Animation.types'

export const getClassName = (
	animation: (typeof AnimationVariants)[keyof typeof AnimationVariants],
	isAnimated: boolean
) => {
	let animationClass
	switch (animation) {
		case 'dropdown':
			animationClass = isAnimated ? 'animated-open' : 'animated-close'
			break
		case 'close-modal':
			animationClass = isAnimated ? 'open-modal' : 'close-modal'
			break
		case 'move-left':
			animationClass = isAnimated ? 'move-left' : 'nomove'
			break
		default:
			animationClass = ''
	}
	return animationClass
}

export const Animation: FC<AnimationProps> = ({ children, animation, className = '', style, isAnimated = false }) => {
	const animationClasses = getClassName(animation, isAnimated)
	if (Children.count(children) === 1 && isValidElement(children)) {
		const classes = classNames(`${children.props.className || ''}`, {}, [animationClasses])
		return cloneElement(children as ReactElement, {
			className: classes,
		})
	}
	return (
		<div className={`${className} ${animationClasses}`} style={style}>
			{Children.map(children, (child) => cloneElement(child as ReactElement, {}))}
		</div>
	)
}