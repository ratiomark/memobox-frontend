import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CreateNewShelfModal.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { useState } from 'react';
import { Heading } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { HDialog } from '@/shared/ui/HDialog';

interface CreateNewShelfModalProps {
	className?: string
	shelfNames: string[]
	onSubmit: () => void
	onClose: () => void
	isOpen: boolean
}

export const CreateNewShelfModal = (props: CreateNewShelfModalProps) => {
	const {
		className,
		shelfNames,
		onClose,
		onSubmit,
		isOpen
	} = props
	const [shelfName, setShelfName] = useState('')
	const [inputErrors, setInputErrors] = useState<string[]>([])
	const { t } = useTranslation()
	const onChangeShelfName = (value: string) => {
		setShelfName(value)
		if (shelfNames.includes(value)) setInputErrors([t('polka-s-takimi-imenem-uzhe-est')])
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
		>
			<div className={clsx(
				cls.CreateNewShelfModal,
				className)}
			>
				<Heading as='h2' className={cls.title} title={t('ukazhite-nazvanie-novoi-polki')} />
				<Input
					value={shelfName}
					onChangeString={onChangeShelfName}
					inputErrors={inputErrors}
					className={cls.input}
				/>

				<HStack justify='between' max>
					<Button onClick={onCloseHandle}>{t('cancel')}</Button>
					<Button
						onClick={onSubmit}
						disabled={shelfName.length === 0 || inputErrors.length > 0}
						variant='filled'>{t('save')}</Button>
				</HStack>
			</div>
		</HDialog>
	)
}