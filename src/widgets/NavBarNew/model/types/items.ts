import { TEST_NAVIGATION_IDS } from '@/shared/const/testConsts'

export interface HeaderItemType {
	path: string
	text: string
	onClickItem?: () => void
	Icon: React.VFC<React.SVGProps<SVGSVGElement>>
	'data-testid'?: keyof typeof TEST_NAVIGATION_IDS
}