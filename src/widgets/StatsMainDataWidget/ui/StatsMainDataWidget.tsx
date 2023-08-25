import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './StatsMainDataWidget.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { CompleteBigDataLabels } from '@/shared/ui/DataLabels/CompleteBigDataLabels/CompleteBigDataLabels';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import InfoIcon from '@/shared/assets/icons/infoIcon.svg'
import { useCallback, useState } from 'react';
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


interface StatsMainDataWidgetProps {
	className?: string
}

export const StatsMainDataWidget = (props: StatsMainDataWidgetProps) => {
	const {
		className
	} = props
	const [newShelfModalIsOpen, setNewShelfModalIsOpen] = useState(false)
	const cupboardIsLoading = useSelector(getCupboardIsLoading)
	const cupboardError = useSelector(getCupboardError)
	const cupboardData = useSelector(getCupboardData)
	const { t } = useTranslation()
	const dispatch = useAppDispatch()



	return (
		<motion.div
		// initial={{ y: -100 }}
		// animate={{ y: 0 }}
		// transition={{ type: 'spring', }}
		>
			<HStack
				max
				className={clsx(
					cls.statsMainDataWidget,
					className)}
			>
				<div>
					<CompleteBigDataLabels className={cls.mainData} data={cupboardData} isLoading={cupboardIsLoading} />
				</div>
			</HStack>
		</motion.div>
	)
}
