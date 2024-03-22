import { CSSProperties, ReactNode } from 'react';
import cls from './Tooltip.module.scss'
import clsx from 'clsx';

interface TooltipProps {
	trigger: ReactNode;
	content: ReactNode;
	className?: string;
	delay?: number
	style?: CSSProperties
}
import * as Tooltip from '@radix-ui/react-tooltip';
import { useTheme } from '@/shared/context/useTheme';
import { useTooltip } from './TooltipProvider';

export const MyTooltip = (props: TooltipProps) => {
	const { isEnabled } = useTooltip();

	// VAR: если переменные цветов не используются, то нужно убрать
	const { theme } = useTheme()

	const tooltipPortal = isEnabled
		? (
			<Tooltip.Portal>
				{/* добавляю тут тему, чтобы был доступ к переменным цветов */}
				<div className={clsx(
					theme,
					'app_modal',
				)}>
					<Tooltip.Content
						className={clsx(
							cls.TooltipContent,
						)}
						sideOffset={5}
					>
						{props.content}
						<Tooltip.Arrow className={cls.TooltipArrow} />
					</Tooltip.Content>
				</div>
			</Tooltip.Portal>
		)
		: null

	return (
		<Tooltip.Provider delayDuration={300}>
			<Tooltip.Root
				delayDuration={props.delay}
			// defaultOpen={true}
			>

				<Tooltip.Trigger asChild>
					{props.trigger}
				</Tooltip.Trigger>

				{tooltipPortal}
			</Tooltip.Root>
		</Tooltip.Provider >
	);
};
