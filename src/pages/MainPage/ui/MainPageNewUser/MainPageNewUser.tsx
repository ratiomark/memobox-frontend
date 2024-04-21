import { Page } from '@/widgets/Page'
import { StatsAndActionsCupboardWidget } from '@/widgets/StatsAndActionsCupboardWidget'
import { CupboardShelfListWrapper } from '@/features/CupboardShelfList'
import { getUserAuthData, useJsonSettings } from '@/entities/User'
import { useSelector } from 'react-redux'
import { LoginScreen } from '@/features/AuthByUsername'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { LoginPage } from '@/pages/LoginPage'
import { TEST_PAGES_IDS } from '@/shared/const/testConsts'
import cls from '../MainPage.module.scss'
import { Heading, MyText } from '@/shared/ui/Typography'
import CreateNewShelfModal from './CreateNewShelfModal/CreateNewShelfModal'
import ShelfCreatedModal from './ShelfCreatedModal/ShelfCreatedModal'
import { Button } from '@/shared/ui/Button'
import { VStack } from '@/shared/ui/Stack'

const MainPageNewUser = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isShelfCreated, setIsShelfCreated] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	return (
		<Page
			// className={cls.wrapper}
			data-testid={TEST_PAGES_IDS.mainPage}
		>
			<div className={cls.wrapper}   >
				<VStack gap='gap_20' justify='center' align='center' style={{ maxWidth: 500, margin: '0 auto' }}>

					<Heading title={'Добро пожаловать в Memobox!'} as='h1' size='s' />
					<VStack gap='gap_8' align='center'>
						<MyText align='center'
							text={'Вы находитесь на странице "шкаф"'}
						/>
						<MyText align='center'
							text={'Шкаф — это главная страница и центральное место для управления учебными материалами. Здесь вы можете создавать полки, добавлять карточки и учиться.'}
						/>
					</VStack>

					<MyText align='center'
						text={'Для начала работы вам нужно создать свою первую полку. После создания полки интерфейс шкафа изменится и вы получите доступ ко всем функциям.'}
					/>
					<MyText align='center'
						text={'Нажмите на кнопку ниже, чтобы создать полку.'}
					/>

					<Button
						disabled={isLoading}
						onClick={() => setIsOpen(true)}
					>
						Создать новую полку
					</Button>
				</VStack>
			</div>
			<CreateNewShelfModal
				isOpen={isOpen}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
				setIsOpen={setIsOpen}
				setIsShelfCreated={setIsShelfCreated}
			/>
			{/* <ShelfCreatedModal isOpen={isShelfCreated} setIsOpen={setIsShelfCreated} /> */}
		</Page>
	)
}
export default MainPageNewUser
