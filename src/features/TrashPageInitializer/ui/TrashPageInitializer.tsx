import clsx from 'clsx'
import cls from './TrashPageInitializer.module.scss'
import { ReactNode } from 'react';

interface TrashPageInitializerProps {
	className?: string;
	entitySwitcherWidget: ReactNode
	contentShowerWidget?: ReactNode
}

export const TrashPageInitializer = (props: TrashPageInitializerProps) => {
	const {
		className,
		entitySwitcherWidget,
		contentShowerWidget,
	} = props

	return (
		<div className={clsx(cls.TrashPageInitializer, [className])} >
			{entitySwitcherWidget}
			{contentShowerWidget}
		</div>
	)
}