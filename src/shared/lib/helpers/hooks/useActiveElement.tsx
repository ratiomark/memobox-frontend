import { useState, useEffect } from 'react';

export const useActiveElement = () => {
	const [activeElement, setActiveElement] = useState(document.activeElement);

	useEffect(() => {
		const handleFocus = () => {
			setActiveElement(document.activeElement);
		};

		const handleBlur = () => {
			setActiveElement(document.activeElement);
		};

		document.addEventListener('focus', handleFocus, true);
		document.addEventListener('blur', handleBlur, true);

		return () => {
			document.removeEventListener('focus', handleFocus, true);
			document.removeEventListener('blur', handleBlur, true);
		};
	}, []);

	return activeElement;
};