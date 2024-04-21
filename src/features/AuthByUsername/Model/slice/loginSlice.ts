import { createAsyncThunk, createSlice, PayloadAction, } from '@reduxjs/toolkit';
// import { loginUserByUserName } from '../services/loginByUserName/loginUserByUserName';
import { LoginSchema } from '../types/loginSchema';
import { TEST_USER_DATA } from '@/shared/const/testConsts';

const initialState: LoginSchema = {
	isLoading: false,
	email: TEST_USER_DATA.email,
	password: TEST_USER_DATA.password,
	name: TEST_USER_DATA.name,
	isLoginProcess: false,
	isForgotModalOpen: false,
	_mounted: true,
}


export const loginSlice = createSlice({
	name: 'loginSlice',
	initialState: initialState,
	reducers: {
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload
		},
		setUserName: (state, action: PayloadAction<string>) => {
			state.name = action.payload
		},
		setIsLoginProcess: (state, action: PayloadAction<boolean>) => {
			state.isLoginProcess = action.payload
		},
		setIsForgotPasswordModal: (state, action: PayloadAction<boolean>) => {
			state.isForgotModalOpen = action.payload
		}
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(
	// 			loginUserByUserName.pending,
	// 			(state, action) => {
	// 				state.error = undefined
	// 				state.isLoading = true
	// 			})
	// 		.addCase(
	// 			loginUserByUserName.fulfilled,
	// 			(state, action) => {
	// 				state.isLoading = false
	// 				state.username = action.payload.username
	// 			})
	// 		.addCase(
	// 			loginUserByUserName.rejected,
	// 			(state, action) => {
	// 				state.isLoading = false;
	// 				state.error = action.payload;
	// 			})

	// }
})

export const { reducer: loginReducer } = loginSlice
export const { actions: loginActions } = loginSlice