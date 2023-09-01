import clsx from 'clsx';
import { ComponentProps, ElementType, memo } from 'react';
import { FontWeight } from '@/shared/types/StyleTypes';
import { mapFontWeightToClass } from '@/shared/lib/helpers/mappers/mapFontWeightToClass';
import cls from './Text.module.scss'



export type TextVariant = 'primary' | 'error' | 'accent' | 'hint' | 'header';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 's' | 'm' | 'l' | 'xl';

const mapSizeToClass: Record<TextSize, string> = {
	s: 'size_s',
	m: 'size_m',
	l: 'size_l',
	xl: 'size_xl'
};

interface TextOwnProps<E extends ElementType = ElementType> {
	className?: string;
	text?: string | number;
	variant?: TextVariant;
	align?: TextAlign;
	size?: TextSize;
	saveOriginal?: boolean;
	'data-testid'?: string;
	fontWeight?: FontWeight
	as?: E
	drop?: boolean
}

export type TextProps<E extends ElementType> = TextOwnProps<E> &
	Omit<ComponentProps<E>, keyof TextOwnProps>

const defaultElement = 'p'

export const MyText = memo(
	<E extends ElementType = typeof defaultElement>(props: TextProps<E>) => {
		const {
			className,
			text,
			variant = 'primary',
			align = 'left',
			size = 'm',
			fontWeight,
			saveOriginal,
			as: TagName = defaultElement,
			'data-testid': dataTestId = 'Text',
			drop,
			...otherProps
		} = props;

		if (drop) {
			return <TagName className={className}>{text ?? 'Что-то пошло не так(нет текста в компоненте Heading), обновите пожалуйста страницу'}</TagName>
		}

		const sizeClass = mapSizeToClass[size];
		const additionalClasses = [cls[variant], cls[align], cls[sizeClass], className];


		return (
			<TagName
				className={clsx(
					additionalClasses ?? '',
					fontWeight ? mapFontWeightToClass[fontWeight] : '',
					{
						[cls.saveOriginal]: saveOriginal,
						// [cls.bold]: bold,
					},
				)}
				data-testid={`${dataTestId}.Paragraph`}
				{...otherProps}
			>
				{text ?? 'Что-то пошло не так(нет текста в компоненте Heading), обновите пожалуйста страницу'}
			</TagName>
		)
	})

MyText.displayName = 'Text'
// import clsx from 'clsx';
// import { memo } from 'react';
// import cls from './Text.module.scss'
// import { title } from 'process';


// export type TextVariant = 'primary' | 'error' | 'accent';

// export type TextAlign = 'right' | 'left' | 'center';

// export type TextSize = 's' | 'm' | 'l';

// interface TextProps {
// 	className?: string;
// 	title?: string;
// 	text?: string;
// 	variant?: TextVariant;
// 	align?: TextAlign;
// 	size?: TextSize;
// 	saveOriginal?: boolean;
// 	'data-testid'?: string;
// 	bold?: boolean;
// }

// type HeaderTagType = 'h1' | 'h2' | 'h3';

// const mapSizeToClass: Record<TextSize, string> = {
// 	s: 'size_s',
// 	m: 'size_m',
// 	l: 'size_l',
// };

// const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
// 	s: 'h3',
// 	m: 'h2',
// 	l: 'h1',
// };

// export const Text = memo((props: TextProps) => {
// 	const {
// 		className,
// 		text,
// 		title,
// 		variant = 'primary',
// 		align = 'left',
// 		size = 'm',
// 		bold = false,
// 		saveOriginal,
// 		'data-testid': dataTestId = 'Text',
// 	} = props;

// 	const HeaderTag = mapSizeToHeaderTag[size];
// 	const sizeClass = mapSizeToClass[size];

// 	const additionalClasses = [className, cls[variant], cls[align], cls[sizeClass]];


// 	return (
// 		<div className={clsx(
// 			cls.Text,
// 			additionalClasses ?? '',
// 			{
// 				[cls.saveOriginal]: saveOriginal,
// 				[cls.bold]: bold,
// 			},
// 		)}
// 		>
// 			{title && (
// 				<HeaderTag
// 					className={cls.title}
// 					data-testid={`${dataTestId}.Header`}
// 				>
// 					{title}
// 				</HeaderTag>
// 			)}
// 			{text && (
// 				<p className={cls.text} data-testid={`${dataTestId}.Paragraph`}>
// 					{text}
// 				</p>
// 			)}
// 		</div>
// 	)
// })
// Text.displayName = 'Text'