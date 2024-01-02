import { EnhancedStore } from '@reduxjs/toolkit';
// import { AxiosInstance } from 'axios';
import { TimeSleepSettings, UserSchema } from '@/entities/User';
import { IReducerManager } from './reducerManager';
import { rtkApi } from '@/shared/api/rtkApi';
import { LoginSchema } from '@/features/AuthByUsername';
// import { CardModalSchema } from '@/features/CardModal';
import { ViewPageInitializerSchema } from '@/features/ViewPageInitializer';
import { CupboardPageSchema } from '@/features/CupboardShelfList';
import { SettingsShelfTemplate } from '@/features/SettingsFeatures'
import { TrashPageInitializerSchema } from '@/features/TrashPageInitializer';
import { ProfilePageWidgetSchema } from '@/widgets/ProfilePageWidget';
import { HeaderSchema } from '@/widgets/Header';
import { ShelfBoxesTemplateSchema } from '@/features/CupboardShelfList';
import { ToastsSchema } from '@/shared/ui/Toast';
import { UISchema } from '@/entities/UI';

// loginForm делаю не обязательным, таким образом я могу подружать его позже с помощью асинхронна и ТС не будет ругаться на то что я не объявил его в rootReducers
export interface StateSchema {
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
	user: UserSchema
	ui: UISchema
	header: HeaderSchema
	cupboard: CupboardPageSchema
	// async reducers
	toasts?: ToastsSchema
	loginForm?: LoginSchema
	viewPage?: ViewPageInitializerSchema
	trashPage?: TrashPageInitializerSchema
	settingsShelfTemplate?: SettingsShelfTemplate
	shelfBoxesTemplateSettings?: ShelfBoxesTemplateSchema
	settingsTimeSleep?: Partial<TimeSleepSettings>
	profilePage?: ProfilePageWidgetSchema
	// sortColumns
}

// достаю ключи редьюсеров, чтобы передать их reducerManager, там где требуются ключи
export type StateSchemaReducersKeys = keyof StateSchema

// создаю тип для для стора, чтобы расширить стандартный стор. Стор возвращает тип EnhancedStore, так например при создании стора со схемой StateSchema, я увижу, что мой стор имеет
// const store: EnhancedStore<StateSchema, AnyAction, [ThunkMiddleware<S, AnyAction, undefined>]>
// тип  reducerManager, чтобы добавить его в стор
export interface ReduxStoreWithReducerManager extends EnhancedStore<StateSchema> {
	reducerManager: IReducerManager
}

// // этот тип описывает аргумент для экстра параметра у Thunk
export interface ThunkExtraArg {
	// 	api?: AxiosInstance
	api?: undefined
}