import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserSavedDataViewPageColumns } from '@/entities/User';
// import { SortColumnObject } from '@/entities/User/model/types/JsonSavedData';
// import { SortColumnObject } from '@/widgets/SortControllerViewPageWidget/model/types/SortControllerViewPageWidgetSchema';
import { createSelector } from '@reduxjs/toolkit';

export const getViewPageSelectedCardIds = (state: StateSchema) => state.viewPage?.selectedCardIds
