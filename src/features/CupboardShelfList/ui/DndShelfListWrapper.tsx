import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useDrop } from 'react-dnd'

interface CupboardShelfListProps {
	children: ReactNode
}

export const DndShelfListWrapper = (props: CupboardShelfListProps) => {
	const {
		children,
	} = props
	const [, drop] = useDrop(() => ({ accept: 'shelf' }))
	return <motion.div layout ref={drop}>{children}</motion.div>
}