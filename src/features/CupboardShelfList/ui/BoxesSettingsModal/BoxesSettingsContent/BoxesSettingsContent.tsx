import clsx from 'clsx';
import cls from './BoxesSettingsContent.module.scss';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BoxesSettingsList } from '../BoxesSettingsList/BoxesSettingsList';
import { Button } from '@/shared/ui/Button';
import { Heading } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { useSelector } from 'react-redux';
import { BoxTimeSetterShelfBoxesTemplateModal } from '../BoxTimeSetterModal/BoxTimeSetterModal';
import {
	getBoxesTemplateModalChanged,
	getBoxesTemplateModalListEdges,
	getBoxesTemplateModalMode,
} from '../../../model/selectors/getShelfBoxesTemplateModal';
import { shelfBoxesTemplateSettingsActions } from '../../../model/slice/shelfBoxesTemplateSlice';




export const BoxesSettingsContent = () => {

	const dispatch = useAppDispatch()
	const mode = useSelector(getBoxesTemplateModalMode)
	const isTemplateChanged = useSelector(getBoxesTemplateModalChanged)
	const { leftSide, rightSide } = useSelector(getBoxesTemplateModalListEdges)

	const onAddNewBoxClick = () => {
		dispatch(shelfBoxesTemplateSettingsActions.setMode('choosingBoxPlace'))
		// dispatch(shelfBoxesTemplateSettingsActions.setChanged(true))
	}

	const onCancelAddNewBox = () => {
		dispatch(shelfBoxesTemplateSettingsActions.setMode('initial'))
	}

	useEffect(() => {
		return () => {
			dispatch(shelfBoxesTemplateSettingsActions.setMode('initial'))
		}
	}, [dispatch])

	const { t } = useTranslation()

	const blockTitle = mode === 'choosingBoxPlace'
		? <Heading as='h3' className={cls.title} title={t('Нажмите + чтобы добавить коробку на указанную позицию')} />
		: <Heading as='h3' className={cls.title} title={t('Настройте коробки для полки')} />

	return (
		<VStack
			align='center'
			max
			gap='gap_12'
			className={cls.mainWrapper}
		>
			{rightSide && <div className={clsx(cls.gradientEdge, cls.gradientEdgeRight)} />}
			{leftSide && <div className={clsx(cls.gradientEdge, cls.gradientEdgeLeft)} />}
			{blockTitle}
			<BoxesSettingsList />
			{mode === 'choosingBoxPlace'
				? <Button variant='cancel' onClick={onCancelAddNewBox}>{t('cancel no keys')}</Button>
				: <Button variant='filled' onClick={onAddNewBoxClick}>{t('add box')}</Button>
			}
			<BoxTimeSetterShelfBoxesTemplateModal />
		</VStack>
	)
}

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