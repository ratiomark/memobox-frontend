import clsx from 'clsx'
import { ChangeEvent, FocusEvent, forwardRef, InputHTMLAttributes, KeyboardEvent, MutableRefObject, useEffect, useRef } from 'react'
import cls from './TextArea.module.scss'

// Omit позволяет сконструировать тип, который будет включять в себя все пропсы, кроме некоторых указанных отдельно
// Это нужно для того, чтобы в InputProps можно было без проблем определить пропсы которые уже существуют в InputHTMLAttributes<HTMLTextAreaElement>
type HTMLTextAreaProps = Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'onBlur'>

// Расширяю стандартные пропсы которые принимает инпут, тут использую результат Omit с выпилиенными value, onChange
interface TextAreaProps extends HTMLTextAreaProps {
	className?: string
	value?: string
	autoFocus?: boolean
	readonly?: boolean
	rows?: number
	// inputErrors?: ValidationErrorText[]
	// onChange?: (value: string | ChangeEvent<HTMLTextAreaElement>) => void;
	onChangeEvent?: (event: ChangeEvent<HTMLTextAreaElement>) => void
	onChangeString?: (value: string) => void
	onBlur?: (value: string) => void
	onValidate?: (value: any) => void
	onKeyPress?: (event: KeyboardEvent<HTMLTextAreaElement>) => void
	getInitialHeight?: (value: number) => void
	getCurrentHeight?: (value: number) => void
	autoHeight?: boolean
	useInitialHeightAsMinimal?: boolean
	heightValue?: number
	minHeightValue?: number
	// additionalRows?: number
	focus?: boolean
	comparerData?: any
}
// let linesNow: number;
const linesThen = 0
const paddingTopPlusPaddingBottom = 8 + 8
const borderTopPlusBottom = 0.8 + 0.8
const lineHeight = 24
const countHeightByRows = (rows: number) => {
	return rows * lineHeight + borderTopPlusBottom + paddingTopPlusPaddingBottom
}
const initial = true;
// может принимать getCurrentHeight - функция в которую передается высота по скроллу
// heightValue - если передано и превышает высоту по скролу, то будет использовать эту высоту
// forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, forwardedRef) => {
	const {
		className,
		value,
		onChangeEvent,
		onChangeString,
		onBlur,
		onValidate,
		onKeyPress,
		readonly,
		rows = 1,
		useInitialHeightAsMinimal,
		autoHeight = true,
		focus,
		getCurrentHeight,
		getInitialHeight,
		minHeightValue,
		heightValue,
		comparerData,
		// additionalRows,
		...otherProps
		// autoFocus,
	} = props
	// VAR: расчет высоты = ряды * на высоту строки + паддиниги сверху\снизу + бордеры. Итого, если 5 рядов, высота строки 24, падинги по 8 + 2px на бордеры = 5 * 24 + 16 + 2 = 138
	const isBlurHappened = useRef<boolean>(false)
	const textAreaRef = useRef() as MutableRefObject<HTMLTextAreaElement>
	const counter = useRef(0)

	useEffect(() => {
		// console.log('РЕНДЕР ', counter.current, '  rowssss now   ', rows)
	}, [rows])

	useEffect(() => {
		// console.log(' -------------------   ', minHeightValue)
		if (getInitialHeight && rows && !minHeightValue) {
			const minHeightByRows = countHeightByRows(rows) + lineHeight
			const minHeightByScrollHeight = textAreaRef.current.scrollHeight + borderTopPlusBottom + lineHeight
			const maxMinHeight = Math.max(minHeightByRows, minHeightByScrollHeight)
			getInitialHeight(maxMinHeight)
		}
	}, [getInitialHeight, rows, minHeightValue, comparerData,])

	useEffect(() => {
		if (!useInitialHeightAsMinimal) {
			return
		}
		const area = textAreaRef.current
		if (minHeightValue) {
			area.style.minHeight = `${minHeightValue}px`
		} else {
			const minHeightByRows = countHeightByRows(rows) + lineHeight
			const minHeightByScrollHeight = area.scrollHeight + borderTopPlusBottom + lineHeight
			const maxMinHeight = Math.max(minHeightByRows, minHeightByScrollHeight)
			// const currentMinHeight = Number(area.style.minHeight.split('px')[0])
			// if (maxMinHeight === currentMinHeight) return
			// console.log('minHeightByRows   : ', minHeightByRows)
			// console.log('minHeightByScrollHeight   : ', minHeightByScrollHeight)
			// console.log('currentMinHeight   : ', currentMinHeight)
			area.style.minHeight = `${maxMinHeight}px`
		}
		
	}, [useInitialHeightAsMinimal, comparerData, minHeightValue, rows])


	useEffect(() => {
		const area = textAreaRef.current
		if (!autoHeight) {
			return
		}
		// console.log('Рендер ', counter.current)
		const areaHeightByScroll = area.scrollHeight + borderTopPlusBottom
		console.log(areaHeightByScroll, heightValue)
		if (areaHeightByScroll === heightValue) {
			// console.log('Рендер ', counter.current, '  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
			// counter.current = counter.current + 1
			return
		}
		// console.log('Стартую scrollHeight, ', areaHeightByScroll)
		// const heightByRows = countHeightByRows(rows)
		// if (!heightValue && heightByRows > currentHeight) {
		// 	currentHeight = heightByRows
		// 	console.log('ROWS  ', currentHeight)
		// }

		// console.log('Текущая высота: ', window.getComputedStyle(area).lineHeight)
		let currentHeight = areaHeightByScroll
		// console.log(`назначаю areaHeightByScroll  ${currentHeight}`)
		if (heightValue) {
			currentHeight = heightValue
			// area.style.height = `${heightValue}px`
		}
		area.style.height = `${currentHeight}px`

		if (getCurrentHeight) {
			getCurrentHeight(currentHeight)
		}
		return () => {
			counter.current = counter.current + 1
		}
	}, [value, autoHeight, rows, getCurrentHeight, heightValue])

	useEffect(() => {
		const area = textAreaRef.current
		if (focus) {
			area.focus()
			const length = area.value.length
			area.selectionStart = length
			area.selectionEnd = length
		}
	}, [focus])

	const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		if (isBlurHappened.current) {
			onValidate?.(e.target.value)
		}
		if (onChangeEvent) {
			onChangeEvent(e)
			return
		}
		onChangeString?.(e.target.value)
	}

	const onBlurHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
		isBlurHappened.current = true
		// setIsFocus(false)
		onValidate?.(e.target.value)
		onBlur?.(e.target.value)
	}

	return (
		<>
			<textarea
				// autoFocus
				ref={textAreaRef}
				rows={rows}
				className={clsx(cls.textArea, [className])}
				onChange={onChangeHandler}
				value={value}
				onBlur={onBlurHandler}
				disabled={readonly}
				onKeyDown={onKeyPress}
				{...otherProps}
			/>
		</>
	)
})
TextArea.displayName = 'TextArea'










