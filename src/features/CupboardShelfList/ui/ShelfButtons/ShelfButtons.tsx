import clsx from 'clsx';
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate } from 'react-router-dom';
import { obtainRouteMain, obtainRouteTraining, obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
import { SettingButton } from '../SettingsButton/SettingsButton';
import { ShelfSchema, useUpdateShelfMutation } from '@/entities/Shelf';
import { DURATION_SHELF_COLLAPSING_SEC } from '@/shared/const/animation';
import { useThrottle } from '@/shared/lib/helpers/hooks/useThrottle';
import { dataAttrButtonTypeAddCard, dataAttrButtonTypeTrain } from '@/shared/const/idsAndDataAttributes';
import cls from './ShelfButtons.module.scss';
import { useSelector } from 'react-redux';
import { getIsCupboardRefetching } from '../..';
import { TEST_BUTTONS_IDS } from '@/shared/const/testConsts';
import { MyToast } from '@/shared/ui/Toast';
import { MySimpleToast, useToastCustom } from '@/shared/ui/Toast/ui/MyToastRTK';

interface ShelfButtonsProps {
	className?: string
	onAddNewCardClick: (shelfId: string) => void
	onCollapseClick: (shelfId: string, collapsed: boolean) => void
	onNoCardTrainingHotKeyPress: () => void
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
		onNoCardTrainingHotKeyPress,
	} = props
	const createToastFn = useToastCustom()
	const [updateShelfMutation] = useUpdateShelfMutation()
	const isRefetching = useSelector(getIsCupboardRefetching)
	const noTrainingCards = trainCardsCount === 0
	const shelfIndexEdited = shelfIndex + 1
	let positionTextCard = '';
	let positionTextTrain = '';
	if (shelfIndexEdited < 10) {
		positionTextCard = `n + ${shelfIndexEdited}`
		positionTextTrain = `t + ${shelfIndexEdited}`
	}
	const navigate = useNavigate()

	const startTraining = () => {
		// console.log('startTraining clicked  ', positionTextTrain)
		if (noTrainingCards) {
			createToastFn({ status: 'error', messageError: 'No training cards' })
			onNoCardTrainingHotKeyPress()
			return
		}
		navigate(obtainRouteTraining(shelfId, 'all'))
	}

	const onAddNewCardHandle = useCallback(() => {
		onAddNewCardClick(shelfId)
	}, [onAddNewCardClick, shelfId])

	useHotkeys(positionTextCard, onAddNewCardHandle, { keydown: true, preventDefault: true, })
	useHotkeys(positionTextTrain, startTraining, { keydown: true, enabled: !isRefetching })


	const onViewClick = () => {
		navigate(obtainRouteView(shelfId))
	}


	const onCollapseClickHandle = useCallback(() => {
		onCollapseClick(shelfId, !isCollapsed)
		updateShelfMutation({ id: shelfId, isCollapsed: !isCollapsed })
	}, [onCollapseClick, shelfId, isCollapsed, updateShelfMutation])
	// }, [onCollapseClick, shelfId, isCollapsed, updateShelfMutation, props.shelf])
	// const onCollapseClickHandle = useCallback(() => {
	// 	onCollapseClick(shelfId, !isCollapsed)
	// 	updateShelfMutation({ ...props.shelf, isCollapsed: !isCollapsed })
	// }, [onCollapseClick, shelfId, isCollapsed, updateShelfMutation, props.shelf])

	const onCollapseClickHandleDebounced = useThrottle(
		onCollapseClickHandle,
		DURATION_SHELF_COLLAPSING_SEC * 1000 + 100,
		{ leading: true, trailing: false }
	)

	const { t } = useTranslation()

	return (
		<>

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
						data-testid={TEST_BUTTONS_IDS.shelf.addCardButton}
					>
						{t('add card with hot key') + ` (${positionTextCard})`}
					</Button>

					<SettingButton shelfId={shelfId} />

					<Button
						// className={cls.button}
						fontWeight='300'
						onClick={onViewClick}
						data-testid={TEST_BUTTONS_IDS.shelf.viewButton}
					>
						{t('view')}
					</Button>
					<Button
						fontWeight='300'
						// className={cls.button}
						onClick={startTraining}
						variant='filled'
						disabled={noTrainingCards || isRefetching}
						data-button-type={dataAttrButtonTypeTrain}
						data-testid={TEST_BUTTONS_IDS.shelf.trainButton}
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
						data-testid={TEST_BUTTONS_IDS.shelf.collapseButton}
					/>
				</div>
			</div>
			{/* <MySimpleToast status='error' messageError='test' /> */}
		</>
	)
})
ShelfButtons.displayName = 'ShelfButtons'