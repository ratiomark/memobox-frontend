import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppDispatch } from './useAppDispatch';


interface useDeleteWithCountdownProps {
	deletionFn: () => void
	startCondition: boolean
	duration: number
}

export const useDeleteWithCountdown = (props: useDeleteWithCountdownProps) => {
	const {
		deletionFn,
		startCondition,
		duration,
	} = props

	const [timer, setTimer] = useState<TimeoutId | null>(null)

	useEffect(() => {
		const timer = setTimeout(() => {
			deletionFn()
		}, duration)
		setTimer(timer)
	}, [duration, deletionFn])

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
		const deleteCallBack = () => {
			if (startCondition) {
				console.log('FIRE')
				deletionFn()
			}
		}

		window.addEventListener('beforeunload', deleteCallBack)
		return () => {
			window.removeEventListener('beforeunload', deleteCallBack)
		}
	}, [deletionFn, startCondition])
	// return { timer, condition, setCondition }
	return { timer }
}