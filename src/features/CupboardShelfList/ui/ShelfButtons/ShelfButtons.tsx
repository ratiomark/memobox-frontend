import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelfButtons.module.scss';
import { memo, useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate } from 'react-router-dom';
import { obtainRouteTraining, obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Dropdown } from '@/shared/ui/Popup';
import { DropdownItem } from '@/shared/ui/Popup/ui/Dropdown/Dropdown';
import { SettingButton } from '../SettingsButton/SettingsButton';
import { ShelfSchema, useUpdateShelfWithTagMutation } from '@/entities/Shelf';


interface ShelfButtonsProps {
	className?: string
	onAddNewCardClick: (shelfId: string) => void
	onCollapseClick: (shelfId: string, collapsed: boolean) => void
	shelf: ShelfSchema
}

export const ShelfButtons = memo((props: ShelfButtonsProps) => {
	const {
		className,
		shelf: {
			index: shelfIndex,
			id: shelfId,
			isCollapsed,
			data: {
				train: trainCardsCount
			}
		},
		onAddNewCardClick,
		onCollapseClick,
	} = props
	const [updateShelfMutation] = useUpdateShelfWithTagMutation()

	const shelfIndexEdited = shelfIndex + 1
	let positionTextCard = '';
	let positionTextTrain = '';
	if (shelfIndexEdited < 10) {
		positionTextCard = `n + ${shelfIndexEdited}`
		positionTextTrain = `t + ${shelfIndexEdited}`
	}
	const navigate = useNavigate()

	const startTraining = () => {
		navigate(obtainRouteTraining(shelfId, 'all'))
	}

	useEffect(() => {
		// fetch('http://localhost:8000/data/cupboard/shelves', {
		// 	headers: { Authorization: 'token' },
		// 	method: 'GET',
		// }).then(response => {
		// 	if (!response.ok) {
		// 		throw new Error(`Ошибка, статус ${response.status}`);
		// 	}
		// 	return response.json();
		// })
		// 	.then(data => {
		// 		console.log(data);
		// 	})
		// 	.catch(error => {
		// 		console.error(error);
		// 	});
	}, [])

	const onAddNewCardHandle = useCallback(() => {
		onAddNewCardClick(shelfId)
	}, [onAddNewCardClick, shelfId])

	useHotkeys(positionTextCard, onAddNewCardHandle, { keydown: true, preventDefault: true, })
	useHotkeys(positionTextTrain, startTraining,)


	const onViewClick = () => {
		navigate(obtainRouteView(shelfId))
		// navigate(obtainRouteView(shelfIndexEdited.toString()))
	}

	const onCollapseClickHandle = useCallback(() => {
		onCollapseClick(shelfId, !isCollapsed)
		updateShelfMutation({ ...props.shelf, isCollapsed: !isCollapsed })
	}, [onCollapseClick, shelfId, isCollapsed, updateShelfMutation, props.shelf])

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.ShelfButtons,
			[className])}
		>
			<Button
				fontWeight='300'

				// className={cls.button}
				onClick={onAddNewCardHandle}
				data-button-type="shelf-add-card"
			>
				{t('Add card with hot key') + ` (${positionTextCard})`}
			</Button>

			<SettingButton shelfId={shelfId} />

			<Button
				// className={cls.button}
				fontWeight='300'
				onClick={onViewClick}
			>
				{t('view')}
			</Button>
			<Button
				fontWeight='300'
				// className={cls.button}
				onClick={startTraining}
				variant='filled'
				disabled={trainCardsCount === 0}
				data-button-type='shelf-train'
			>
				{t('train') + ` (${positionTextTrain})`}
			</Button>
			<Icon
				className={
					clsx(cls.arrow, !isCollapsed ? cls.rotateArrow : '')}
				clickable
				type='hint'
				Svg={ArrowBottomIcon}
				onClick={onCollapseClickHandle}
			/>
		</div>
	)
})
ShelfButtons.displayName = 'ShelfButtons '
// import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
// import { Button } from '@/shared/ui/Button';
// import { Icon } from '@/shared/ui/Icon';
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './ShelfButtons.module.scss';
// import { memo, useCallback, useEffect, useState } from 'react';
// import { useHotkeys } from 'react-hotkeys-hook';
// import { useNavigate } from 'react-router-dom';
// import { obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
// import { AppLink } from '@/shared/ui/AppLink/AppLink';
// import { Dropdown } from '@/shared/ui/Popup';
// import { DropdownItem } from '@/shared/ui/Popup/ui/Dropdown/Dropdown';
// import { SettingButton } from '../SettingsButton/SettingsButton';

// interface ShelfButtonsProps {
// 	className?: string
// 	shelfIndex: number
// 	shelfId: string
// 	onAddNewCardClick: () => void
// 	onCollapseClick: (shelfId: string, collapsed: boolean) => void
// 	collapsed: boolean
// }

// export const ShelfButtons = memo((props: ShelfButtonsProps) => {
// 	const {
// 		className,
// 		shelfIndex,
// 		shelfId,
// 		collapsed,
// 		onAddNewCardClick,
// 		onCollapseClick,
// 	} = props

// 	const [train, setTrain] = useState(0)
// 	const shelfIndexEdited = shelfIndex + 1
// 	let positionTextCard = '';
// 	let positionTextTrain = '';
// 	// if (shelfIndex === 0) {
// 	// positionTextCard = 'n'
// 	// positionTextTrain = 't'
// 	if (shelfIndexEdited < 10) {
// 		positionTextCard = `n + ${shelfIndexEdited}`
// 		positionTextTrain = `t + ${shelfIndexEdited}`
// 	}
// 	useHotkeys(positionTextCard, onAddNewCardClick)
// 	useHotkeys(positionTextTrain, () => setTrain(train + 1), [train])

// 	const navigate = useNavigate()
// 	const onViewClick = () => {
// 		navigate(obtainRouteView(shelfIndexEdited.toString()))
// 	}
// 	const onCollapseClickHandle = useCallback(() => {
// 		onCollapseClick(shelfId, !collapsed)
// 	}, [onCollapseClick, shelfId, collapsed])

// 	const { t } = useTranslation()

// 	return (
// 		<div className={clsx(
// 			cls.ShelfButtons,
// 			[className])}
// 		>
// 			<Button
// 				fontWeight='300'

// 				// className={cls.button}
// 				onClick={onAddNewCardClick}
// 				data-button-type="shelf-add-card"
// 			>
// 				{t('Add card with hot key') + ` (${positionTextCard})`}
// 			</Button>
// 			<SettingButton shelfId={shelfId} />
// 			<Button
// 				// className={cls.button}
// 				fontWeight='300'
// 				onClick={onViewClick}
// 			>
// 				{t('view')}
// 			</Button>
// 			<Button
// 				fontWeight='300'
// 				// className={cls.button}
// 				variant='filled'
// 				data-button-type='shelf-train'
// 			>
// 				{t('train') + ` (${positionTextTrain})`}
// 			</Button>
// 			<Icon
// 				className={
// 					clsx(cls.arrow, !collapsed ? cls.rotateArrow : '')}
// 				clickable
// 				type='hint'
// 				Svg={ArrowBottomIcon}
// 				onClick={onCollapseClickHandle}
// 			/>
// 		</div>
// 	)
// })
// ShelfButtons.displayName = 'ShelfButtons '