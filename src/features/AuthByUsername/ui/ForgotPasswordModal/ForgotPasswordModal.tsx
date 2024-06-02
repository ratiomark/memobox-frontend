import { useTranslation } from 'react-i18next';
import cls from './ForgotPasswordModal.module.scss';
import { loginActions } from '../../Model/slice/loginSlice';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import { FAQItem } from '@/shared/ui/FAQItem';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { useSelector } from 'react-redux';
import { getIsForgotModalOpen } from '../../Model/selectors/getLoginState/getLoginState';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { Heading, MyText } from '@/shared/ui/Typography';
import { Input } from '@/shared/ui/Input/Input';
import { useState } from 'react';
import { useForgotPasswordMutation } from '@/entities/User';
import { set } from 'lodash';
import { VStack } from '@/shared/ui/Stack';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

export const ForgotPasswordModal = () => {
	const { t } = useTranslation('forget-password')
	const dispatch = useAppDispatch()
	const isOpen = useSelector(getIsForgotModalOpen)
	const [email, setEmail] = useState('')
	const [forgotPasswordCallback] = useForgotPasswordMutation()
	const [responseSuccess, setResponseSuccess] = useState<boolean | null>(null)

	const onSendPasswordClick = async () => {
		try {
			const res = await forgotPasswordCallback({ email }).unwrap()
			if (res === null) setResponseSuccess(true)
		} catch (error) {
			setResponseSuccess(false)
		}
	}

	const onChangeEmail = (email: string) => {
		setEmail(email)
		if (responseSuccess !== null) {
			setResponseSuccess(null)
		}
	}

	const onCloseModal = () => {
		dispatch(loginActions.setIsForgotPasswordModal(false))
		setResponseSuccess(null)
	}

	let content;
	if (responseSuccess) {
		content = (
			<motion.div
				key="success"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				// transition={{ delay: 0.5 }}
				layout
			>
				{/* <MyText text={t('Instructions have been sent to your email to reset your password')} /> */}
				{/* <MyText text={t('Please check your inbox and spam')} /> */}
				{/* <Button onClick={onCloseModal}>{t('Close window')}</Button> */}
				<MyText text={t('successMessage')} />
				<MyText text={t('successMessage2')} />
				<Button onClick={onCloseModal}>{t('closeButton')}</Button>
			</motion.div>
		)
	} else {
		content = (
			<motion.div
				key="form"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				// transition={{ duration: 4 }}
				layout
			>

				<VStack className={cls.content} align='left' gap='gap_4'>
					<Heading className={cls.heading} size='s' title={t('emailPrompt')} as={'h1'} />
					<label className={cls.label} htmlFor='email'>
						{t('emailLabel')}
					</label>
					<Input
						autoFocus
						type='text'
						id='email'
						value={email}
						onChangeString={onChangeEmail}
					/>
				</VStack>
				<ModalButtons
					onClose={onCloseModal}
					onSubmit={onSendPasswordClick}
					textCloseButton={t('backButton')}
					textSubmitButton={t('submitButton')}
				/>

			</motion.div>
		)
	}

	return (
		<HDialogHeadless isOpen={isOpen} onClose={onCloseModal}>
			<AnimatePresence mode='wait' >
				{/* <motion.div
					layout
					layoutRoot
					transition={{ duration: 4 }}
				> */}


				{content}
				{/* </motion.div> */}
			</AnimatePresence>
		</HDialogHeadless>
	)
}
// export const ForgotPasswordModal = () => {
// 	const { t } = useTranslation()
// 	const dispatch = useAppDispatch()
// 	const isOpen = useSelector(getIsForgotModalOpen)
// 	const [email, setEmail] = useState('')
// 	const [forgotPasswordCallback] = useForgotPasswordMutation()
// 	const [responseSuccess, setResponseSuccess] = useState<boolean | null>(null)

// 	const onSendPasswordClick = async () => {
// 		try {
// 			const res = await forgotPasswordCallback({ email }).unwrap()
// 			if (res === null) setResponseSuccess(true)
// 		} catch (error) {
// 			setResponseSuccess(false)
// 		}
// 	}

// 	const onChangeEmail = (email: string) => {
// 		setEmail(email)
// 		if (responseSuccess !== null) {
// 			setResponseSuccess(null)
// 		}
// 	}

// 	const onCloseModal = () => {
// 		dispatch(loginActions.setIsForgotPasswordModal(false))
// 	}

// 	return (
// 		<HDialogHeadless
// 			// isOpen={true}
// 			isOpen={isOpen}
// 			onClose={onCloseModal}
// 			className={cls.cardModalPanel}
// 		// panelWithMainPadding={false}
// 		// panelWithBackground={false}
// 		>
// 			<div
// 				className={cls.cardModal}
// 			>
// 				<VStack className={cls.content} align='left' gap='gap_4'>

// 					<Heading size='s' title={'Укажите вашу почту и мы пришлем вам пароль'} as={'h1'} />
// 					<label className={cls.label} htmlFor='email'>
// 						{t('Email')}:
// 					</label>
// 					<Input
// 						autoFocus
// 						type='text'
// 						id='email'
// 						value={email}
// 						onChangeString={onChangeEmail}
// 					/>
// 				</VStack>
// 				<ModalButtons
// 					onClose={onCloseModal}
// 					onSubmit={onSendPasswordClick}
// 					textCloseButton='Назад'
// 					textSubmitButton='Восстановить пароль'
// 				/>
// 			</div>

// 		</HDialogHeadless>
// 	)
// }


{/* <div>
	<MyText
		text={'На вашу почту были высланы инструкции по восстановлению пароля'}
	/>
	<MyText
		text={'Пожалуйста, проверьте входящие, а также спам'}
	/>
	<Button>
		Закрыть окно
	</Button>
</div> */}