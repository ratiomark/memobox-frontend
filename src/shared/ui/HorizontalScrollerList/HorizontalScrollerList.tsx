import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './HorizontalScrollerList.module.scss';
import { ReactNode, useMemo } from 'react';
import { ListBoxItems } from '../Popup/ui/ListBox/ListBox';
import { AppLink } from '../AppLink/AppLink';
import { Link } from 'react-router-dom';
import { Skeleton } from '../Skeleton';
import { MyText } from '../Typography';

interface HorizontalScrollerListItem {
	value: string
	content: string
	onChange: () => void
}

interface HorizontalScrollerListProps {
	className?: string
	items?: HorizontalScrollerListItem[]
	value?: string
	// onChange: (shelfId: string) => void
}

export const HorizontalScrollerList = (props: HorizontalScrollerListProps) => {
	const {
		className,
		items,
		value,
		// onChange
	} = props

	const { t } = useTranslation()

	const itemsRendered = useMemo(() => {
		if (!items) return undefined
		return items.map(item => {
			console.log(value, item.value)
			return (
				<MyText
					// activeClassName={cls.activeShelf}
					// activeClassName={value === item.value ? cls.activeShelf : ''}
					className={clsx(
						cls.gridElement,
						value === item.value ? cls.activeShelf : ''
					)}
					key={item.value}
					text={item.content}
					onClick={item.onChange}
				/>


				// <AppLink
				// 	// activeClassName={cls.activeShelf}
				// 	// activeClassName={value === item.value ? cls.activeShelf : ''}
				// 	className={clsx(
				// 		cls.gridElement,
				// 		value === item.value ? cls.activeShelf : ''
				// 	)}
				// 	key={item.value}
				// 	to={`/view/${item.value}/all`}
				// >
				// 	{item.content}
				// </AppLink>
			)
		})
	}, [items, value])

	if (!itemsRendered) return (<Skeleton width={'100%'} height={24} />)

	return (
		<div className={clsx(
			cls.HorizontalScrollerList,
			className)}
		>
			{itemsRendered}
		</div>
	)
}