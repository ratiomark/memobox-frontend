interface CustomError {
	status?: number;
	error?: string;
}
interface CustomErrorFromServer {
	status?: number;
	data: {
		message: string;
	}
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isErrorWithStatusAndError(error: any): error is CustomError {
	return 'status' in error && 'error' in error;
}

export function isErrorWithStatusAndData(error: any): error is CustomErrorFromServer {
	return 'status' in error && 'data' in error;
}
export function isErrorWithMessage(error: any): error is CustomErrorFromServer {
	return 'status' in error && 'data' in error;
}