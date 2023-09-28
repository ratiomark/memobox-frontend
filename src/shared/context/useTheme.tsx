import { useContext, useEffect, useLayoutEffect } from 'react';
import { Theme } from '../types/Theme';
import { ThemeContext } from './ThemeContext';
import { localDataService } from '../lib/helpers/common/localDataService';

interface UseThemeResult {
	toggleTheme: (saveAction: (theme: Theme) => void) => void;
	theme: Theme;
}

export const useTheme = (): UseThemeResult => {
	const { theme = Theme.LIGHT, setTheme } = useContext(ThemeContext);

	// useLayoutEffect(() => {
	// 	document.body.className = theme
	// }, [theme])

	useEffect(() => {
		localDataService.setTheme(theme)
	}, [theme])

	const toggleTheme = (saveAction: (theme: Theme) => void) => {
		let newTheme: Theme
		switch (theme) {
			case Theme.DARK:
				newTheme = Theme.LIGHT
				break;
			case Theme.LIGHT:
				newTheme = Theme.DARK
				break;
			default:
				newTheme = Theme.LIGHT
		}
		// switch (theme) {
		// 	case Theme.DARK:
		// 		newTheme = Theme.ORANGE
		// 		break;
		// 	case Theme.LIGHT:
		// 		newTheme = Theme.DARK
		// 		break;
		// 	case Theme.ORANGE:
		// 		newTheme = Theme.LIGHT
		// 		break;
		// 	default:
		// 		newTheme = Theme.LIGHT
		// }
		setTheme?.(newTheme)
		// localStorage.setItem('theme', newTheme)
		// document.body.className = newTheme
		saveAction?.(newTheme)
	}
	return { theme, toggleTheme }
}
