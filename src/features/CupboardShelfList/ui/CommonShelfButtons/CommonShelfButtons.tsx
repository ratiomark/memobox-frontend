import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CommonShelfButtons.module.scss';
import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { obtainRouteTraining } from '@/app/providers/router/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate()
	const startTraining = () => {
		navigate(obtainRouteTraining('all', 'all'))
	}
	useHotkeys('t', startTraining, { keyup: true })

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.ShelfButtons,
			[className])}
		>
			<Button className={cls.button}>
				{t('view')}
			</Button>
			<Button
				className={cls.button}
				variant='filled'
				data-button-type='shelf-train'
				onClick={startTraining}
			>
				{t('train') + ' (t)'}
			</Button>
			<Icon
				clickable
				type='hint'
				Svg={ArrowBottomIcon}
				onClick={() => { null }}
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