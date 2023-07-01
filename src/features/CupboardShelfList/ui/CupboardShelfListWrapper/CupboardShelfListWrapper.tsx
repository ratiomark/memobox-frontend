import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CupboardShelfListWrapper.module.scss';
import { useSelector } from 'react-redux';
import { CupboardShelfList } from '../CupboardShelfList';
import { getCupboardIsLoading } from '../../model/selectors/getCupboardShelfList';
import { ShelfSkeleton } from '@/entities/Shelf';
import { CommonShelf } from '../CommonShelf/CommonShelf';
import { getUserShelfNamesList } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useEffect } from 'react';
import { fetchCupboardData } from '../../model/services/fetchCupboardData';
import { useGetCupboardDataQuery } from '@/entities/Cupboard';
import { cupboardShelfListActions } from '../..';
import { AnimatePresence, motion } from 'framer-motion'

interface CupboardShelfListWrapperProps {
	className?: string
}
const skeletonItemsAnimation = {
	visible: (i: number) => ({
		opacity: 1,
		transition: {
			delay: i * 0.1
		}
	}),
	hidden: { opacity: 0 },
	exit: {
		opacity: 0.4,
		transition: { duration: 0.4 }
	}
}
export const CupboardShelfListWrapper = (props: CupboardShelfListWrapperProps) => {
	const {
		className
	} = props
	const cupboardIsLoading = useSelector(getCupboardIsLoading)
	const shelfNamesList = useSelector(getUserShelfNamesList)
	const { data, isLoading, error } = useGetCupboardDataQuery()
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (isLoading) {
			dispatch(cupboardShelfListActions.setFetchedCupboardDataIsLoading(true))
		} else if (data) {
			dispatch(cupboardShelfListActions.setFetchedCupboardData(data))
		} else if (error) {
			dispatch(cupboardShelfListActions.setFetchedCupboardDataError(error))
		}

	}, [dispatch, data, isLoading, error])


	return (
		<>
			<AnimatePresence mode='wait'>
				{
					cupboardIsLoading && (
						<motion.div
							variants={skeletonItemsAnimation}
							initial='hidden'
							animate='visible'
							exit="exit"
						>
							<CommonShelf data={undefined} isLoading={cupboardIsLoading} />
							{shelfNamesList!.map((item, index) => (
								<motion.div
									key={index}
									// variants={skeletonItemsAnimation}
									// custom={index}
									// initial='hidden'
									// animate='visible'
									// exit="exit"
								>
									<ShelfSkeleton
										isCollapsed={!item.isCollapsed}
										key={item.title}
										title={item.title}
									/>
								</motion.div>
							)
							)}
						</motion.div>
					)
				}

			</AnimatePresence>
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0.4 }}
					animate={{ opacity: 1 }}
				>
					<CupboardShelfList />

				</motion.div>
			</AnimatePresence>

		</>)

	// return <CupboardShelfList />
}


// if (cupboardIsLoading) {
// 	return <AnimatePresence mode='wait'>
// 		<CommonShelf data={undefined} isLoading={cupboardIsLoading} />
// 		{shelfNamesList!.map((item, index) => (
// 			<motion.div
// 				key={index}
// 				variants={skeletonItemsAnimation}
// 				custom={index}
// 				initial='hidden'
// 				animate='visible'
// 				exit="exit"
// 			>
// 				<ShelfSkeleton
// 					isCollapsed={!item.isCollapsed}
// 					key={item.title}
// 					title={item.title}
// 				/>
// 			</motion.div>
// 		)
// 		)}
// 	</AnimatePresence>
// }

// return <CupboardShelfList />