import { useCurrentTime } from '@/shared/lib/helpers/hooks/useCurrentTime';
import { Button } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Heading, MyText } from '@/shared/ui/Typography';
import { FC } from 'react';
import { LogoutComponent } from '../LogoutComponent/LogoutComponent';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { Card } from '@/shared/ui/Card';

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
		<VStack gap='gap_10' style={{ minWidth: 400 }}>
			<Heading title={'Правильно ли указаны данные?'} as='h1' size='s' />
			<Card max>
				<HStack max justify='between'>
					<MyText
						text={'Ваша страна:'}
					// as={'span'}
					/>
					<MyText
						fontWeight='600'
						text={country}
					// as={'span'}
					/>
				</HStack>
			</Card>
			<Card max>
				<HStack max justify='between' gap='gap_4' style={{ flex: 1, textAlign: 'right', }}>
					{/* <HStack gap='gap_4' style={{ flex: 1, textAlign: 'right', }}> */}
					<MyText as={'span'} text={'Ваше текущее время: '} />
					<HStack gap='gap_4' align='center'>
						{/* <MyText as={'span'} text={mainCurrentTime} /> */}
						<MyText fontWeight='600' as={'span'} text={mainCurrentTime} />
						<MyText as={'span'} size='s' text={`(${secondCurrentTime})`} />
					</HStack>
				</HStack>
			</Card>
			<div style={{ padding: 10 }} />
			<ModalButtons
				// justify='center'
				onClose={() => onConfirm(false)}
				onSubmit={() => onConfirm(true)}
				textCloseButton='No, adjust'
				textSubmitButton='Yes, all correct'
			/>

			<LogoutComponent />
			{/* <p>Your current time: {currentTime}</p> */}
		</VStack>
	);
};
