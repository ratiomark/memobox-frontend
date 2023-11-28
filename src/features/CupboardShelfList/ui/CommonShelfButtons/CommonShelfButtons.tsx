import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CommonShelfButtons.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { obtainRouteTraining, obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCupboardCommonShelfCollapsed } from '../../model/selectors/getCupboardShelfList';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../..';
import { useUpdateCommonShelfMutation } from '@/entities/Shelf';
import { useThrottle } from '@/shared/lib/helpers/hooks/useThrottle';
import { DURATION_SHELF_COLLAPSING_SEC } from '@/shared/const/animation';
import { dataAttrButtonTypeTrain } from '@/shared/const/idsAndDataAttributes';
import { userActions } from '@/entities/User';
import { updateJsonSavedDataThunk } from '@/entities/User';
import { localDataService } from '@/shared/lib/helpers/common/localDataService';


export const CommonShelfButtons = () => {
	const navigate = useNavigate()
	const startTraining = () => {
		navigate(obtainRouteTraining('all', 'all'))
	}
	const onViewClick = () => {
		navigate(obtainRouteView('all', 'all'))
	}
	useHotkeys('t', startTraining, { keyup: true })
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

	const { t } = useTranslation()

	return (
		<div className={cls.ShelfButtons}>
			<Button
				className={cls.button}
				onClick={onViewClick}
			>
				{t('view')}
			</Button>
			<Button
				className={cls.button}
				variant='filled'
				data-button-type={dataAttrButtonTypeTrain}
				onClick={startTraining}
			>
				{t('train') + ' (t)'}
			</Button>
			<Icon
				className={
					clsx(cls.arrow, !commonShelfCollapsed ? cls.rotateArrow : '')}
				clickable
				type='hint'
				Svg={ArrowBottomIcon}
				onClick={onCollapseClickHandle}
			/>
		</div>
	)
}