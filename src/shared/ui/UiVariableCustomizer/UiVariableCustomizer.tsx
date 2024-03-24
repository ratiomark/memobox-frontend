import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './UiVariableCustomizer.module.scss';
import * as Switch from '@radix-ui/react-switch';
import { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { props } from 'node_modules/cypress/types/bluebird';
import { getAppRoot } from '@/shared/lib/helpers/DOM/getAppRoot';
import RestoreIcon from '@/shared/assets/icons/restoreIcon.svg'
import { Icon } from '../Icon';
import { HStack, VStack } from '../Stack';
import { MyText } from '../Typography';
interface UiVariableCustomizerProps {
	className?: string
	entityName: string;
	cssProperty: string
	useMaxValue?: boolean;
	valueListLength?: number;
	valueListStep?: number;
	sliderMaxValue?: number;
}

export const UiVariableCustomizer = (props: UiVariableCustomizerProps) => {
	const {
		className,
		entityName,
		cssProperty,
		useMaxValue = false,
		valueListLength = 8,
		valueListStep = 2,
		sliderMaxValue = 32
	} = props;

	const getInitialValue = useCallback(() => {
		const root = getAppRoot();
		const value = getComputedStyle(root).getPropertyValue(cssProperty).trim() || '0';
		return value.endsWith('px') ? parseInt(value, 10) : 0;
	}, [cssProperty]);

	const [value, setValue] = useState<number>(0);
	const [initialValue, setInitialValue] = useState<number>(0);

	useEffect(() => {
		const initial = getInitialValue();
		setValue(initial);
		setInitialValue(initial);
	}, [getInitialValue]);

	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = Number(e.target.value);
		setValue(newValue);
		getAppRoot().style.setProperty(cssProperty, `${newValue}px`);
	};

	const setPresetValue = (presetValue: number) => {
		setValue(presetValue);
		const cssValue = presetValue === 999 ? '999px' : `${presetValue}px`;
		getAppRoot().style.setProperty(cssProperty, cssValue);
	};

	const resetToDefault = () => {
		getAppRoot().style.setProperty(cssProperty, `${initialValue}px`);
		setValue(initialValue);
	};

	// Генерация списка значений
	const valueList = Array.from({ length: valueListLength }, (_, index) => index * valueListStep);
	if (useMaxValue) valueList.push(999); // Добавляем значение для "max"

	return (
		<div className={cls.container}>
			<div className={cls.nameSliderWrapper} >
				<div className={cls.nameDefaultWrapper}>
					<MyText
						text={entityName}
					/>
					<Icon
						Svg={RestoreIcon}
						type='main'
						clickable
						withFill={false}
						width={22}
						height={22}
						onClick={resetToDefault}
						buttonSameSize={false}
						className={clsx(cls.icon, cls.restoreIcon)}
					/>
				</div>
				<VStack max>
					<MyText
						text={`${value}px`}
					/>
					<input
						type="range"
						min={0}
						max={sliderMaxValue} // Используем предпоследнее значение, т.к. последнее может быть "max"
						value={value}
						onChange={handleValueChange}
						className={cls.slider}
					/>
				</VStack>
				<div className={cls.buttons}>
					{valueList.map((presetValue) => (
						<button
							key={presetValue}
							className={clsx(cls.button, { [cls.button_active]: value === presetValue })}
							onClick={() => setPresetValue(presetValue)}
						>
							{presetValue === 999 ? 'max' : presetValue}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

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