// useEffect(() => {
// 	const area = textAreaRef.current
// 	if (!autoHeight) {
// 		return
// 	}
// 	console.log('Рендер ', counter.current)
// 	const areaHeightByScroll = area.scrollHeight + 2
// 	console.log('Стартую scrollHeight, ', areaHeightByScroll)
// 	// console.log('Текущая высота: ', window.getComputedStyle(area).lineHeight)
// 	let currentHeight
// 	if (heightValue && heightValue > areaHeightByScroll) {
// 		currentHeight = heightValue
// 	} else {
// 		currentHeight = areaHeightByScroll
// 		console.log(`назначаю areaHeightByScroll  ${currentHeight}`)
// 	}

// 	const linesNow = Math.floor(area.scrollHeight / lineHeight)
// 	// const linesNow = value!.split('\n').length
// 	if (linesNow > linesThen) {
// 		linesThen = linesNow
// 	}
// 	console.log(`linesNow ${linesNow} \nlinesThen ${linesThen}`)

// 	const heightByLines = countHeightByRows(linesNow)
// 	if (linesNow < linesThen && heightByLines < currentHeight) {
// 		currentHeight = heightByLines
// 		// currentHeight = Math.max(linesNow, rows) * 24 + 2 + 12 + 4
// 		console.log(linesNow, rows)
// 		console.log('Отработали линии ', currentHeight)
// 		linesThen = linesNow
// 	}

