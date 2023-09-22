import { ReducersMapObject, Store } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from '../config/StateSchema';
import { createStoreInstance, store as defaultStore } from '../config/createStoreInstance';
// import { createReduxStore, createStoreInstance, store as defaultStore } from '../config/store';

interface StoreProviderProps {
	store?: Store
	children?: ReactNode;
	initialState?: StateSchema;
	asyncReducers?: ReducersMapObject<StateSchema>
}

export const StoreProvider = (props: StoreProviderProps) => {
	const {
		store = defaultStore,
		children,
		initialState,
		asyncReducers
	} = props

	const customStore = (initialState || asyncReducers)
		? createStoreInstance(initialState, asyncReducers)
		: store
	// const store = createReduxStore(initialState, asyncReducers)
	// console.log('Render Store')
	return (
		<Provider store={customStore}>
			{children}
		</Provider>

	)
}
// import { ReducersMapObject } from '@reduxjs/toolkit';
// import { ReactNode } from 'react';
// import { Provider } from 'react-redux';
// import { StateSchema } from '../config/StateSchema';
// import { createReduxStore, store } from '../config/store';

// interface StoreProviderProps {
// 	children?: ReactNode;
// 	initialState?: StateSchema;
// 	asyncReducers?: ReducersMapObject<StateSchema>
// }

// // export const store = createReduxStore()
// export const StoreProvider = (props: StoreProviderProps) => {
// 	const {
// 		children,
// 		initialState,
// 		asyncReducers
// 	} = props

// 	// const store = createReduxStore(initialState, asyncReducers)
// 	// console.log('Render Store')
// 	return (
// 		<Provider store={store}>
// 			{children}
// 		</Provider>

// 	)
// }