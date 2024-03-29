import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { createReducerManager } from './reducerManager';
import { StateSchema } from './StateSchema';
import { userReducer } from '@/entities/User';
// import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';
import { cupboardShelfListReducer } from '@/features/CupboardShelfList';
import { navBarReducer } from '@/widgets/NavBarNew';
import { toastsReducer } from '@/shared/ui/Toast';
import { uiReducer } from '@/entities/UI';

export function createReduxStore(
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>) {
	// передавая схему стейта в ReducersMapObject я сообщаю TS какие редьюсеры должны быть.
	const rootReducers: ReducersMapObject<StateSchema> = {
		...asyncReducers,
		user: userReducer,
		navBar: navBarReducer,
		// toasts: toastsReducer,
		cupboard: cupboardShelfListReducer,
		ui: uiReducer,
		// cardModal: cardModalReducer,
		// а это редьюсер, который создает RTKQuery с помощь createApi, чтобы ТС не ругался, но добавить в схему
		// [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
		[rtkApi.reducerPath]: rtkApi.reducer
	}

	const reducerManager = createReducerManager(rootReducers)

	const store = configureStore({
		// reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
		reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
		devTools: __IS_DEV__,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			thunk: {
				extraArgument: {
					// api: $api
				}
			}
		})
			// нужно добавить мидлварину, чтобы подключить RTK api
			.concat(rtkApi.middleware)
	})

	//@ts-ignore
	store.reducerManager = reducerManager
	return store
}
// type store = typeof createReduxStore

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']

// export const createStoreInstance = (initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) => {
// 	return createReduxStore(initialState, asyncReducers);
// };

// export const store = createStoreInstance();
// export const store = createReduxStore()
// type rootState = ReturnType<typeof createReduxStore>['dispatch']
export type rootState = ReturnType<typeof createReduxStore>['getState']
// export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector
