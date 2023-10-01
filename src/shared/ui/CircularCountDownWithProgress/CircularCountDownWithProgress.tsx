// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './CircularCountDownWithProgress.module.scss';
import './CircularCountDownWithProgress.scss'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
interface CircularCountDownWithProgressProps {
	duration?: number
	size?: number
	strokeWidth?: number
	trailStrokeWidth?: number
}

export const CircularCountDownWithProgress = ({ duration, size, strokeWidth, trailStrokeWidth }: CircularCountDownWithProgressProps) => {
	const renderTime = ({ remainingTime }: { remainingTime: number }) => {
		return (
			<div className="timerInnerPart">
				<div className="value">{remainingTime}</div>
			</div>
		)
	}

	return (
		<CountdownCircleTimer
			isPlaying
			size={size ?? 56}
			strokeWidth={strokeWidth ?? 5}
			// isGrowing
			trailStrokeWidth={trailStrokeWidth ?? 2}
			duration={duration ?? 8}
			isSmoothColorTransition
			rotation='counterclockwise'
			// @ts-ignore
			colors='var(--count-down-deletion-path-color)'
			// trailColor='var(--accent)'
			// colors={['var(--accent)', 'var(--cancel)', 'var(--accent)', 'var(--cancel)']}
			// colors={['#004777', '#F7B801', '#A30000', '#A30000']}
			// colorsTime={[10, 6, 3, 0]}
			onComplete={() => ({ shouldRepeat: false })}
		// onComplete={() => ({ shouldRepeat: true, delay: 1 })}
		>
			{renderTime}
		</CountdownCircleTimer>
	)
}