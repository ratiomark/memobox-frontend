import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Transition.module.scss';
import { Transition as HTransition } from '@headlessui/react'
import { ReactNode } from 'react';

interface TransitionProps {
	className?: string
	appear?: boolean
	show?: boolean
	children: ReactNode
}

export const MyTransition = (props: TransitionProps) => {
	const {
		className,
		appear,
		show,
		children,
		...otherProps
	} = props

	const { t } = useTranslation()

	return (
		<HTransition
			appear={appear}
			show={show}
			enter={cls.enter}
			enterFrom={cls.enterFrom}
			enterTo={cls.enterTo}
			className={cls.transitionElement}
			leave={cls.leave}
			leaveFrom={cls.leaveFrom}
			leaveTo={cls.leaveTo}
			{...otherProps}
		// appear={true}
		>
			{children}
		</HTransition>
	)
}