import { useRef, useCallback } from 'react'

// выполнение колбека не чаще чем 1 раз в delay
export function useThrottleOld(callback: (...args: any[]) => void, delay = 500) {
	const throttleRef = useRef(false)

	return useCallback((...args: any[]) => {
		if (!throttleRef.current) {
			callback(...args)
			throttleRef.current = true
		}

		setTimeout(() => {
			throttleRef.current = false
		}, delay)

	}, [callback, delay])

}

type CallBack = (...args: any[]) => void
interface Options {
	leading?: boolean
	trailing?: boolean
}

export const useThrottle = (callback: CallBack, delay = 500, option: Options) => {

	const {
		leading = true,
		trailing = true,
	} = option

	const timerId = useRef<null | number>(); // track the timer
	const lastArgs = useRef<any>(); // track the args

	// create a memoized debounce
	const throttle = useCallback((...args: any[]) => {
		// function for delayed call
		const waitFunc = () => {
			// if trailing invoke the function and start the timer again
			if (trailing && lastArgs.current) {
				callback.apply(this, lastArgs.current);
				lastArgs.current = null;
				timerId.current = setTimeout(waitFunc, delay);
			} else {
				// else reset the timer
				timerId.current = null;
			}
		};

		// if leading run it right away
		if (!timerId.current && leading) {
			callback.apply(this, args);
		}
		// else store the args
		else {
			lastArgs.current = args;
		}

		// run the delayed call
		if (!timerId.current) {
			timerId.current = setTimeout(waitFunc, delay);
		}
	}, [callback, delay, leading, trailing])

	return throttle;
};