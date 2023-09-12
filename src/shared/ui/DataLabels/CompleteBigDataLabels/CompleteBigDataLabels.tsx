import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { BigDataLabel } from '../BigDataLabels/BigDataLabel';
import cls from './CompleteBigDataLabels.module.scss';
import { DataBlock } from '@/shared/types/DataBlock';
// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { useCustomTranslate } from '@/features/LanguageSwitcher';
import langIcon from './language-translate-svgrepo-com.svg'
import { Icon } from '../../Icon';




interface CompleteBigDataLabelsProps {
	className?: string
	isLoading: boolean
	data: DataBlock | undefined
}


export const CompleteBigDataLabels = (props: CompleteBigDataLabelsProps) => {
	const {
		className,
		data,
		isLoading
	} = props

	const { t, currentLang, setLang } = useCustomTranslate()

	return (
		<div className={clsx(
			cls.CompleteBigDataLabels,
			[className])}
		>
			<BigDataLabel isLoading={isLoading} cardsCount={data?.all} type='all' />
			<BigDataLabel isLoading={isLoading} cardsCount={data?.train} type='train' />
			<BigDataLabel isLoading={isLoading} cardsCount={data?.wait} type='wait' />
			<Icon
				clickable
				onClick={() => setLang(currentLang === 'ru' ? 'en' : 'ru')}
				Svg={langIcon }
			/>
			{/* <button onClick={() => setLang(currentLang === 'ru' ? 'en' : 'ru')}>{currentLang}</button> */}
		</div>
	)
}