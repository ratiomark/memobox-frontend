import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelfButtons.module.scss';
import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

interface ShelfButtonsProps {
	className?: string
	shelfPosition: number
	onAddNewCardClick: () => void
}

// function trainHotKey(event: KeyboardEvent) {
// 	if (event.code === 'Digit1' && event.code === 'KeyN')
// }

export const ShelfButtons = (props: ShelfButtonsProps) => {
	const {
		className,
		shelfPosition,
		onAddNewCardClick
	} = props
	
	const [train, setTrain] = useState(0)
	let positionTextCard = '';
	let positionTextTrain = '';
	if (shelfPosition === 0) {
		positionTextCard = 'n'
		positionTextTrain = 't'
	} else if (shelfPosition < 10) {
		positionTextCard = `n + ${shelfPosition}`
		positionTextTrain = `t + ${shelfPosition}`
	}
	useHotkeys(positionTextCard, onAddNewCardClick)
	useHotkeys(positionTextTrain, () => setTrain(train + 1), [train])

	// useEffect(() => {
	// 	document.addEventListener('keydown',)
	// })

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.ShelfButtons,
			[className])}
		>
			{/* <p>{click}</p> */}
			{/* <p>{train}</p> */}
			<Button onClick={onAddNewCardClick} className={cls.button}>
				{t('Add card with hot key') + ` (${positionTextCard})`}
			</Button>
			<Button className={cls.button}>
				{t('settings')}
			</Button>
			<Button className={cls.button}>
				{t('view')}
			</Button>
			<Button
				className={cls.button}
				variant='filled'
				data-button-type='shelf-train'
			>
				{t('train') + ` (${positionTextTrain})`}
			</Button>
			<Icon
				clickable
				type='hint'
				Svg={ArrowBottomIcon}
				onClick={() => { null }}
			/>
			{/* <ButtonIcon
				className={cls.buttonIcon}
				iconVariant='arrowDown'
				iconColor='grey'
				buttonColor='grey'
			/> */}
		</div>
	)
}