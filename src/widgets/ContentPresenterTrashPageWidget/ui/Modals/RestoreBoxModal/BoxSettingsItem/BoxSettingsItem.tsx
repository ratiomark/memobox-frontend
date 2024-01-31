import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxSettingsItem.module.scss';
import { Heading } from '@/shared/ui/Typography';
import { AnimatePresence, Box } from 'framer-motion';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { AddBoxIcon } from '../AddBoxIcon/AddBoxIcon';
import { RegularAndLearntCardsBox, getTiming } from '@/entities/Box';

import { useState, useCallback, MouseEvent, useEffect, useRef } from 'react';
import { BoxSchema } from '@/entities/Box';

interface BoxSettingsItemProps {
	boxItem: BoxSchema
	onRestoreClick: () => void
	isLastBox: boolean
}


export const BoxSettingsItem = (props: BoxSettingsItemProps) => {
	const {
		boxItem,
		onRestoreClick,
		isLastBox = false,
	} = props
	const { t } = useTranslation()

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
			)}
			>
				{title}
				<div style={{ height: 24 }}>
					<p>{getTiming((boxItem as RegularAndLearntCardsBox).timing)}</p>
				</div>
			</div>

			<AnimatePresence mode='wait'>
				{!isLastBox && <AddBoxIcon onClick={onRestoreClick} />}
			</AnimatePresence >
		</AnimatePresence >
	)

}
