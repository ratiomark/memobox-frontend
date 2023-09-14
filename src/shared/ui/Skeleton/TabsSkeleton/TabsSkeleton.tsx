import { Skeleton } from '../Skeleton'
import cls from './TabsSkeleton.module.scss'
export const TabsSkeleton = () => {
	return <Skeleton width={700} className={cls.tabsSkeleton} />
}