import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ModalButtons.module.scss';
import { Button } from '../Button';
import { HStack } from '../Stack';
import { FlexGap, FlexJustify } from '../Stack/Flex/Flex';
import { useHotkeys } from 'react-hotkeys-hook';

interface ModalButtonsProps {
	className?: string
	max?: boolean
	justify?: FlexJustify
	onClose: () => void
	onSubmit?: () => void
	isSubmitDisabled?: boolean
	textCloseButton?: string
	textSubmitButton?: string
	gap?: FlexGap
}

export const ModalButtons = (props: ModalButtonsProps) => {
	const {
		className,
		max = true,
		justify = 'between',
		onClose,
		gap,
		isSubmitDisabled,
		onSubmit = () => { alert('Отработал') },
		textCloseButton = 'cancel',
		textSubmitButton = 'save',
	} = props

	const { t } = useTranslation()

	return (
		<HStack
			justify={justify}
			max={max}
			gap={gap}
			className={className}

		>
			<Button
				variant='back'
				onClick={onClose}
			>
				{t(textCloseButton)}
			</Button>

			<Button
				disabled={isSubmitDisabled}
				onClick={onSubmit}
				variant='filled'
			>
				{t(textSubmitButton)}
			</Button>
		</HStack>
	)
}