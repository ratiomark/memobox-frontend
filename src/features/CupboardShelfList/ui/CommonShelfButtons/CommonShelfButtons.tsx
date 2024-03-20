import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import cls from './CommonShelfButtons.module.scss';

import { obtainRouteTraining, obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
import { userActions } from '@/entities/User';
import { updateJsonSavedDataThunk } from '@/entities/User';
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
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


export const CommonShelfButtons = () => {
	const isRefetching = useSelector(getIsCupboardRefetching)
	const isAnyCardsToTrainExist = useSelector(getIsAnyCardsToTrain)
	const skipTrainingHotKey = useSelector(getIsSkipTrainingByHotKeyPress)
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
	useHotkeys('t', startTraining, { keyup: true, enabled: !isRefetching })
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

	return (
		<div className={cls.ShelfButtons}>
			<Button
				className={cls.button}
				onClick={onViewClick}
			>
				{t('view')}
			</Button>
			<MyTooltip
				content={t2('training common shelf')}
				trigger={<Button
					className={cls.button}
					variant='filled'
					data-button-type={dataAttrButtonTypeTrain}
					onClick={startTraining}
					disabled={isRefetching || !isAnyCardsToTrainExist}
				>
					{t('train')}
				</Button>}
			/>
			<Icon
				className={
					clsx(cls.arrow, !commonShelfCollapsed ? cls.rotateArrow : '')}
				clickable
				type='hint'
				Svg={ArrowBottomIcon}
				onClick={onCollapseClickHandle}
				name='show/hide'
			/>
		</div>
	)
}