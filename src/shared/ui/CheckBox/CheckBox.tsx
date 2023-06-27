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
	// const [isCheckedLocal, setIsCheckedLocal] = useState(isChecked)
	const handleChange = (e: ChangeEvent) => {
		// e.stopPropagation()
		// console.log('CHANGE')
		// setIsCheckedLocal(!isCheckedLocal)
		onClick(e)
	}
	// console.log(isChecked, isCheckedLocal)
	return (
		<input
			type="checkbox"
			checked={isChecked}
			onChange={handleChange}
			className={cls.checkBox}
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