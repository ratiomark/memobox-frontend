import clsx from 'clsx';
import { ComponentProps, ElementType, ReactNode, memo } from 'react';
import cls from './Heading.module.scss'
import { FontWeight } from '@/shared/types/StyleTypes';
import { mapFontWeightToClass } from '@/shared/lib/helpers/mappers/mapFontWeightToClass';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 's' | 'm' | 'l' | 'xl';

const mapSizeToClass: Record<TextSize, string> = {
	s: 'size_s',
	m: 'size_m',
	l: 'size_l',
	xl: 'size_xl'
};


export type TextOwnProps<E extends ElementType = ElementType> = {
	className?: string;
	title?: string | ReactNode;
	variant?: TextVariant;
	align?: TextAlign;
	size?: TextSize;
	saveOriginal?: boolean;
	fontWeight?: FontWeight
	'data-testid'?: string;
	bold?: boolean;
	as?: E
}

export type TextProps<E extends ElementType> = TextOwnProps<E> &
	Omit<ComponentProps<E>, keyof TextOwnProps>


const defaultElement = 'h3'

export const Heading = memo(
	<E extends ElementType = typeof defaultElement>(props: TextProps<E>) => {
		const {
			className,
			title,
			variant = 'primary',
			align = 'left',
			size = 'm',
			bold = false,
			fontWeight,
			saveOriginal,
			as: TagName = defaultElement,
			'data-testid': dataTestId = 'Text',
		} = props;

		const sizeClass = mapSizeToClass[size];

		const additionalClasses = [cls[variant], cls[align], cls[sizeClass], className];


		return (
			<TagName
				className={clsx(
					additionalClasses ?? '',
					fontWeight ? mapFontWeightToClass[fontWeight] : '',
					{
						[cls.saveOriginal]: saveOriginal,
						[cls.bold]: bold,
					},
				)}
				data-testid={`${dataTestId}.Heading`}
			>
				{title ?? 'Что-то пошло не так(нет текста в компоненте Heading), обновите пожалуйста страницу'}
			</TagName>
		)
	})
Heading.displayName = 'Heading'