import { useState, useEffect } from 'react'

export const useWindowHeight = () => {
	const [windowHeight, setWindowHeight] = useState(window.innerHeight)

	const handleResize = () => {
		setWindowHeight(window.innerHeight)
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize)
		if (window.innerHeight !== windowHeight) {
			handleResize()
		}
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [windowHeight])

	return windowHeight
}