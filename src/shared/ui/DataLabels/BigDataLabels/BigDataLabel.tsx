import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { MyText } from '../../Typography'
import Spinner from '@/shared/assets/icons/spinner.svg'
import cls from './BigDataLabel.module.scss'
import { motion } from 'framer-motion'
export type BigDataLabelType =
	| 'all'
	| 'train'
	| 'wait'


interface BigDataLabelProps {
	cardsCount?: number
	className?: string
	type: BigDataLabelType
	isLoading: boolean
}

export const BigDataLabel = (props: BigDataLabelProps) => {
	const { t } = useTranslation()
	const {
		className,
		type,
		cardsCount,
		isLoading
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
	if (isLoading) {
		content = <Spinner width={24} height={24} className={cls[`${type}_spinner`]} />
	} else {
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
				className={clsx(cls.BigDataLabel, [className])}
			>
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

{
	/* <div className='colorLabeReadyCards coloredLeftSide'>
</div>
<div className='dataHolder'>
	<p className="cardsCounter">{children}</p>
	<p className="labelName">Train</p>
</div> */
}
