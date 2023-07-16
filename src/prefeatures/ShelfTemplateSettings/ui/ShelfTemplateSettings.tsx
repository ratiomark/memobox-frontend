import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelfTemplateSettings.module.scss';
import { HDialog } from '@/shared/ui/HDialog';
import { getUserShelfTemplateSettings } from '@/entities/User';
import { useSelector } from 'react-redux';
import { BoxesSettingsContent } from './BoxesSettingsModal/BoxesSettingsContent/BoxesSettingsContent';
import { Overlay } from '@/shared/ui/Overlay/Overlay';
import { useEffect, useState } from 'react';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { settingsShelfTemplateActions, settingsShelfTemplateReducer } from '../model/slice/shelfTemplateSlice';
import { getSettingsShelfTemplateChanged } from '../model/selectors/settingsShelfTemplate';
import { Button } from '@/shared/ui/Button';
import { AnimatePresence, motion, } from 'framer-motion';
import { HStack } from '@/shared/ui/Stack';

interface ShelfTemplateSettingsProps {
	className?: string
	isOpen: boolean
	onClose: () => void
}

const reducers: ReducersList = {
	settingsShelfTemplate: settingsShelfTemplateReducer
}


export const ShelfTemplateSettingsInitializer = (props: ShelfTemplateSettingsProps) => {
	const {
		className,
		isOpen,
		onClose
	} = props
	const shelfTemplateSettingsFromUser = useSelector(getUserShelfTemplateSettings)
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })

	useEffect(() => {
		if (shelfTemplateSettingsFromUser) {
			// dispatch(settingsShelfTemplateActions.setInitialTemplate(shelfTemplateSettingsFromUser.slice(0, 1)))
			dispatch(settingsShelfTemplateActions.setInitialTemplate(shelfTemplateSettingsFromUser))
		}
	}, [shelfTemplateSettingsFromUser, dispatch])

	const onCloseHandle = () => {
		dispatch(settingsShelfTemplateActions.reset())
		onClose()
	}

	const [isAnyTimeSetterOpen, setIsAnyTimeSetterOpen] = useState(false)
	const { t } = useTranslation()
	const isTemplateChanged = useSelector(getSettingsShelfTemplateChanged)

	if (!shelfTemplateSettingsFromUser) return <p>Загрузка</p>

	return (
		<HDialog
			isOpen={isOpen}
			onClose={onCloseHandle}
			lazy
		>
			<AnimatePresence initial={false} mode='wait'>
				<motion.div
					layout
					className={clsx(
						cls.ShelfTemplateSettings,
						className)}
				>
					<BoxesSettingsContent />
					<HStack max justify='between'>
						<Button variant='empty'>{t('cancel')}</Button>
						<Button disabled={!isTemplateChanged} variant='filled'>Save</Button>
					</HStack>
				</motion.div>
			</AnimatePresence>
		</HDialog>

	)
}

// export const ShelfTemplateSettings = (props: ShelfTemplateSettingsProps) => {
// 	const {
// 		className,
// 		isOpen,
// 		onClose
// 	} = props
// 	const shelfTemplateSettingsFromUser = useSelector(getUserShelfTemplateSettings)
// 	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })

// 	useEffect(() => {
// 		if (shelfTemplateSettingsFromUser) {
// 			// dispatch(settingsShelfTemplateActions.setInitialTemplate(shelfTemplateSettingsFromUser.slice(0, 1)))
// 			dispatch(settingsShelfTemplateActions.setInitialTemplate(shelfTemplateSettingsFromUser))
// 		}
// 	}, [shelfTemplateSettingsFromUser, dispatch])

// 	const onCloseHandle = () => {
// 		dispatch(settingsShelfTemplateActions.reset())
// 		onClose()
// 	}

// 	const [isAnyTimeSetterOpen, setIsAnyTimeSetterOpen] = useState(false)
// 	const { t } = useTranslation()
// 	const isTemplateChanged = useSelector(getSettingsShelfTemplateChanged)

// 	if (!shelfTemplateSettingsFromUser) return <p>Загрузка</p>

// 	return (
// 		<HDialog
// 			isOpen={isOpen}
// 			onClose={onCloseHandle}
// 			lazy
// 		>
// 			<AnimatePresence initial={false} mode='wait'>
// 				<motion.div
// 					layout
// 					// layoutRoot
// 					// data-testid='SettingsShelfTemplate'
// 					className={clsx(
// 						cls.ShelfTemplateSettings,
// 						className)}
// 				// animate={{ width: 'auto' }}
// 				>
// 					{/* {isAnyTimeSetterOpen && <div className={cls.overlay} />} */}
// 					<BoxesSettingsContent />

// 					<HStack max justify='between'>
// 						<Button variant='empty'>{t('cancel')}</Button>
// 						<Button disabled={!isTemplateChanged} variant='filled'>Save</Button>
// 					</HStack>
// 				</motion.div>
// 			</AnimatePresence>
// 		</HDialog>

// 	)
// }