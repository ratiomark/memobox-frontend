import { MutableRefObject, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react';

interface PortalProps {
	//children - то что я телепортирую, а element - куда я телепортирую
	children: ReactNode
	element?: HTMLElement | Element
}

export const Portal = ({ children, element = document.body }: PortalProps) => {
	const ref = useRef() as MutableRefObject<HTMLElement>
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		console.log('Portal отработал');
		ref.current = document.body
		setMounted(true);
		// return () => {
		// 	setMounted(false)
		// 	ref.current = null
		// }
	}, []);

	return (mounted && ref.current)
		? createPortal(children, ref.current)
		: null;
}