import { Button } from '@/shared/ui/Button';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Dropdown } from '@/shared/ui/Popup';
import { DropdownItem } from '@/shared/ui/Popup/ui/Dropdown/Dropdown';
import { t } from 'i18next';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../..';
import { MyText } from '@/shared/ui/Typography';
import cls from './SettingsButton.module.scss';
import { getUserShelfNamesList } from '@/entities/User';
import { useSelector } from 'react-redux';

interface SettingButtonProps {
	shelfId: string
}

// function trainHotKey(event: KeyboardEvent) {
// 	if (event.code === 'Digit1' && event.code === 'KeyN')
// }

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
	const shelfNamesList = useSelector(getUserShelfNamesList)
	const dispatch = useAppDispatch()
	const onDeleteClick = useCallback(() => {
		dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { isDeleting: true } }))
	}, [dispatch, shelfId])

	const onBoxesSettingsClick = useCallback(() => {
		dispatch(cupboardShelfListActions.setBoxesSettingsShelfId(shelfId))
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
				onClick: () => alert(`изменение имени ${shelfId}`)
			},
			{
				content: t('settingsItems.missed training'),
				onClick: () => alert(`изменение имени ${shelfId}`)
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
	}, [t, shelfId, onDeleteClick, onBoxesSettingsClick])


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