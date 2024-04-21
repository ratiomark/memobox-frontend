interface TimeZoneInfo {
	name: string;
	offset: number;
}

interface CountryCodeAndName {
	countryCode: string;
	countryName: string;
}
interface CountryTimeZone extends CountryCodeAndName {
	zones: TimeZoneInfo[];
}

export interface CountryTimeZoneMap {
	[key: string]: TimeZoneInfo[];
}