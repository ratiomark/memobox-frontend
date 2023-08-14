import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './WriteToUsModal.module.scss';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { HDialog } from '@/shared/ui/HDialog';
import { getIsWriteToUsOpen } from '../../../model/selectors/getHeaderModals';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { headerActions } from '../../../model/slice/headerSlice';

interface WriteToUsModalProps {
	className?: string
}

export const WriteToUsModal = (props: WriteToUsModalProps) => {
	const {
		className
	} = props
	const isOpen = useSelector(getIsWriteToUsOpen)
	// const [userNameLocal, setUserNameLocal] = useState(userName)
	const [inputErrors, setInputErrors] = useState([])
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	
	const onCloseHandle = () => {
		dispatch(headerActions.setIsWriteToUsModalOpen(false))
	}

	return (
		<HDialog
			isOpen={isOpen}
			onClose={onCloseHandle}
			onSubmit={() => alert('Сохраняю имя пользователя')}
		>
			<div className={clsx(
				cls.writeToUsModal,
				className)}
			>
				Написать нам!
				{/* <Heading as='h2' className={cls.title} title={t('write your name')} />
				<Input
					value={userNameLocal}
					onChangeString={onChangeUserLocalName}
					inputErrors={inputErrors}
					className={cls.input}
					classNameInputError={cls.inputError}
				/>

				<ModalButtons
					onClose={onCloseHandle}
					onSubmit={() => alert('Сохраняю нвоое имя')}
					isSubmitDisabled={userNameLocal === '' || inputErrors.length > 0}
					justify='end'
					gap='gap_14'
				/> */}
			</div>

		</HDialog>

	)
}