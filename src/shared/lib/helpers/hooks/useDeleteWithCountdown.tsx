import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import { useState, useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';


interface useDeleteWithCountdownProps {
	deletionFn: ()=>void
	// deletionFn: (id: string) => void
	condition: boolean
	duration: number
	id: string
}

export const useDeleteWithCountdown = (props: useDeleteWithCountdownProps) => {
	const {
		deletionFn,
		condition,
		duration,
		id,
	} = props

	const [timer, setTimer] = useState<TimeoutId | null>(null)

	useEffect(() => {
		const timer = setTimeout(() => {
			deletionFn()
		}, duration)
		setTimer(timer)
	}, [duration, deletionFn])
	// }, [dispatch, id])

	useEffect(() => {
		return () => {
			if (timer) clearTimeout(timer)
		}
	}, [timer])


	useEffect(() => {
		return () => {
			deletionFn()
		}
	}, [deletionFn])

	// удаляет полку сразу, если перезагружает или закрывает вкладку
	useEffect(() => {
		const deleteCard = () => {
			if (condition) {
				deletionFn()
			}
		}

		window.addEventListener('beforeunload', deleteCard)
		return () => {
			window.removeEventListener('beforeunload', deleteCard)
		}
	}, [condition, deletionFn])

}