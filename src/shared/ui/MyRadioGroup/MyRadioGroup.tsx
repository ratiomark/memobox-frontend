import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { RadioGroup } from '@headlessui/react';
import RadioButtonIcon from '@/shared/assets/icons/radioButtonIcon.svg'
import { Fragment, ReactNode } from 'react';
import { Icon } from '../Icon';
import cls from './MyRadioGroup.module.scss';

interface RadioItem {
	value: string
	content: ReactNode | string
}
interface MyRadioGroupProps {
	className?: string
	value: RadioItem
	onChange: (value: any) => void
	items: RadioItem[]
}

export const MyRadioGroup = (props: MyRadioGroupProps) => {
	const {
		className,
		value,
		onChange,
		items
	} = props
	// const [plan, setPlan] = useState(plans[0])

	const { t } = useTranslation()

	const checkedCircle = (
		<div className={cls.circle}>
			<div className={cls.checked} />
		</div>
	)

	return (
		<RadioGroup
			className={clsx(cls.MyRadioGroup, className)}
			by="value"
			value={value}
			onChange={onChange}
		>
			<RadioGroup.Label>Missed Training</RadioGroup.Label>
			{items.map((item) => (
				/* Use the `active` state to conditionally style the active option. */
				/* Use the `checked` state to conditionally style the checked option. */
				<RadioGroup.Option key={item.value} value={item} as={Fragment}>
					{({ active, checked }) => (
						<li
							className={clsx(
								cls.item,
								active && cls.activeItem
							)}
						>
							{checked
								? checkedCircle
								: <div className={cls.circle} />
							}
							{item.content}
						</li>
					)}
				</RadioGroup.Option>
			))}
		</RadioGroup>
	)
}