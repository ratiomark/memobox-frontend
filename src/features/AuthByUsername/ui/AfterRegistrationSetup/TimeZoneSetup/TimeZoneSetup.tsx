import { CountryTimeZoneMap } from '@/shared/const/country-timezones/types';
import { formatUtcOffset } from '@/shared/lib/helpers/common/formaters';
import { useCurrentTime } from '@/shared/lib/helpers/hooks/useCurrentTime';
import { ListBox } from '@/shared/ui/Popup';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useEffect, useState } from 'react';
import cls from './TimeZoneSetup.module.scss';
import { MyText } from '@/shared/ui/Typography';
import { confirmCountryTimeZoneThunk, userActions, updateJsonSettingsThunk } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button';

interface TimeZoneOptionProps {
	timeZone: string
	offset: number
}

// const TimeZoneOption = ({ timeZone, offset }: TimeZoneOptionProps) => {
// 	const { mainCurrentTime, secondCurrentTime } = useCurrentTime({ timeZone })
// 	// { zone.name } (UTC { zone.offset / 60 }) Current time: { mainCurrentTime }
// 	return (
// 		// <HStack gap='gap_12' >
// 		<div>

// 			{/* <div>{timeZone} (UTC{formatUtcOffset(offset)})</div> */}
// 			<div>{timeZone}</div>
// 			<span> (UTC{formatUtcOffset(offset)})</span>
// 			<div>Current time: {mainCurrentTime} ({secondCurrentTime})</div>
// 			{/* <div>Current time: {mainCurrentTime}</div> */ }
// 			{/* </HStack> */ }
// 		</div>
// 	)
// }

// const TimeZoneOption = ({ timeZone, offset }: TimeZoneOptionProps) => {
// 	const { mainCurrentTime, secondCurrentTime } = useCurrentTime({ timeZone })
// 	return (
// 		<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 6 }}>
// 			<div style={{ flex: 2.2, textAlign: 'left' }}>{timeZone}</div>
// 			<div style={{ flex: 1.2, textAlign: 'center' }}>{`(UTC${formatUtcOffset(offset)})`}</div>
// 			<div style={{ flex: 2, textAlign: 'right' }}>
// 				Time: {mainCurrentTime} ({secondCurrentTime})
// 			</div>
// 		</div>
// 	);
// 	// <HStack gap='gap_12' >
// 	// 	<MyText text={timeZone} />
// 	// 	<MyText text={`(UTC${formatUtcOffset(offset)})`} />
// 	// 	<HStack gap='gap_4'>
// 	// 		<MyText fontWeight='600' as={'span'} text={'Time:\t '} />
// 	// 		<MyText as={'span'} text={mainCurrentTime} />
// 	// 		<MyText as={'span'} size='s' text={`(${secondCurrentTime})`} />
// 	// 	</HStack>
// 	// </HStack>
// }
const TimeZoneOption = ({ timeZone, offset }: TimeZoneOptionProps) => {
	const { mainCurrentTime, secondCurrentTime } = useCurrentTime({ timeZone })
	// return (
	// 	<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 6, alignItems: 'center' }}>
	// 		<div style={{ flex: 2, textAlign: 'left' }}><MyText text={timeZone} /></div>
	// 		<div style={{ flex: 1, textAlign: 'center' }}><MyText text={`(UTC${formatUtcOffset(offset)})`} /></div>
	// 		<HStack gap='gap_4' style={{ flex: 1, textAlign: 'right', }}>
	// 			<MyText fontWeight='600' as={'span'} text={'Time:\t '} />
	// 			<MyText as={'span'} text={mainCurrentTime} />
	// 			<MyText as={'span'} size='s' text={`(${secondCurrentTime})`} />
	// 		</HStack>
	// 		{/* <div style={{ flex: 2, textAlign: 'right', gap: 18 }}>
	// 			<MyText fontWeight='600' as={'span'} text={'Time:\t '} />
	// 			<MyText as={'span'} text={mainCurrentTime} />
	// 			<MyText as={'span'} size='s' text={`(${secondCurrentTime})`} />
	// 		</div> */}
	// 	</div>
	// );
	return (
		<div className={cls.grid} >

			<div className={cls.timezone} >

				<MyText text={timeZone.replace('_', ' ')} />
				<MyText text={`(UTC${formatUtcOffset(offset)})`} />
			</div>
			{/* <VStack align='left'>

				<MyText text={timeZone} />
				<MyText text={`(UTC${formatUtcOffset(offset)})`} />
			</VStack> */}
			<div className={cls.time} >

				<HStack gap='gap_4' justify='end'>
					<MyText fontWeight='600' as={'span'} text={'Time:\t '} />
					<MyText as={'span'} text={mainCurrentTime} />
					<MyText as={'span'} size='s' text={`(${secondCurrentTime})`} />
				</HStack>
			</div>
		</div>
	)
	// return (
	// 	<HStack gap='gap_12' >
	// 		<MyText text={timeZone} />
	// 		<MyText text={`(UTC${formatUtcOffset(offset)})`} />
	// 		<HStack gap='gap_4'>
	// 			<MyText fontWeight='600' as={'span'} text={'Time:\t '} />
	// 			<MyText as={'span'} text={mainCurrentTime} />
	// 			<MyText as={'span'} size='s' text={`(${secondCurrentTime})`} />
	// 		</HStack>
	// 	</HStack >)
}


