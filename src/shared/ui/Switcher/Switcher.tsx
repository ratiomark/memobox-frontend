import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Switcher.module.scss';
import * as Switch from '@radix-ui/react-switch';
import { KeyboardEvent, forwardRef } from 'react';

interface SwitcherProps {
	className?: string
	onClickSwitcher: () => void
	isChecked: boolean
	disabled?: boolean
	title?: string
}
// forwardRef принимает функцию рендеринга в качестве аргумента, которая принимает props и ref и возвращает React - элемент.Вот пример использования:
export const Switcher = forwardRef<HTMLDivElement, SwitcherProps>((props, ref) => {
	const {
		className,
		isChecked,
		onClickSwitcher,
		disabled,
		title,
	} = props;

	return (
		<div
			ref={ref} // Примените ref к корневому элементу
			className={clsx(
				className ? '' : cls.switcherWrapper,
				className
			)}
			onClick={disabled ? undefined : onClickSwitcher}
		>
			{title && <label className={cls.label}>{title}</label>}
			<Switch.Root
				checked={isChecked}
				disabled={disabled}
				className={clsx(
					cls.switcher,
					{ [cls.switcher_active]: isChecked },
					disabled ? '' : cls.pointer
				)}
			>
				<Switch.Thumb
					className={clsx(
						cls.switcherCircle,
						{ [cls.switcherCircle_active]: isChecked }
					)}
				/>
			</Switch.Root>
		</div>
	);
});
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './Switcher.module.scss';
// import { Switch } from '@headlessui/react';
// import { KeyboardEvent } from 'react';

// interface SwitcherProps {
// 	className?: string
// 	onClickSwitcher: () => void
// 	isChecked: boolean
// 	disabled?: boolean
// 	title?: string
// }

// export const Switcher = (props: SwitcherProps) => {
// 	const {
// 		className,
// 		isChecked,
// 		onClickSwitcher,
// 		disabled,
// 		title
// 	} = props

// 	const { t } = useTranslation()
// 	const onEnterDown = (e: KeyboardEvent<HTMLDivElement>) => {
// 		if (e.key === 'Enter') onClickSwitcher()
// 	}
// 	return (

// 		<div
// 			className={clsx(
// 				className ? '' : cls.switcherWrapper,
// 				className
// 			)}
// 			onClick={disabled ? undefined : onClickSwitcher}
// 			onKeyDown={onEnterDown}
// 			tabIndex={0}
// 		>
// 			{title && <p className={cls.label}>{title}</p>}
// 			<div
// 				className={clsx(
// 					cls.switcher,
// 					{ [cls.switcher_active]: isChecked },
// 					disabled ? '' : cls.pointer
// 				)}
// 			>
// 				<div
// 					className={clsx(
// 						cls.switcherCircle,
// 						{ [cls.switcherCircle_active]: isChecked }
// 					)}
// 				/>
// 			</div>
// 		</div >
// 	)
// }


// -----------------------------------------
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './Switcher.module.scss';
// import { Switch } from '@headlessui/react';

// interface SwitcherProps {
// 	className?: string
// 	onClickSwitcher: () => void
// 	isChecked: boolean
// 	disabled?: boolean
// 	title?: string
// }

// export const Switcher = (props: SwitcherProps) => {
// 	const {
// 		className,
// 		isChecked,
// 		onClickSwitcher,
// 		disabled,
// 		title
// 	} = props

// 	const { t } = useTranslation()

// 	return (
// 		<div
// 			className={clsx(
// 				className ? '' : cls.switcherWrapper,
// 				className
// 			)}
// 			onClick={disabled ? undefined : onClickSwitcher}
// 		>
// 			{title &&
// 				<p
// 					className={cls.label}>
// 					{title}
// 				</p>
// 			}
// 			<div
// 				className={clsx(
// 					cls.switcher,
// 					{ [cls.switcher_active]: isChecked },
// 					disabled ? '' : cls.pointer
// 				)}
// 			>
// 				<div
// 					className={clsx(
// 						cls.switcherCircle,
// 						{ [cls.switcherCircle_active]: isChecked }
// 					)}
// 				/>
// 			</div>
// 		</div >
// 	)
// 	// return (
// 	// 	<Switch.Group>
// 	// 		<div className={cls.switcherWrapper}
// 	// 			onClick={onClickSwitcher}
// 	// 		>
// 	// 			{title &&
// 	// 				<Switch.Label className={cls.label}>
// 	// 					{title}
// 	// 				</Switch.Label>
// 	// 			}
// 	// 			<Switch
// 	// 				checked={isChecked}
// 	// 				// onChange={onClickSwitcher}
// 	// 				// onChange={onChangeIsShort}
// 	// 				className={clsx(
// 	// 					cls.switcher,
// 	// 					{ [cls.switcher_active]: isChecked }
// 	// 				)}
// 	// 			>
// 	// 				<div
// 	// 					className={clsx(
// 	// 						cls.switcherCircle,
// 	// 						{ [cls.switcherCircle_active]: isChecked }
// 	// 					)}
// 	// 				/>
// 	// 			</Switch>
// 	// 		</div>
// 	// 	</Switch.Group>
// 	// )
// }