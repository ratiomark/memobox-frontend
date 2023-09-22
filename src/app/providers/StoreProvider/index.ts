export { store } from './config/createStoreInstance';
// export { store } from './config/store';
export { createReduxStore } from './config/store';
export type { AppDispatch } from './config/store';
export { StoreProvider } from './ui/StoreProvider';
export type { StateSchema, ReduxStoreWithReducerManager, StateSchemaReducersKeys, ThunkExtraArg } from './config/StateSchema';