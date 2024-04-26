import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/Stack';
import { CompleteBigDataLabels } from '@/shared/ui/DataLabels/CompleteBigDataLabels/CompleteBigDataLabels';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import InfoIcon from '@/shared/assets/icons/infoIcon.svg'
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
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
import { dataAttrButtonTypeAddCardButtonGeneral } from '@/shared/const/idsAndDataAttributes';
import { rtkApiDropCards } from '@/entities/Card';
import { TAG_CUPBOARD_PAGE } from '@/shared/api/const/tags';
import { rtkApi } from '@/shared/api/rtkApi';
import { getIsCupboardFirstRender } from '@/features/CupboardShelfList';
import { TEST_BUTTONS_IDS } from '@/shared/const/testConsts';
import { HotKeyPresenter } from '@/shared/ui/HotKeyPresenter/HotKeyPresenter';
import { MyTooltip } from '@/shared/ui/Tooltip';



import { Dropdown } from '@/shared/ui/Popup';
import { DropdownItem } from '@/shared/ui/Popup/ui/Dropdown/Dropdown';
import SettingsButtonIcon from '@/shared/assets/new/settingsIcon.svg';
import AppearanceIcon from '@/shared/assets/icons/appearance-icon.svg';
import DotsIcon from '@/shared/assets/icons/dots-vertical-icon.svg';
import { MyText } from '@/shared/ui/Typography';
import { t } from 'i18next';
import { AppearanceModal } from './AppearanceModal/AppearanceModal';
import { analyticsTrackEvent } from '@/shared/lib/analytics';

export const AdditionalMenu = memo(() => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	const onOpenInfoModal = () => {
		dispatch(cupboardShelfListActions.setIsCupboardInfoModalOpen(true))
	}
	const onOpenInfoModal2 = () => {
		dispatch(cupboardShelfListActions.setIsCupboardInfoModalOpen(true))
	}


	const appearanceIcon = <Icon
		Svg={AppearanceIcon}
		// width={iconSizeInfo}
		// height={iconSizeInfo}
		className={cls.info}
		width={18}
		height={18}
		clickable
		name='info'
		onClick={onOpenInfoModal}
	/>

	const infoIcon = <Icon
		Svg={InfoIcon}
		// width={iconSizeInfo}
		// height={iconSizeInfo}
		className={cls.info}
		width={18}
		height={18}
		clickable
		name='info'
		onClick={onOpenInfoModal}
	/>

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const info = <HStack max gap='gap_12' >
		{infoIcon}
		{/* <MyText  text={t('cupboard')} /> */}
		<span>
			{t('cupboard')}
		</span>
	</HStack>

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const appearance = <HStack max gap='gap_12' justify='between'>
		{appearanceIcon}
		{/* <MyText  text={t('appearance')} /> */}
		<span>
			{t('appearance')}
		</span>
	</HStack>


	const settingItems: DropdownItem[] = useMemo(() => {
		return [
			{
				content: info,
				onClick: () => {
					dispatch(cupboardShelfListActions.setIsCupboardInfoModalOpen(true))
					analyticsTrackEvent('cupboard_info_click')
				}
			},
			{
				content: appearance,
				onClick: () => {
					dispatch(cupboardShelfListActions.setIsCupboardAppearanceModalOpen(true))
					analyticsTrackEvent('cupboard_appearance_click')
				}
			},

		]
	}, [appearance, dispatch, info])

	return (
		<Dropdown
			items={settingItems}
			className={cls.dropdown}
			listDirection='bottom_left'
			lastItemPadding
			trigger={
				<Icon
					className={cls.icon}
					clickable
					type='hint'
					onClick={() => {
						analyticsTrackEvent('cupboard_additional_click')
					}}
					withFill={false}
					width={24}
					height={24}
					Svg={DotsIcon}
				/>
			}
		/>
	)
})


