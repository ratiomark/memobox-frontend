import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './TableSettingModal.module.scss';
import { HDialog } from '@/shared/ui/HDialog';
import { useSelector } from 'react-redux';
import { getViewPageColumnSettingsIsOpen, getViewPageColumns, viewPageActions } from '@/features/ViewPageInitializer';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { Heading, MyText } from '@/shared/ui/Typography';
import { ColumnItem } from '../ColumnItem/ColumnItem';
import {
	SortColumnObject,
	getUserSavedDataViewPageColumns,
	getUserSavedDataViewPageRowsCount,
	userActions
} from '@/entities/User';
import { useEffect, useState } from 'react';
import { Reorder, motion } from 'framer-motion';
import { ReducersList } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import { Card } from '@/shared/ui/Card';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { updateJsonSavedData } from '@/entities/User';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { localDataService } from '@/shared/lib/helpers/common/localDataService';

interface TableSettingModalProps {
	className?: string
}

const rowItems: TabItem[] = [
	{ content: '1', value: '1' },
	{ content: '2', value: '2' },
	{ content: '3', value: '3' },
	{ content: '4', value: '4' },
]

export const TableSettingModal = (props: TableSettingModalProps) => {
	const {
		className
	} = props
	const dispatch = useAppDispatch()
	const columns = useSelector(getUserSavedDataViewPageColumns)
	const rowsCount = useSelector(getUserSavedDataViewPageRowsCount)
	const { t } = useTranslation()

	useEffect(() => {
		const root = document.querySelector('#root') as HTMLElement
		root.style.setProperty('--view-rows', rowsCount?.toString())
	}, [rowsCount])

	const isOpen = useSelector(getViewPageColumnSettingsIsOpen) ?? false
	const onClose = () => {
		dispatch(viewPageActions.setColumnSettingsIsOpen(false))
	}

	const onRowValueClick = (tab: TabItem) => {
		localDataService.setViewRows(tab.value)
		dispatch(userActions.setViewPageCardRowsCount(tab.value))
		dispatch(updateJsonSavedData())
	}

	const onClickSwitchColumn = (column: SortColumnObject) => {
		const columnCopy = { ...column }
		columnCopy.enabled = !columnCopy.enabled
		dispatch(userActions.setColumn(columnCopy))
		dispatch(updateJsonSavedData())
	}

	const onSetColumns = (order: SortColumnObject[]) => {
		dispatch(userActions.reorderColumns(order))
		dispatch(updateJsonSavedData())
	}


	const columnsRendered = columns?.map(column => (
		<ColumnItem
			key={column.value}
			column={column}
			onSwitchClick={onClickSwitchColumn}
		/>))

	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={() => alert('Сохраняю новые настройки таблицы')}
			panelWithMainPadding={false}
		>
			<div className={clsx(
				cls.TableSettingModal,
				className)}
			>

				<Heading title={t('table settings')} />
				<motion.div className={cls.contentWrapper} >
					{/* {columns?.map(column => <ColumnItem key={column.value} column={column} />)} */}
					<Reorder.Group
						// axis=''
						values={columns!}
						onReorder={onSetColumns}
					>
						{columnsRendered}
					</Reorder.Group>
					<Card className={cls.rowsInCardWrapper} >

						<MyText text={t('rows count in cards')} className={cls.rowsOptionTitle} />
						<Tabs tabs={rowItems} value={rowsCount.toString()} onTabClick={onRowValueClick} />
					</Card>

				</motion.div>
				<ModalButtons
					onClose={onClose}
					onSubmit={() => alert('Сохраняю новые настройки таблицы')}
				/>
			</div>
		</HDialogHeadless>
	)
}
