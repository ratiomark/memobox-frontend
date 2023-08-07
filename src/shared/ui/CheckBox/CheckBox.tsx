import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CheckBox.module.scss';
import { Switch } from '@headlessui/react';
import { ChangeEvent, useState } from 'react';

interface CheckBoxProps {
	className?: string
	onClick: (e: ChangeEvent) => void
	isChecked: boolean
}

export const CheckBox = (props: CheckBoxProps) => {
	const {
		className,
		isChecked,
		onClick,
	} = props
	
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onClick(e)
		e.target.blur();
	}
	
	return (
		<input
			type="checkbox"
			checked={isChecked}
			onChange={handleChange}
			className={clsx(cls.checkBox, className)}
		/>
	)
}

{/* <div
	className={clsx(
		className ? '' : cls.switcherWrapper,
		className
	)}
// onClick={onClick}
>
	<input
		type="checkbox"
		checked={isChecked}
		onChange={handleChange}
		className={cls.checkBox}
	/>
</div> */}