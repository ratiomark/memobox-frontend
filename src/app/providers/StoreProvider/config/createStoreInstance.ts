import { ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { createReduxStore } from './store';

export const createStoreInstance = (initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) => {
	return createReduxStore(initialState, asyncReducers);
};

export const store = createStoreInstance();