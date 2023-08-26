import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './MainDataLabelList.module.scss';
import { DataBlock } from '@/shared/types/DataBlock';
import { useCustomTranslate } from '@/features/LanguageSwitcher';
import { MainDataLabel } from '../MainDataLabelItem/MainDataLabelItem';

export interface StatsDataBlockWithPercent {
	all: number
	wait: {
		cardsCount: number
		percentValue: number
	}
	train: {
		cardsCount: number
		percentValue: number
	}
}


interface MainDataLabelListProps {
	className?: string
	isLoading: boolean
	data: StatsDataBlockWithPercent | undefined
}


export const MainDataLabelList = (props: MainDataLabelListProps) => {
	const {
		className,
		data,
		isLoading
	} = props

	const { t, currentLang, setLang } = useCustomTranslate()

	return (
		<div className={clsx(
			cls.MainDataLabelList,
			[className])}
		>
			<MainDataLabel isLoading={isLoading} cardsCount={data?.all} type='all' />
			<MainDataLabel
				isLoading={isLoading}
				cardsCount={data?.train.cardsCount}
				percentValue={data?.train.percentValue}
				type='train'
			/>
			<MainDataLabel
				isLoading={isLoading}
				cardsCount={data?.wait.cardsCount}
				percentValue={data?.wait.percentValue}
				type='wait'
			/>
			<button onClick={() => setLang(currentLang === 'ru' ? 'en' : 'ru')}>{currentLang}</button>
		</div>
	)
}