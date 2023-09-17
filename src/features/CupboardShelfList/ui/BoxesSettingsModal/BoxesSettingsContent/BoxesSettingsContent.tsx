import clsx from 'clsx';
import cls from './BoxesSettingsContent.module.scss';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Dispatch, SetStateAction, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BoxesSettingsList } from '../BoxesSettingsList/BoxesSettingsList';
import { Button } from '@/shared/ui/Button';
import { Heading } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { TimingBlock } from '@/shared/types/DataBlock';
import { useSelector } from 'react-redux';
import { BoxTimeSetterSettingsPageModal } from '../BoxTimeSetterModal/BoxTimeSetterModal';
import {
	getBoxesTemplateModalChanged,
	getBoxesTemplateModalListEdges,
	getBoxesTemplateModalMode,
} from '../../../model/selectors/getShelfBoxesTemplateModal';
import { shelfBoxesTemplateSettingsActions } from '../../../model/slice/shelfBoxesTemplateSlice';

interface BoxesSettingsContentProps {
	className?: string
	shelfTemplate?: TimingBlock[]
	setIsAnyTimeSetterOpen?: Dispatch<SetStateAction<boolean>>
}




export const BoxesSettingsContent = memo((props: BoxesSettingsContentProps) => {

	const dispatch = useAppDispatch()
	// const initialShelfTemplate = useSelector(getSettingsInitialShelfTemplate)
	const mode = useSelector(getBoxesTemplateModalMode)
	const isTemplateChanged = useSelector(getBoxesTemplateModalChanged)
	const { leftSide, rightSide } = useSelector(getBoxesTemplateModalListEdges)
	// const { leftSide, rightSide } = useSelector(getSettingsShelfTemplateBoxesSettingsListEdges)

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
		: <Heading as='h3' className={cls.title} title={t('Настройки создания новых полок')} />

	return (
		<VStack
			align='center'
			max
			gap='gap_12'
			className={cls.mainWrapper}
		>
			{rightSide && <div className={clsx(cls.gradientEdge, cls.gradientEdgeRight)} />}
			{leftSide && <div className={clsx(cls.gradientEdge, cls.gradientEdgeLeft)} />}
			{/* {isAnyTimeSetterOpen && <Overlay /> &} */}
			{blockTitle}
			<BoxesSettingsList />

			{/* </div> */}
			{mode === 'choosingBoxPlace'
				? <Button variant='cancel' onClick={onCancelAddNewBox}>{t('cancel no keys')}</Button>
				: <Button variant='filled' onClick={onAddNewBoxClick}>{t('add box')}</Button>
			}
			{/* <div style={{ background: 'red', position: 'absolute', inset: 0 }} /> */}
			<BoxTimeSetterSettingsPageModal />
		</VStack>
	)
})

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