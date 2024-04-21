import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import clsShelfButtons from '../ShelfButtons/ShelfButtons.module.scss'
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';

import { obtainRouteTraining, obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
import {
	getUserSavedDataIsStartTrainingHotKeyVisible,
	updateJsonSavedDataThunk,
	userActions,
} from '@/entities/User';

import { DURATION_SHELF_COLLAPSING_SEC } from '@/shared/const/animation';
import { dataAttrButtonTypeTrain } from '@/shared/const/idsAndDataAttributes';
import { localDataService } from '@/shared/lib/helpers/common/localDataService';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useThrottle } from '@/shared/lib/helpers/hooks/useThrottle';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import {
	getCupboardCommonShelfCollapsed,
	getIsAnyCardsToTrain,
	getIsCupboardRefetching,
	getIsSkipTrainingByHotKeyPress
} from '../../model/selectors/getCupboardShelfList';
import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice';
import { MyTooltip } from '@/shared/ui/Tooltip/Tooltip';
import { HotKeyPresenter } from '@/shared/ui/HotKeyPresenter/HotKeyPresenter';
import { VStack } from '@/shared/ui/Stack';
import { MyText } from '@/shared/ui/Typography';
import ViewButtonIcon from '@/shared/assets/new/viewIcon.svg';
import ArrowDownIcon from '@/shared/assets/new/arrowDownIcon.svg'
import { TEST_BUTTONS_IDS } from '@/shared/const/testConsts';

export const CommonShelfButtons = () => {
	const isRefetching = useSelector(getIsCupboardRefetching)
	const isAnyCardsToTrainExist = useSelector(getIsAnyCardsToTrain)
	const skipTrainingHotKey = useSelector(getIsSkipTrainingByHotKeyPress)
	const isStartTrainingHotKeyVisible = useSelector(getUserSavedDataIsStartTrainingHotKeyVisible)
	const navigate = useNavigate()
	const startTraining = () => {
		if (skipTrainingHotKey) {
			dispatch(cupboardShelfListActions.setSkipTrainingHotKey(false))
			return
		}
		// console.log('startTraining clicked  ', ' t ', ' all ')
		navigate(obtainRouteTraining('all', 'all'))
	}
	const onViewClick = () => {
		navigate(obtainRouteView('all', 'all'))
	}
	// useHotkeys(positionTextTrain, startTraining, { keydown: true, enabled: !isRefetching })
	useHotkeys('t + a', startTraining, { keydown: true, enabled: !isRefetching })
	const commonShelfCollapsed = useSelector(getCupboardCommonShelfCollapsed)
	const dispatch = useAppDispatch()

	const onCollapseClick = useCallback(() => {
		dispatch(cupboardShelfListActions.setCommonShelfCollapsed(!commonShelfCollapsed))
		dispatch(userActions.updateJsonSavedData({ commonShelfCollapsed: !commonShelfCollapsed }))
		localDataService.setCommonShelfCollapsed(!commonShelfCollapsed)
		dispatch(updateJsonSavedDataThunk())
	}, [dispatch, commonShelfCollapsed])
	// }, [dispatch, updateCommonShelfMutation, commonShelfCollapsed,])

	const onCollapseClickHandle = useThrottle(
		onCollapseClick,
		DURATION_SHELF_COLLAPSING_SEC * 1000 + 10,
		{ leading: true, trailing: false }
	)

	const { t: t2 } = useTranslation('tooltip')
	const { t } = useTranslation('translation')

	let trainingButton;
	if (isStartTrainingHotKeyVisible) {
		trainingButton = (
			<Button
				className={clsShelfButtons.trainButton}
				fontWeight='300'
				variant='filled'
				// borderRadius='borderRadius_max'
				data-button-type={dataAttrButtonTypeTrain}
				onClick={startTraining}
				disabled={isRefetching || !isAnyCardsToTrainExist}
			>
				{t('train') + ' ( t )'}
			</Button>
		)
	} else {
		trainingButton = (
			<MyTooltip
				content={
					<VStack align='left'>
						{/* <MyText text={t2('training common shelf')} /> */}
						<HotKeyPresenter
							keysCombination={['t', 'a']}
							description={t2('training common shelf tooltip')}
						/>
					</VStack>
				}
				trigger={
					<Button
						className={clsShelfButtons.trainButton}
						fontWeight='300'
						variant='filled'
						// borderRadius='borderRadius_max'
						data-button-type={dataAttrButtonTypeTrain}
						onClick={startTraining}
						disabled={isRefetching || !isAnyCardsToTrainExist}
					>
						{t('train')}
					</Button>}
			/>
		)
	}

	return (
		<div className={clsShelfButtons.ShelfButtons}>
			{/* <Button
				className={cls.button}
				onClick={onViewClick}
			>
				{t('view')}
			</Button> */}

			<Icon
				clickable
				withFill={false}
				// type='hint'
				Svg={ViewButtonIcon}
				onClick={onViewClick}
			/>
			{trainingButton}
			<Icon
				className={
					clsx(clsShelfButtons.arrow, !commonShelfCollapsed ? clsShelfButtons.rotateArrow : '')}
				clickable
				type='hint'
				width={24}
				height={24}
				Svg={ArrowDownIcon}
				onClick={onCollapseClickHandle}
				name='show/hide'
			/>
			{/* <Icon
				className={
					clsx(clsShelfButtons.arrow, !commonShelfCollapsed ? clsShelfButtons.rotateArrow : '')}
				clickable
				type='hint'
				Svg={ArrowBottomIcon}
				onClick={onCollapseClickHandle}
				name='show/hide'
			/> */}
		</div>
	)
}