import { RequestStatusType } from '@/shared/types/GeneralTypes'
import { ReactNode } from 'react'

export interface MyToastProps {
	className?: string
	status: RequestStatusType
	duration?: number
	messageLoading?: string
	messageSuccess?: string
	messageError?: string
	contentLoading?: string
	contentSuccess?: string
	contentError?: string
	contentCommon?: string
	// contentLoading?: string | ReactNode
	// contentSuccess?: string | ReactNode
	// contentError?: string | ReactNode
	// contentCommon?: string | ReactNode
	id?: string
}

export interface ToastsSchema {
	toasts: {
		[id: string]: MyToastProps
	}
	toastsIds: string[]
}