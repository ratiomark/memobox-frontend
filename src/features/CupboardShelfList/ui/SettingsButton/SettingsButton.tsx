import { Button } from '@/shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo, useRef, } from 'react';
import { Dropdown } from '@/shared/ui/Popup';
import { DropdownItem } from '@/shared/ui/Popup/ui/Dropdown/Dropdown';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice';
import { MyText } from '@/shared/ui/Typography';
import cls from './SettingsButton.module.scss';
import { useSelector } from 'react-redux';
import { getIsOnlyOneShelfLeftInCupboard } from '../../model/selectors/getCupboardShelfList';



export const SettingButton = memo(({ shelfId }: { shelfId: string }) => {
	const { t } = useTranslation()
	const isOnlyOneShelfLeftInCupboard = useSelector(getIsOnlyOneShelfLeftInCupboard)
	const dispatch = useAppDispatch()

	const onDeleteClick = useCallback(() => {
		dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { isDeleting: true } }))
		// dispatch(cupboardShelfListActions.setShelfDeletionShelfId(shelfId))
		// dispatch(cupboardShelfListActions.setIsAnyShelfInDeletionProcess(true))
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

	// const onRenameShelf = useCallback((shelfId: string) => {
	// 	dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { isDeleting: true } }))
	// }, [dispatch])


	const settingItems: DropdownItem[] = useMemo(() => {
		// const settingItemsWithoutDeletion: DropdownItem[] = useMemo(() => {
		return [
			{
				content: t('settingsItems.rename'),
				onClick: () => alert(`изменение имени ${shelfId}`)
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
		// }, [t, shelfId, onNotificationClick, onMissedTrainingClick, onBoxesSettingsClick])
	}, [t, shelfId, isOnlyOneShelfLeftInCupboard, onNotificationClick, onDeleteClick, onMissedTrainingClick, onBoxesSettingsClick])

	return (
		<>
			<Dropdown
				items={settingItems}
				trigger={
					<Button
						fontWeight='300'
					// className={cls.button}
					>
						{t('settingsItems.settings')}
					</Button>
				}
			/>
		</>
	)
})
