import cls from '../ProfilePageWidget.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton';


export const ProfilePageWidgetSkeleton = () => {

	return (
		<div className='pageStyles'>
			<div className='pageWrapperStyles'>
				<div className={cls.profilePageWidget}>
					{/* <Skeleton height={52 * 3} className={cls.userBlockSkeleton} /> */}
					<div style={{ display: 'grid', gap: 2 }}>

						<Skeleton width={'100%'} height={52} />
						<Skeleton width={'100%'} height={52} />
						<Skeleton width={'100%'} height={52} />
					</div>
					<Skeleton width={'100%'} height={52} />
					<Skeleton width={'100%'} height={52} />
				</div>
			</div>
		</div>

	)
}