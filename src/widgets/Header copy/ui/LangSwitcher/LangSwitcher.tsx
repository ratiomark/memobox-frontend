import { ReactNode } from 'react'
import { ToggleFeatures } from '@/shared/lib/features'
import { useCustomTranslate } from '@/features/LanguageSwitcher'
import { Button } from '@/shared/ui/Button/Button'
import { Langs } from '@/shared/types/languages'

interface LangSwitcherProps {
	className?: string
	short?: boolean
}

export const LangSwitcher = (props: LangSwitcherProps) => {
	const {
		className,
		short
	} = props
	const { setLang, t, currentLang } = useCustomTranslate()


	const onToggleLang = () => {
		setLang(currentLang === Langs.en ? Langs.ru : Langs.en)
	}

	return (
		<Button
			variant='outline'
			onClick={onToggleLang}
		>
			{short ? t('button lang short') : t('button lang change')}
		</Button>

	)
}