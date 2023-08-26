import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { BigDataLabel } from '../BigDataLabels/BigDataLabel';
import cls from './CompleteBigDataLabels.module.scss';
import { DataBlock } from '@/shared/types/DataBlock';
import { useCustomTranslate } from '@/features/LanguageSwitcher';




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
			<button onClick={() => setLang(currentLang === 'ru' ? 'en' : 'ru')}>{currentLang}</button>
		</div>
	)
}