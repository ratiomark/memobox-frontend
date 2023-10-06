import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './TableSettingModal.module.scss';
import { useSelector } from 'react-redux';
import { getViewPageColumnSettingsIsOpen, getViewPageColumns, viewPageActions } from '@/features/ViewPageInitializer';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Heading, MyText } from '@/shared/ui/Typography';
import { ColumnItem } from '../ColumnItem/ColumnItem';
import {
	SortColumnObject,
	getUserSavedDataViewPageColumns,
	getUserSavedDataViewPageRowsCount,
	userActions
} from '@/entities/User';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Reorder, motion } from 'framer-motion';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import { Card } from '@/shared/ui/Card';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { updateJsonSavedData } from '@/entities/User';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { localDataService } from '@/shared/lib/helpers/common/localDataService';
import { getAppRoot } from '@/shared/lib/helpers/DOM/getAppRoot';
import { css_variable_view_rows } from '@/shared/const/cssVariables';

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
		const root = getAppRoot()
		root.style.setProperty(css_variable_view_rows, rowsCount?.toString())
		localDataService.setViewRows(rowsCount)
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

	const onClickSwitchColumn = useCallback((column: SortColumnObject) => {
		dispatch(userActions.setColumn({ ...column, enabled: !column.enabled }))
		dispatch(updateJsonSavedData())
	}, [dispatch])

	const onSetColumns = (order: SortColumnObject[]) => {
		dispatch(userActions.reorderColumns(order))
		dispatch(updateJsonSavedData())
	}


	const columnsRendered = useMemo(() => {
		console.log(columns)
		return columns?.map(column => (
			<ColumnItem
				key={column.value}
				column={column}
				onSwitchClick={onClickSwitchColumn}
			/>))
	}, [onClickSwitchColumn, columns])

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
				<div className={cls.contentWrapper} >
					{/* <div > */}

					{/* {columns?.map(column => <ColumnItem key={column.value} column={column} />)} */}
					<Reorder.Group
						axis='y'
						style={{ border: '1px solid red' }}
						values={columns.slice(1,)}
						onReorder={onSetColumns}
					// dragConstraints={{ bottom: 10, top: 10 }}
					>
						{columnsRendered}
					</Reorder.Group>
					{/* </div> */}

					<Card className={cls.rowsInCardWrapper} >
						<MyText text={t('rows count in cards')} className={cls.rowsOptionTitle} />
						<Tabs tabs={rowItems} value={rowsCount.toString()} onTabClick={onRowValueClick} />
					</Card>
				</div>
				<ModalButtons
					onClose={onClose}
					onSubmit={() => alert('Сохраняю новые настройки таблицы')}
				/>
			</div>
		</HDialogHeadless>
	)
}
