import { Button } from '@/shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo, useRef, } from 'react';
import { Dropdown } from '@/shared/ui/Popup';
import { DropdownItem } from '@/shared/ui/Popup/ui/Dropdown/Dropdown';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../..';
import { MyText } from '@/shared/ui/Typography';
import cls from './SettingsButton.module.scss';
import { getShelfDeletionIsAnyShelfInDeletionProcess, getShelfDeletionRequestStatus } from '../../model/selectors/getShelfDeletionProcess';
import { useSelector } from 'react-redux';
// import { MyToastList } from '@/shared/ui/Toast/MyToastList';



export const SettingButton = memo(({ shelfId }: { shelfId: string }) => {
	const { t } = useTranslation()
	// const isAnyShelfInDeletionProcess = useSelector(getShelfDeletionIsAnyShelfInDeletionProcess)
	// const isShelfDeleting = useSelector(getShelfIsDeleting(shelfId))
	// const isShelfDeleting = useSelector((state: StateSchema) => getShelfIsDeleting(state, shelfId))
	// const [removeShelfMutation] = useRemoveShelfMutation()
	// const [updateShelfMutation] = useUpdateShelfMutation()
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
				content: <MyText fontWeight='300' className={cls.removeShelfButton} text={t('settingsItems.remove')} variant='error' />,
				onClick: onDeleteClick
			},
		]
	// }, [t, shelfId, onNotificationClick, onMissedTrainingClick, onBoxesSettingsClick])
	}, [t, shelfId, onNotificationClick, onDeleteClick, onMissedTrainingClick, onBoxesSettingsClick])

	// const settingItems: DropdownItem[] = useMemo(() => {
	// 	const shelfDeletionItem = isAnyShelfInDeletionProcess
	// 		? {
	// 			content: <MyText fontWeight='300' className={cls.removeShelfButton} text={t('settingsItems.remove')} variant='hint' />,
	// 			onClick: onDeleteClick
	// 			// onClick: () => alert('NONONONONONONONOONONONNONNOONONONONONONONON')
	// 		}
	// 		: {
	// 			content: <MyText fontWeight='300' className={cls.removeShelfButton} text={t('settingsItems.remove')} variant='error' />,
	// 			onClick: onDeleteClick
	// 		}
	// 	return [...settingItemsWithoutDeletion, shelfDeletionItem]
	// }, [t, settingItemsWithoutDeletion, onDeleteClick, isAnyShelfInDeletionProcess])

	// const savedRef = useRef()
	// const shelfDeletionRequestStatus = useSelector(getShelfDeletionRequestStatus)

	// const onTimeEnd = () => {
	// 	dispatch(cupboardShelfListActions.setShelfDeletionRequestStatus('idle'))
	// }

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
