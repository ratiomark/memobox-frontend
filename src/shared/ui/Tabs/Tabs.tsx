import clsx from 'clsx';
import { memo, ReactNode, useCallback, useMemo } from 'react';
import { Card } from '../Card/Card';
import cls from './Tabs.module.scss';
import { FlexDirection, FlexAlign, Flex } from '../Stack/Flex/Flex';
export interface TabItem {
	value: string | number
	content: ReactNode
}

interface TabsProps {
	className?: string
	tabs: TabItem[]
	value: string
	onTabClick: (tab: TabItem) => void
	direction?: FlexDirection
	align?: FlexAlign
	classNameForTab?: string
}

export const Tabs = memo((props: TabsProps) => {
	const {
		className,
		tabs,
		value,
		onTabClick,
		direction = 'row',
		align = 'center',
		classNameForTab,
	} = props

	// VAR: Замыкание! 
	const clickHandle = useCallback((tab: TabItem) => () => {
		onTabClick(tab)
	}, [onTabClick])

	const tabsRendered = useMemo(() => {
		{
			return tabs.map(item => {
				const isSelected = value === item.value
				return (
					<li
						key={item.value}
						// variant={isSelected ? 'light' : 'normal'}
						className={clsx(
							cls.tabItem,
							{ [cls.selectedItem]: isSelected },
							classNameForTab,
						)}
						onClick={clickHandle(item)}
					>
						{item.content}
					</li>
				)
			})
		}
	}, [value, tabs, clickHandle, classNameForTab])

	return (
		<div
			className={clsx(
				cls.Tabs,
				[className])}
		>
			<ul className={cls.Tabs__container}>

				{tabsRendered}
			</ul>
		</div>
	)
})
// import clsx from 'clsx';
// import { memo, ReactNode, useCallback, useMemo } from 'react';
// import { Card } from '../Card/Card';
// import cls from './Tabs.module.scss';
// import { FlexDirection, FlexAlign, Flex } from '../Stack/Flex/Flex';
// export interface TabItem {
// 	value: string | number
// 	content: ReactNode
// }

// interface TabsProps {
// 	className?: string
// 	tabs: TabItem[]
// 	value: string
// 	onTabClick: (tab: TabItem) => void
// 	direction?: FlexDirection
// 	align?: FlexAlign
// }

// export const Tabs = memo((props: TabsProps) => {
// 	const {
// 		className,
// 		tabs,
// 		value,
// 		onTabClick,
// 		direction = 'row',
// 		align = 'center',
// 	} = props

// 	// VAR: Замыкание!
// 	const clickHandle = useCallback((tab: TabItem) => () => {
// 		onTabClick(tab)
// 	}, [onTabClick])

// 	const tabsRendered = useMemo(() => {
// 		{
// 			return tabs.map(item => {
// 				const isSelected = value === item.value
// 				return (
// 					<li
// 						key={item.value}
// 						// variant={isSelected ? 'light' : 'normal'}
// 						className={clsx(
// 							cls.tabItem,
// 							{ [cls.selectedItem]: isSelected }
// 						)}
// 						onClick={clickHandle(item)}
// 					>
// 						{item.content}
// 					</li>
// 				)
// 			})
// 		}
// 	}, [value, tabs, clickHandle])

// 	return (
// 		<ul
// 			className={clsx(
// 				cls.Tabs,
// 				[className])}
// 		>
// 			{tabsRendered}
// 		</ul>
// 	)
// })
