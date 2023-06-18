import { ChangeEvent, FocusEvent, forwardRef, InputHTMLAttributes, KeyboardEvent, memo, MutableRefObject, useEffect, useRef, } from 'react';
import cls from './TextArea.module.scss'
import clsx from 'clsx';


// Omit позволяет сконструировать тип, который будет включять в себя все пропсы, кроме некоторых указанных отдельно
// Это нужно для того, чтобы в InputProps можно было без проблем определить пропсы которые уже существуют в InputHTMLAttributes<HTMLTextAreaElement>
type HTMLTextAreaProps = Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'onBlur'>

// Расширяю стандартные пропсы которые принимает инпут, тут использую результат Omit с выпилиенными value, onChange
interface TextAreaProps extends HTMLTextAreaProps {
	className?: string;
	value?: string;
	autoFocus?: boolean;
	readonly?: boolean
	rows?: number;
	// inputErrors?: ValidationErrorText[]
	// onChange?: (value: string | ChangeEvent<HTMLTextAreaElement>) => void;
	onChangeEvent?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	onChangeString?: (value: string) => void;
	onBlur?: (value: string) => void;
	onValidate?: (value: any) => void
	onKeyPress?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
	autoHeight?: boolean
}
//eslint-disable-next-line
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
		// type = 'text',
		readonly,
		rows = 1,
		// inputErrors = [],
		autoHeight = true,
		...otherProps
		// autoFocus,
	} = props


	useEffect(() => {
		const area = textAreaRef.current
		if (textAreaRef.current && autoHeight) {
			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 2}px`
		}
		return (() => {
			area.style.height = 'auto'
		})
	}, [value, autoHeight])

	const isBlurHappened = useRef<boolean>(false)
	const textAreaRef = useRef() as MutableRefObject<HTMLTextAreaElement>

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
				className={clsx(cls.Input, [className])}
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

