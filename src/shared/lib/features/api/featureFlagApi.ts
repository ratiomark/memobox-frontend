import { rtkApi } from '@/shared/api/rtkApi'
import { FeatureFlags } from '@/shared/types/FeatureFlags'

interface UpdateFeatureFlagsOptions {
	userId: string
	features: Partial<FeatureFlags>
}


const featureFlagsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		// mutation потому что буду патчить изенения. Получаю юзера, аргументом SetJsonSettings
		updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOptions>({
			query: ({ userId, features }) => ({
				url: `/users/${userId}`,
				method: 'PATCH',
				body: {
					features
				}
			})
		}),
	}),
})

// позволяет получить определенный эндпоинт и использовать его. К примеру я юзаю его в thunk saveJsonSetting так:
// dispatch(setJsonSettingsMutation({ jsonSettings, userId: userData.id }))
export const updateFeatureFlagsMutation = featureFlagsApi.endpoints.updateFeatureFlags.initiate