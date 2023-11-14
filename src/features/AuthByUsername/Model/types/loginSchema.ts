
// состояние для стейта который описывает форму регистрации
export interface LoginSchema {
	email: string
	password: string
	isLoading?: boolean
	error?: string
	// могли бы быть и другие другие поля в зависимости от сложности форм firstname, secondname, rememberme
}