interface TimeZoneSetupProps {
	timeZoneData: CountryTimeZoneMap | null
	countyList: string[]
}

export const TimeZoneSetup = ({ timeZoneData, countyList }: TimeZoneSetupProps) => {
	const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
	const [selectedTimeZone, setSelectedTimeZone] = useState<string | null>(null);
	const [selectedTimeZonesByCountry, setSelectedTimeZonesByCountry] = useState<{ name: string, offset: number }[] | null>(null)
	const [currentLocalTime, setCurrentLocalTime] = useState('');
	const { mainCurrentTime, secondCurrentTime } = useCurrentTime({ timeZone: selectedTimeZone ?? 'Africa/Abidjan' })
	const [showTimeZones, setShowTimeZones] = useState(false)
	const dispatch = useAppDispatch()

	// <Dropdown
	// 	items={settingItems}
	// 	className={cls.dropdown}
	// 	trigger={
	// 		<Icon
	// 			className={cls.icon}
	// 			clickable
	// 			onClick={() => { }}
	// 			withFill={false}
	// 			Svg={SettingsButtonIcon}
	// 			data-testid={TEST_BUTTONS_IDS.shelf.shelfSettingsButton}
	// 		/>

	// 	}
	// />
	useEffect(() => {
		if (countyList.length && selectedCountry === null) {
			setSelectedCountry(countyList[0])
		}
	}, [countyList, selectedCountry])

	useEffect(() => {
		if (timeZoneData && countyList && selectedTimeZone === null && selectedCountry) {
			setSelectedTimeZonesByCountry(timeZoneData[selectedCountry])
			setShowTimeZones(timeZoneData[selectedCountry].length > 1)
			setSelectedTimeZone(timeZoneData[selectedCountry][0].name)
		}
	}, [timeZoneData, countyList, selectedTimeZone, selectedCountry])

	// useEffect(() => {
	// 	if (selectedTimeZone) {
	// 		setCurrentLocalTime(new Date().toLocaleTimeString('en', { timeZone: selectedTimeZone }));
	// 	}
	// }, [selectedTimeZone]);

	if (!timeZoneData || !countyList || !selectedCountry || !selectedTimeZone) {
		return <div>Loading...</div>
	}

	const onChangeCountry = (country: string) => {
		setSelectedCountry(country)
		const zones = timeZoneData[country];
		setSelectedTimeZonesByCountry(zones)
		setSelectedTimeZone(zones[0].name);
		if (zones.length === 1) {
			setShowTimeZones(false)
			return
		}
		setShowTimeZones(true)
	}
	const countryItems = countyList.map((country) => ({ value: country, content: country }))
	const countriesListBox = (
		<ListBox
			label='Выберете вашу страну:'
			items={countryItems}
			value={selectedCountry}
			onChange={onChangeCountry}
			max
			sameWidth
		/>)

	const timeZoneItems = selectedTimeZonesByCountry?.map((zone) => ({ value: zone.name, content: <TimeZoneOption timeZone={zone.name} offset={zone.offset} /> }))

	const timeZoneListBox = (
		<ListBox
			label='Выберете ваш часовой пояс:'
			items={timeZoneItems}
			value={selectedTimeZone}
			onChange={setSelectedTimeZone}
			sameWidth
			max
		/>)
	// sameWidth

	const handleConfirmation = async () => {
		dispatch(confirmCountryTimeZoneThunk({ country: selectedCountry, timezone: selectedTimeZone }))
		dispatch(userActions.setPostRegistrationStep('COMPLETED'))
		dispatch(updateJsonSettingsThunk())
	};

	return (
		<VStack max align='left' gap='gap_12'>

			<div className={cls.listBoxWrapper} >
			</div>
			{countriesListBox}

			<div className={cls.listBoxWrapper} >
			</div>
			{showTimeZones && timeZoneListBox}

			<HStack gap='gap_4' style={{ flex: 1, textAlign: 'right', }}>
				<MyText as={'span'} text={'Your current time: '} />
				<MyText fontWeight='600' as={'span'} text={mainCurrentTime} />
				<MyText as={'span'} size='s' text={`(${secondCurrentTime})`} />
			</HStack>
			<Button
				onClick={handleConfirmation}
				variant='filled'
			>
				Далее
			</Button>
		</VStack>
	);
};

