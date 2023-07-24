import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import cls from './HorizontalScrollerList.module.scss'
import { MouseEvent, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { ListBoxItems } from '../Popup/ui/ListBox/ListBox'
import { AppLink } from '../AppLink/AppLink'
import { Link } from 'react-router-dom'
import { Skeleton } from '../Skeleton'
import { MyText } from '../Typography'
import { HStack } from '../Stack'

interface HorizontalScrollerListItem {
	value: string
	content: string
	onChange: () => void
}

interface HorizontalScrollerListProps {
	className?: string
	items?: HorizontalScrollerListItem[]
	value?: string
	lockFirstItem?: boolean
	// onChange: (shelfId: string) => void
}
interface DragControllerState {
	startX: undefined | number
	startScrollLeft: undefined | number
	isDragging: undefined | boolean
}
export const HorizontalScrollerList = (props: HorizontalScrollerListProps) => {
	const {
		className,
		items,
		value,
		lockFirstItem = true,
	} = props
	// const [selectedItem, setSelectedItem] = useState<HorizontalScrollerListItem>()
	// const [{
	// 	startX,
	// 	startScrollLeft,
	// 	isDragging
	// }, setDragStart] = useState<DragControllerState>({
	// 	startX: undefined,
	// 	startScrollLeft: undefined,
	// 	isDragging: false
	// })
	const containerRef = useRef<HTMLUListElement>(null)
	const itemRefs = useRef<HTMLLIElement[]>([])
	const mounted = useRef(false)

	// useEffect(() => {
	// 	if (!mounted.current && items?.length && value) {
	// 		const initialItem = items!.find(item => item.value === value)
	// 		if (initialItem) setSelectedItem(initialItem)
	// 		mounted.current = true
	// 	}
	// }, [items, value])

	// const handleMouseDown = (e: MouseEvent) => {
	// 	setDragStart({
	// 		startX: e.pageX - containerRef.current!.offsetLeft,
	// 		startScrollLeft: containerRef.current!.scrollLeft,
	// 		isDragging: true
	// 	})
	// }


	// const selectItem = (item: HorizontalScrollerListItem, indexPlus1: number) => {
	// 	setSelectedItem(item)
	// 	itemRefs.current[indexPlus1 - 1].scrollIntoView({
	// 		behavior: 'smooth',
	// 		block: 'nearest',
	// 		inline: 'center'
	// 	})
	// 	// }
	// }

	const handleSelectItem = (e: MouseEvent, item: HorizontalScrollerListItem, indexPlus1: number) => {
		itemRefs.current[indexPlus1 - 1].scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'center'
		})
		item.onChange()
	}

	const { t } = useTranslation()

	const itemsRendered = useMemo(() => {
		if (!items?.length || !value) return undefined
		return items.map((item, index) => (
			<li
				className={clsx(
					cls.item,
					value === item.value ? cls.activeShelf : ''
				)}
				key={item.value}
				ref={el => itemRefs.current.push(el!)}
				onClick={e => handleSelectItem(e, item, index + 1)}
			>
				{item.content}
			</li>
		))
	}, [items, value])

	if (!itemsRendered) {
		return (<HStack gap='gap_14'>
			<Skeleton width={120} borderRadius='12px' height={24} />
			<Skeleton width={70} borderRadius='12px' height={24} />
			<Skeleton width={100} borderRadius='12px' height={24} />
			<Skeleton width={90} borderRadius='12px' height={24} />
		</HStack>)
	}

	return (
		<div
			className={cls.HorizontalScrollerList}
		// onMouseDown={handleMouseDown}
		>
			<ul
				className={cls.HorizontalScrollerList__container}
				ref={containerRef}
			>
				{itemsRendered}
				{/* {items.map((item, index) => (

					<li
						className={clsx(
							cls.item,
							selectedItem.value === item.value ? cls.activeShelf : ''
						)}
						key={item.value}
						ref={el => itemRefs.current.push(el!)}
						onClick={e => handleSelectItem(e, item, index + 1)}
					>

						{item.content}
					</li>
				))} */}
			</ul>
		</div>
	)
}

{/* <MyText
	className={clsx(
		cls.gridElement,
		selectedItem.value === item.value ? cls.activeShelf : ''
	)}
	key={item.value}
	text={item.content}
	onClick={item.onChange}
/> */}


// import clsx from 'clsx'
// import { useTranslation } from 'react-i18next'
// import cls from './HorizontalScrollerList.module.scss'
// import { ReactNode, useMemo } from 'react'
// import { ListBoxItems } from '../Popup/ui/ListBox/ListBox'
// import { AppLink } from '../AppLink/AppLink'
// import { Link } from 'react-router-dom'
// import { Skeleton } from '../Skeleton'
// import { MyText } from '../Typography'

// interface HorizontalScrollerListItem {
// 	value: string
// 	content: string
// 	onChange: () => void
// }

// interface HorizontalScrollerListProps {
// 	className?: string
// 	items?: HorizontalScrollerListItem[]
// 	value?: string
// 	lockFirstItem?:boolean
// 	// onChange: (shelfId: string) => void
// }

// export const HorizontalScrollerList = (props: HorizontalScrollerListProps) => {
// 	const {
// 		className,
// 		items,
// 		value,
// 		lockFirstItem = true,
// 		// onChange
// 	} = props

// 	const { t } = useTranslation()

// 	const itemsRendered = useMemo(() => {
// 		if (!items) return undefined
// 		return items.map(item => {
// 			// console.log(value, item.value)
// 			return (
// 				<MyText
// 					// activeClassName={cls.activeShelf}
// 					// activeClassName={value === item.value ? cls.activeShelf : ''}
// 					className={clsx(
// 						cls.gridElement,
// 						value === item.value ? cls.activeShelf : ''
// 					)}
// 					key={item.value}
// 					text={item.content}
// 					onClick={item.onChange}
// 				/>


// 				// <AppLink
// 				// 	// activeClassName={cls.activeShelf}
// 				// 	// activeClassName={value === item.value ? cls.activeShelf : ''}
// 				// 	className={clsx(
// 				// 		cls.gridElement,
// 				// 		value === item.value ? cls.activeShelf : ''
// 				// 	)}
// 				// 	key={item.value}
// 				// 	to={`/view/${item.value}/all`}
// 				// >
// 				// 	{item.content}
// 				// </AppLink>
// 			)
// 		})
// 	}, [items, value])

// 	if (!itemsRendered) return (<Skeleton width={'100%'} height={24} />)

// 	return (
// 		<div className={clsx(
// 			cls.HorizontalScrollerList,
// 			className)}
// 		>
// 			{itemsRendered}
// 		</div>
// 	)
// }