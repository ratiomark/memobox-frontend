import clsx from 'clsx'
import cls from './UiComponentEnabler.module.scss'
import { Switcher } from '../Switcher';
import { MyText } from '../Typography';
import { Card } from '../Card';

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
		<Card>
			<div className={clsx(cls.container, [className])} >
				<MyText text={entityName} />
				<Switcher
					isChecked={isEnabled}
					onClickSwitcher={onToggleClick}
				/>
			</div>
		</Card>
	)
}