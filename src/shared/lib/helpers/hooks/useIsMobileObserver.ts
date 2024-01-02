import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { uiActions } from '@/entities/UI';

export const useIsMobileObserver = () => {
	const dispatch = useAppDispatch()


	useEffect(() => {
		const handleResize = () => {
			console.log('window.innerWidth  - ', window.innerWidth)
			console.log('window.outerWidth  - ', window.outerWidth)
			dispatch(uiActions.setIsMobile(window.outerWidth <= 768))
		};

		window.addEventListener('resize', handleResize);
		window.addEventListener('orientationchange', handleResize);

		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('orientationchange', handleResize);
		};
	}, [dispatch]);

	return null;
}