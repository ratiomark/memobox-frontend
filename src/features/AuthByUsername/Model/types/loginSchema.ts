
// состояние для стейта который описывает форму регистрации
export interface LoginSchema {
	email: string
	password: string
	name: string
	isLoadingLogin: boolean
	isLoadingRegister: boolean
	error?: string
	isLoginProcess: boolean
	isForgotModalOpen: boolean
	_mounted: boolean
	// могли бы быть и другие другие поля в зависимости от сложности форм firstname, secondname, rememberme
}