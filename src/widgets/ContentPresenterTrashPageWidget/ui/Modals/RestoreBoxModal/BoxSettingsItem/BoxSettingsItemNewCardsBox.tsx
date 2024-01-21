import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Heading } from '@/shared/ui/Typography';
import cls from './BoxSettingsItem.module.scss';
import { motion } from 'framer-motion'
import { DURATION_SEC } from '@/shared/const/animation';

interface BoxSettingSpecialBoxProps {
	type: 'new'
}
// У коробки с изученными должна быть возможность изменения времени
export const BoxSettingsSpecialBox = ({ type }: BoxSettingSpecialBoxProps) => {
	const { t } = useTranslation()
	return (
		<motion.div
			// layout
			style={{ flexShrink: 0 }}
			initial={{
				width: 0,
				opacity: 0,
				marginLeft: 0,
				marginRight: 0
			}}
			// initial={{ width: 0 }}
			animate={{
				width: 'auto',
				opacity: 1,
				marginRight: 20,
				marginLeft: 20,
			}}
			// animate={{ width: 'auto' }}
			transition={{ duration: DURATION_SEC }}
			key={type}
		// key={type === 'new' ? 0 : 999}
		>
			<div className={cls.BoxSettingsItem}>
				<Heading as='h5' className={cls.title} title={t('new cards')} />
			</div>
		</motion.div>)
}
