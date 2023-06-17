import { useEffect, useState } from 'react'

type UseLockedBodyOutput = [boolean, (locked: boolean) => void]

export const useLockedBody = (initialLocked = false, rootId = '[data-testid="MainPage"]'): UseLockedBodyOutput => {
	const [locked, setLocked] = useState(initialLocked)

	// Do the side effect before render
	useEffect(() => {
		if (!locked) {
			return
		}
		const root = document.querySelector(rootId) as HTMLDivElement// or root
		// Save initial body style
		const originalOverflow = root.style.overflow
		const originalPaddingRight = root.style.paddingRight

		// Lock body scroll
		root.style.overflow = 'hidden'

		// Get the scrollBar width
		// const root = document.querySelector(rootId) // or root
		// const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0

		// // Avoid width reflow
		// if (scrollBarWidth) {
		// 	document.body.style.paddingRight = `${scrollBarWidth}px`
		// }

		return () => {
			root.style.overflow = originalOverflow

			// if (scrollBarWidth) {
			// document.body.style.paddingRight = originalPaddingRight
			// }
		}
	}, [locked, rootId])

	// Update state if initialValue changes
	useEffect(() => {
		if (locked !== initialLocked) {
			setLocked(initialLocked)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialLocked])

	return [locked, setLocked]
}

export default useLockedBody