export const validateEmail = (emailValue: string) => {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/;
	return emailRegex.test(emailValue)
}

