import clsx from 'clsx'
import cls from './BigDataLabel.module.scss'
import Spinner from '@/shared/assets/icons/spinner.svg'
import { useTranslation } from 'react-i18next'
import { MyText } from '../../Typography'
import { motion } from 'framer-motion'
import { SmallDataLabel } from '@/shared/ui/DataLabels'
import { DataLabelType } from '../types/DataLabelType'
import { TEST_ENTITY_NAMES } from '@/shared/const/testConsts'

interface BigDataLabelProps<T extends boolean, K extends boolean | undefined> {
	type: DataLabelType
	className?: string
	isLoading: T
	cardsCount: T extends true ? undefined : number;
	withPercentValue?: K
	percentValue?: K extends true ? number : undefined;
}

export const BigDataLabel = <
	T extends boolean,
	K extends boolean = false
>(props: BigDataLabelProps<T, K>) => {
	const { t } = useTranslation()
	const {
		className,
		type,
		cardsCount,
		isLoading,
		percentValue,
		withPercentValue,
	} = props

	let DataLabelName;
	let dataTestId;
	switch (type) {
		case 'all':
			DataLabelName = t('all big data label name')
			dataTestId = TEST_ENTITY_NAMES.labels.allLabel
			break;
		case 'train':
			DataLabelName = t('train big data label name')
			dataTestId = TEST_ENTITY_NAMES.labels.trainLabel
			break;
		case 'wait':
			DataLabelName = t('wait big data label name')
			dataTestId = TEST_ENTITY_NAMES.labels.waitLabel
			break;
	}

	let content;
	let percentValueComponent;
	if (isLoading) {
		content = <Spinner width={24} height={24} className={cls[`${type}_spinner`]} />
		percentValueComponent = withPercentValue
			&& (<div className={cls.percentValueWrapper} >
				<SmallDataLabel type={type} isLoading={isLoading} cardsCount={`${percentValue}%`} />
			</div>)
	} else {
		percentValueComponent = withPercentValue
			&& (<div className={cls.percentValueWrapper} >
				<SmallDataLabel type={type} isLoading={isLoading} cardsCount={`${percentValue}%`} />
			</div>)
		content = (
			<MyText
				drop
				className={cls.cardsCounter}
				data-testid={TEST_ENTITY_NAMES.labels.labelInfo}
				text={cardsCount} />
		)
	}

	return (
		<motion.div
			// initial={isLoading ? { x: -80, opacity: 1 } : false}
			animate={{ x: 0, opacity: 1 }}
			// viewport={{ once: true }}
			transition={{ type: 'just', duration: 0.5 }}
			className={clsx(cls.BigDataLabel, [className])}
			data-testid={dataTestId}
		>
			{percentValueComponent}
			<div className={clsx(cls.coloredLeftSide, cls[type])}>
				<div className={clsx(cls.dataHolder)}>
					{content}
					<MyText
						drop
						noSelect
						className={cls.labelName}
						text={DataLabelName} />
				</div>
			</div>
		</motion.div>
	)
}