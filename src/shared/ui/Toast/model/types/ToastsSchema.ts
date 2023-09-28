import { RequestStatusType } from '@/shared/types/GeneralTypes'
import { ReactNode } from 'react'

export interface MyToastProps {
	className?: string
	status: RequestStatusType
	duration?: number
	messageLoading?: string
	messageSuccess?: string
	messageError?: string
	contentLoading?: ReactNode
	contentSuccess?: ReactNode
	contentError?: ReactNode
	id?: string
}

export interface ToastsSchema {
	toasts: {
		[id: string]: MyToastProps
	}
	toastsIds: string[]
}