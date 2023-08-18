import { useState, useEffect } from 'react'

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
		windowWidth: window.innerWidth,
		windowHeight: window.innerHeight,
	})
	// const [windowHeight, setWindowHeight] = useState(window.innerHeight)

	const handleResize = () => {
		setWindowSize({
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
		})
		// setWindowHeight(window.innerHeight)
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize)
		if (window.innerHeight !== windowSize.windowHeight || window.innerWidth !== windowSize.windowWidth) {
			handleResize()
		}
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [windowSize])

	return windowSize
}
// import { useState, useEffect } from 'react'

// export const useWindowHeight = () => {
// 	const [windowHeight, setWindowHeight] = useState(window.innerHeight)

// 	const handleResize = () => {
// 		setWindowHeight(window.innerHeight)
// 	}

// 	useEffect(() => {
// 		window.addEventListener('resize', handleResize)
// 		if (window.innerHeight !== windowHeight) {
// 			handleResize()
// 		}
// 		return () => {
// 			window.removeEventListener('resize', handleResize)
// 		}
// 	}, [windowHeight])

// 	return windowHeight
// }