import clsx from 'clsx';
import cls from './BoxesSettingsContent.module.scss';
import { useTranslation } from 'react-i18next';
import { BoxesSettingsList } from '../BoxesSettingsList/BoxesSettingsList';
import { Heading } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { BoxesRenderedProps } from '../BoxesRendered';



export const BoxesSettingsContent = (props: BoxesRenderedProps) => {

	// const dispatch = useAppDispatch()
	// const mode = useSelector(getBoxesTemplateModalMode)
	// const isTemplateChanged = useSelector(getBoxesTemplateModalChanged)
	// const { leftSide, rightSide } = useSelector(getBoxesTemplateModalListEdges)

	const { t } = useTranslation()

	const blockTitle = <Heading as='h3' className={cls.title} title={t('Нажмите + чтобы добавить ВОССТАНОВИТЬ коробку на указанную позицию')} />

	return (
		<VStack
			align='center'
			max
			gap='gap_12'
			className={cls.mainWrapper}
		>
			{/* {rightSide && <div className={clsx(cls.gradientEdge, cls.gradientEdgeRight)} />} */}
			{/* {leftSide && <div className={clsx(cls.gradientEdge, cls.gradientEdgeLeft)} />} */}
			{blockTitle}
			<BoxesSettingsList {...props} />
			{/* {mode === 'choosingBoxPlace'
				? <Button variant='cancel' onClick={onCancelAddNewBox}>{t('cancel no keys')}</Button>
				: <Button variant='filled' onClick={onAddNewBoxClick}>{t('add box')}</Button>
			} */}
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