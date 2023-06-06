import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { ListBox } from '@/shared/ui/Popup'
import { VStack } from '@/shared/ui/Stack'



const items = [
	{ value: '1', content: '1', disabled: true },
	{ value: '2', content: '2' },
	{ value: '3', content: '3' },
]

const MainPage = () => {
	const { t } = useTranslation()
	return (
		<Page data-testid='MainPage'>
			<VStack>
				<ListBox
					items={items}
					onChange={() => { }}
					defaultValue='кнопка попка'
				/>
			</VStack>
			<div>
				{t('main page')}
			</div>
		</Page>
	)
}
export default MainPage