// 	const heightByRows = countHeightByRows(rows)
// 	// const heightByRows = rows * 24 + 2 + 12
// 	if (!heightValue && heightByRows > currentHeight) {
// 		currentHeight = heightByRows
// 		console.log('ROWS  ', currentHeight)
// 	}
// 	console.log(`Финальное значение ${currentHeight}px`)
// 	console.log('Рендер ', counter.current, ' --- конец')
// 	console.log('')
// 	area.style.height = `${currentHeight}px`
// 	if (getCurrentHeight) {
// 		getCurrentHeight(currentHeight)
// 	}
// 	return () => {
// 		counter.current = counter.current + 1
// 		// area.style.height = 'auto'
// 	}
// }, [value, autoHeight, rows, getCurrentHeight, heightValue])





// import {
// 	ChangeEvent,
// 	FocusEvent,
// 	forwardRef,
// 	InputHTMLAttributes,
// 	KeyboardEvent,
// 	memo,
// 	MutableRefObject,
// 	useEffect
// 	, useRef,
// } from 'react';
// import cls from './TextArea.module.scss'
// import clsx from 'clsx';

// // Omit позволяет сконструировать тип, который будет включять в себя все пропсы, кроме некоторых указанных отдельно
// // Это нужно для того, чтобы в InputProps можно было без проблем определить пропсы которые уже существуют в InputHTMLAttributes<HTMLTextAreaElement>
// type HTMLTextAreaProps = Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'onBlur'>

// // Расширяю стандартные пропсы которые принимает инпут, тут использую результат Omit с выпилиенными value, onChange
// interface TextAreaProps extends HTMLTextAreaProps {
// 	className?: string;
// 	value?: string;
// 	autoFocus?: boolean;
// 	readonly?: boolean
// 	rows?: number;
// 	// inputErrors?: ValidationErrorText[]
// 	// onChange?: (value: string | ChangeEvent<HTMLTextAreaElement>) => void;
// 	onChangeEvent?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
// 	onChangeString?: (value: string) => void;
// 	onBlur?: (value: string) => void;
// 	onValidate?: (value: any) => void
// 	onKeyPress?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
// 	getInitialHeight?: (value: number) => void
// 	getCurrentHeight?: (value: number) => void
// 	autoHeight?: boolean
// 	useInitialHeightAsMinimal?: boolean
// 	heightValue?: number
// 	minHeightValue?: number
// 	focus?: boolean
// 	comparerData?: any
// }

// // может принимать getCurrentHeight - функция в которую передается высота по скроллу
// // heightValue - если передано и превышает высоту по скролу, то будет использовать эту высоту
// // forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
// export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, forwardedRef) => {
// 	const {
// 		className,
// 		value,
// 		onChangeEvent,
// 		onChangeString,
// 		onBlur,
// 		onValidate,
// 		onKeyPress,
// 		readonly,
// 		rows = 1,
// 		useInitialHeightAsMinimal,
// 		autoHeight = true,
// 		focus,
// 		getCurrentHeight,
// 		getInitialHeight,
// 		minHeightValue,
// 		heightValue,
// 		comparerData,
// 		...otherProps
// 		// autoFocus,
// 	} = props
// 	// VAR: расчет высоты = ряды * на высоту строки + паддиниги сверху\снизу + бордеры. Итого, если 5 рядов, высота строки 24, падинги по 8 + 2px на бордеры = 5 * 24 + 16 + 2 = 138
// 	const isBlurHappened = useRef<boolean>(false)
// 	const textAreaRef = useRef() as MutableRefObject<HTMLTextAreaElement>

// 	useEffect(() => {
// 		if (getInitialHeight && !minHeightValue) {
// 			// console.log('Отработал getInitialHeight в ', comparerData)
// 			getInitialHeight(textAreaRef.current.scrollHeight + 2)
// 		}
// 	}, [getInitialHeight, comparerData, minHeightValue])

