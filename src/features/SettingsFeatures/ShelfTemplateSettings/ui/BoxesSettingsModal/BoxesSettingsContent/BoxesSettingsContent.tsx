import clsx from 'clsx';
import { ShelfSchema } from '@/entities/Shelf';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Dispatch, SetStateAction, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './BoxesSettingsContent.module.scss';
import { BoxesSettingsList } from '../BoxesSettingsList/BoxesSettingsList';
import { Button } from '@/shared/ui/Button';
import { Heading } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { TimingBlock } from '@/shared/types/DataBlock';
import { Overlay } from '@/shared/ui/Overlay/Overlay';
import { useSelector } from 'react-redux';
import { getSettingsInitialShelfTemplate, getSettingsShelfTemplateMode, getSettingsShelfTemplateChanged } from '../../../model/selectors/settingsShelfTemplate';
import { settingsShelfTemplateActions } from '../../../model/slice/shelfTemplateSlice';
import { AnimatePresence, motion } from 'framer-motion';

interface BoxesSettingsContentProps {
	className?: string
	shelfTemplate?: TimingBlock[]
	setIsAnyTimeSetterOpen?: Dispatch<SetStateAction<boolean>>
}




export const BoxesSettingsContent = memo((props: BoxesSettingsContentProps) => {
	// const {
	// 	shelfTemplate,
	// 	setIsAnyTimeSetterOpen,
	// } = props
	const dispatch = useAppDispatch()
	const initialShelfTemplate = useSelector(getSettingsInitialShelfTemplate)
	const mode = useSelector(getSettingsShelfTemplateMode)
	const isTemplateChanged = useSelector(getSettingsShelfTemplateChanged)

	const onAddNewBoxClick = () => {
		dispatch(settingsShelfTemplateActions.setMode('choosingBoxPlace'))
		// dispatch(settingsShelfTemplateActions.setChanged(true))
	}

	const onCancelAddNewBox = () => {
		dispatch(settingsShelfTemplateActions.setMode('initial'))
	}

	useEffect(() => {
		return () => {
			dispatch(settingsShelfTemplateActions.setMode('initial'))
		}
	}, [dispatch])

	const { t } = useTranslation()

	const blockTitle = mode === 'choosingBoxPlace'
		? <Heading as='h3' className={cls.title} title={t('Нажмите + чтобы добавить коробку на указанную позицию')} />
		: <Heading as='h3' className={cls.title} title={t('Настройки создания новых полок')} />

	return (
		<VStack align='center' max gap='gap_12' className={cls.mainWrapper} >
			{/* {isAnyTimeSetterOpen && <Overlay /> &} */}
			{/* <Heading as='h2' title={shelf.title} /> */}
			{blockTitle}
			{/* <div className={cls.wrapper} > */}
			<BoxesSettingsList />

			{/* </div> */}
			{mode === 'choosingBoxPlace'
				? <Button variant='cancel' onClick={onCancelAddNewBox}>Cancel</Button>
				: <Button variant='filled' onClick={onAddNewBoxClick}>Add</Button>
			}
		</VStack>
	)
	// const timeSetter = (
	// 	<div className={clsx(cls.Box,)} >
	// 		{isTimeSetterOpen &&
	// 			<div className={cls.timeSetter} >
	// 				<TimeSetter
	// 					minutes={minutes}
	// 					hours={hours}
	// 					days={days}
	// 					weeks={weeks}
	// 					months={months}
	// 					onClose={onClose}
	// 				/>
	// 			</div>
	// 		}
	// 		<MyText className={cls.timing} text={timing} />
	// 	</div>
	// )
	// return <p>sfjldf</p>
})
BoxesSettingsContent.displayName = 'BoxesSettingsContent'

// <AnimatePresence mode = 'wait' >
// 	{ mode === 'choosingBoxPlace' &&

// 	<motion.h3
// 		initial={{ opacity: 0 }}
// 		animate={{ opacity: 1 }}
// 		exit={{ opacity: 0 }}
// 		className={cls.title}
// 	>
// 		{t('Нажмите + чтобы добавить коробку на указанную позицию')}
// 	</motion.h3>
// 			}
// 		</AnimatePresence >
// <AnimatePresence mode='wait'>
// 	{mode !== 'choosingBoxPlace' &&

// 		<motion.h3
// 			initial={{ opacity: 0 }}
// 			animate={{ opacity: 1 }}
// 			exit={{ opacity: 0 }}
// 			className={cls.title}
// 		>
// 			{t('Настройки создания новых полок')}
// 		</motion.h3>
// 	}
// </AnimatePresence>