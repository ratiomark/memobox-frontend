import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './WriteToUsModal.module.scss';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { getIsWriteToUsOpen } from '../../../model/selectors/getHeaderModals';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { headerActions } from '../../../model/slice/headerSlice';
import { Input } from '@/shared/ui/Input/Input';
import { getUserEmail, getUserName } from '@/entities/User';
import { ListBox } from '@/shared/ui/Popup';
import { topicsList } from '../../../model/selectors/getTopicsWriteToUs';
import { Heading, MyText, TextArea } from '@/shared/ui/Typography';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { useFileUploader } from '@/features/FileUploader';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';

interface WriteToUsModalProps {
	className?: string
}

export const WriteToUsModal = (props: WriteToUsModalProps) => {
	const {
		className
	} = props
	const isOpen = useSelector(getIsWriteToUsOpen)
	const userName = useSelector(getUserName)
	const [userNameLocal, setUserNameLocal] = useState(userName)
	const [nameInputErrors, setNameInputErrors] = useState([])
	const email = useSelector(getUserEmail)
	const [emailLocal, setEmailLocal] = useState(email)
	const [emailInputErrors, setEmailInputErrors] = useState([])
	const [currentTopic, setCurrentTopic] = useState(topicsList[0])
	const [textAreaValue, setTextAreaValue] = useState('')
	const dispatch = useAppDispatch()
	const { files, fileUploader } = useFileUploader()
	// VAR: использую profile потому что там уже есть нужные переводы, чтобы не будлировать в header
	const { t } = useTranslation('profile')
	const { t: t2 } = useTranslation('topics')

	const onCloseHandle = () => {
		setNameInputErrors([])
		setUserNameLocal(userName)
		dispatch(headerActions.setIsWriteToUsModalOpen(false))
	}

	const onChangeUserLocalName = (value: string) => {
		setUserNameLocal(value)
		if (!value) setNameInputErrors([t('inputs.INPUT_CANNOT_BE_EMPTY')])
		else setNameInputErrors([])
	}


	const onChangeEmailLocal = (value: string) => {
		// VAR: валидация мейла
		setEmailLocal(value)
		if (!value) setEmailInputErrors([t('inputs.INPUT_CANNOT_BE_EMPTY')])
		else setEmailInputErrors([])
	}

	const onChangeTopic = (topicValue: string) => {
		setCurrentTopic(topicValue)
	}


	const topicItems = useMemo(() => {
		return topicsList.map(topic => {
			return { value: topic, content: t2(topic) }
		})
	}, [t2])


	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={onCloseHandle}
			onSubmit={() => alert('Сохраняю имя пользователя')}
		>
			<div className={clsx(
				cls.writeToUsModal,
				className)}
			>

				<div className={cls.nameAndEmailBlock} >
					<div>
						<Input
							label={t('name')}
							value={userNameLocal}
							onChangeString={onChangeUserLocalName}
							inputErrors={nameInputErrors}
							className={cls.input}
							classNameInputError={cls.inputError}
						/>
						<div className={cls.additionalHeight} />
					</div>
					<div>
						<Input
							label='Email'
							value={emailLocal}
							onChangeString={onChangeEmailLocal}
							inputErrors={emailInputErrors}
							className={cls.input}
							classNameInputError={cls.inputError}
						/>
					</div>
				</div>

				<div className={cls.topicPickerBlock} >
					<ListBox
						label={t2('topic')}
						value={currentTopic}
						items={topicItems}
						onChange={onChangeTopic}
						max
						sameWidth
					/>
					<div className={cls.warning} >
						<MyText className={cls.warningText} saveOriginal text={'Перед тем как задать вопрос, пожалуйста, внимательно ознакомьтесь с разделом '} />
						<AppLink className={cls.warningText} variant='accent' to='/'>помощь</AppLink>
						<MyText className={cls.warningText} saveOriginal text=' в нем собраны самые частые вопросы и ответы' />
					</div>
				</div>

				<div className={cls.textAreaBlock} >
					<MyText text={t2('your message')} className={cls.topicLabel} />
					<TextArea
						rows={8}
						value={textAreaValue}
						onChangeString={setTextAreaValue}
						focus
						className={cls.textArea}
						autoFocus
					/>
				</div>

				<div className={cls.attachmentBlock} >
					{fileUploader}
				</div>

				<ModalButtons
					onClose={onCloseHandle}
					textSubmitButton={t2('send message')}
					onSubmit={() => alert('Отправляю сообщение')}
					isSubmitDisabled={emailInputErrors.length > 0 || nameInputErrors.length > 0 || textAreaValue.length < 5}
					justify='end'
					gap='gap_14'
				/>
			</div>
		</HDialogHeadless>

	)
}