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
import { MyText } from '@/shared/ui/Typography';
import { Input } from '@/shared/ui/Input/Input';
import { useState } from 'react';


interface CupboardInfoModalProps {
	className?: string
}
const faqDataList = [
	{ questionKey: 'FAQ question', answerKey: 'FAQ answer' },
	{ questionKey: 'FAQ question', answerKey: 'FAQ answer' },
	{ questionKey: 'FAQ question', answerKey: 'FAQ answer' },
	{ questionKey: 'FAQ question', answerKey: 'FAQ answer' },
]
export const ForgotPasswordModal = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const isOpen = useSelector(getIsForgotModalOpen)
	const [email, setEmail] = useState('')

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
				<MyText text={'Укажите имейл и мы пришлем вам пароль'} />
				<label className={cls.label} htmlFor='email'>
					{t('email')}
				</label>
				<Input
					autoFocus
					type='text'
					id='email'
					value={email}
					onChangeString={setEmail}
				/>
				<ModalButtons
					onClose={onCloseModal}
					textCloseButton='назад'
					textSubmitButton='отправить письмо'
				/>
			</div>

		</HDialogHeadless>
	)
}