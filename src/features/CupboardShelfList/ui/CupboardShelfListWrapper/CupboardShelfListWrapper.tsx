import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CupboardShelfListWrapper.module.scss';
import { useSelector } from 'react-redux';
import { CupboardShelfList } from '../CupboardShelfList';
import { getCupboardIsDataAlreadyInStore, getCupboardIsFirstRender, getCupboardIsLoading, getCupboardIsNeedRefetch, getCupboardIsNeedStop } from '../../model/selectors/getCupboardShelfList';
import { ShelfSkeleton } from '@/entities/Shelf';
import { CommonShelf } from '../CommonShelf/CommonShelf';
import { getUserShelfNamesList } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useEffect, useRef, useState } from 'react';
import { fetchCupboardData } from '../../model/services/fetchCupboardData';
import { useGetCupboardDataQuery } from '@/entities/Cupboard';
import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice';
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
	// const cupboardIsLoading = useSelector(getCupboardIsLoading)
	// const shelfNamesList = useSelector(getUserShelfNamesList)
	const { data, isLoading, error, refetch, isFetching, currentData } = useGetCupboardDataQuery()
	const isDataAlreadyInStore = useSelector(getCupboardIsDataAlreadyInStore)
	const isFirstRender = useSelector(getCupboardIsFirstRender)
	// const isNeedRefetch = useSelector(getCupboardIsNeedRefetch)
	// const isNeedStop = useSelector(getCupboardIsNeedStop)
	const dispatch = useAppDispatch()
	// const [refetching, setRefetching] = useState(false)
	// const counter = useRef(1)
	// const continueCycle = useRef(true)
	// useEffect(() => {
	// 	console.log(data, isLoading, error, refetch)
	// }, [data, isLoading, error, refetch])

	useEffect(() => {
		if (!isFirstRender && isDataAlreadyInStore) {
			refetch()

		}

	}, [isFirstRender, isDataAlreadyInStore, refetch])

	useEffect(() => {
		return () => {
			dispatch(cupboardShelfListActions.setIsFirstRender(false))
		}

	}, [dispatch])


	useEffect(() => {
		// console.log(`Ренденр № ${counter.current}`)
		// counter.current += 1
		if (isLoading) {
			// console.log(`Ренденр № ${counter.current} Загрузка`)
			// counter.current += 1
			dispatch(cupboardShelfListActions.setFetchedCupboardDataIsLoading(true))
		} else if (data) {
			if (!isDataAlreadyInStore) {
				dispatch(cupboardShelfListActions.setFetchedCupboardData(data))
				// return
			} else if (isFetching) {
				return
			} else if (!isFetching) {
				if (data === currentData) {
					dispatch(cupboardShelfListActions.setFetchedCupboardDataIsLoading(false))
					return
				} else {
					dispatch(cupboardShelfListActions.setFetchedCupboardData(data))
					// dispatch(cupboardShelfListActions.setFetchedCupboardDataIsLoading(false))

				}
			}
		} else if (error) {
			// console.log(`Ренденр № ${counter.current} Ошибка`)
			// counter.current += 1
			dispatch(cupboardShelfListActions.setFetchedCupboardDataError(error))
		}

	}, [dispatch, currentData, data, isLoading, isFetching, error, isDataAlreadyInStore, refetch])

	// useEffect(() => {
	// 	if (isLoading) {
	// 		dispatch(cupboardShelfListActions.setFetchedCupboardDataIsLoading(true))
	// 	} else if (data) {
	// 		dispatch(cupboardShelfListActions.setFetchedCupboardData(data))
	// 	} else if (error) {
	// 		dispatch(cupboardShelfListActions.setFetchedCupboardDataError(error))
	// 	}

	// }, [dispatch, data, isLoading, error,])


	return (

		<CupboardShelfList />
	)


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
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './CupboardShelfListWrapper.module.scss';
// import { useSelector } from 'react-redux';
// import { CupboardShelfList } from '../CupboardShelfList';
// import { getCupboardIsLoading } from '../../model/selectors/getCupboardShelfList';
// import { ShelfSkeleton } from '@/entities/Shelf';
// import { CommonShelf } from '../CommonShelf/CommonShelf';
// import { getUserShelfNamesList } from '@/entities/User';
// import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
// import { useEffect } from 'react';
// import { fetchCupboardData } from '../../model/services/fetchCupboardData';
// import { useGetCupboardDataQuery } from '@/entities/Cupboard';
// import { cupboardShelfListActions } from '../..';
// import { AnimatePresence, motion } from 'framer-motion'

