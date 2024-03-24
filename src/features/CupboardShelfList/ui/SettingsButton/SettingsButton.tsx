import { Button } from '@/shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { Dropdown } from '@/shared/ui/Popup';
import { DropdownItem } from '@/shared/ui/Popup/ui/Dropdown/Dropdown';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice';
import { MyText } from '@/shared/ui/Typography';
import cls from './SettingsButton.module.scss';
import { useSelector } from 'react-redux';
import { getIsOnlyOneShelfLeftInCupboard } from '../../model/selectors/getCupboardShelfList';
import { TEST_BUTTONS_IDS } from '@/shared/const/testConsts';
import SettingsButtonIcon from '@/shared/assets/new/settingsIcon.svg';
import { Icon } from '@/shared/ui/Icon';

export const SettingButton = memo(({ shelfId }: { shelfId: string }) => {
	const { t } = useTranslation()
	const isOnlyOneShelfLeftInCupboard = useSelector(getIsOnlyOneShelfLeftInCupboard)
	const dispatch = useAppDispatch()

	const onDeleteClick = useCallback(() => {
		dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { isDeleting: true } }))
	}, [dispatch, shelfId])

	const onBoxesSettingsClick = useCallback(() => {
		dispatch(cupboardShelfListActions.setShelfBoxesTemplateModalShelfId(shelfId))
		dispatch(cupboardShelfListActions.setShelfBoxesTemplateModalIsOpen(true))
	}, [dispatch, shelfId])

	const onMissedTrainingClick = useCallback(() => {
		dispatch(cupboardShelfListActions.setMissedTrainingShelfId(shelfId))
		dispatch(cupboardShelfListActions.setMissedTrainingModalIsOpen(true))
	}, [dispatch, shelfId])

	const onNotificationClick = useCallback(() => {
		dispatch(cupboardShelfListActions.setNotificationModalShelfId(shelfId))
		dispatch(cupboardShelfListActions.setNotificationModalIsOpen(true))
	}, [dispatch, shelfId])

	const onRenameShelf = useCallback(() => {
		dispatch(cupboardShelfListActions.setRenameShelfModalShelfId(shelfId))
		dispatch(cupboardShelfListActions.setIsRenameShelfModalOpen(true))
		// dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { isDeleting: true } }))
	}, [dispatch, shelfId])


	const settingItems: DropdownItem[] = useMemo(() => {
		return [
			{
				content: t('settingsItems.rename'),
				onClick: onRenameShelf
			},
			{
				content: t('settingsItems.notifications'),
				onClick: onNotificationClick
			},
			{
				content: t('settingsItems.missed training'),
				onClick: onMissedTrainingClick
			},
			{
				content: t('settingsItems.box control'),
				onClick: onBoxesSettingsClick,
			},
			{
				content: <MyText fontWeight='300'
					className={cls.removeShelfButton}
					data-testid={TEST_BUTTONS_IDS.shelf.removeShelfButton}
					text={t('settingsItems.remove')}
					variant={
						isOnlyOneShelfLeftInCupboard
							? 'hint'
							: 'error'
					} />,
				onClick:
					isOnlyOneShelfLeftInCupboard
						? () => alert(t('warning.only one shelf in cupboard'))
						: onDeleteClick
			}

		]
	}, [t, isOnlyOneShelfLeftInCupboard, onNotificationClick, onDeleteClick, onMissedTrainingClick, onBoxesSettingsClick, onRenameShelf])

	return (
		<>
			<Dropdown
				items={settingItems}
				className={cls.dropdown}
				trigger={
					<Icon
						className={cls.icon}
						clickable
						onClick={() => { }}
						withFill={false}
						Svg={SettingsButtonIcon}
						data-testid={TEST_BUTTONS_IDS.shelf.shelfSettingsButton}
					/>

				}
			/>
		</>
	)
})
