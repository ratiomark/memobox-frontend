import { Button } from '@/shared/ui/Button';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect, useMemo, } from 'react';
import { Dropdown } from '@/shared/ui/Popup';
import { DropdownItem } from '@/shared/ui/Popup/ui/Dropdown/Dropdown';
import { t } from 'i18next';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../..';
import { MyText } from '@/shared/ui/Typography';
import cls from './SettingsButton.module.scss';
import { getUserShelfNamesList } from '@/entities/User';
import { useSelector } from 'react-redux';
import { useRemoveShelfMutation } from '@/entities/Shelf';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getShelfIsDeleting } from '../../model/selectors/getCupboardShelfList';
import { DURATION_SHELF_DELETION_MILLISEC } from '@/shared/const/animation';

interface SettingButtonProps {
	shelfId: string
}

// function trainHotKey(event: KeyboardEvent) {
// 	if (event.code === 'Digit1' && event.code === 'KeyN')
// }
let timerId: number;
export const SettingButton = memo((props: SettingButtonProps) => {
	const {
		shelfId,
	} = props
	const { t } = useTranslation()
	// getDeletionIds
	// const navigate = useNavigate()
	// const onViewClick = () => {
	// 	navigate(obtainRouteView(shelfPosition.toString()))
	// }
	// const shelfNamesList = useSelector(getUserShelfNamesList)
	const isShelfDeleting = useSelector((state: StateSchema) => getShelfIsDeleting(state, shelfId))
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
		dispatch(cupboardShelfListActions.setBoxesSettingsShelfId(shelfId))
		dispatch(cupboardShelfListActions.setBoxesSettingsModalIsOpen(true))
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