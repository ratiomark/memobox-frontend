export type { ShelfBoxesTemplateSchema } from './model/types/shelfBoxesTemplateSchema';
// export { shelfBoxesTemplateSettingsReducer } from './model/slice/shelfBoxesTemplateSlice';
export { CupboardShelfListWrapper } from './ui/CupboardShelfListWrapper/CupboardShelfListWrapper';

export { getCupboardState } from './model/slice/cupboardShelfListSlice';
export {
	getCupboard,
	getCupboardData,
	getCupboardIsLoading,
	getCupboardError,
	getCupboardShelves
} from './model/selectors/getCupboardShelfList';
export { cupboardShelfListReducer, cupboardShelfListActions } from './model/slice/cupboardShelfListSlice';

export type { CupboardPageSchema } from './model/types/CupboardPageSchema';

export { CupboardShelfList } from './ui/CupboardShelfList';