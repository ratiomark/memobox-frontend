import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Switcher.module.scss';

interface SwitcherProps {
	className?: string
}

export const Switcher = (props: SwitcherProps) => {
	const {
		className
	} = props

	const { t } = useTranslation()
	// const item = [
	// 	{
	// 		content: t('Новый'),
	// 		value: 'new'
	// 	},
	// 	{
	// 		content: t('Старый'),
	// 		value: 'old'
	// 	}
	// ]
	
	return (
		<div className={clsx(
			cls.Switcher,
			[className])}
		>

		</div>
	)
}