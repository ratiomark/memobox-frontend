import langIcon from '@/shared/assets/icons/langIcon.svg'
// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { useCustomTranslate } from '@/features/LanguageSwitcher';
import { Icon } from '@/shared/ui/Icon';
import { CSSProperties } from 'react';

interface LangSwitcherIconProp {
	className?: string
	style?: CSSProperties
}
export const LangSwitcherIcon = ({ className, style }: LangSwitcherIconProp) => {
	const { currentLang, setLang } = useCustomTranslate()
	return (
		<Icon
			clickable
			className={className}
			style={style}
			// width={24}
			// height={24}
			onClick={() => setLang(currentLang === 'ru' ? 'en' : 'ru')}
			Svg={langIcon}
		/>
	)
}