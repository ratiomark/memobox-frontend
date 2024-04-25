// import { SWMessage, SWMessagePayloads, SWMessageType } from '@/shared/types/SW-types';

// // export const swCreateMessage = (type: SWMessageType, payload?: any) => {

// // }

// export const swCreateMessage = <T extends SWMessageType>(
// 	type: T,
// 	payload: SWMessagePayloads[T]
// ): SWMessage<T> => {
// 	return { type, payload };
// };