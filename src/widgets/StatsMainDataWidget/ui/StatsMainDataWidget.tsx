import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './StatsMainDataWidget.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { CompleteBigDataLabels } from '@/shared/ui/DataLabels/CompleteBigDataLabels/CompleteBigDataLabels';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { getCupboardIsLoading, getCupboardError, getCupboardData, cupboardShelfListActions } from '@/features/CupboardShelfList';
import { useSelector } from 'react-redux';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { useHotkeys } from 'react-hotkeys-hook';
import { CreateNewShelfModal } from '@/features/CreateNewShelfModal';
import { motion } from 'framer-motion'
import { getUserShelfNamesList } from '@/entities/User';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
import { Skeleton } from '@/shared/ui/Skeleton';
import { DataBlock } from '@/shared/types/DataBlock';
import { MainDataLabelList, StatsDataBlockWithPercent } from './MainDataLabelList/MainDataLabelList';
import InfoIcon from '@/shared/assets/icons/infoIcon.svg'
import { infoIconSize } from '@/shared/const/iconSizes';

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
	const cupboardIsLoading = useSelector(getCupboardIsLoading)
	const cupboardError = useSelector(getCupboardError)
	const cupboardData = useSelector(getCupboardData)
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false)
		}, 3000)
	}, [])


	return (
		<motion.div
			className={cls.wrapper}
		// initial={{ y: -100 }}
		// animate={{ y: 0 }}
		// transition={{ type: 'spring', }}
		>
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
					width={infoIconSize}
					height={infoIconSize}
					clickable
					onClick={() => { }}
				/>
			</div>
		</motion.div>
	)
}
