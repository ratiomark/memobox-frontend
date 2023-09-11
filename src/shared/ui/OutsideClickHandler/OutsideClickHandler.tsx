import{ useRef, useEffect, ReactNode } from 'react';

interface OutsideClickHandlerProps {
	children: ReactNode;
	onClose: () => void;
}

export const OutsideClickHandler = ({ children, onClose }: OutsideClickHandlerProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function handleOutsideClick(event: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				onClose();
			}
		}

		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [onClose]);

	return <div ref={containerRef}>{children}</div>;
};
