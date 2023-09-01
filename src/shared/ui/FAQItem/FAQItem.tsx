import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './FAQItem.module.scss';

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { MyText } from '../Typography';
import { HStack } from '../Stack';
import { Icon } from '../Icon';
// import { defaultFAQs } from './defaultValues'
// import { More, Less } from './svgs'
interface FAQItemProps {
	question: ReactNode | string
	answer: ReactNode | string
}

export const FAQItem = (props: FAQItemProps) => {
	const {
		question,
		answer,
	} = props

	const [isOpen, setIsOpen] = useState(false);
	const questionNode = typeof question === 'string'
		? <MyText text={question} />
		: question

	const answerNode = typeof answer === 'string'
		? <MyText text={answer} />
		: answer


	return (
		<div
			// className={}
			className={cls.FAQItem}
			onClick={() => setIsOpen(prev => !prev)}
		>
			<HStack justify='between' max align='center'>
				{questionNode}
				<Icon
					className={
						clsx(cls.arrow, isOpen ? cls.rotateArrow : '')}
					type={isOpen ? 'main' : 'hint'}
					Svg={ArrowBottomIcon}

				/>

			</HStack>
			<AnimatePresence mode="wait">
				{isOpen && (
					<motion.div initial={{ height: 0, opacity: 0, }}
						animate={{
							height: 'auto', opacity: 1, transition: {
								height: {
									duration: 0.4,
								}, opacity: { duration: 0.25, delay: 0.15, },
							},
						}}
						exit={{
							height: 0, opacity: 0, transition: {
								height: { duration: 0.4, }, opacity: { duration: 0.25, },
							},
						}}
						key="test"
					>
						<div className={cls.answerWrapper} >
							{answerNode}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

// export default function FAQComponent() {
// 	return (
// 		<div className="flex flex-col w-full p-5 justify-center items-center space-y-7">
// 			{defaultFAQs.map((c, i) => (
// 				<FAQItem key={i} {...c} />
// 			))}
// 		</div>
// 	);
// }

// export const FAQItem = (props: FAQItemProps) => {
// 	const {
// 		className
// 	} = props

// 	const { t } = useTranslation()

// 	return (
// 		<div className={clsx(
// 			cls.FAQItem,
// 			className)}
// 		>

// 		</div>
// 	)
// }