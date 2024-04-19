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

export const ForgotPasswordModal = () => {
	const { t } = useTranslation()
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
	}

	return (
		<HDialogHeadless
			// isOpen={true}
			isOpen={isOpen}
			onClose={onCloseModal}
			className={cls.cardModalPanel}
		// panelWithMainPadding={false}
		// panelWithBackground={false}
		>
			<div
				className={cls.cardModal}
			>
				<VStack className={cls.content} align='left' gap='gap_4'>

					<Heading size='s' title={'Укажите вашу почту и мы пришлем вам пароль'} as={'h1'} />
					<label className={cls.label} htmlFor='email'>
						{t('Email')}:
					</label>
					<Input
						autoFocus
						// label={t('email')}
						type='text'
						id='email'
						value={email}
						onChangeString={onChangeEmail}
					/>
				</VStack>
				<ModalButtons
					onClose={onCloseModal}
					onSubmit={onSendPasswordClick}
					textCloseButton='Назад'
					textSubmitButton='Восстановить пароль'
				/>
			</div>

		</HDialogHeadless>
	)
}