import { AnimatePresence, motion } from 'framer-motion';
import cls from './BoxesRendered.module.scss';
import { BoxSchema } from '@/entities/Box';
import { BoxesSettingsContent } from './BoxesSettingsContent/BoxesSettingsContent';

export interface BoxesRenderedProps {
	boxes: BoxSchema[]
}

export const BoxesRendered = (props: BoxesRenderedProps) => {
	return (
		<AnimatePresence initial={false} mode='wait'>
			<motion.div
				layout
				className={cls.ShelfTemplateSettings}
			>
				<BoxesSettingsContent  {...props} />
			</motion.div>
		</AnimatePresence>
	)
}
