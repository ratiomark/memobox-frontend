import clsx from 'clsx';
import { ImgHTMLAttributes, ReactElement, useLayoutEffect, useState } from 'react';
import cls from './AppImage.module.scss';
import ErrorFallback from '@/shared/assets/icons_redesigned/picture-svgrepo-com.svg'
import { Icon } from '../Icon/Icon';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	className?: string
	fallback?: ReactElement
	errorFallback?: ReactElement
	maxWidth?: boolean
}

export const AppImage = (props: AppImageProps) => {
	const {
		className,
		src = '',
		alt = 'image',
		maxWidth,
		fallback,
		errorFallback = <Icon Svg={ErrorFallback} className={props.className} />,
		...otherProps
	} = props

	// этот эффект вызывается еще до того как компонент вмонтируется 
	useLayoutEffect(() => {
		const img = new Image()
		img.src = src
		img.onload = () => {
			setIsLoading(false)
		}
		img.onerror = () => {
			setIsLoading(false)
			setHasError(true)
		}
	}, [src])

	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	if (isLoading && fallback) return fallback

	if (hasError && errorFallback) return errorFallback

	return (
		<img
			className={clsx(className, { [cls.maxWidth]: maxWidth })}
			src={src}
			alt={alt}
			{...otherProps}
		/>
	)
}