// interface CupboardShelfListWrapperProps {
// 	className?: string
// }
// const skeletonItemsAnimation = {
// 	visible: (i: number) => ({
// 		opacity: 1,
// 		transition: {
// 			delay: i * 0.1
// 		}
// 	}),
// 	hidden: { opacity: 0 },
// 	exit: {
// 		opacity: 0.4,
// 		transition: { duration: 0.4 }
// 	}
// }
// export const CupboardShelfListWrapper = (props: CupboardShelfListWrapperProps) => {
// 	const {
// 		className
// 	} = props
// 	const cupboardIsLoading = useSelector(getCupboardIsLoading)
// 	const shelfNamesList = useSelector(getUserShelfNamesList)
// 	const { data, isLoading, error } = useGetCupboardDataQuery()
// 	const dispatch = useAppDispatch()

// 	useEffect(() => {
// 		if (isLoading) {
// 			dispatch(cupboardShelfListActions.setFetchedCupboardDataIsLoading(true))
// 		} else if (data) {
// 			dispatch(cupboardShelfListActions.setFetchedCupboardData(data))
// 		} else if (error) {
// 			dispatch(cupboardShelfListActions.setFetchedCupboardDataError(error))
// 		}

// 	}, [dispatch, data, isLoading, error])


// 	return (
// 		<>
// 			{/* <AnimatePresence mode='wait'>
// 				{
// 					cupboardIsLoading && (
// 						<motion.div
// 							variants={skeletonItemsAnimation}
// 							initial='hidden'
// 							animate='visible'
// 							exit="exit"
// 						>
// 							<CommonShelf data={undefined} isLoading={cupboardIsLoading} />
// 							{shelfNamesList!.map((item, index) => (
// 								<motion.div
// 									key={index}
// 								// variants={skeletonItemsAnimation}
// 								// custom={index}
// 								// initial='hidden'
// 								// animate='visible'
// 								// exit="exit"
// 								>
// 									<ShelfSkeleton
// 										isCollapsed={!item.isCollapsed}
// 										key={item.title}
// 										title={item.title}
// 									/>
// 								</motion.div>
// 							)
// 							)}
// 						</motion.div>
// 					)
// 				}

// 			</AnimatePresence> */}
// 			<AnimatePresence>
// 				<motion.div
// 					initial={{ opacity: 0.4 }}
// 					animate={{ opacity: 1 }}
// 				>
// 					<CupboardShelfList />
// 				</motion.div>
// 			</AnimatePresence>

// 		</>)

// 	// return <CupboardShelfList />
// }


// // if (cupboardIsLoading) {
// // 	return <AnimatePresence mode='wait'>
// // 		<CommonShelf data={undefined} isLoading={cupboardIsLoading} />
// // 		{shelfNamesList!.map((item, index) => (
// // 			<motion.div
// // 				key={index}
// // 				variants={skeletonItemsAnimation}
// // 				custom={index}
// // 				initial='hidden'
// // 				animate='visible'
// // 				exit="exit"
// // 			>
// // 				<ShelfSkeleton
// // 					isCollapsed={!item.isCollapsed}
// // 					key={item.title}
// // 					title={item.title}
// // 				/>
// // 			</motion.div>
// // 		)
// // 		)}
// // 	</AnimatePresence>
// // }

// // return <CupboardShelfList />