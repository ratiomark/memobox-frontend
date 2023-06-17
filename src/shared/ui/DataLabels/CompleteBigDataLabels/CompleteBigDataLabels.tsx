import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { BigDataLabel } from '../BigDataLabels/BigDataLabel';
import cls from './CompleteBigDataLabels.module.scss';
import { DataBlock } from '@/shared/types/DataBlock';



interface CompleteBigDataLabelsProps {
	className?: string
	isLoading: boolean
	data: DataBlock
}


export const CompleteBigDataLabels = (props: CompleteBigDataLabelsProps) => {
	const {
		className,
		data,
		isLoading
	} = props

	return (
		<div className={clsx(
			cls.CompleteBigDataLabels,
			[className])}
		>
			<BigDataLabel isLoading={isLoading} cardsCount={data?.all} type='all' />
			<BigDataLabel isLoading={isLoading} cardsCount={data?.train} type='train' />
			<BigDataLabel isLoading={isLoading} cardsCount={data?.wait} type='wait' />
		</div>
	)
}