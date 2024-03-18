import { TEST_ENTITY_NAMES } from '@/shared/const/testConsts';

export type ModifiedLabelsObject = Omit<typeof TEST_ENTITY_NAMES.labels, 'labelInfo'>;
export type Labels = keyof ModifiedLabelsObject;
export type ShelfBox = 'new' | 'learnt' | number;