// 	useEffect(() => {
// 		if (!useInitialHeightAsMinimal) {
// 			return
// 		}
// 		// console.log('Отработал useInitialHeightAsMinimal в ', comparerData)
// 		if (minHeightValue) {
// 			textAreaRef.current.style.minHeight = `${minHeightValue}px`
// 		} else {
// 			textAreaRef.current.style.minHeight = `${textAreaRef.current.scrollHeight + 2}px`
// 		}
// 	}, [useInitialHeightAsMinimal, comparerData, minHeightValue])

// 	// useEffect(() => {
// 	// 	const area = textAreaRef.current
// 	// 	if (autoHeight) {
// 	// 		const areaHeightByScroll = area.scrollHeight + 2
// 	// 		console.log('Scroll height   ', areaHeightByScroll)
// 	// 		console.log('Out height   ', heightValue)
// 	// 		console.log('MIN height ', area.style.minHeight)
// 	// 		let currentHeight;
// 	// 		if (heightValue && heightValue > areaHeightByScroll) {
// 	// 			 currentHeight = heightValue
// 	// 			// areaHeightByScroll > heightValue
// 	// 			// 	? area.style.height = `${areaHeightByScroll}px`
// 	// 			// 	: area.style.height = `${heightValue}px`
// 	// 		} else {
// 	// 			currentHeight = areaHeightByScroll
// 	// 			// area.style.height = `${areaHeightByScroll}px`
// 	// 		}
// 	// 		area.style.height = `${currentHeight}px`
// 	// 		// const areaHeightByScroll = textAreaRef.current.scrollHeight + 2
// 	// 		// textAreaRef.current.style.height = `${areaHeightByScroll}px`
// 	// 		if (getCurrentHeight) {
// 	// 			getCurrentHeight(currentHeight)
// 	// 		}
// 	// 	}
// 	// 	return (() => {
// 	// 		area.style.height = 'auto'
// 	// 	})
// 	// }, [value, autoHeight, rows, getCurrentHeight, heightValue])

// 	useEffect(() => {
// 		const area = textAreaRef.current
// 		if (autoHeight) {
// 			const areaHeightByScroll = area.scrollHeight + 2

// 			// console.log('Scroll height   ', areaHeightByScroll)
// 			// console.log('Out height   ', heightValue)
// 			// console.log('MIN height ', area.style.minHeight)
// 			let currentHeight
// 			if (heightValue && heightValue > areaHeightByScroll) {
// 				currentHeight = heightValue
// 			} else {
// 				currentHeight = areaHeightByScroll
// 			}
// 			area.style.height = `${currentHeight}px`
// 			if (getCurrentHeight) {
// 				getCurrentHeight(currentHeight)
// 			}
// 		}
// 		return (() => {
// 			area.style.height = 'auto'
// 		})
// 	}, [value, autoHeight, rows, getCurrentHeight, heightValue])

// 	useEffect(() => {
// 		const area = textAreaRef.current
// 		if (focus) {
// 			area.focus()
// 			// const length = area.value.length
// 			// area.selectionStart = length
// 			// area.selectionEnd = length
// 		}
// 	},[focus])

// 	const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
// 		if (isBlurHappened.current) {
// 			onValidate?.(e.target.value)
// 		}
// 		if (onChangeEvent) {
// 			onChangeEvent(e)
// 			return
// 		}
// 		onChangeString?.(e.target.value)
// 	}

// 	const onBlurHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
// 		isBlurHappened.current = true
// 		// setIsFocus(false)
// 		onValidate?.(e.target.value)
// 		onBlur?.(e.target.value)
// 	}

// 	return (
// 		<>
// 			<textarea
// 				// autoFocus
// 				ref={textAreaRef}
// 				rows={rows}
// 				className={clsx(cls.Input, [className])}
// 				onChange={onChangeHandler}
// 				value={value}
// 				onBlur={onBlurHandler}
// 				disabled={readonly}
// 				onKeyDown={onKeyPress}
// 				{...otherProps}
// 			/>
// 		</>
// 	)
// })
// TextArea.displayName = 'TextArea'

// import { ChangeEvent, FocusEvent, forwardRef, InputHTMLAttributes, KeyboardEvent, memo, MutableRefObject, useEffect, useRef, } from 'react';
// import cls from './TextArea.module.scss'
// import clsx from 'clsx';

