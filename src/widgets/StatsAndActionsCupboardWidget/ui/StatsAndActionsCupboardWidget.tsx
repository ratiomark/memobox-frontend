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
	getIsCupboardLoading,
	getIsCupboardRefetching,
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
import { iconSizeInfo } from '@/shared/const/iconSizes';
import { CreateNewShelfModal } from './CreateNewShelfModal/CreateNewShelfModal';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { dataAttrButtonTypeAddCardButtonGeneral } from '@/shared/const/idsAndDataAttributes';
import { rtkApiDropCards } from '@/entities/Card';
import { TAG_CUPBOARD_PAGE } from '@/shared/api/const/tags';
import { rtkApi } from '@/shared/api/rtkApi';
import { getIsCupboardFirstRender } from '@/features/CupboardShelfList';

export const StatsAndActionsCupboardWidget = () => {
	const cupboardIsLoading = useSelector(getIsCupboardLoading)
	const cupboardIsRefetching = useSelector(getIsCupboardRefetching)
	const cupboardError = useSelector(getCupboardError)
	const cupboardData = useSelector(getCupboardData)
	const isFirstRender = useSelector(getIsCupboardFirstRender)
	const createNewShelfRequestStatus = useSelector(getCreateNewShelfModalRequestStatus)
	// const createNewCardRequestStatus = useSelector(getCreateNewCardRequestStatus)
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	// const onTimeEnd = useCallback(() => {
	// 	dispatch(cupboardShelfListActions.setCreateNewShelfModalRequestStatus('idle'))
	// }, [dispatch])

	// const onTimeEndCreateNewCard = useCallback(() => {
	// 	dispatch(cupboardShelfListActions.setCreateNewCardModalRequestStatus('idle'))
	// }, [dispatch])

	const onDropCards = async () => {
		dispatch(rtkApiDropCards())
		dispatch(rtkApi.util.invalidateTags([TAG_CUPBOARD_PAGE]))
	}

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
					{/* <Button onClick={() => { dispatch(restoreAllShelves()) }}>Restore</Button> */}
					{/* <Button
						onClick={() => { dispatch(cupboardShelfListActions.setIsCupboardRefetching(!cupboardIsRefetching)) }}
					>
						toggle refetching
					</Button>
					<Button
						onClick={() => { dispatch(cupboardShelfListActions.setIsCupboardDataLoading(!cupboardIsLoading)) }}
					>
						toggle isLoading
					</Button>
					<Button
						onClick={() => { dispatch(cupboardShelfListActions.setIsFirstRender(!isFirstRender)) }}
					>
						toggle isFirstRender
					</Button> */}
					{/* <Button
						onClick={onDropCards}
					>
						{t('drop')}
					</Button> */}
					<Button
						disabled={createNewShelfRequestStatus === 'pending'}
						onClick={onAddNewShelfClick}
						name='new shelf'
					>
						{t('new shelf')}
					</Button>
					<Button
						onClick={onAddNewCardClick}
						data-button-type={dataAttrButtonTypeAddCardButtonGeneral}
						name='new card'
					>
						{t('add card with hot key') + ' (n)'}
					</Button>
					<Icon
						Svg={InfoIcon}
						width={iconSizeInfo}
						height={iconSizeInfo}
						className={cls.info}
						clickable
						name='info'
						onClick={onOpenInfoModal}
					/>
				</HStack >
			}
			noDelay={!cupboardIsLoading && !isFirstRender}
			isLoading={cupboardIsLoading && isFirstRender}
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
					<CompleteBigDataLabels data={cupboardData} isLoading={cupboardIsRefetching} />
					{/* <ThemeSwitcher /> */}
					{/* <Button onClick={() => { dispatch(restoreAllShelves()) }}>Restore</Button> */}
				</div>
				{buttons}
				<CreateNewShelfModal />
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