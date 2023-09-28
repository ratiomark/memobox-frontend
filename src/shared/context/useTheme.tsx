import { useContext, useEffect } from 'react';
import { Theme } from '../types/Theme';
import { ThemeContext } from './ThemeContext';

interface UseThemeResult {
	toggleTheme: (saveAction: (theme: Theme) => void) => void;
	theme: Theme;
}

export const useTheme = (): UseThemeResult => {
	const { theme = Theme.LIGHT, setTheme } = useContext(ThemeContext);

	useEffect(() => {
		document.body.className = theme
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
		saveAction?.(newTheme)
	}
	return { theme, toggleTheme }
}
