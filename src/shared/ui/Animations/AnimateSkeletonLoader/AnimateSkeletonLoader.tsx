import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimateSkeletonLoaderProps {
	skeletonComponent: ReactNode
	componentAfterLoading: ReactNode
	isLoading: boolean | undefined
	commonWrapper?: boolean
	noDelay?: boolean
	animateSkeletonFadeOutTime?: number
	animateComponentAfterLoadingFadeInTime?: number
	// classNameForSkeletonWrapper?: string
	classNameForCommonWrapper?: string
	idForCommonWrapper?: string
	classNameAbsoluteParts?: string
	borderTest?: boolean
}

export const AnimateSkeletonLoader = (props: AnimateSkeletonLoaderProps) => {
	const {
		skeletonComponent,
		componentAfterLoading,
		noDelay = false,
		animateSkeletonFadeOutTime = 0.5,
		animateComponentAfterLoadingFadeInTime = 0.5,
		isLoading,
		commonWrapper = true,
		borderTest = false,
		// classNameForSkeletonWrapper,
		classNameAbsoluteParts,
		classNameForCommonWrapper,
		idForCommonWrapper,
	} = props

	const skeleton = (
		<AnimatePresence>
			{isLoading &&
				<motion.div
					style={{
						position: 'absolute',
						// zIndex: 10,
						right: classNameAbsoluteParts ? '' : 0,
						border: borderTest ? '1px solid blue' : ''
					}}
					// style={{ position: 'absolute', inset: 0, zIndex: 4, width: 'max-content', height: 'fit-content', border: '1px solid blue' }}
					// можно менять код тут
					// style={{ position: 'relative', }}
					exit={{
						opacity: 0,
						transition: {
							opacity: {
								duration: animateSkeletonFadeOutTime
							}
						}
					}}
					className={classNameAbsoluteParts}
				>
					{/* <div style={{ position: 'absolute', inset: 0, zIndex: 4 }}> */}
					{skeletonComponent}
					{/* </div> */}
				</motion.div>
			}
		</AnimatePresence>
	)

	const component = (
		<AnimatePresence>
			{!isLoading &&
				<motion.div
					style={{
						position: 'absolute',
						// zIndex: 20,
						right: classNameAbsoluteParts ? '' : 0,
						border: borderTest ? '1px solid blue' : ''
					}}
					// style={{ position: 'absolute', inset: 0, zIndex: 5, width: 'max-content', height: 'fit-content', border: '1px solid blue' }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: animateComponentAfterLoadingFadeInTime,
						delay: noDelay ? 0 : animateSkeletonFadeOutTime - 0.1
					}}
					className={classNameAbsoluteParts}
				>
					{/* <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}> */}

					{componentAfterLoading}
					{/* </div> */}
				</motion.div>
			}
		</AnimatePresence>
	)

	if (!commonWrapper) {
		return (
			<>
				{skeleton}
				{component}
			</>
		)
	}

	return (
		<div
			className={classNameForCommonWrapper}
			id={idForCommonWrapper}
			// onScroll={(e) => {
			// 	console.log(e.currentTarget.scrollLeft)
			// }}
			style={{
				// position: 'relative', border: '1px solid red', padding: 2, display: 'grid',
				// alignSelf: 'baseline',
				// margin: '0 auto'
			}}>
			{skeleton}
			{component}
		</div>
	)
}