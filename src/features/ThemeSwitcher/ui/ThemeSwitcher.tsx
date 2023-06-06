import clsx from 'clsx'
import IconThemeDeprecated from '@/shared/assets/icon/theme-dark-1.svg'
import IconTheme from '@/shared/assets/icons_redesigned/theme.svg'
import { useTheme } from '@/shared/context/useTheme'
import { memo, useCallback } from 'react'
import { saveJsonSettings } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'
import { ToggleFeatures } from '@/shared/lib/features'
import cls from './ThemeSwitcher.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { Icon } from '@/shared/ui/Icon/Icon'

interface ThemeSwitcherProps {
	className?: string
}
export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
	const { theme, toggleTheme } = useTheme()
	const dispatch = useAppDispatch()

	const handleToggleTheme = useCallback(() => {
		toggleTheme((newTheme) => {
			dispatch(saveJsonSettings({ theme: newTheme }))
		})
	}, [toggleTheme, dispatch])

	return (
		<Icon
			Svg={IconTheme}
			clickable
			onClick={handleToggleTheme}
			className={clsx(cls.themeIcon, className)}
		/>
	)
})
