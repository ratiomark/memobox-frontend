import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxSettingsItem.module.scss';
import { Heading } from '@/shared/ui/Typography';
import { AnimatePresence, Box } from 'framer-motion';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { AddBoxIcon } from '../AddBoxIcon/AddBoxIcon';
import { getTiming } from '@/entities/Box';

import { useState, useCallback, MouseEvent, useEffect, useRef } from 'react';
import { BoxSchema } from '@/entities/Box';

interface BoxSettingsItemProps {
	className?: string
	boxItem: BoxSchema
	onRemoveBox: (boxId: number) => void
	onAddBoxClick: (index: number) => void
	isLastBox: boolean
}


const animateIconsAndDataOnBox = {
	initial: { opacity: 0 },
	animate: { opacity: 1, transition: { duration: 0.4, delay: 0.25 } },
	exit: { opacity: 0, transition: { duration: 0.4 } },
}


export const BoxSettingsItem = (props: BoxSettingsItemProps) => {
	const {
		className,
		boxItem,
		onRemoveBox,
		onAddBoxClick,
		isLastBox = false,
	} = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	const isAddBoxModeActive = true


	const onAddNewBoxClickHandle = (e: MouseEvent<HTMLDivElement>) => {
		const addNewBoxToPosition = boxItem.index + 1
		onAddBoxClick(addNewBoxToPosition)
	}


	const title = isLastBox
		? (
			<Heading as='h5'
				className={cls.title}
				title={t('learnt cards')}
			/>)
		: (
			<Heading as='h5'
				className={cls.title}
				title={`${t('box text')} ${boxItem.index}`}
			/>)




	return (
		<AnimatePresence>

			<div className={clsx(
				cls.BoxSettingsItem,
				cls.marginRight,
				className)}
			>
				{title}
				<div style={{ height: 24 }}>
					<p>{getTiming(boxItem.timing!)}</p>
				</div>
			</div>

			<AnimatePresence mode='wait'>
				{isAddBoxModeActive && !isLastBox && <AddBoxIcon onClick={onAddNewBoxClickHandle} />}
			</AnimatePresence >
		</AnimatePresence >
	)

}
