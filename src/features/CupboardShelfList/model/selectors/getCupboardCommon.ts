import { StateSchema } from '@/app/providers/StoreProvider'
import { cupboardInitialState, shelvesAdapter } from '../slice/cupboardShelfListSlice'

export const getCupboardState = shelvesAdapter.getSelectors<StateSchema>(
	(state) => state.cupboard ? state.cupboard : cupboardInitialState
)
export const getAllShelvesIds = (state: StateSchema) => getCupboardState.selectIds(state)
export const getAllShelves = (state: StateSchema) => getCupboardState.selectAll(state)
export const getAllShelvesEntities = (state: StateSchema) => getCupboardState.selectEntities(state)