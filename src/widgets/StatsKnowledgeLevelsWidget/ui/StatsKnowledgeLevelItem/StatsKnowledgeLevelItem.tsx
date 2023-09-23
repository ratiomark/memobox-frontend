import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import cls from './StatsKnowledgeLevelItem.module.scss'
import { motion } from 'framer-motion'
import { MyText } from '@/shared/ui/Typography'
import { SmallDataLabel } from '@/shared/ui/DataLabels'
import { DataLabelType } from '@/shared/ui/DataLabels/types/DataLabelType'

export type StatsKnowledgeLevelItemType =
	| 'new'
	| 'beginning'
	| 'middle'
	| 'good'
	| 'learnt'

interface StatsKnowledgeLevelItemProps {
	cardsCount?: number
	percentValue?: number
	className?: string
	type: StatsKnowledgeLevelItemType
	isLoading: boolean
}

export const StatsKnowledgeLevelItem = (props: StatsKnowledgeLevelItemProps) => {
	const { t } = useTranslation('stats')
	const {
		className,
		type,
		cardsCount,
		percentValue,
		isLoading
	} = props

	let DataLabelName;
	let typeForSmallDataLabel: DataLabelType;
	switch (type) {
		case 'new':
			DataLabelName = t('new label')
			typeForSmallDataLabel = 'all'
			break;
		case 'beginning':
			DataLabelName = t('beginning label')
			typeForSmallDataLabel = 'train'
			break;
		case 'middle':
			DataLabelName = t('middle label')
			typeForSmallDataLabel = 'wait'
			break;
		case 'good':
			DataLabelName = t('good label')
			typeForSmallDataLabel = 'all'
			break;
		case 'learnt':
			DataLabelName = t('learnt label')
			typeForSmallDataLabel = 'all'
			break;
	}



	const cardCountComponent = (
		<SmallDataLabel
			type={typeForSmallDataLabel}
			isLoading={isLoading}
			cardsCount={cardsCount}
		/>)
	const percentValueComponent = (
		<SmallDataLabel
			type={typeForSmallDataLabel}
			isLoading={isLoading}
			cardsCount={`${percentValue}%`}
		/>)


	return (
		<>
			<motion.div
				// initial={isLoading ? { x: -80, opacity: 1 } : false}
				animate={{ x: 0, opacity: 1 }}
				// viewport={{ once: true }}
				transition={{ type: 'just', duration: 0.5 }}
				className={clsx(cls.statsKnowledgeLevelItem, [className])}
			>
				{/* <div className={clsx(cls.coloredLeftSide, cls[type])}> */}
				<div className={clsx(cls.dataHolder)}>
					<MyText
						drop
						className={cls.labelName}
						text={DataLabelName}
					/>
					<div className={cls.statsWrapper}>
						{cardCountComponent}
						{percentValueComponent}
					</div>
				</div>
				{/* </div> */}
			</motion.div>
		</>
	)
}