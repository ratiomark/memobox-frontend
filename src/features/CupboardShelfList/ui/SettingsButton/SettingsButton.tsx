import { Button } from '@/shared/ui/Button';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
// import cls from './ShelfButtons.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Dropdown } from '@/shared/ui/Popup';
import { DropdownItem } from '@/shared/ui/Popup/ui/Dropdown/Dropdown';
import { t } from 'i18next';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../..';

interface SettingButtonProps {
	shelfId: string
}

// function trainHotKey(event: KeyboardEvent) {
// 	if (event.code === 'Digit1' && event.code === 'KeyN')
// }

export const SettingButton = (props: SettingButtonProps) => {
	const {
		shelfId,
	} = props
	const { t } = useTranslation()
	// getDeletionIds
	// const navigate = useNavigate()
	// const onViewClick = () => {
	// 	navigate(obtainRouteView(shelfPosition.toString()))
	// }
	const dispatch = useAppDispatch()
	const onDeleteClick = useCallback((shelfId: string) => {
		dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { isDeleting: true } }))
	}, [dispatch])


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
				onClick: () => alert(`изменение имени ${shelfId}`)
			},
			{
				content: t('settingsItems.remove'),
				onClick: () => onDeleteClick(shelfId)
			},
		]
	}, [t, shelfId, onDeleteClick])


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
}