import clsx from 'clsx'
import cls from './ErrorDisplay.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'

interface ErrorDisplayProps {
	className?: string
}

export const ErrorDisplay = ({ className }: ErrorDisplayProps) => {
	const { t } = useTranslation()
	const reloadPage = () => {
		window.location.reload()
	}

	return (
		<div className={clsx(cls.ErrorDisplay, [className])}>
			<h2>{t('error happened')}</h2>
			<Button
				variant='outline'
				onClick={reloadPage}>
				{t('update page')}
			</Button>
		</div>
	)
}
