import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CheckBox.module.scss';
import { Switch } from '@headlessui/react';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';

interface CheckBoxProps {
	className?: string
	onClick: (e: ChangeEvent) => void
	isChecked: boolean
	blurOnChange?: boolean
}

export const CheckBox = (props: CheckBoxProps) => {
	const {
		className,
		isChecked,
		onClick,
		blurOnChange = false,
	} = props
	const ref = useRef<HTMLInputElement>(null)
	
	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			ref.current?.click()
		}
	}
	
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onClick(e)
		if (blurOnChange) e.target.blur()
	}

	return (
		<input
			ref={ref}
			type="checkbox"
			checked={isChecked}
			onKeyDown={onKeyDown}
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