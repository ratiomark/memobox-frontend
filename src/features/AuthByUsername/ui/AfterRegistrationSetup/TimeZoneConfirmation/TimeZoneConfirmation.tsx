import { useCurrentTime } from '@/shared/lib/helpers/hooks/useCurrentTime';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { MyText } from '@/shared/ui/Typography';
import { FC } from 'react';

interface TimeZoneConfirmationProps {
	country: string | null;
	timeZone: string;  // Добавлено свойство для часового пояса
	onConfirm: (confirm: boolean) => void;
	// language: Langs;
}

export const TimeZoneConfirmation: FC<TimeZoneConfirmationProps> = ({ country, timeZone, onConfirm, }) => {
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
