import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CreateNewShelfModal.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { useState } from 'react';
import { Heading } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { HDialog } from '@/shared/ui/HDialog';
import { getUserShelfNamesList } from '@/entities/User';
import { useSelector } from 'react-redux';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { useHotkeys } from 'react-hotkeys-hook';

interface CreateNewShelfModalProps {
	className?: string
	// shelfNames: string[]
	onSubmit: () => void
	onClose: () => void
	isOpen: boolean
}

export const CreateNewShelfModal = (props: CreateNewShelfModalProps) => {
	const {
		className,
		// shelfNames,
		onClose,
		onSubmit,
		isOpen
	} = props
	const [shelfName, setShelfName] = useState('')
	const [inputErrors, setInputErrors] = useState([])
	const { t } = useTranslation('translation')
	const shelfNames = useSelector(getUserShelfNamesList)?.map(shelf => shelf.title)

	const onChangeShelfName = (value: string) => {
		setShelfName(value)
		if (shelfNames?.includes(value)) setInputErrors([t('inputs.SHELF_NAME_ALREADY_EXISTS')])
		else setInputErrors([])
	}

	const onCloseHandle = () => {
		setInputErrors([])
		setShelfName('')
		onClose()
	}

	return (
		<HDialog
			isOpen={isOpen}
			onClose={onCloseHandle}
			onSubmit={() => alert('Создаю новую полку')}
		>
			<div className={clsx(
				cls.CreateNewShelfModal,
				className)}
			>
				<Heading as='h2' className={cls.title} title={t('write shelf name')} />
				<Input
					value={shelfName}
					onChangeString={onChangeShelfName}
					inputErrors={inputErrors}
					className={cls.input}
					classNameInputError={cls.inputError}
				/>

				<ModalButtons
					onClose={onCloseHandle}
					onSubmit={() => alert('Создаю новую полку')}
					isSubmitDisabled={shelfName.length === 0 || inputErrors.length > 0}
					justify='end'
					gap='gap_14'
				/>
			</div>
		</HDialog>
	)
}