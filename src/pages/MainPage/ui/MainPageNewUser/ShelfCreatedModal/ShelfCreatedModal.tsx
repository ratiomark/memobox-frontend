import { useTranslation } from 'react-i18next';
import cls from './CreateNewShelfModal.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { Dispatch, SetStateAction, useState } from 'react';
import { Heading } from '@/shared/ui/Typography';
import { useSelector } from 'react-redux';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import {
	createNewShelfThunk,
	cupboardShelfListActions,
	getCreateNewShelfModalIsOpen,
	getCreateNewShelfModalShelfTitle,
	getCreateNewShelfModalShelvesTitles,
} from '@/features/CupboardShelfList'
import { TEST_INPUTS_IDS } from '@/shared/const/testConsts';
import { rtkCreateNewShelf } from '@/entities/Shelf';
import { toastsActions } from '@/shared/ui/Toast';
import { sleep } from '@/shared/lib/helpers/common/sleep';
import { userActions } from '@/entities/User';
import { Button } from '@/shared/ui/Button';

interface ShelfCreatedModalProps {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}
const ShelfCreatedModal = ({ isOpen, setIsOpen }: ShelfCreatedModalProps) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()


	const onCreateNewShelf = async () => {

	}

	const onContinue = () => {
		// переключить флаг в сторе пользвотеля hasCreatedFirstShelf
		// автоматически перерисует ui на полноценный шкаф.
		// dispatch(userActions.setJsonSettings({}))
	}

	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={() => { }}
			onSubmit={onCreateNewShelf}
		>
			<div className={cls.CreateNewShelfModal}>
				<Heading as='h2' className={cls.title} title={t('write shelf name')} />
				<Button
					onClick={onContinue}
				>
					Продолжить
				</Button>
			</div>
		</HDialogHeadless>
	)
}

export default ShelfCreatedModal;