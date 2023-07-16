import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './SettingsPageWidget.module.scss';
import { Page } from '@/widgets/Page';
import { memo } from 'react';


export const SettingsPageWidgetSkeleton = memo(() => {
	return (
		<Page>
			<div className={cls.settingsPageWidget} >
				<Skeleton width={'100%'} height={56} />
				<Skeleton width={'100%'} height={56} />
				<Skeleton width={'100%'} height={56} />
				<Skeleton width={'100%'} height={56} />
			</div>
		</Page>
	)
})
