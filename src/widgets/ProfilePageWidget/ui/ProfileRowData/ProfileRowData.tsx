import { ReactNode } from 'react'
import cls from './ProfileRowData.module.scss'
import { Card } from '@/shared/ui/Card'
import { MyText } from '@/shared/ui/Typography'

interface ProfileRowDataProps {
	title: string
	content: ReactNode
	buttons: ReactNode
}

export const ProfileRowData = (props: ProfileRowDataProps) => {
	const { title, content, buttons } = props
	return (
		// <Card horizontal className={cls.profileRowData}  >

		<div className={cls.profileRowData}>
			<MyText variant='hint' className={cls.title} text={title} />
			{content}
			{buttons}
		</div>
		//</Card>
	)
}
