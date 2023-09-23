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
import {
	getCupboardIsLoading,
	getCupboardError,
	getCupboardData,
	cupboardShelfListActions,
	getCreateNewShelfModalIsAwaitingResponse,
	getCreateNewShelfModalIsResponseSuccessful,
	getCreateNewShelfModalRequestStatus
} from '@/features/CupboardShelfList';
import { useSelector } from 'react-redux';
import { useHotkeys } from 'react-hotkeys-hook';
import { motion } from 'framer-motion'
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
import { CupboardMainButtonsSkeleton } from './StatsAndActionsCupboardWidgetSkeleton/CupboardMainButtonsSkeleton';
import { infoIconSize } from '@/shared/const/iconSizes';
import { CreateNewShelfModal } from './CreateNewShelfModal/CreateNewShelfModal';
import * as Toast from '@radix-ui/react-toast';
import { MyToast } from '@/shared/ui/Toast/MyToast';

export const StatsAndActionsCupboardWidget = () => {
	const cupboardIsLoading = useSelector(getCupboardIsLoading)
	const cupboardError = useSelector(getCupboardError)
	const cupboardData = useSelector(getCupboardData)
	const isAwaitingResponse = useSelector(getCreateNewShelfModalIsAwaitingResponse)
	const createNewShelfRequestStatus = useSelector(getCreateNewShelfModalRequestStatus)
	const isResponseSuccessful = useSelector(getCreateNewShelfModalIsResponseSuccessful)
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	const onOpenChange = (open: boolean) => {
		if (!open) {
			dispatch(cupboardShelfListActions.setIsCreateNewShelfModalAwaitingResponse(false))
			dispatch(cupboardShelfListActions.setIsCreateNewShelfModalSuccessfulResponse(false))
		}
	}
	const onTimeEnd = useCallback(() => {
		dispatch(cupboardShelfListActions.setIsCreateNewShelfModalRequestStatus('idle'))
	}, [dispatch])

	const onAddNewShelfClick = () => {
		dispatch(cupboardShelfListActions.setIsCreateNewShelfModalOpen(true))
	}

	const onOpenInfoModal = () => {
		dispatch(cupboardShelfListActions.setIsCupboardInfoModalOpen(true))
	}

	const onAddNewCardClick = useCallback(() => {
		dispatch(cupboardShelfListActions.setIsCreateNewCardModalOpen(true))
	}, [dispatch])

	const buttons = (
		<AnimateSkeletonLoader
			classNameForCommonWrapper={cls.commonWrapper}
			skeletonComponent={<CupboardMainButtonsSkeleton />}
			// animateComponentAfterLoadingFadeInTime={DURA}
			componentAfterLoading={
				<HStack gap='gap_14' className={cls.actions}>
					<Button onClick={onAddNewShelfClick} borderRadius='borderRadius_4'>{t('new shelf')}</Button>
					<Button onClick={onAddNewCardClick} data-button-type='shelf-add-card-general' borderRadius='borderRadius_4'>{t('add card with hot key')}</Button>
					<Icon
						Svg={InfoIcon}
						width={infoIconSize}
						height={infoIconSize}
						className={cls.info}
						clickable
						onClick={onOpenInfoModal}
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
			<HStack max className={cls.statsAndActionsCupboardWidget}>
				<div>
					<CompleteBigDataLabels data={cupboardData} isLoading={cupboardIsLoading} />
					{/* <ThemeSwitcher /> */}
				</div>
				{buttons}
				<CreateNewShelfModal />
				<MyToast
					onTimeEnd={onTimeEnd}
					status={createNewShelfRequestStatus}
				/>
				{/* <Toast.Root
				// onOpenChange={onOpenChange}
				// open={isResponseSuccessful ? undefined : isAwaitingResponse}
				// duration={5000}
				>
					<Toast.Title>Загрузка</Toast.Title>
					<Toast.Description>{(isResponseSuccessful)?.toString()}</Toast.Description>

	
				</Toast.Root> */}
				{/* import * as Toast from '@radix-ui/react-toast'; */}
				{/* <Toast.Viewport /> */}
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