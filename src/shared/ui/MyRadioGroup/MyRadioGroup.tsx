import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, ReactNode, forwardRef, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
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

export const MyRadioGroup = forwardRef<any, MyRadioGroupProps>((props, forwardedRef) => {
	const {
		className,
		value,
		onChange,
		items,

	} = props
	// const [plan, setPlan] = useState(plans[0])
	const rootRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (rootRef && rootRef.current) {
			const radio = rootRef.current.querySelector('[data-headlessui-state="checked"]') as HTMLLIElement;
			// console.log('radio')
			// console.log(radio)
			if (radio) {
				radio.focus();
			}
		}
	}, [value])

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
			ref={rootRef}
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
})