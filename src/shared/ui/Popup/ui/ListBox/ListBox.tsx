import clsx from 'clsx';
import { Listbox as HListbox } from '@headlessui/react'
import React, { ElementType, Fragment, MutableRefObject, ReactNode, useEffect, useMemo, useRef, useState, } from 'react';
import { AbsoluteListDirection } from '@/shared/types/ui';
import { VStack, HStack } from '../../../Stack';
import { FlexAlign, FlexGap } from '../../../Stack/Flex/Flex';
import { Button } from '../../../Button/Button';
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg'
import { Icon } from '../../../Icon/Icon';
import cls from './ListBox.module.scss';
import CheckIcon from '@/shared/assets/icons/checkIcon.svg'

export interface ListBoxItems<T extends number | string> {
	value: string | T | number
	content: ReactNode
	disabled?: boolean
}

interface ListBoxProps<T extends number | string> {
	className?: string
	as?: ElementType<any>
	items?: ListBoxItems<string | T>[]
	value?: T
	defaultValue?: string | T
	onChange: (value: T) => void
	readonly?: boolean
	listDirection?: AbsoluteListDirection
	label?: string
	labelPosition?: 'top' | 'left'
	listBoxPosition?: FlexAlign
	labelPadding?: FlexGap
	sameWidth?: boolean
	max?: boolean,

	// ref?: MutableRefObject<HTMLElement | null>
}

export const ListBox = <T extends number | string>(props: ListBoxProps<T>) => {
	const {
		items = [],
		as = 'div',
		className,
		value,
		defaultValue = 'Заглушка',
		listDirection = 'bottom_right',
		onChange,
		readonly,
		label,
		labelPosition = 'top',
		listBoxPosition = 'left',
		labelPadding = 'gap_4',
		sameWidth = false,
		max = false,

	} = props

	const listBoxOptionsRef = useRef() as MutableRefObject<HTMLDivElement>
	const listBoxRef = useRef() as MutableRefObject<HTMLDivElement>
	const Stack = labelPosition === 'top' ? VStack : HStack
	const [isOnlyOneItemInList, setIsOnlyOneItemInList] = useState<boolean>()

	const selectedItemLocalized = useMemo(() => {
		// if (useIndexInsteadId) return items?.find(item => item.value === value)
		return items?.find(item => item.value === value)
	}, [items, value,])
	// }, [items, value, useIndexInsteadId])

	useEffect(() => {
		if (items && items.length === 1) setIsOnlyOneItemInList(true)
	}, [items])

	useEffect(() => {
		if (sameWidth) {
			const maxWidth = Math.max(listBoxOptionsRef.current.offsetWidth + 3, listBoxRef.current.offsetWidth + 3)
			listBoxOptionsRef.current.style.width = `${maxWidth}px`
			listBoxRef.current.style.width = `${maxWidth}px`
		}
	}, [sameWidth])

	return (
		<Stack
			className={className}
			gap={labelPadding}
			align={listBoxPosition}
			max={max}
		>

			{label && <span className={clsx(cls.label, { [cls.textDisabled]: readonly })}>
				{label}
			</span>}
			<HListbox
				className={cls.ListBox}
				value={value}
				onChange={onChange}
				disabled={readonly}
				as={as}
			>
				{({ open }) => (
					<>
						<HListbox.Button as={'div'} aria-disabled={readonly} className={cls.trigger}>
							<div
								tabIndex={0}
								className={clsx(
									cls.listBoxItemWrapper,
									(isOnlyOneItemInList || readonly)
										? ''
										: cls.pointer,
								)}
								ref={listBoxRef}
							>
								{selectedItemLocalized?.content ?? defaultValue}
								{isOnlyOneItemInList
									? <div className={cls.iconSubstitute} />
									: (
										<Icon
											className={clsx(
												cls.arrow,
												open ? cls.rotateArrow : '')}
											// color='main'
											type={readonly ? 'hint' : 'main'}
											Svg={ArrowBottomIcon}
										/>)
								}
							</div>
						</HListbox.Button>
						{!isOnlyOneItemInList &&
							(<div
								className={clsx(cls.ListBoxListOptionsWrapper, { [cls.hideOptions]: !open },)}
								ref={listBoxOptionsRef}
							>

								<HListbox.Options
									static={true}
									className={clsx(
										cls.ListBoxListOptions,
										{ [cls.hideOptions]: !open },
										listDirection)
									}

								>
									{
										items?.map(item => (
											<HListbox.Option
												key={item.value}
												value={item.value}
												disabled={item.disabled}
												as={Fragment}
											>
												{({ active, selected }) => (
													<li
														className={clsx(
															cls.ListBoxOption,
															{ [cls.ListBoxOption_active]: active },
															{ [cls.ListBoxOption_disabled]: item.disabled },
															{ [cls.ListBoxOption_selected]: selected },
														)}
													>
														{/* {selected} */}
														{item.content}
														{selected ?
															<Icon
																className={clsx(
																	cls.iconCheck)}
																type='main'

																Svg={CheckIcon}
															/>
															: <div className={cls.iconCheckSubstitute} />
														}
													</li>
												)}
											</HListbox.Option>
										))
									}
								</HListbox.Options>
							</div>)
						}
					</>
				)}
			</HListbox>
		</Stack>
	)
}

// export const ListBoxRef = React.forwardRef(ListBox) as <T extends number | string>(
// 	props: ListBoxProps<T> & { ref?: React.ForwardedRef<HTMLElement | null> }
// ) => ReturnType<typeof ListBox>;