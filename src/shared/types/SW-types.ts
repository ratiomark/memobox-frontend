/* eslint-disable custom-fsd-checker-plugin/public-api-imports */
/* eslint-disable custom-fsd-checker-plugin/layer-import-sequence */
import { CardSchemaAfterTraining } from '@/entities/Card/model/api/cardApi';


type SkipWaitingMessage = {
	type: 'SKIP_WAITING';
};

type SendTrainingDataMessage = {
	type: 'SEND_TRAINING_DATA';
	payload: CardSchemaAfterTraining[] // Замените TrainingData на фактический тип вашей полезной нагрузки
};

type SWUpdatedMessage = {
	type: 'SW_UPDATED';
};


export type SWMessage = SkipWaitingMessage | SendTrainingDataMessage | SWUpdatedMessage;

// export type SWMessageType = 'SKIP_WAITING' | 'SEND_TRAINING_DATA' | 'SW_UPDATED';
// /* eslint-disable custom-fsd-checker-plugin/public-api-imports */
// /* eslint-disable custom-fsd-checker-plugin/layer-import-sequence */
// import { CardSchemaAfterTraining } from '@/entities/Card/model/api/cardApi';


// export type SWMessagePayloads = {
// 	SKIP_WAITING: undefined;
// 	SEND_TRAINING_DATA: CardSchemaAfterTraining[]
// 	SW_UPDATED: undefined;
// };

// export type SWMessageType = keyof SWMessagePayloads;

// export type SWMessage<T extends SWMessageType> = {
// 	type: T;
// 	payload: SWMessagePayloads[T];
// };

// // export type SWMessageType = 'SKIP_WAITING' | 'SEND_TRAINING_DATA' | 'SW_UPDATED';