// // Omit позволяет сконструировать тип, который будет включять в себя все пропсы, кроме некоторых указанных отдельно
// // Это нужно для того, чтобы в InputProps можно было без проблем определить пропсы которые уже существуют в InputHTMLAttributes<HTMLTextAreaElement>
// type HTMLTextAreaProps = Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'onBlur'>

// // Расширяю стандартные пропсы которые принимает инпут, тут использую результат Omit с выпилиенными value, onChange
// interface TextAreaProps extends HTMLTextAreaProps {
// 	className?: string;
// 	value?: string;
// 	autoFocus?: boolean;
// 	readonly?: boolean
// 	rows?: number;
// 	// inputErrors?: ValidationErrorText[]
// 	// onChange?: (value: string | ChangeEvent<HTMLTextAreaElement>) => void;
// 	onChangeEvent?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
// 	onChangeString?: (value: string) => void;
// 	onBlur?: (value: string) => void;
// 	onValidate?: (value: any) => void
// 	onKeyPress?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
// 	getCurrentHeight?: (value: number) => void
// 	autoHeight?: boolean
// 	heightValue?: number
// 	focus?: boolean
// }
// //eslint-disable-next-line
// // forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
// export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, forwardedRef) => {
// 	const {
// 		className,
// 		value,
// 		onChangeEvent,
// 		onChangeString,
// 		onBlur,
// 		onValidate,
// 		onKeyPress,
// 		// type = 'text',
// 		readonly,
// 		rows = 1,
// 		// inputErrors = [],
// 		autoHeight = true,
// 		focus,
// 		getCurrentHeight,
// 		heightValue,
// 		...otherProps
// 		// autoFocus,
// 	} = props
// 	// VAR: расчет высоты = ряды * на высоту строки + паддиниги сверху\снизу + бордеры. Итого, если 5 рядов, высота строки 24, падинги по 8 + 2px на бордеры = 5 * 24 + 16 + 2 = 138

// 	useEffect(() => {
// 		const area = textAreaRef.current
// 		if (textAreaRef.current && autoHeight) {
// 			// const
// 			// устанавливать либо высоту извне, либо текущую высоту по скроллу
// 			const areaHeightByScroll = textAreaRef.current.scrollHeight + 2

// 			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 2}px`
// 			if (getCurrentHeight) getCurrentHeight(textAreaRef.current.scrollHeight + 2)
// 		}
// 		if (focus) area.focus()
// 		return (() => {
// 			area.style.height = 'auto'
// 		})
// 	}, [value, autoHeight, focus, rows, getCurrentHeight, heightValue])

// 	useEffect(() => {
// 		const area = textAreaRef.current
// 		if (heightValue && heightValue !== 0) {
// 			textAreaRef.current.style.height = `${heightValue}px`
// 		}
// 		if (focus) area.focus()
// 		return (() => {
// 			area.style.height = 'auto'
// 		})
// 	}, [heightValue, focus])

// 	const isBlurHappened = useRef<boolean>(false)
// 	const textAreaRef = useRef() as MutableRefObject<HTMLTextAreaElement>

// 	const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
// 		if (isBlurHappened.current) {
// 			onValidate?.(e.target.value)
// 		}
// 		if (onChangeEvent) {
// 			onChangeEvent(e)
// 			return
// 		}
// 		onChangeString?.(e.target.value)
// 	}

// 	const onBlurHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
// 		isBlurHappened.current = true
// 		// setIsFocus(false)
// 		onValidate?.(e.target.value)
// 		onBlur?.(e.target.value)
// 	}

// 	return (
// 		<>
// 			<textarea
// 				// autoFocus
// 				ref={textAreaRef}
// 				rows={rows}
// 				className={clsx(cls.Input, [className])}
// 				onChange={onChangeHandler}
// 				value={value}
// 				onBlur={onBlurHandler}
// 				disabled={readonly}
// 				onKeyDown={onKeyPress}
// 				{...otherProps}
// 			/>
// 		</>
// 	)
// })
// TextArea.displayName = 'TextArea'
