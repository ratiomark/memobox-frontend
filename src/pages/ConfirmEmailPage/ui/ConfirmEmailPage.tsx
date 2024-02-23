import { Page } from '@/widgets/Page'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Loader } from '@/shared/ui/Loader/Loader'
import confirmedImage from '@/shared/assets/images/emailConfirmed.png'
import { useConfirmEmailMutation } from '@/entities/User'
import cls from './ConfirmEmail.module.scss'
import clsx from 'clsx'
import { HStack } from '@/shared/ui/Stack'

const RectangleToSquare = ({ content }) => {
	const [isExpanded, setIsExpanded] = useState(true);
	// `container ${isExpanded ? 'expanded' : 'collapsed'}`
	return (
		<div className={clsx(cls.container, isExpanded ? '' : cls.collapsed)}>
			{content}
			<button className={cls.toggleBtn} onClick={() => setIsExpanded(!isExpanded)}>
				{isExpanded ? '↘' : '↖'}
			</button>
		</div>
	);
};

const ConfirmEmailPage = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const hash = queryParams.get('hash');
	const [confirmEmailByHash, { isLoading, data, isSuccess, isError }] = useConfirmEmailMutation()

	useEffect(() => {
		if (hash) {
			confirmEmailByHash({ hash })
		}
	}, [hash, confirmEmailByHash])
	let content = <Loader />

	if (isLoading) {
		content = <Loader />
	} else if (isError) {
		// content = <RectangleToSquare content={<p>Кажется, этот почта уже подтверждена</p>} />
		content = <RectangleToSquare content={(
			<div >
				<p>Почта подтверждена</p >
				<img width={340} src={confirmedImage} />
			</div >
		)} />
	} else {
		content = <RectangleToSquare content={(
			<div >
				<p>Почта подтверждена</p >
				<img width={340} src={confirmedImage} />
			</div >
		)} />
	}

	return (
		<Page>
			<HStack max justify='center'>
				{content}
			</HStack>
		</Page>
	);
	// const auth = useSelector(getUserAuthData)
	// if (!auth) {
	// 	return (
	// 		<Page data-testid='ConfirmEmailPage'>
	// 			<LoginScreen />
	// 		</Page>
	// 	)
	// }

	// // без StatsAndActionsCupboardWidget не будет работать CupboardShelfListWrapper из-за перерасчета ширины кнопок
	// return (
	// 	<Page data-testid='ConfirmEmailPage'>
	// 		<StatsAndActionsCupboardWidget />
	// 		<CupboardShelfListWrapper />
	// 	</Page>
	// )
}
export default ConfirmEmailPage
