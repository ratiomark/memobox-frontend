import clsx from 'clsx'
import cls from '@/shared/ui/DataLabels/BigDataLabels/BigDataLabel.module.scss'
import Spinner from '@/shared/assets/icons/spinner.svg'
import { useTranslation } from 'react-i18next'
import { MyText } from '@/shared/ui/Typography'
import { motion } from 'framer-motion'
import { SmallDataLabel } from '@/shared/ui/DataLabels'

export type MainDataLabelType =
	| 'all'
	| 'train'
	| 'wait'

interface MainDataLabelProps {
	cardsCount?: number
	className?: string
	type: MainDataLabelType
	isLoading: boolean
	percentValue?: number
}

export const MainDataLabel = (props: MainDataLabelProps) => {
	const { t } = useTranslation()
	const {
		className,
		type,
		cardsCount,
		isLoading,
		percentValue,
	} = props

	let DataLabelName;

	switch (type) {
		case 'all':
			DataLabelName = t('all big data label name')
			break;
		case 'train':
			DataLabelName = t('train big data label name')
			break;
		case 'wait':
			DataLabelName = t('wait big data label name')
			break;
	}

	let content;
	let percentValueComponent;
	if (isLoading) {
		content = <Spinner width={24} height={24} className={cls[`${type}_spinner`]} />
	} else {
		percentValueComponent = percentValue ? <SmallDataLabel type={type} isLoading={isLoading} cardsCount={`${percentValue}%`} /> : undefined
		content = <MyText
			drop
			className={cls.cardsCounter}
			text={cardsCount} />
	}

	return (
		<>
			<motion.div
				// initial={isLoading ? { x: -80, opacity: 1 } : false}
				animate={{ x: 0, opacity: 1 }}
				// viewport={{ once: true }}
				transition={{ type: 'just', duration: 0.5 }}
				className={clsx(cls.MainDataLabelItem, [className])}
			>
				<div className={cls.percentValueWrapper} >
					{percentValueComponent}
				</div>
				<div className={clsx(cls.coloredLeftSide, cls[type])}>
					<div className={clsx(cls.dataHolder)}>
						{content}
						<MyText
							drop
							className={cls.labelName}
							text={DataLabelName} />
					</div>
				</div>
			</motion.div>
		</>
	)
}
