import clsx from 'clsx';
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { useTranslation } from 'react-i18next';
import { memo, useCallback} from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate } from 'react-router-dom';
import { obtainRouteTraining, obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
import { SettingButton } from '../SettingsButton/SettingsButton';
import { ShelfSchema, useUpdateShelfMutation } from '@/entities/Shelf';
import { DURATION_SHELF_COLLAPSING_SEC } from '@/shared/const/animation';
import { useThrottle } from '@/shared/lib/helpers/hooks/useThrottle';
import { dataAttrButtonTypeAddCard, dataAttrButtonTypeTrain } from '@/shared/const/idsAndDataAttributes';
import cls from './ShelfButtons.module.scss';

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
	const [updateShelfMutation] = useUpdateShelfMutation()

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

	const onAddNewCardHandle = useCallback(() => {
		onAddNewCardClick(shelfId)
	}, [onAddNewCardClick, shelfId])

	useHotkeys(positionTextCard, onAddNewCardHandle, { keydown: true, preventDefault: true, })
	useHotkeys(positionTextTrain, startTraining,)


	const onViewClick = () => {
		navigate(obtainRouteView(shelfId))
	}


	const onCollapseClickHandle = useCallback(() => {
		onCollapseClick(shelfId, !isCollapsed)
		updateShelfMutation({ ...props.shelf, isCollapsed: !isCollapsed })
	}, [onCollapseClick, shelfId, isCollapsed, updateShelfMutation, props.shelf])

	const onCollapseClickHandleDebounced = useThrottle(
		onCollapseClickHandle,
		DURATION_SHELF_COLLAPSING_SEC * 1000 + 100,
		{ leading: true, trailing: false }
	)

	const { t } = useTranslation()

	return (
		<div>
			<div className={clsx(
				cls.ShelfButtons,
				[className])}
			>
				<Button
					fontWeight='300'
					// className={cls.button}
					onClick={onAddNewCardHandle}
					data-button-type={dataAttrButtonTypeAddCard}
				>
					{t('add card with hot key') + ` (${positionTextCard})`}
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
					data-button-type={dataAttrButtonTypeTrain}
				>
					{t('train') + ` (${positionTextTrain})`}
				</Button>
				<Icon
					className={
						clsx(cls.arrow, !isCollapsed ? cls.rotateArrow : '')}
					clickable
					type='hint'
					Svg={ArrowBottomIcon}
					onClick={onCollapseClickHandleDebounced}

				/>
			</div>
		</div>
	)
})
ShelfButtons.displayName = 'ShelfButtons'