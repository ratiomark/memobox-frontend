import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CommonShelfButtons.module.scss';
import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

interface ShelfButtonsProps {
	className?: string
}

// function trainHotKey(event: KeyboardEvent) {
// 	if (event.code === 'Digit1' && event.code === 'KeyN')
// }

export const CommonShelfButtons = (props: ShelfButtonsProps) => {
	const {
		className,
	} = props
	const [train, setTrain] = useState(0)
	useHotkeys('t', () => setTrain(train + 1), [train])

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.ShelfButtons,
			[className])}
		>
			{/* <p>{click}</p> */}
			{/* <p>{train}</p> */}
			<Button className={cls.button}>
				{t('view')}
			</Button>
			<Button
				className={cls.button}
				variant='filled'
				data-button-type='shelf-train'
			>
				{t('train') + ' (t)'}
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