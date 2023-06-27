import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ColumnSettingModal.module.scss';
import { HDialog } from '@/shared/ui/HDialog';
import { useSelector } from 'react-redux';
import { getViewPageColumnSettingsIsOpen, getViewPageColumns, viewPageActions } from '@/features/ViewPageInitializer';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { Heading } from '@/shared/ui/Typography';
import { ColumnItem } from '../ColumnItem/ColumnItem';
import { SortColumnObject, userActions } from '@/entities/User';
import { useState } from 'react';

interface ColumnSettingModalProps {
	className?: string
}

export const ColumnSettingModal = (props: ColumnSettingModalProps) => {
	const {
		className
	} = props
	const dispatch = useAppDispatch()
	const columns = useSelector(getViewPageColumns)
	const [localColumns, setLocalColumns] = useState(columns)
	const isOpen = useSelector(getViewPageColumnSettingsIsOpen) ?? false
	const onClose = () => {
		dispatch(viewPageActions.setColumnSettingsIsOpen(false))
	}
	// userActions.setColumn
	const onClickSwitchColumn = (column: SortColumnObject) => {
		const columnCopy = { ...column }
		columnCopy.enabled = !columnCopy.enabled
		dispatch(userActions.setColumn(columnCopy))
	}
	
	const columnsRendered = columns?.map(column => (
		<ColumnItem
			key={column.value}
			column={column}
			onSwitchClick={onClickSwitchColumn}
		/>))
	const { t } = useTranslation()

	return (
		<HDialog
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className={clsx(
				cls.ColumnSettingModal,
				className)}
			>
				<Heading title={t('Columns settings')} />
				{/* {columns?.map(column => <ColumnItem key={column.value} column={column} />)} */}
				{columnsRendered}
				<HStack justify='between' max>
					<Button onClick={onClose}>{t('cancel')}</Button>
					<Button variant='filled'>{t('save')}</Button>
				</HStack>
			</div>
		</HDialog>
	)
}