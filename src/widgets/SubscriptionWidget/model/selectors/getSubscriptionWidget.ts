// import { StateSchema } from 'app/providers/StoreProvider';

// export const getSubscriptionWidget = (state: StateSchema) => state.subscriptionWidget
export const getComparisonRowsData = () => {
	return [
		{
			title: 'max cards in cupboard',
			subscriptionText: 'no limits',
			noSubscriptionText: 120,
		},
		{
			title: 'max training per day',
			subscriptionText: 'no limits',
			noSubscriptionText: 20,
		},
		{
			title: 'max new cards per week',
			subscriptionText: 'no limits',
			noSubscriptionText: 15,
		},
		{
			title: 'stats functionality',
			subscriptionText: 'stats extended',
			noSubscriptionText: 'regular',
		},
		{
			title: 'system speed',
			subscriptionText: 'increased speed',
			noSubscriptionText: 'regular',
		},
	]
}

export const getAdvantages = () => [
	'max cards no limits',
	'max training no limits',
	'max new cards no limits',
	'stats extended include',
	'speed increased'
]