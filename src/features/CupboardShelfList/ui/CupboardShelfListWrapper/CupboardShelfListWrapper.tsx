import { useSelector } from 'react-redux';
import { CupboardShelfList } from '../CupboardShelfList';
import { getCupboard, getIsCupboardDataAlreadyInStore, getIsCupboardFirstRender, getIsCupboardLoading } from '../../model/selectors/getCupboardShelfList';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Suspense, useEffect } from 'react';
import { useGetCupboardDataQuery } from '@/entities/Cupboard';
import { cupboardShelfListActions, cupboardShelfListReducer } from '../../model/slice/cupboardShelfListSlice';
import { fetchCupboardDataThunk } from '../../model/services/fetchCupboardDataThunk';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { getIsMobile } from '@/entities/UI';
import { CupboardShelfListMobile } from '../CupboardShelfListMobile';

const reducers: ReducersList = {
	cupboard: cupboardShelfListReducer,
}



// const CupboardShelfListPreLoad = () => {
export const CupboardShelfListWrapper = () => {
	// useAsyncReducer({ reducers, removeAfterUnmount: false })
	// const cupboardIsLoading = useSelector(getCupboardIsLoading)
	const { data, isLoading, error, refetch, isFetching, currentData, } = useGetCupboardDataQuery()
	const isDataAlreadyInStore = useSelector(getIsCupboardDataAlreadyInStore)
	const isFirstRender = useSelector(getIsCupboardFirstRender)
	// const isNeedRefetch = useSelector(getCupboardIsNeedRefetch)
	// const isNeedStop = useSelector(getCupboardIsNeedStop)
	const dispatch = useAppDispatch()
	const isMobile = useSelector(getIsMobile)

	// if (!isLoading && !isFetching && data) {

	// 	dispatch(fetchCupboardDataThunk(data))
	// }

	useEffect(() => {
		if (!isLoading && !isFetching && data) {

			dispatch(fetchCupboardDataThunk(data))
		}
	}, [data, isLoading, isFetching, dispatch])

	useEffect(() => {
		if (isLoading || isFetching) {
			dispatch(cupboardShelfListActions.setIsCupboardRefetching(true))
		} else {
			// dispatch(cupboardShelfListActions.setIsCupboardRefetching(false))
		}
	}, [isLoading, isFetching, dispatch])

	// useEffect(() => {
	// 	dispatch(cupboardShelfListActions.setIsCupboardDataLoading(isLoading))
	// }, [isLoading, dispatch])

	// useEffect(() => {
	// 	if (!isFirstRender && isDataAlreadyInStore) {
	// 		refetch()

	// 	}

	// }, [isFirstRender, isDataAlreadyInStore, refetch])

	// useEffect(() => {
	// 	return () => {
	// 		dispatch(cupboardShelfListActions.setIsFirstRender(false))
	// 	}

	// }, [dispatch])


	// useEffect(() => {
	// 	// console.log(`Ренденр № ${counter.current}`)
	// 	// counter.current += 1
	// 	if (isLoading) {
	// 		// console.log(`Ренденр № ${counter.current} Загрузка`)
	// 		// counter.current += 1
	// 		dispatch(cupboardShelfListActions.setFetchedCupboardDataIsLoading(true))
	// 	} else if (data) {
	// 		if (!isDataAlreadyInStore) {
	// 			// dispatch(cupboardShelfListActions.setFetchedCupboardData(data))
	// 			dispatch(fetchCupboardDataThunk(data))
	// 			// dispatch(cupboardShelfListActions.setFetchedCupboardData(data))
	// 			// return
	// 		} else if (isFetching) {
	// 			return
	// 		} else if (!isFetching) {
	// 			if (data === currentData) {
	// 				dispatch(fetchCupboardDataThunk(data))
	// 				dispatch(cupboardShelfListActions.setFetchedCupboardDataIsLoading(false))
	// 				return
	// 			} else {
	// 				// dispatch(cupboardShelfListActions.setFetchedCupboardData(data))
	// 				dispatch(fetchCupboardDataThunk(data))
	// 				// dispatch(cupboardShelfListActions.setFetchedCupboardDataIsLoading(false))

	// 			}
	// 		}
	// 	} else if (error) {
	// 		// console.log(`Ренденр № ${counter.current} Ошибка`)
	// 		// counter.current += 1
	// 		dispatch(cupboardShelfListActions.setFetchedCupboardDataError(error))
	// 	}

	// }, [dispatch, currentData, data, isLoading, isFetching, error, isDataAlreadyInStore, refetch])

	if (isMobile) {
		return <CupboardShelfListMobile />
	}
	return <CupboardShelfList />
}

// export const CupboardShelfListWrapper2 = () => {
// 	const { store } = useAsyncReducer({ reducers, removeAfterUnmount: false })
// 	const mountedReducers = store.reducerManager.getMountedReducers()
// 	const reducersMap = store.reducerManager.getReducerMap()
// 	const isCupboardMounted = useSelector(getCupboard)
// 	if (isCupboardMounted) {
// 		// console.log(reducersMap)
// 		// console.log('mountedReducers', mountedReducers)
// 		// console.log('mountedReducers.cupboard', mountedReducers.cupboard)
// 		// console.log(store.reducerManager.getReducerMap())
// 		return (
// 			<Suspense fallback={null}>
// 				<CupboardShelfListPreLoad />
// 			</Suspense>
// 		)
// 	}
// 	return null
// }

// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './CupboardShelfListWrapper.module.scss';
// import { useSelector } from 'react-redux';
// import { CupboardShelfList } from '../CupboardShelfList';
// import { getCupboardIsDataAlreadyInStore, getCupboardIsFirstRender, getCupboardIsLoading, getCupboardIsNeedRefetch, getCupboardIsNeedStop } from '../../model/selectors/getCupboardShelfList';
// import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
// import { useEffect, useRef, useState } from 'react';
// import { fetchCupboardDataThunk } from '../../model/services/fetchCupboardData';
// import { useGetCupboardDataQuery } from '@/entities/Cupboard';
// import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice';


// export const CupboardShelfListWrapper = () => {
// 	const dispatch = useAppDispatch()

// 	useEffect(() => {
// 		dispatch(fetchCupboardDataThunk())
// 	}, [dispatch])

// 	return <CupboardShelfList />
// }
// import { useSelector } from 'react-redux';
// import { CupboardShelfList } from '../CupboardShelfList';
// import { getCupboardIsDataAlreadyInStore, getCupboardIsFirstRender } from '../../model/selectors/getCupboardShelfList';
// import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
// import { useEffect } from 'react';
// import { useGetCupboardDataQuery } from '@/entities/Cupboard';
// import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice';
// import { fetchCupboardDataThunk } from '../../model/services/fetchCupboardDataThunk';


// export const CupboardShelfListWrapper = () => {
// 	// const cupboardIsLoading = useSelector(getCupboardIsLoading)
// 	// const { data, isLoading, error, refetch, isFetching, currentData } = useGetCupboardDataQuery()
// 	// const isDataAlreadyInStore = useSelector(getCupboardIsDataAlreadyInStore)
// 	// const isFirstRender = useSelector(getCupboardIsFirstRender)
// 	// const isNeedRefetch = useSelector(getCupboardIsNeedRefetch)
// 	// const isNeedStop = useSelector(getCupboardIsNeedStop)
// 	const dispatch = useAppDispatch()
// 	// const [refetching, setRefetching] = useState(false)
// 	// const counter = useRef(1)
// 	// const continueCycle = useRef(true)
// 	// useEffect(() => {
// 	// 	console.log(data, isLoading, error, refetch)
// 	// }, [data, isLoading, error, refetch])

// 	// useEffect(() => {
// 	// 	if (!isFirstRender && isDataAlreadyInStore) {
// 	// 		refetch()

// 	// 	}

// 	// }, [isFirstRender, isDataAlreadyInStore, refetch])

// 	// useEffect(() => {
// 	// 	return () => {
// 	// 		dispatch(cupboardShelfListActions.setIsFirstRender(false))
// 	// 	}

// 	// }, [dispatch])


// 	// useEffect(() => {
// 	// 	// console.log(`Ренденр № ${counter.current}`)
// 	// 	// counter.current += 1
// 	// 	if (isLoading) {
// 	// 		// console.log(`Ренденр № ${counter.current} Загрузка`)
// 	// 		// counter.current += 1
// 	// 		dispatch(cupboardShelfListActions.setFetchedCupboardDataIsLoading(true))
// 	// 	} else if (data) {
// 	// 		if (!isDataAlreadyInStore) {
// 	// 			dispatch(cupboardShelfListActions.setFetchedCupboardData(data))
// 	// 			// return
// 	// 		} else if (isFetching) {
// 	// 			return
// 	// 		} else if (!isFetching) {
// 	// 			if (data === currentData) {
// 	// 				dispatch(cupboardShelfListActions.setFetchedCupboardDataIsLoading(false))
// 	// 				return
// 	// 			} else {
// 	// 				dispatch(cupboardShelfListActions.setFetchedCupboardData(data))
// 	// 				// dispatch(cupboardShelfListActions.setFetchedCupboardDataIsLoading(false))

// 	// 			}
// 	// 		}
// 	// 	} else if (error) {
// 	// 		// console.log(`Ренденр № ${counter.current} Ошибка`)
// 	// 		// counter.current += 1
// 	// 		dispatch(cupboardShelfListActions.setFetchedCupboardDataError(error))
// 	// 	}

// 	// }, [dispatch, currentData, data, isLoading, isFetching, error, isDataAlreadyInStore, refetch])

// 	// useEffect(() => {
// 	// 	if (isLoading) {
// 	// 		dispatch(cupboardShelfListActions.setFetchedCupboardDataIsLoading(true))
// 	// 	} else if (data) {
// 	// 		dispatch(cupboardShelfListActions.setFetchedCupboardData(data))
// 	// 	} else if (error) {
// 	// 		dispatch(cupboardShelfListActions.setFetchedCupboardDataError(error))
// 	// 	}

// 	// }, [dispatch, data, isLoading, error,])
// 	useEffect(() => {
// 		dispatch(fetchCupboardDataThunk())
// 	}, [dispatch])
// 	return <CupboardShelfList />
// }

// // import clsx from 'clsx';
// // import { useTranslation } from 'react-i18next';
// // import cls from './CupboardShelfListWrapper.module.scss';
// // import { useSelector } from 'react-redux';
// // import { CupboardShelfList } from '../CupboardShelfList';
// // import { getCupboardIsDataAlreadyInStore, getCupboardIsFirstRender, getCupboardIsLoading, getCupboardIsNeedRefetch, getCupboardIsNeedStop } from '../../model/selectors/getCupboardShelfList';
// // import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
// // import { useEffect, useRef, useState } from 'react';
// // import { fetchCupboardDataThunk } from '../../model/services/fetchCupboardData';
// // import { useGetCupboardDataQuery } from '@/entities/Cupboard';
// // import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice';


// // export const CupboardShelfListWrapper = () => {
// // 	const dispatch = useAppDispatch()

// // 	useEffect(() => {
// // 		dispatch(fetchCupboardDataThunk())
// // 	}, [dispatch])

// // 	return <CupboardShelfList />
// // }