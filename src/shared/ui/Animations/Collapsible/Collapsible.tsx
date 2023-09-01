import { AnimatePresence, animate, m } from 'framer-motion';
import { ReactNode, useMemo } from 'react';

interface CollapsibleProps {
	children: ReactNode
	isOpen: boolean
	animationDuration?: number
	unmountAfterClosed?: boolean
	initial?: boolean
	layout?: boolean
	// targetHeight,
	onAnimationStart?: () => void
	onAnimationComplete?: () => void
	onExitComplete?: () => void
	delay?: number
	mode?: 'sync' | 'popLayout' | 'wait'
}

export const Collapsible = (props: CollapsibleProps) => {
	const {
		children,
		isOpen,
		animationDuration = 0.3,
		unmountAfterClosed = true,
		initial = true,
		layout = true,
		mode = 'wait',
		onAnimationStart,
		onAnimationComplete,
		onExitComplete,
		delay = 0,
		...otherProps
	} = props;

	// const x = 10;

	const _ID = useMemo(() => `${Math.random()}:${Date.now()}`, []);

	const content = (
		<m.div
			key={_ID}
			data-id={_ID}
			layout={layout}
			initial={'collapsed'}
			animate={isOpen ? 'open' : 'collapsed'}
			style={{ position: 'relative' }}
			exit="collapsed"
			transition={{
				delay: delay,
				duration: animationDuration
			}}
			variants={{
				open: {
					height: 'auto',
					overflow: 'hidden',
					// transitionEnd: { overflowY: 'hidden', overflowX: 'auto' }
					transitionEnd: { overflow: 'visible' }
				},
				collapsed: { height: 0, overflow: 'hidden' }
			}}
			onAnimationStart={onAnimationStart}
			onAnimationComplete={onAnimationComplete}
			{...otherProps}
		>
			{children}
		</m.div>
	);

	return unmountAfterClosed
		? (
			<AnimatePresence
				onExitComplete={onExitComplete}
				initial={initial}
				mode={mode}
			>
				{isOpen && content}
			</AnimatePresence>)
		: content
};

