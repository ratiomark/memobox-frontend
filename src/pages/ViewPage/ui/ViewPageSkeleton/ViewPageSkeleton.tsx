import {
	BigDataLabelsSkeleton,
	CardsListSkeleton,
	DefaultButtonSkeleton,
	ShelvesListViewWidgetSkeleton,
	Skeleton,
	TabsSkeleton
} from '@/shared/ui/Skeleton';
import { HStack } from '@/shared/ui/Stack';
import cls from './ViewPageSkeleton.module.scss'

export const ViewPageSkeleton = () => (
	<div className='pageStyles'>
		<div className='pageWrapperStyles'>
			<div className={cls.viewPageInitializer}>
				<HStack
					max
					className={cls.statsAndActions}
				>
					<BigDataLabelsSkeleton />
					<DefaultButtonSkeleton width={140} className={cls.tableSettingButton} />
				</HStack>
				<ShelvesListViewWidgetSkeleton />
				<TabsSkeleton />
				<Skeleton className={cls.sortingSkeleton} height={20} borderRadius='999px' />
				<CardsListSkeleton />
			</div>
		</div >
	</div>


)
