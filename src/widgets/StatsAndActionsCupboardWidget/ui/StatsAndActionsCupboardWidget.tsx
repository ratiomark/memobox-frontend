import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/Stack';
import { CompleteBigDataLabels } from '@/shared/ui/DataLabels/CompleteBigDataLabels/CompleteBigDataLabels';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import InfoIcon from '@/shared/assets/icons/infoIcon.svg'
import { useCallback, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import cls from './StatsAndActionsCupboardWidget.module.scss';
import { getCupboardIsLoading, getCupboardError, getCupboardData, cupboardShelfListActions } from '@/features/CupboardShelfList';
import { useSelector } from 'react-redux';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { useHotkeys } from 'react-hotkeys-hook';
import { CreateNewShelfModal } from '@/features/CreateNewShelfModal';
import { motion } from 'framer-motion'
import { getUserShelfNamesList } from '@/entities/User';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ButtonsSkeleton } from './ButtonsSkeleton';

interface StatsAndActionsCupboardWidgetProps {
	className?: string
}

export const StatsAndActionsCupboardWidget = (props: StatsAndActionsCupboardWidgetProps) => {
	const {
		className
	} = props
	const [newShelfModalIsOpen, setNewShelfModalIsOpen] = useState(false)
	// const shelfNames = useSelector(getUserShelfNamesList)?.map(shelf => shelf.title)
	// const { data, isLoading } = useGetCupboardDataQuery()
	const cupboardIsLoading = useSelector(getCupboardIsLoading)
	const cupboardError = useSelector(getCupboardError)
	const cupboardData = useSelector(getCupboardData)
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	const onAddNewShelfClick = () => setNewShelfModalIsOpen(true)
	const onCloseNewShelfModal = () => setNewShelfModalIsOpen(false)

	const onAddNewCardClick = useCallback(() => {
		dispatch(cupboardShelfListActions.setCardModalIsOpen(true))
	}, [dispatch])

	const buttons = (
		<AnimateSkeletonLoader
			classNameForCommonWrapper={cls.commonWrapper}
			skeletonComponent={<ButtonsSkeleton />}
			// animateComponentAfterLoadingFadeInTime={DURA}
			componentAfterLoading={
				<HStack gap='gap_14' className={cls.actions}>
					<Button onClick={onAddNewShelfClick} borderRadius='borderRadius_4'>{t('new shelf')}</Button>
					<Button onClick={onAddNewCardClick} borderRadius='borderRadius_4'>{t('add card with hot key')}</Button>
					<Icon
						Svg={InfoIcon}
						width={26}
						height={26}
						className={cls.info}
					/>
				</HStack>
			}
			noDelay={!cupboardIsLoading}
			isLoading={cupboardIsLoading}
		/>
	)




	useHotkeys('n', onAddNewCardClick, { keyup: true })

	return (
		<motion.div
		// initial={{ y: -100 }}
		// animate={{ y: 0 }}
		// transition={{ type: 'spring', }}
		>
			<HStack
				max
				className={clsx(
					cls.statsAndActionsCupboardWidget,
					className)}
			><div>
					<CompleteBigDataLabels data={cupboardData} isLoading={cupboardIsLoading} />

					<ThemeSwitcher />
				</div>
				{buttons}
				{/* <HStack gap='gap_14' className={cls.actions} > */}
				{/* <Button onClick={onAddNewShelfClick} borderRadius='borderRadius_4'>{t('New shelf')}</Button>
					<Button onClick={onAddNewCardClick} borderRadius='borderRadius_4'>{t('add card with hot key')}</Button>
					<Icon
						Svg={InfoIcon}
						width={26}
						height={26}
						className={cls.info}
					/> */}

				{/* </HStack> */}
				<CreateNewShelfModal
					isOpen={newShelfModalIsOpen}
					onClose={onCloseNewShelfModal}
					onSubmit={() => console.log('Создаю новую полку с названием  ')}
				// shelfNames={shelfNames}
				/>
			</HStack>
		</motion.div>
	)
}
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import { HStack } from '@/shared/ui/Stack';
// import { CompleteBigDataLabels } from '@/shared/ui/DataLabels/CompleteBigDataLabels/CompleteBigDataLabels';
// import { Button } from '@/shared/ui/Button';
// import { Icon } from '@/shared/ui/Icon';
// import InfoIcon from '@/shared/assets/icons/infoIcon.svg'

// import cls from './StatsAndActionsCupboardWidget.module.scss';
// import { useGetCupboardDataQuery } from '@/features/GetCupboardData';



// interface StatsAndActionsCupboardWidgetProps {
// 	className?: string
// }


// const data = { wait: 40, all: 40, train: 33 }
// export const StatsAndActionsCupboardWidget = (props: StatsAndActionsCupboardWidgetProps) => {
// 	const {
// 		className
// 	} = props
// 	const { isSuccess, data, isLoading } = useGetCupboardDataQuery()
// 	const { t } = useTranslation()

// 	// if (isLoading) return <p>Загрузка</p>
// 	// if(!isSuccess) return <p>Неудача</p>

// 	return (
// 		<HStack
// 			max
// 			className={clsx(
// 				cls.statsAndActionsCupboardWidget,
// 				className)}
// 		>
// 			<CompleteBigDataLabels data={data ?? } />
// 			<HStack gap='gap_14' className={cls.actions} >
// 				<Button borderRadius='borderRadius_4'>{t('New shelf')}</Button>
// 				<Button borderRadius='borderRadius_4'>{t('add card with hot key')}</Button>
// 				<Icon
// 					Svg={InfoIcon}
// 					width={26}
// 					height={26}
// 					className={cls.info}
// 				/>

// 			</HStack>
// 		</HStack>
// 	)
// }