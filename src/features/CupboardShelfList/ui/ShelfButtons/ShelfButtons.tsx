import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelfButtons.module.scss';
import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate } from 'react-router-dom';
import { obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Dropdown } from '@/shared/ui/Popup';
import { DropdownItem } from '@/shared/ui/Popup/ui/Dropdown/Dropdown';
import { SettingButton } from '../SettingsButton/SettingsButton';

interface ShelfButtonsProps {
	className?: string
	shelfPosition: number
	shelfId: string
	onAddNewCardClick: () => void
	onViewShelfClick?: () => void
}

export const ShelfButtons = (props: ShelfButtonsProps) => {
	const {
		className,
		shelfPosition,
		onAddNewCardClick,
		onViewShelfClick,
		shelfId,
	} = props

	const [train, setTrain] = useState(0)
	let positionTextCard = '';
	let positionTextTrain = '';
	if (shelfPosition === 0) {
		positionTextCard = 'n'
		positionTextTrain = 't'
	} else if (shelfPosition < 10) {
		positionTextCard = `n + ${shelfPosition}`
		positionTextTrain = `t + ${shelfPosition}`
	}
	useHotkeys(positionTextCard, onAddNewCardClick)
	useHotkeys(positionTextTrain, () => setTrain(train + 1), [train])

	const navigate = useNavigate()
	const onViewClick = () => {
		navigate(obtainRouteView(shelfPosition.toString()))
	}
	// useEffect(() => {
	// 	document.addEventListener('keydown',)
	// })

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.ShelfButtons,
			[className])}
		>
			{/* <p>{click}</p> */}
			{/* <p>{train}</p> */}
			<Button
				className={cls.button}
				onClick={onAddNewCardClick}
				data-button-type="shelf-add-card"
			>
				{t('Add card with hot key') + ` (${positionTextCard})`}
			</Button>
			{/* <Button className={cls.button}>
				{t('settings')}
			</Button> */}
			{/* <AppLink to={obtainRouteView(shelfPosition.toString())}>{t('view')}</AppLink> */}
			<SettingButton shelfId={shelfId} />
			<Button onClick={onViewClick} className={cls.button}>
				{t('view')}
			</Button>
			<Button
				className={cls.button}
				variant='filled'
				data-button-type='shelf-train'
			>
				{t('train') + ` (${positionTextTrain})`}
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