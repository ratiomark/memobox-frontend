import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CheckBox.module.scss';
import { Switch } from '@headlessui/react';
import { useState } from 'react';

interface CheckBoxProps {
	className?: string
	onClick: () => void
	isChecked: boolean
}

export const CheckBox = (props: CheckBoxProps) => {
	const {
		className,
		isChecked,
		onClick,
	} = props
	// const [isCheckedLocal, setIsCheckedLocal] = useState(isChecked)
	const handleChange = () => {
		// setIsCheckedLocal(!isCheckedLocal)
		onClick()
	}
	// console.log(isChecked, isCheckedLocal)
	return (
		<div
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
			/>
			{/* <div
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
			</div> */}
		</div>
	)
}