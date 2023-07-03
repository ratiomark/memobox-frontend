import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Heading } from '@/shared/ui/Typography';
import cls from './BoxSettingsItem.module.scss';
import { motion } from 'framer-motion'

interface BoxSettingSpecialBoxProps {
	type: 'new' | 'learnt'
}

export const BoxSettingsSpecialBox = ({ type }: BoxSettingSpecialBoxProps) => {
	const { t } = useTranslation()
	return (
		<motion.div
			layout
			initial={{ scale: 0 }}
			// initial={{ width: 0 }}
			animate={{ scale: 1 }}
				// animate={{ width: 'auto' }}
			transition={{ duration: 2 }}
			key={type === 'new' ? 0 : 999}
		>
			<div className={cls.BoxSettingsItem}>
				<Heading as='h5' className={cls.title} title={type === 'new' ? t('new cards') : t('learnt cards')} />
			</div>
		</motion.div>)
}