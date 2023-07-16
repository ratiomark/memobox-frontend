import clsx from 'clsx'
import { motion } from 'framer-motion';
import cls from './BoxSettingsItem.module.scss';

interface AddBoxIconProps {
	className?: string;
	onClick?: () => void
}

export const AddBoxIcon = (props: AddBoxIconProps) => {
	const {
		className,
		onClick,
	} = props

	return (
		<motion.div
			initial={{
				width: 0, height: 0, marginRight: 0,
				opacity: 0
			}}
			animate={{
				width: 30, height: 30, marginRight: 20, opacity: 1,
				transition: { opacity: { delay: 0.42 }, duration: 0.4 }
			}}
			exit={{
				width: 0, height: 0, opacity: 0, marginRight: 0, marginLeft: 0,
				transition: {
					opacity: { duration: 0.2, },
					width: { delay: 0.235, duration: 0.4 },
					height: { delay: 0.235, duration: 0.4 },
					marginRight: { delay: 0.235, duration: 0.4 },
				}
			}}
			className={cls.circle}
			onClick={onClick}
		>
			<motion.div className={cls.lineX} />
			<motion.div className={cls.lineY} />
		</motion.div>
	)
}