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

interface ShelfButtonsProps {
	className?: string
}

// function trainHotKey(event: KeyboardEvent) {
// 	if (event.code === 'Digit1' && event.code === 'KeyN')
// }

export const CommonShelfButtons = (props: ShelfButtonsProps) => {
	const {
		className,
	} = props
	const [updateCommonShelfMutation] = useUpdateCommonShelfMutation()

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
		// console.log('commonShelfCollapsed   ', commonShelfCollapsed)
		updateCommonShelfMutation(!commonShelfCollapsed)
		dispatch(cupboardShelfListActions.setCommonShelfCollapsed(!commonShelfCollapsed))
	}, [dispatch, updateCommonShelfMutation, commonShelfCollapsed,])

	const onCollapseClickHandle = useThrottle(
		onCollapseClick,
		DURATION_SHELF_COLLAPSING_SEC * 1000 + 10,
		{ leading: true, trailing: false }
	)

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.ShelfButtons,
			[className])}
		>
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
			{/* <ButtonIcon
				className={cls.buttonIcon}
				iconVariant='arrowDown'
				iconColor='grey'
				buttonColor='grey'
			/> */}
		</div>
	)
}