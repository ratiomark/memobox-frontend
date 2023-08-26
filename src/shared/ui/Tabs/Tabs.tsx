import clsx from 'clsx';
import { memo, MouseEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
let main;
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
	const tabsRef = useRef<HTMLUListElement>(null)
	const [shouldBeScrollable, setShouldBeScrollable] = useState(false)
	const [leftSide, setLeftSide] = useState(false)
	const [rightSide, setRightSide] = useState(false)
	// const [isMouseDown, setIsMouseDown] = useState(false);
	// const [startX, setStartX] = useState(0);
	// const [scrollLeft, setScrollLeft] = useState(0);

	// const onMouseDown = (e) => {
	// 	setIsMouseDown(true);
	// 	setStartX(e.pageX - tabsRef.current.offsetLeft);
	// 	setScrollLeft(tabsRef.current.scrollLeft);
	// }

	// const onMouseLeave = () => {
	// 	setIsMouseDown(false);
	// }

	// const onMouseUp = () => {
	// 	setIsMouseDown(false);
	// }

	// const onMouseMove = (e) => {
	// 	if (!isMouseDown) return;
	// 	e.preventDefault();
	// 	const x = e.pageX - tabsRef.current.offsetLeft;
	// 	const walk = (x - startX) ; // 3 - это коэффициент прокрутки, можно настроить по своему усмотрению
	// 	tabsRef.current.scrollLeft = scrollLeft - walk;
	// }
	// VAR: Замыкание!
	const clickHandle = useCallback((tab: TabItem) => () => {
		onTabClick(tab)
	}, [onTabClick])

	const handleScroll = (e: MouseEvent<HTMLUListElement>) => {
		// console.log(e.deltaX)
		// console.log(e.deltaY)
		// tabsRef.current?.onscroll(e)
		if (tabsRef.current) {
			const container = tabsRef.current
			const scrollLeft = container.scrollLeft
			const scrollWidth = container.scrollWidth
			const clientWidth = container.clientWidth
			const percentScrolledLeft = Math.ceil(scrollLeft / (scrollWidth - clientWidth) * 100)
			const percentScrolledRight = Math.ceil(100 - percentScrolledLeft)
			// console.log(scrollLeft)
			if (percentScrolledLeft > 0) {
				setLeftSide(true)
			} else {
				setLeftSide(false)
			}
			if (percentScrolledRight <= 0) {
				setRightSide(false)
			} else {
				setRightSide(true)
			}
			// console.log(`Scrolled Left: ${percentScrolledLeft}%`)
			// console.log(`Scrolled Right: ${percentScrolledRight}%`)
		}
	}
	// const onWheel = (e: MouseEvent<HTMLUListElement>) => {
	// 	// const {
	// 	// tabsRef.current?.onscroll(e)
	// 	// 	movementX,
	// 	// 	clientX,
	// 	// } = e
	// 	console.log(e)
	// 	// console.log(movementX, clientX)
	// 	// 	if (tabsRef.current!.scrollWidth > tabsRef.current!.clientWidth) {
	// 	// 		e.preventDefault();
	// 	// }
	// }
	// const onMouseEnter = () => {
	// 	console.log('@@@@@@@@@@@')
	// 	if (!main) {
	// 		main = document.querySelector('main')
	// 	}
	// 	if (tabsRef.current.scrollWidth > tabsRef.current.clientWidth && main) {
	// 		// const main = document.querySelector('main')
	// 		main.style.overflow = 'hidden';
	// 	}
	// }

	// const onMouseLeave = () => {
	// 	if (!main) {
	// 		main = document.querySelector('main')
	// 	}
	// 	if (main) main.style.overflow = 'auto';
	// }

	// useEffect(() => {
	// 	const handleWheel = (e) => {
	// 		if (tabsRef.current.scrollWidth > tabsRef.current.clientWidth) {
	// 			// e.preventDefault();
	// 			console.log(e.deltaY)

	// 			// const a = e.deltaY > 0 ? 8 : -8
	// 			// tabsRef.current.scrollLeft += a
	// 		}
	// 	}

	// 	tabsRef.current.addEventListener('wheel', handleWheel, { passive: false });
	// 	return () => tabsRef.current.removeEventListener('wheel', handleWheel);
	// }, []);


	const tabsRendered = useMemo(() => {
		{
			return tabs.map(item => {
				const isSelected = value === item.value
				return (
					<li
						key={item.value}
						className={clsx(
							cls.tabItem,
							{ [cls.selectedItem]: isSelected },
							// добавляет прокрутку, если есть скролл
							{ [cls.shouldBeScrollable]: shouldBeScrollable },
							classNameForTab,
						)}
						onClick={clickHandle(item)}
					>
						{item.content}
					</li>
				)
			})
		}
	}, [value, tabs, clickHandle, classNameForTab, shouldBeScrollable])

	useEffect(() => {
		if (tabsRendered && tabsRef.current) {
			if (tabsRef.current.scrollWidth > tabsRef.current.clientWidth) {
				setShouldBeScrollable(true)
				setRightSide(true)
			} else {
				setShouldBeScrollable(false)
				setRightSide(false)
			}
		}
	}, [tabsRendered])

	return (
		<Flex
			align={align}
			direction={direction}
			className={clsx(
				cls.tabs__container,
				[className])
			}
		// onMouseEnter={onMouseEnter}
		// onMouseLeave={onMouseLeave}
		>
			{rightSide && <div className={cls.gradientEdgeRight} />}
			{leftSide && <div className={cls.gradientEdgeLeft} />}
			<ul
				className={cls.tabs}
				onScroll={handleScroll}
				ref={tabsRef}
			// onWheel={onWheel}
			// onMouseDown={onMouseDown}
			// onMouseEnter={onMouseEnter}
			// onMouseLeave={onMouseLeave}
			// onMouseUp={onMouseUp}
			// onMouseMove={onMouseMove}
			>
				{tabsRendered}
			</ul>
		</Flex>
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
