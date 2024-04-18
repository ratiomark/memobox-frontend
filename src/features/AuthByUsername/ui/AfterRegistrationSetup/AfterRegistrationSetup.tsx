import { loadCountryTimeZones } from '@/shared/const/country-timezones/country-timezone-loader';
import { useState, useEffect, FC } from 'react';
import { TimeZoneSetup } from './TimeZoneSetup/TimeZoneSetup';
import { getBrowserLanguage } from '@/shared/lib/helpers/common/getBrowserLanguage';
import { Langs } from '@/shared/types/languages';
import { CountryTimeZoneMap } from '@/shared/const/country-timezones/types';
import { LanguageConfirmation } from './LanguageConfirmation/LanguageConfirmation';
import { Button } from '@/shared/ui/Button';
import { useCurrentTime } from '@/shared/lib/helpers/hooks/useCurrentTime';
import { loadCountries } from '@/shared/const/country-timezones/country-loader';
import { MyText } from '@/shared/ui/Typography';
import { HStack } from '@/shared/ui/Stack';
import { useDispatch } from 'react-redux';
import { TimeZoneConfirmation } from './TimeZoneConfirmation/TimeZoneConfirmation';
import { PostRegistrationStep, confirmCountryTimeZoneThunk, useJsonSettings, userActions } from '@/entities/User';
import { useNavigate } from 'react-router-dom';
import { updateJsonSettingsThunk } from '@/entities/User';
import { HDialog } from '@/shared/ui/HDialog';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';


export const AfterRegistrationSetup = () => {
	const dispatch = useDispatch()
	const { postRegistrationStep } = useJsonSettings()
	const [language, setLanguage] = useState<Langs>(getBrowserLanguage());
	const [country, setCountry] = useState<string | null>(null);
	const [countyList, setCountyList] = useState<string[]>([])
	const [timeZoneData, setTimeZoneData] = useState<CountryTimeZoneMap | null>(null);
	const [initialTimeZone, setInitialTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

	const navigate = useNavigate();

	useEffect(() => {
		if (postRegistrationStep === 'COMPLETED') {
			navigate('/');
		}
	}, [postRegistrationStep, navigate]);


	useEffect(() => {
		if (language) {
			loadCountryTimeZones(language).then(data => setTimeZoneData(data));
			loadCountries(language).then(data => setCountyList(data));
			fetch('https://ipapi.co/json/')
				.then(response => response.json())
				.then(data => {
					setCountry(data.country_name);
					setInitialTimeZone(data.timezone);
				})
				.catch(error => {
					console.error('Failed to fetch country info', error)
				});
		}
	}, [language]);

	const handleLanguageSelected = (lang: Langs) => {
		setLanguage(lang);
	};

	const handleConfirmationLanguage = async () => {
		dispatch(userActions.setPostRegistrationStep('TIMEZONE_CONFIRMATION'))
		dispatch(updateJsonSettingsThunk())
	};

	const handleConfirmation = async (confirm: boolean) => {
		if (confirm) {
			// If the user confirms the timezone, finalize the settings or move to the next step
			console.log('Timezone confirmed');
			dispatch(confirmCountryTimeZoneThunk({ country: country!, timezone: initialTimeZone }))
			dispatch(userActions.setPostRegistrationStep('COMPLETED'))
			dispatch(updateJsonSettingsThunk())
			// dispatch(userActions.setPostRegistrationStep('TIMEZONE_CONFIRMATION'))
			// Here, you can route to another part of your application or show a success message
		} else {
			// If the user wants to adjust the timezone manually
			dispatch(userActions.setPostRegistrationStep('TIMEZONE_SETUP'))
		}
	};

	const renderStep = () => {
		switch (postRegistrationStep) {
			case 'LANGUAGE_CONFIRMATION':
				return <LanguageConfirmation onLanguageSelected={handleLanguageSelected} onSubmit={handleConfirmationLanguage} />;
			// return <LanguageConfirmation onLanguageSelected={handleLanguageSelected} onSubmit={() => setStep('TIMEZONE_CONFIRMATION')} />;
			case 'TIMEZONE_CONFIRMATION':
				return (
					<TimeZoneConfirmation
						country={country}
						timeZone={initialTimeZone}
						onConfirm={handleConfirmation}
					/>
				);
			case 'TIMEZONE_SETUP':
				return <TimeZoneSetup countyList={countyList} timeZoneData={timeZoneData} />;
			default:
				null
		}
	};

	return (
		<HDialogHeadless
			isOpen={true}
			onClose={() => { }}
		>

			<div>
				{renderStep()}
			</div>
		</HDialogHeadless>
	);
};
