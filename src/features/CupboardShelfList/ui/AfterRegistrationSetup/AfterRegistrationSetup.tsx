import { loadCountryTimeZones } from '@/shared/const/country-timezones/country-timezone-loader';
import { useState, useEffect, FC } from 'react';
import { TimeZoneSetup } from './TimeZoneSetup/TimeZoneSetup';
import { getBrowserLanguage } from '@/shared/lib/helpers/common/getBrowserLanguage';
import { Langs } from '@/shared/types/languages';
import { CountryTimeZoneMap } from '@/shared/const/country-timezones/types';
import { LanguageSelectorTest } from './SelectLanguageStep/SelectLanguageStep';
import { Button } from '@/shared/ui/Button';
import { useCurrentTime } from '@/shared/lib/helpers/hooks/useCurrentTime';
import { loadCountries } from '@/shared/const/country-timezones/country-loader';
import { MyText } from '@/shared/ui/Typography';
import { HStack } from '@/shared/ui/Stack';
import { useDispatch } from 'react-redux';
import { confirmCountryTimeZoneThunk } from '@/entities/User/model/services/confirmCountryTimeZoneThunk';

interface TimeZoneConfirmationProps {
	country: string | null;
	timeZone: string;  // Добавлено свойство для часового пояса
	onConfirm: (confirm: boolean) => void;
	// language: Langs;
}

const TimeZoneConfirmation: FC<TimeZoneConfirmationProps> = ({ country, timeZone, onConfirm, }) => {
	const { mainCurrentTime, secondCurrentTime } = useCurrentTime({ timeZone })
	if (!country) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			<h2>Confirm Your Time Zone</h2>
			<div>
				<MyText
					text={'Your country: '}
					as={'span'}
				/>
				<MyText
					fontWeight='600'
					text={country}
					as={'span'}
				/>
			</div>
			<HStack gap='gap_4' style={{ flex: 1, textAlign: 'right', }}>
				<MyText as={'span'} text={'Your current time: '} />

				<MyText fontWeight='600' as={'span'} text={mainCurrentTime} />
				<MyText as={'span'} size='s' text={`(${secondCurrentTime})`} />
			</HStack>
			{/* <p>Your current time: {mainCurrentTime} ({secondCurrentTime})</p> */}
			<Button
				variant='back'
				onClick={() => onConfirm(false)}
			>
				No, adjust
			</Button>
			<Button
				onClick={() => onConfirm(true)}
			>
				Yes, all correct
			</Button>
			{/* <p>Your current time: {currentTime}</p> */}
		</div>
	);
};


export const AfterRegistrationSetup = () => {
	const dispatch = useDispatch()
	const [step, setStep] = useState(1); // 1 - выбор языка, 2 - подтверждение часового пояса, 3 - настройка часового пояса
	const [language, setLanguage] = useState<Langs>(getBrowserLanguage());
	const [country, setCountry] = useState<string | null>(null);
	const [countyList, setCountyList] = useState<string[]>([])
	// const [currentTime, setCurrentTime] = useState('');
	const [timeZoneData, setTimeZoneData] = useState<CountryTimeZoneMap | null>(null);
	const [initialTimeZone, setInitialTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
	// const [showTimeZoneSetup, setShowTimeZoneSetup] = useState(false);

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

	const handleConfirmation = (confirm: boolean) => {
		if (confirm) {
			// If the user confirms the timezone, finalize the settings or move to the next step
			console.log('Timezone confirmed');
			dispatch(confirmCountryTimeZoneThunk({ country: country!, timezone: initialTimeZone }))
			// Here, you can route to another part of your application or show a success message
		} else {
			// If the user wants to adjust the timezone manually
			setStep(3);
		}
	};

	const renderStep = () => {
		switch (step) {
			case 1:
				return <LanguageSelectorTest onLanguageSelected={handleLanguageSelected} onSubmit={() => setStep(2)} />;
			case 2:
				return (
					<TimeZoneConfirmation
						country={country}
						timeZone={initialTimeZone}
						onConfirm={handleConfirmation}
					/>
				);
			case 3:
				return <TimeZoneSetup countyList={countyList} timeZoneData={timeZoneData} />;
			default:
				return <div>Unknown step</div>;
		}
	};

	return (
		<div>
			{renderStep()}
		</div>
	);
};
