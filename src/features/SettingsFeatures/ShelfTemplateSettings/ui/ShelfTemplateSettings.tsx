import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelfTemplateSettings.module.scss';
import { HDialog } from '@/shared/ui/HDialog';
import { getUserSettingsAwaitingResponse, getUserShelfTemplateSettings } from '@/entities/User';
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
import { getUserSettingsIsLoading } from '@/entities/User';
import { updateShelfTemplateThunk } from '../model/services/updateShelfTemplateThunk';
import { setDefaultShelfTemplateThunk } from '../model/services/setDefaultShelfTemplateThunk';
import { getIsShelfTemplateModalOpen } from '../../model/selectors/getModals';
import { settingsFeaturesActions } from '../..';

interface ShelfTemplateSettingsProps {
	className?: string
	isOpen: boolean
	onClose: () => void
}

const reducers: ReducersList = {
	settingsShelfTemplate: settingsShelfTemplateReducer
}


export const ShelfTemplateSettingsModal = () => {
	const isOpen = useSelector(getIsShelfTemplateModalOpen)
	const shelfTemplateSettingsFromUser = useSelector(getUserShelfTemplateSettings)
	const settingsAwaitingResponseObj = useSelector(getUserSettingsAwaitingResponse)
	const isLoading = useSelector(getUserSettingsIsLoading)
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })
	const { t } = useTranslation()

	const onClose = () => {
		dispatch(settingsFeaturesActions.setIsShelfTemplateModalOpen(false))
	}

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

	const onSubmitHandle = () => {
		dispatch(updateShelfTemplateThunk())
		onClose()
	}

	const onDefaultHandle = () => {
		dispatch(setDefaultShelfTemplateThunk())
	}

	const isCurrentTemplateEqualToInitial = useSelector(getSettingsShelfTemplateChanged)

	// FIXME: Придумать как сделать лоадер
	if (!shelfTemplateSettingsFromUser || isLoading) return null

	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={onCloseHandle}
			onSubmit={onSubmitHandle}
			lazy
			// max
			panelWithMainPadding={false}
		>
			<AnimatePresence initial={false} mode='wait'>
				<motion.div
					layout
					className={cls.ShelfTemplateSettings}
				// animate={{ width: 'auto' }}
				>
					<BoxesSettingsContent />

					{/* <div style={{ background: 'red', position: 'absolute', inset: 0 }} /> */}
					<HStack max justify='between'>
						{/* FIXME: Тут нужно сделать модалку с подтверждением  */}
						<Button
							onClick={onDefaultHandle}
							variant='empty'
						>
							{t('return to default')}
						</Button>
						<ModalButtons
							justify='end'
							max={false}
							isSubmitDisabled={isCurrentTemplateEqualToInitial || settingsAwaitingResponseObj['shelfTemplate']}
							onClose={onCloseHandle}
							onSubmit={onSubmitHandle}
						/>
					</HStack>
					{/* <div style={{ background: 'red', position: 'absolute', inset: 0 }} /> */}
				</motion.div>
			</AnimatePresence>
			{/* <div style={{ background: 'red', position: 'absolute', inset: 0 }} /> */}
		</HDialogHeadless>

	)
}