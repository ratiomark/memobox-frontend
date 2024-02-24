import clsx from 'clsx';
import cls from './StatsMainDataWidget.module.scss';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/shared/ui/Icon';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { getIsCupboardLoading, getCupboardError, getCupboardData } from '@/features/CupboardShelfList';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion'
import { MainDataLabelList, StatsDataBlockWithPercent } from './MainDataLabelList/MainDataLabelList';
import InfoIcon from '@/shared/assets/icons/infoIcon.svg'
import { iconSizeInfo } from '@/shared/const/iconSizes';

const data: StatsDataBlockWithPercent = {
	all: 125,
	train: {
		cardsCount: 34,
		percentValue: 28
	},
	wait: {
		cardsCount: 88,
		percentValue: 72
	}

}
interface StatsMainDataWidgetProps {
	className?: string
}

export const StatsMainDataWidget = (props: StatsMainDataWidgetProps) => {
	const {
		className
	} = props
	const [isLoading, setIsLoading] = useState(true)
	const cupboardIsLoading = useSelector(getIsCupboardLoading)
	const cupboardError = useSelector(getCupboardError)
	const cupboardData = useSelector(getCupboardData)
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false)
			// }, 30000000)
		}, 1000)
	}, [])


	return (
		<motion.div
			className={cls.wrapper}
		// initial={{ y: -100 }}
		// animate={{ y: 0 }}
		// transition={{ type: 'spring', }}
		>
			{/* <button style={{ position: 'absolute', top: 50, left: 50 }} onClick={() => setIsLoading(false)}>OFF</button> */}
			<div
				className={clsx(
					cls.statsMainDataWidget,
					'blockWithDivider')}
			>
				<MainDataLabelList
					data={data}
					isLoading={isLoading}
				/>
				<Icon
					Svg={InfoIcon}
					width={iconSizeInfo}
					height={iconSizeInfo}
					buttonSameSize
					clickable
					onClick={() => { }}
				/>
			</div>
		</motion.div>
	)
}
