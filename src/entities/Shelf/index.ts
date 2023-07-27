// export { shelfReducer, shelfActions } from './model/slice/shelfSlice';

export {
	useUpdateShelfWithTagMutation,
	useUpdateShelfMutation,
	useUpdateCommonShelfMutation,
	useRemoveShelfMutation,
} from './model/api/shelvesApi';

export { ShelfButtons } from '../../features/CupboardShelfList/ui/ShelfButtons/ShelfButtons';

// export { shelfSchema } from './model/types/shelf';
export type { ShelfSchema } from './model/types/ShelfSchema'
export type { ShelfProps } from './ui/Shelf/Shelf';
export { Shelf } from './ui/Shelf/Shelf';
export { ShelfSkeleton, } from './ui/Shelf/ShelfSkeleton';