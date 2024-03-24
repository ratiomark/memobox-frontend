import clsx from 'clsx'
import cls from './UiComponentEnabler.module.scss'
import { Switcher } from '../Switcher';
import { MyText } from '../Typography';

interface UiComponentEnablerProps {
	className?: string;
	entityName: string;
	isEnabled: boolean;
	onToggleClick: () => void;
}

export const UiComponentEnabler = (props: UiComponentEnablerProps) => {
	const {
		className,
		entityName,
		isEnabled,
		onToggleClick,
	} = props

	return (
		<div className={clsx(cls.container, [className])} >
			<MyText text={entityName} />
			<Switcher
				isChecked={isEnabled}
				onClickSwitcher={onToggleClick}
			/>
		</div>
	)
}