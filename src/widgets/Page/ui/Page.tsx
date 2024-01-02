import { StateSchema } from '@/app/providers/StoreProvider';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/helpers/hooks/useInfiniteScroll';
import { useThrottle } from '@/shared/lib/helpers/hooks/useThrottle';
import { TestProps } from '@/shared/types/TestProps';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { MutableRefObject, ReactNode, UIEvent, memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import cls from './Page.module.scss';
import { useInitialEffect } from '@/shared/lib/helpers/hooks/useInitialEffect';
import { getUIScrollByPath, uiActions } from '@/entities/UI';

interface PageProps extends TestProps {
	className?: string
	children?: ReactNode,
	onScrollEnd?: () => void
	isLoading?: boolean
	saveScroll?: boolean
}

// const pageAnimations = {
// 	hidden: {
// 		opacity: 0,
// 		// x: '-30vw',
// 	},
// 	visible: {
// 		opacity: 1,
// 		// x: 0,
// 		transition: { delay: 0.1, duration: 1 }
// 	},
// 	exit: {
// 		// x: '-50vw',
// 		// opacity: 0,
// 		transition: { duration: 0.5 }
// 	}
// }

export const Page = memo((props: PageProps) => {
	const {
		className,
		children,
		onScrollEnd,
		isLoading,
		saveScroll = false
	} = props

	const dispatch = useAppDispatch()
	const { pathname } = useLocation()
	// Этот селектор, кроме стейта, также принимает дополнительный аргумент - path. 
	// Поэтому нужно передать стрелочную функцию, чтобы добавить нужный аргумент. Эти танцы с бубном нужны потому что useSelector умеет работать только с теми селекторами у которых один аргумент(стейт).
	const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname))

	const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

	useInitialEffect(() => {
		wrapperRef.current.scrollTop = scrollPosition
	})


	useInfiniteScroll({
		callback: onScrollEnd,
		wrapperRef,
		triggerRef,
		isLoading
	})

	// const onScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
	// 	dispatch(uiActions.setScrollPosition({
	// 		position: e.currentTarget.scrollTop,
	// 		path: pathname
	// 	}))
	// }, [dispatch, pathname])
	// const onScrollThrottled = useThrottle(onScroll, 2000, { leading: true, trailing: false })
	const onScrollThrottled = useThrottle((e: UIEvent<HTMLDivElement>) => {
		dispatch(uiActions.setScrollPosition({
			position: e.currentTarget.scrollTop,
			path: pathname
		}))
	}, 500, { leading: true, trailing: false })

	return (
		<motion.main
			// variants={pageAnimations}
			// initial='hidden'
			// animate='visible'
			// exit='exit'
			ref={wrapperRef}
			className={clsx(cls.Page, className)}
			onScroll={saveScroll ? onScrollThrottled : undefined}
			data-testid={props['data-testid'] ?? 'Page'}
		>
			<div className={cls.wrapper}>
				{children}
			</div>
			{/* <ToastViewport className={cls.toastViewport} /> */}
			{onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
		</motion.main>
	)
})
Page.displayName = 'PageComponent'