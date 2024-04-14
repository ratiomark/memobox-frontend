import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';
import cls from './Tooltip.module.scss';
import clsx from 'clsx';
import ReactDOM from 'react-dom';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useTheme } from '@/shared/context/useTheme';
import { useTooltip } from './TooltipProvider';

interface TooltipProps {
	trigger: ReactNode;
	content: ReactNode;
	className?: string;
	delay?: number;
	style?: CSSProperties;
	portalId?: string;
	isModalOpen?: boolean;
}

export const MyTooltip = (props: TooltipProps) => {
	const { isEnabled } = useTooltip();
	const { theme } = useTheme();
	const [portalContainer, setPortalContainer] = useState<Element>(document.body);

	useEffect(() => {
		// Если модальное окно открыто и portalId предоставлен,
		// то мы пытаемся найти элемент и обновляем состояние контейнера портала.
		if (props.isModalOpen && props.portalId) {
			const element = document.querySelector(`[custom-id="${props.portalId}"]`);
			if (element) {
				setPortalContainer(element);
			} else {
				console.error(`Element with custom-id="${props.portalId}" not found`);
			}
		}
	}, [props.isModalOpen, props.portalId]);

	const tooltipContent = (
		<div className={clsx(theme, 'app_modal')}>
			<Tooltip.Content
				className={clsx(cls.TooltipContent)}
				sideOffset={5}
				style={props.style}
			>
				{props.content}
				<Tooltip.Arrow className={cls.TooltipArrow} />
			</Tooltip.Content>
		</div>
	);

	const tooltipPortal = isEnabled && portalContainer ? ReactDOM.createPortal(
		tooltipContent,
		portalContainer
	) : null;

	return (
		<Tooltip.Provider delayDuration={props.delay || 300}>
			<Tooltip.Root
				delayDuration={props.delay}
			// defaultOpen={true}
			>
				<Tooltip.Trigger asChild>
					{props.trigger}
				</Tooltip.Trigger>
				{tooltipPortal}
			</Tooltip.Root>
		</Tooltip.Provider>
	);
};
// import { CSSProperties, ReactNode } from 'react';
// import cls from './Tooltip.module.scss'
// import clsx from 'clsx';

// interface TooltipProps {
// 	trigger: ReactNode;
// 	content: ReactNode;
// 	className?: string;
// 	delay?: number
// 	style?: CSSProperties
// 	portalId? : string
// }
// import * as Tooltip from '@radix-ui/react-tooltip';
// import { useTheme } from '@/shared/context/useTheme';
// import { useTooltip } from './TooltipProvider';

// export const MyTooltip = (props: TooltipProps) => {
// 	const { isEnabled } = useTooltip();

// 	// VAR: если переменные цветов не используются, то нужно убрать
// 	const { theme } = useTheme()

// 	const tooltipPortal = isEnabled
// 		? (
// 			<Tooltip.Portal>
// 				{/* добавляю тут тему, чтобы был доступ к переменным цветов */}
// 				<div className={clsx(
// 					theme,
// 					'app_modal',
// 				)}>
// 					<Tooltip.Content
// 						className={clsx(
// 							cls.TooltipContent,
// 						)}
// 						sideOffset={5}
// 					>
// 						{props.content}
// 						<Tooltip.Arrow className={cls.TooltipArrow} />
// 					</Tooltip.Content>
// 				</div>
// 			</Tooltip.Portal>
// 		)
// 		: null

// 	return (
// 		<Tooltip.Provider delayDuration={300}>
// 			<Tooltip.Root
// 				delayDuration={props.delay}
// 			// defaultOpen={true}
// 			>

// 				<Tooltip.Trigger asChild>
// 					{props.trigger}
// 				</Tooltip.Trigger>

// 				{tooltipPortal}
// 			</Tooltip.Root>
// 		</Tooltip.Provider >
// 	);
// };