export const StatsAndActionsCupboardWidget = () => {
	const cupboardIsLoading = useSelector(getIsCupboardLoading)
	const cupboardIsRefetching = useSelector(getIsCupboardRefetching)
	const cupboardError = useSelector(getCupboardError)
	const cupboardData = useSelector(getCupboardData)
	const isFirstRender = useSelector(getIsCupboardFirstRender)
	const createNewShelfRequestStatus = useSelector(getCreateNewShelfModalRequestStatus)
	// const createNewCardRequestStatus = useSelector(getCreateNewCardRequestStatus)
	const { t: t2 } = useTranslation('tooltip')
	const { t } = useTranslation('translation')
	const dispatch = useAppDispatch()

	// const onTimeEnd = useCallback(() => {
	// 	dispatch(cupboardShelfListActions.setCreateNewShelfModalRequestStatus('idle'))
	// }, [dispatch])

	// const onTimeEndCreateNewCard = useCallback(() => {
	// 	dispatch(cupboardShelfListActions.setCreateNewCardModalRequestStatus('idle'))
	// }, [dispatch])

	// const onDropCards = async () => {
	// 	dispatch(rtkApiDropCards())
	// 	dispatch(rtkApi.util.invalidateTags([TAG_CUPBOARD_PAGE]))
	// }

	const onAddNewShelfClick = () => {
		dispatch(cupboardShelfListActions.setIsCreateNewShelfModalOpen(true))
	}

	// const onOpenInfoModal = () => {
	// 	dispatch(cupboardShelfListActions.setIsCupboardInfoModalOpen(true))
	// }

	const onAddNewCardClick = useCallback(() => {
		dispatch(cupboardShelfListActions.setIsCreateNewCardModalOpen(true))
	}, [dispatch])

	const buttons = (
		<AnimateSkeletonLoader
			classNameForCommonWrapper={cls.commonWrapper}
			skeletonComponent={<CupboardMainButtonsSkeleton />}
			// animateComponentAfterLoadingFadeInTime={DURA}
			componentAfterLoading={
				<HStack
					className={cls.actions}
				>
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
						// borderRadius='borderRadius_max'
						className={clsx(cls.actionButton)}
						disabled={createNewShelfRequestStatus === 'pending'}
						onClick={onAddNewShelfClick}
						data-testid={TEST_BUTTONS_IDS.createNewShelfOpen}
						// size='size_14'
						name='new shelf'
					>
						{t('new shelf')}
					</Button>
					<MyTooltip
						content={
							// t2('add card shelf') + ` (${positionTextCard})`
							<HotKeyPresenter
								keysCombination={['n']}
							// description={t2('training common shelf tooltip')}
							/>
							// t2('add card common')
						}
						delay={200}
						trigger={
							<Button
								// borderRadius='borderRadius_max'
								className={clsx(cls.actionButton, cls.trainButton)}
								onClick={onAddNewCardClick}
								data-button-type={dataAttrButtonTypeAddCardButtonGeneral}
								data-testid={TEST_BUTTONS_IDS.createNewCardOpen}
								name='new card'
							// size='size_14'
							>
								{t('add card with hot key')}
							</Button>}
					/>
					<div className={cls.iconWrapper} >
						<AdditionalMenu />

						{/* <Icon
							Svg={InfoIcon}
							// width={iconSizeInfo}
							// height={iconSizeInfo}
							className={cls.info}
							width={24}
							height={24}
							clickable
							name='info'
							onClick={onOpenInfoModal}
						/> */}
					</div>
					{/* <Icon
						Svg={InfoIcon}
						// width={iconSizeInfo}
						// height={iconSizeInfo}
						className={cls.info}
						width={24}
						height={24}
						clickable
						name='info'
						onClick={onOpenInfoModal}
					/> */}
				</HStack >
			}
			noDelay={!cupboardIsLoading && !isFirstRender}
			isLoading={cupboardIsLoading && isFirstRender}
		/>
	)


	useHotkeys('n', onAddNewCardClick, { keyup: true })
	// useHotkeys('n', onAddNewCardClick, { keyup: true })

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
				<AppearanceModal />
			</HStack>
		</motion.div>
	)
}


