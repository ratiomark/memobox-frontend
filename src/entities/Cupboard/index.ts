// export { cupboardReducer, cupboardActions } from './model/slice/cupboardSlice';
export type { CupboardSchema, CommonShelfBackendResponse } from './model/types/CupboardSchema';
// export { Cupboard } from './ui/Cupboard';

export {
	cupboardGetShelves,
	cupboardGetData,
	useGetCupboardDataQuery,
	useGetShelvesQuery
} from './model/api/cupboardApi'
