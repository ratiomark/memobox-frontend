import { useState, useEffect } from 'react';

interface useCurrentTimeProps {
	timeZone: string;
}

export const useCurrentTime = ({ timeZone }: useCurrentTimeProps) => {
	const [mainCurrentTime, setMainCurrentTime] = useState('');
	const [secondCurrentTime, setSecondCurrentTime] = useState('');
	useEffect(() => {
		console.log('0---------------')
		console.log('timezone', timeZone)
		console.log('0---------------')
		const userLocale = navigator.language
		const uses24HourFormat = !userLocale.startsWith('en');

		// Форматировщики времени для двух разных форматов
		const formatter24Hour = new Intl.DateTimeFormat(userLocale, {
			hour: 'numeric',
			minute: 'numeric',
			hour12: false,
			timeZone: timeZone ?? 'Africa/Abidjan' 
		});

		const formatter12Hour = new Intl.DateTimeFormat(userLocale, {
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
			timeZone: timeZone ?? 'Africa/Abidjan' 
		});

		const updateTime = () => {
			const now = new Date();
			const time24 = formatter24Hour.format(now);
			const time12 = formatter12Hour.format(now);

			if (uses24HourFormat) {
				setMainCurrentTime(time24);
				setSecondCurrentTime(time12);
			} else {
				setMainCurrentTime(time12);
				setSecondCurrentTime(time24);
			}
		};

		updateTime();
		const intervalId = setInterval(updateTime, 10000); // Обновляем время каждые 10 секунд

		return () => clearInterval(intervalId);
	}, [timeZone]);  // Зависимость от timeZone, чтобы перезапустить интервал при его изменении
	return { mainCurrentTime, secondCurrentTime }
}