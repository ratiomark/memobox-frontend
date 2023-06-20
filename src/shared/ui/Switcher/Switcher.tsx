import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Switcher.module.scss';
import { Switch } from '@headlessui/react';

interface SwitcherProps {
	className?: string
	onClickSwitcher: () => void
	isChecked: boolean
	title?: string
}

export const Switcher = (props: SwitcherProps) => {
	const {
		className,
		isChecked,
		onClickSwitcher,
		title
	} = props

	const { t } = useTranslation()

	return (
		<div
			className={clsx(
				className ? '' : cls.switcherWrapper,
				className
			)}
			onClick={onClickSwitcher}
		>
			{title &&
				<p className={cls.label}>
					{title}
				</p>
			}
			<div
				className={clsx(
					cls.switcher,
					{ [cls.switcher_active]: isChecked }
				)}
			>
				<div
					className={clsx(
						cls.switcherCircle,
						{ [cls.switcherCircle_active]: isChecked }
					)}
				/>
			</div>
		</div>
	)
	// return (
	// 	<Switch.Group>
	// 		<div className={cls.switcherWrapper}
	// 			onClick={onClickSwitcher}
	// 		>
	// 			{title &&
	// 				<Switch.Label className={cls.label}>
	// 					{title}
	// 				</Switch.Label>
	// 			}
	// 			<Switch
	// 				checked={isChecked}
	// 				// onChange={onClickSwitcher}
	// 				// onChange={onChangeIsShort}
	// 				className={clsx(
	// 					cls.switcher,
	// 					{ [cls.switcher_active]: isChecked }
	// 				)}
	// 			>
	// 				<div
	// 					className={clsx(
	// 						cls.switcherCircle,
	// 						{ [cls.switcherCircle_active]: isChecked }
	// 					)}
	// 				/>
	// 			</Switch>
	// 		</div>
	// 	</Switch.Group>
	// )
}