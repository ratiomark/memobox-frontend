import cls from './BoxesSettingsList.module.scss';
import { AnimatePresence, motion } from 'framer-motion'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { AddBoxIcon } from '../AddBoxIcon/AddBoxIcon';
import { BoxSettingsItem } from '../BoxSettingsItem/BoxSettingsItem';
import { BoxSettingsSpecialBox } from '../BoxSettingsItem/BoxSettingsItemNewCardsBox';
import { BoxesRenderedProps } from '../BoxesRendered/BoxesRendered';
import {
	getTrashPageRestoreBoxModalBoxId,
	getTrashPageRestoreBoxModalShelfTitle,
	getTrashPageRestoreBoxModalSelectedShelfId,
	getTrashPageRestoreBoxModalOriginalShelfId,
	restoreBoxThunk,
	trashPageActions
} from '@/features/TrashPageInitializer';
import { useRef } from 'react';


export const BoxesSettingsList = (props: BoxesRenderedProps) => {
	const dispatch = useAppDispatch()
	const shelfId = useSelector(getTrashPageRestoreBoxModalSelectedShelfId)
	const shelfTitle = useSelector(getTrashPageRestoreBoxModalShelfTitle)
	const boxId = useSelector(getTrashPageRestoreBoxModalBoxId)

	const boxesRendered = props.boxes.slice(1,).map((boxItem, index) => {
		return (
			<BoxSettingsItem
				onRestoreClick={() => {
					dispatch(restoreBoxThunk({
						boxId,
						selectedShelfId: shelfId,
						index: index + 2,
						shelfTitle,
					}))
					dispatch(trashPageActions.setIsRestoreBoxModalOpen(false))
				}}
				boxItem={boxItem}
				key={boxItem.id}
				isLastBox={boxItem.specialType === 'learnt'}
			/>)
	})

	const firstIcon = (
		<AnimatePresence>
			<AddBoxIcon onClick={() => {
				dispatch(restoreBoxThunk({
					boxId,
					selectedShelfId: shelfId,
					index: 1,
					shelfTitle,
				}))
				dispatch(trashPageActions.setIsRestoreBoxModalOpen(false))
			}} />
		</AnimatePresence>
	)


	return (
		<motion.div
			style={{ width: 1200 }}
			layout
		>
			<motion.div
				layout
				className={cls.BoxesSettingsList}
			>
				<BoxSettingsSpecialBox type={'new'} />
				{firstIcon}
				{boxesRendered}
			</motion.div>
		</motion.div>
	)
}