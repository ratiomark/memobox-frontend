import clsx from 'clsx';
import cls from './MainDataLabelList.module.scss';
import { useCustomTranslate } from '@/features/LanguageSwitcher';
import { Icon } from '@/shared/ui/Icon';
import langIcon from '@/shared/assets/icons/langIcon.svg'
import { BigDataLabel } from '@/shared/ui/DataLabels';


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

	const { currentLang, setLang } = useCustomTranslate()

	return (
		<div className={clsx(
			cls.MainDataLabelList,
			className
		)}
		>
			<BigDataLabel isLoading={isLoading} cardsCount={data?.all} type='all' />
			<BigDataLabel
				isLoading={isLoading}
				withPercentValue
				cardsCount={data?.train.cardsCount}
				percentValue={data?.train.percentValue}
				type='train'
			/>
			<BigDataLabel
				isLoading={isLoading}
				withPercentValue
				cardsCount={data?.wait.cardsCount}
				percentValue={data?.wait.percentValue}
				type='wait'
			/>
			{/* <Icon
				clickable
				onClick={() => setLang(currentLang === 'ru' ? 'en' : 'ru')}
				Svg={langIcon}
			/> */}
		</div>
	)
}
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './MainDataLabelList.module.scss';
// import { DataBlock } from '@/shared/types/DataBlock';
// import { useCustomTranslate } from '@/features/LanguageSwitcher';
// import { MainDataLabel } from '../MainDataLabelItem/MainDataLabelItem';
// import { Icon } from '@/shared/ui/Icon';
// import langIcon from '@/shared/assets/icons/langIcon.svg'


// export interface StatsDataBlockWithPercent {
// 	all: number
// 	wait: {
// 		cardsCount: number
// 		percentValue: number
// 	}
// 	train: {
// 		cardsCount: number
// 		percentValue: number
// 	}
// }


// interface MainDataLabelListProps {
// 	className?: string
// 	isLoading: boolean
// 	data: StatsDataBlockWithPercent | undefined
// }


// export const MainDataLabelList = (props: MainDataLabelListProps) => {
// 	const {
// 		className,
// 		data,
// 		isLoading
// 	} = props

// 	const { t, currentLang, setLang } = useCustomTranslate()

// 	return (
// 		<div className={clsx(
// 			cls.MainDataLabelList,
// 			className
// 		)}
// 		>
// 			<MainDataLabel isLoading={isLoading} cardsCount={data?.all} type='all' />
// 			<MainDataLabel
// 				isLoading={isLoading}
// 				withPercentValue
// 				cardsCount={data?.train.cardsCount}
// 				percentValue={data?.train.percentValue}
// 				type='train'
// 			/>
// 			<MainDataLabel
// 				isLoading={isLoading}
// 				withPercentValue
// 				cardsCount={data?.wait.cardsCount}
// 				percentValue={data?.wait.percentValue}
// 				type='wait'
// 			/>
// 			<Icon
// 				clickable
// 				onClick={() => setLang(currentLang === 'ru' ? 'en' : 'ru')}
// 				Svg={langIcon}
// 			/>
// 		</div>
// 	)
// }