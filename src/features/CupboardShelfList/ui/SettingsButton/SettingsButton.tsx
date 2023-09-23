import { Button } from '@/shared/ui/Button';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { memo, useCallback,  useMemo, } from 'react';
import { Dropdown } from '@/shared/ui/Popup';
import { DropdownItem } from '@/shared/ui/Popup/ui/Dropdown/Dropdown';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../..';
import { MyText } from '@/shared/ui/Typography';
import cls from './SettingsButton.module.scss';
import { useSelector } from 'react-redux';
import { useRemoveShelfMutation } from '@/entities/Shelf';
import { getShelfIsDeleting } from '../../model/selectors/getCupboardShelfList';
import { DURATION_SHELF_DELETION_MILLISEC } from '@/shared/const/animation';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

interface SettingButtonProps {
	shelfId: string
}

// function trainHotKey(event: KeyboardEvent) {
// 	if (event.code === 'Digit1' && event.code === 'KeyN')
// }
let timerId: number | TimeoutId;
export const SettingButton = memo((props: SettingButtonProps) => {
	const {
		shelfId,
	} = props
	const { t } = useTranslation()
	const isShelfDeleting = useSelector(getShelfIsDeleting(shelfId))
	// const isShelfDeleting = useSelector((state: StateSchema) => getShelfIsDeleting(state, shelfId))
	const [removeShelfMutation] = useRemoveShelfMutation()
	// const [updateShelfMutation] = useUpdateShelfMutation()
	const dispatch = useAppDispatch()

	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		// dispatch(cupboardShelfListActions.deleteShelf(id))
	// 	}, 9000)

	// 	return () => clearTimeout(timer)
	// }, [id, dispatch])


	const onDeleteClick = useCallback(() => {
		dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { isDeleting: true } }))
		timerId = setTimeout(() => {
			if (isShelfDeleting) {
				dispatch(cupboardShelfListActions.deleteShelf(shelfId))
				removeShelfMutation(shelfId)
			}
			clearTimeout(timerId)
		}, DURATION_SHELF_DELETION_MILLISEC)
	}, [dispatch, isShelfDeleting, removeShelfMutation, shelfId])


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
				content: <MyText fontWeight='300' className={cls.removeShelfButton} text={t('settingsItems.remove')} variant='error' />,
				onClick: onDeleteClick
			},
		]
	}, [t, shelfId, onNotificationClick, onDeleteClick, onMissedTrainingClick, onBoxesSettingsClick])


	return (
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
	)
})
SettingButton.displayName = 'SettingButton'