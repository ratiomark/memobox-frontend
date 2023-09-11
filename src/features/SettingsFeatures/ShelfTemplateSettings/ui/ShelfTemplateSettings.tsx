import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelfTemplateSettings.module.scss';
import { HDialog } from '@/shared/ui/HDialog';
import { getUserShelfTemplateSettings } from '@/entities/User';
import { useSelector } from 'react-redux';
import { BoxesSettingsContent } from './BoxesSettingsContent/BoxesSettingsContent';
import { Overlay } from '@/shared/ui/Overlay/Overlay';
import { useEffect, useState } from 'react';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { settingsShelfTemplateActions, settingsShelfTemplateReducer } from '../model/slice/shelfTemplateSlice';
import { getSettingsShelfTemplateChanged } from '../model/selectors/settingsShelfTemplate';
import { Button } from '@/shared/ui/Button';
import { AnimatePresence, motion, } from 'framer-motion';
import { HStack } from '@/shared/ui/Stack';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';

interface ShelfTemplateSettingsProps {
	className?: string
	isOpen: boolean
	onClose: () => void
}

const reducers: ReducersList = {
	settingsShelfTemplate: settingsShelfTemplateReducer
}


export const ShelfTemplateSettings = (props: ShelfTemplateSettingsProps) => {
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
	const isCurrentTemplateEqualToInitial = useSelector(getSettingsShelfTemplateChanged)

	if (!shelfTemplateSettingsFromUser) return <p>Загрузка</p>

	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={onCloseHandle}
			onSubmit={() => alert('Сохраняю настройки')}
			lazy
			// max
			panelWithMainPadding={false}
		>
			<AnimatePresence initial={false} mode='wait'>
				<motion.div
					layout
					className={clsx(
						cls.ShelfTemplateSettings,
						className)}
				// animate={{ width: 'auto' }}
				>
					{/* {isAnyTimeSetterOpen && <div className={cls.overlay} />} */}
					<BoxesSettingsContent />

					{/* <div style={{ background: 'red', position: 'absolute', inset: 0 }} /> */}
					<HStack max justify='between'>
						<Button variant='empty'>{t('return to default')}</Button>
						<ModalButtons
							justify='end'
							max={false}
							isSubmitDisabled={isCurrentTemplateEqualToInitial}
							onClose={onCloseHandle}
							onSubmit={() => alert('Сохраняю настройки')}
						/>
					</HStack>
					{/* <div style={{ background: 'red', position: 'absolute', inset: 0 }} /> */}
				</motion.div>
			</AnimatePresence>
			{/* <div style={{ background: 'red', position: 'absolute', inset: 0 }} /> */}
		</HDialogHeadless>

	)
}