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
	rows?: number
	getInitialHeight?: (value: number) => void
	getCurrentHeight?: (value: number) => void
	onChangeEvent?: (event: ChangeEvent<HTMLTextAreaElement>) => void
	onChangeString?: (value: string) => void
	autoHeight?: boolean
	useInitialHeightAsMinimal?: boolean
	heightValue?: number
	minHeightValue?: number
	focus?: boolean
	comparerData?: any
}
// let linesNow: number;
const paddingTopPlusPaddingBottom = 8 + 8
const borderTopPlusBottom = 0.8 + 0.8
const lineHeight = 24

const initial = true;
// может принимать getCurrentHeight - функция в которую передается высота по скроллу
// heightValue - если передано и превышает высоту по скролу, то будет использовать эту высоту
// forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
export const ShadowTextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, forwardedRef) => {
	const {
		className,
		value,
		rows = 1,
		useInitialHeightAsMinimal,
		autoHeight = true,
		focus,
		getCurrentHeight,
		getInitialHeight,
		onChangeEvent,
		onChangeString,
		minHeightValue,
		heightValue,
		comparerData,
		...otherProps
	} = props


	const textAreaRef = useRef() as MutableRefObject<HTMLTextAreaElement>
	const counter = useRef(0)

	useEffect(() => {
		const area = textAreaRef.current

		// console.log('Рендер ', counter.current)
		const areaHeightByScroll = area.scrollHeight + borderTopPlusBottom + lineHeight
		// const areaHeightByScroll = area.scrollHeight + borderTopPlusBottom + lineHeight

		console.log('SHADOW AREA финальное значение: ', areaHeightByScroll)
		console.log('Рендер ', counter.current, ' --- конец')
		// console.log('')
		// area.style.height = `${currentHeight}px`
		if (getCurrentHeight) {
			getCurrentHeight(areaHeightByScroll)
		}
		return () => {
			counter.current = counter.current + 1
		}
	}, [value, rows, getCurrentHeight, comparerData, heightValue])

	const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		if (onChangeEvent) {
			onChangeEvent(e)
			return
		}
		onChangeString?.(e.target.value)
	}

	return (
		<>
			<textarea
				ref={textAreaRef}
				rows={rows}
				className={clsx(
					cls.textArea,
					// cls.shadowTextArea,
					[className])
				}
				value={value}
				// readOnly={onChe}
				readOnly
				// onChange={onChangeHandler}
				{...otherProps}
			/>
		</>
	)
})
ShadowTextArea.displayName = 'ShadowTextArea'