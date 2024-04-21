


// interface TimeZoneInfo {
// 	name: string;
// 	offset: number;
// }

// interface CountryCodeAndName {
// 	countryCode: string;
// 	countryName: string;
// }
// interface CountryTimeZone extends CountryCodeAndName {
// 	zones: TimeZoneInfo[];
// }

// interface CountryTimeZoneMap {
// 	[key: string]: TimeZoneInfo[];
// }

// const countryTimeZoneMapRu: CountryTimeZoneMap = {
// 	'Австралия': [
// 		{
// 			'name': 'Antarctica/Macquarie',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Australia/Adelaide',
// 			'offset': -570
// 		},
// 		{
// 			'name': 'Australia/Brisbane',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Australia/Broken_Hill',
// 			'offset': -570
// 		},
// 		{
// 			'name': 'Australia/Darwin',
// 			'offset': -570
// 		},
// 		{
// 			'name': 'Australia/Eucla',
// 			'offset': -525
// 		},
// 		{
// 			'name': 'Australia/Hobart',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Australia/Lindeman',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Australia/Lord_Howe',
// 			'offset': -630
// 		},
// 		{
// 			'name': 'Australia/Melbourne',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Australia/Perth',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Australia/Sydney',
// 			'offset': -600
// 		}
// 	],
// 	'Австрия': [
// 		{
// 			'name': 'Europe/Vienna',
// 			'offset': -120
// 		}
// 	],
// 	'Азербайджан': [
// 		{
// 			'name': 'Asia/Baku',
// 			'offset': -240
// 		}
// 	],
// 	'Аландские о-ва': [
// 		{
// 			'name': 'Europe/Helsinki',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Europe/Mariehamn',
// 			'offset': -180
// 		}
// 	],
// 	'Албания': [
// 		{
// 			'name': 'Europe/Tirane',
// 			'offset': -120
// 		}
// 	],
// 	'Алжир': [
// 		{
// 			'name': 'Africa/Algiers',
// 			'offset': -60
// 		}
// 	],
// 	'Американское Самоа': [
// 		{
// 			'name': 'Pacific/Pago_Pago',
// 			'offset': 660
// 		}
// 	],
// 	'Ангилья': [
// 		{
// 			'name': 'America/Anguilla',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Ангола': [
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Luanda',
// 			'offset': -60
// 		}
// 	],
// 	'Андорра': [
// 		{
// 			'name': 'Europe/Andorra',
// 			'offset': -120
// 		}
// 	],
// 	'Антарктида': [
// 		{
// 			'name': 'Antarctica/Casey',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Antarctica/Davis',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Antarctica/DumontDUrville',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Antarctica/Mawson',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Antarctica/McMurdo',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Antarctica/Palmer',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'Antarctica/Rothera',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'Antarctica/Syowa',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Antarctica/Troll',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Antarctica/Vostok',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Asia/Riyadh',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Pacific/Auckland',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Pacific/Port_Moresby',
// 			'offset': -600
// 		}
// 	],
// 	'Антигуа и Барбуда': [
// 		{
// 			'name': 'America/Antigua',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Аргентина': [
// 		{
// 			'name': 'America/Argentina/Buenos_Aires',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/Catamarca',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/Cordoba',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/Jujuy',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/La_Rioja',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/Mendoza',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/Rio_Gallegos',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/Salta',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/San_Juan',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/San_Luis',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/Tucuman',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/Ushuaia',
// 			'offset': 180
// 		}
// 	],
// 	'Армения': [
// 		{
// 			'name': 'Asia/Yerevan',
// 			'offset': -240
// 		}
// 	],
// 	'Аруба': [
// 		{
// 			'name': 'America/Aruba',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Афганистан': [
// 		{
// 			'name': 'Asia/Kabul',
// 			'offset': -270
// 		}
// 	],
// 	'Багамы': [
// 		{
// 			'name': 'America/Nassau',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Toronto',
// 			'offset': 240
// 		}
// 	],
// 	'Бангладеш': [
// 		{
// 			'name': 'Asia/Dhaka',
// 			'offset': -360
// 		}
// 	],
// 	'Барбадос': [
// 		{
// 			'name': 'America/Barbados',
// 			'offset': 240
// 		}
// 	],
// 	'Бахрейн': [
// 		{
// 			'name': 'Asia/Bahrain',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Asia/Qatar',
// 			'offset': -180
// 		}
// 	],
// 	'Беларусь': [
// 		{
// 			'name': 'Europe/Minsk',
// 			'offset': -180
// 		}
// 	],
// 	'Белиз': [
// 		{
// 			'name': 'America/Belize',
// 			'offset': 360
// 		}
// 	],
// 	'Бельгия': [
// 		{
// 			'name': 'Europe/Brussels',
// 			'offset': -120
// 		}
// 	],
// 	'Бенин': [
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Porto-Novo',
// 			'offset': -60
// 		}
// 	],
// 	'Бермудские о-ва': [
// 		{
// 			'name': 'Atlantic/Bermuda',
// 			'offset': 180
// 		}
// 	],
// 	'Болгария': [
// 		{
// 			'name': 'Europe/Sofia',
// 			'offset': -180
// 		}
// 	],
// 	'Боливия': [
// 		{
// 			'name': 'America/La_Paz',
// 			'offset': 240
// 		}
// 	],
// 	'Бонэйр, Синт-Эстатиус и Саба': [
// 		{
// 			'name': 'America/Kralendijk',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Босния и Герцеговина': [
// 		{
// 			'name': 'Europe/Belgrade',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Sarajevo',
// 			'offset': -120
// 		}
// 	],
// 	'Ботсвана': [
// 		{
// 			'name': 'Africa/Gaborone',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Maputo',
// 			'offset': -120
// 		}
// 	],
// 	'Бразилия': [
// 		{
// 			'name': 'America/Araguaina',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Bahia',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Belem',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Boa_Vista',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Campo_Grande',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Cuiaba',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Eirunepe',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Fortaleza',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Maceio',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Manaus',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Noronha',
// 			'offset': 120
// 		},
// 		{
// 			'name': 'America/Porto_Velho',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Recife',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Rio_Branco',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Santarem',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Sao_Paulo',
// 			'offset': 180
// 		}
// 	],
// 	'Британская территория в Индийском океане': [
// 		{
// 			'name': 'Indian/Chagos',
// 			'offset': -360
// 		}
// 	],
// 	'Бруней': [
// 		{
// 			'name': 'Asia/Brunei',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Asia/Kuching',
// 			'offset': -480
// 		}
// 	],
// 	'Буркина-Фасо': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Ouagadougou',
// 			'offset': 0
// 		}
// 	],
// 	'Бурунди': [
// 		{
// 			'name': 'Africa/Bujumbura',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Maputo',
// 			'offset': -120
// 		}
// 	],
// 	'Бутан': [
// 		{
// 			'name': 'Asia/Thimphu',
// 			'offset': -360
// 		}
// 	],
// 	'Вануату': [
// 		{
// 			'name': 'Pacific/Efate',
// 			'offset': -660
// 		}
// 	],
// 	'Ватикан': [
// 		{
// 			'name': 'Europe/Rome',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Vatican',
// 			'offset': -120
// 		}
// 	],
// 	'Великобритания': [
// 		{
// 			'name': 'Europe/London',
// 			'offset': -60
// 		}
// 	],
// 	'Венгрия': [
// 		{
// 			'name': 'Europe/Budapest',
// 			'offset': -120
// 		}
// 	],
// 	'Венесуэла': [
// 		{
// 			'name': 'America/Caracas',
// 			'offset': 240
// 		}
// 	],
// 	'Виргинские о-ва (Великобритания)': [
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Tortola',
// 			'offset': 240
// 		}
// 	],
// 	'Виргинские о-ва (США)': [
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/St_Thomas',
// 			'offset': 240
// 		}
// 	],
// 	'Внешние малые о-ва (США)': [
// 		{
// 			'name': 'Pacific/Midway',
// 			'offset': 660
// 		},
// 		{
// 			'name': 'Pacific/Pago_Pago',
// 			'offset': 660
// 		},
// 		{
// 			'name': 'Pacific/Tarawa',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Pacific/Wake',
// 			'offset': -720
// 		}
// 	],
// 	'Восточный Тимор': [
// 		{
// 			'name': 'Asia/Dili',
// 			'offset': -540
// 		}
// 	],
// 	'Вьетнам': [
// 		{
// 			'name': 'Asia/Bangkok',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Ho_Chi_Minh',
// 			'offset': -420
// 		}
// 	],
// 	'Габон': [
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Libreville',
// 			'offset': -60
// 		}
// 	],
// 	'Гаити': [
// 		{
// 			'name': 'America/Port-au-Prince',
// 			'offset': 240
// 		}
// 	],
// 	'Гайана': [
// 		{
// 			'name': 'America/Guyana',
// 			'offset': 240
// 		}
// 	],
// 	'Гамбия': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Banjul',
// 			'offset': 0
// 		}
// 	],
// 	'Гана': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Accra',
// 			'offset': 0
// 		}
// 	],
// 	'Гваделупа': [
// 		{
// 			'name': 'America/Guadeloupe',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Гватемала': [
// 		{
// 			'name': 'America/Guatemala',
// 			'offset': 360
// 		}
// 	],
// 	'Гвинея': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Conakry',
// 			'offset': 0
// 		}
// 	],
// 	'Гвинея-Бисау': [
// 		{
// 			'name': 'Africa/Bissau',
// 			'offset': 0
// 		}
// 	],
// 	'Германия': [
// 		{
// 			'name': 'Europe/Berlin',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Busingen',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Zurich',
// 			'offset': -120
// 		}
// 	],
// 	'Гернси': [
// 		{
// 			'name': 'Europe/Guernsey',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Europe/London',
// 			'offset': -60
// 		}
// 	],
// 	'Гибралтар': [
// 		{
// 			'name': 'Europe/Gibraltar',
// 			'offset': -120
// 		}
// 	],
// 	'Гондурас': [
// 		{
// 			'name': 'America/Tegucigalpa',
// 			'offset': 360
// 		}
// 	],
// 	'Гонконг': [
// 		{
// 			'name': 'Asia/Hong_Kong',
// 			'offset': -480
// 		}
// 	],
// 	'Гренада': [
// 		{
// 			'name': 'America/Grenada',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Гренландия': [
// 		{
// 			'name': 'America/Danmarkshavn',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'America/Nuuk',
// 			'offset': 60
// 		},
// 		{
// 			'name': 'America/Scoresbysund',
// 			'offset': 60
// 		},
// 		{
// 			'name': 'America/Thule',
// 			'offset': 180
// 		}
// 	],
// 	'Греция': [
// 		{
// 			'name': 'Europe/Athens',
// 			'offset': -180
// 		}
// 	],
// 	'Грузия': [
// 		{
// 			'name': 'Asia/Tbilisi',
// 			'offset': -240
// 		}
// 	],
// 	'Гуам': [
// 		{
// 			'name': 'Pacific/Guam',
// 			'offset': -600
// 		}
// 	],
// 	'Дания': [
// 		{
// 			'name': 'Europe/Berlin',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Copenhagen',
// 			'offset': -120
// 		}
// 	],
// 	'Джерси': [
// 		{
// 			'name': 'Europe/Jersey',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Europe/London',
// 			'offset': -60
// 		}
// 	],
// 	'Джибути': [
// 		{
// 			'name': 'Africa/Djibouti',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		}
// 	],
// 	'Доминика': [
// 		{
// 			'name': 'America/Dominica',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Доминиканская Республика': [
// 		{
// 			'name': 'America/Santo_Domingo',
// 			'offset': 240
// 		}
// 	],
// 	'Египет': [
// 		{
// 			'name': 'Africa/Cairo',
// 			'offset': -120
// 		}
// 	],
// 	'Замбия': [
// 		{
// 			'name': 'Africa/Lusaka',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Maputo',
// 			'offset': -120
// 		}
// 	],
// 	'Западная Сахара': [
// 		{
// 			'name': 'Africa/El_Aaiun',
// 			'offset': -60
// 		}
// 	],
// 	'Зимбабве': [
// 		{
// 			'name': 'Africa/Harare',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Maputo',
// 			'offset': -120
// 		}
// 	],
// 	'Израиль': [
// 		{
// 			'name': 'Asia/Jerusalem',
// 			'offset': -180
// 		}
// 	],
// 	'Индия': [
// 		{
// 			'name': 'Asia/Kolkata',
// 			'offset': -330
// 		}
// 	],
// 	'Индонезия': [
// 		{
// 			'name': 'Asia/Jakarta',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Jayapura',
// 			'offset': -540
// 		},
// 		{
// 			'name': 'Asia/Makassar',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Asia/Pontianak',
// 			'offset': -420
// 		}
// 	],
// 	'Иордания': [
// 		{
// 			'name': 'Asia/Amman',
// 			'offset': -180
// 		}
// 	],
// 	'Ирак': [
// 		{
// 			'name': 'Asia/Baghdad',
// 			'offset': -180
// 		}
// 	],
// 	'Иран': [
// 		{
// 			'name': 'Asia/Tehran',
// 			'offset': -210
// 		}
// 	],
// 	'Ирландия': [
// 		{
// 			'name': 'Europe/Dublin',
// 			'offset': -60
// 		}
// 	],
// 	'Исландия': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Atlantic/Reykjavik',
// 			'offset': 0
// 		}
// 	],
// 	'Испания': [
// 		{
// 			'name': 'Africa/Ceuta',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Atlantic/Canary',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Europe/Madrid',
// 			'offset': -120
// 		}
// 	],
// 	'Италия': [
// 		{
// 			'name': 'Europe/Rome',
// 			'offset': -120
// 		}
// 	],
// 	'Йемен': [
// 		{
// 			'name': 'Asia/Aden',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Asia/Riyadh',
// 			'offset': -180
// 		}
// 	],
// 	'Кабо-Верде': [
// 		{
// 			'name': 'Atlantic/Cape_Verde',
// 			'offset': 60
// 		}
// 	],
// 	'Казахстан': [
// 		{
// 			'name': 'Asia/Almaty',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Asia/Aqtau',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Asia/Aqtobe',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Asia/Atyrau',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Asia/Oral',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Asia/Qostanay',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Asia/Qyzylorda',
// 			'offset': -300
// 		}
// 	],
// 	'Камбоджа': [
// 		{
// 			'name': 'Asia/Bangkok',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Phnom_Penh',
// 			'offset': -420
// 		}
// 	],
// 	'Камерун': [
// 		{
// 			'name': 'Africa/Douala',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		}
// 	],
// 	'Канада': [
// 		{
// 			'name': 'America/Atikokan',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Blanc-Sablon',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Cambridge_Bay',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Creston',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Dawson',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Dawson_Creek',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Edmonton',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Fort_Nelson',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Glace_Bay',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Goose_Bay',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Halifax',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Inuvik',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Iqaluit',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Moncton',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Panama',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Phoenix',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Rankin_Inlet',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Regina',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Resolute',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/St_Johns',
// 			'offset': 150
// 		},
// 		{
// 			'name': 'America/Swift_Current',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Toronto',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Vancouver',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Whitehorse',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Winnipeg',
// 			'offset': 300
// 		}
// 	],
// 	'Катар': [
// 		{
// 			'name': 'Asia/Qatar',
// 			'offset': -180
// 		}
// 	],
// 	'Кения': [
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		}
// 	],
// 	'Кипр': [
// 		{
// 			'name': 'Asia/Famagusta',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Asia/Nicosia',
// 			'offset': -180
// 		}
// 	],
// 	'Киргизия': [
// 		{
// 			'name': 'Asia/Bishkek',
// 			'offset': -360
// 		}
// 	],
// 	'Кирибати': [
// 		{
// 			'name': 'Pacific/Kanton',
// 			'offset': -780
// 		},
// 		{
// 			'name': 'Pacific/Kiritimati',
// 			'offset': -840
// 		},
// 		{
// 			'name': 'Pacific/Tarawa',
// 			'offset': -720
// 		}
// 	],
// 	'Китай': [
// 		{
// 			'name': 'Asia/Shanghai',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Asia/Urumqi',
// 			'offset': -360
// 		}
// 	],
// 	'КНДР': [
// 		{
// 			'name': 'Asia/Pyongyang',
// 			'offset': -540
// 		}
// 	],
// 	'Кокосовые о-ва': [
// 		{
// 			'name': 'Asia/Yangon',
// 			'offset': -390
// 		},
// 		{
// 			'name': 'Indian/Cocos',
// 			'offset': -390
// 		}
// 	],
// 	'Колумбия': [
// 		{
// 			'name': 'America/Bogota',
// 			'offset': 300
// 		}
// 	],
// 	'Коморы': [
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Indian/Comoro',
// 			'offset': -180
// 		}
// 	],
// 	'Конго - Браззавиль': [
// 		{
// 			'name': 'Africa/Brazzaville',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		}
// 	],
// 	'Конго - Киншаса': [
// 		{
// 			'name': 'Africa/Kinshasa',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Lubumbashi',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Maputo',
// 			'offset': -120
// 		}
// 	],
// 	'Коста-Рика': [
// 		{
// 			'name': 'America/Costa_Rica',
// 			'offset': 360
// 		}
// 	],
// 	'Кот-д’Ивуар': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		}
// 	],
// 	'Куба': [
// 		{
// 			'name': 'America/Havana',
// 			'offset': 240
// 		}
// 	],
// 	'Кувейт': [
// 		{
// 			'name': 'Asia/Kuwait',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Asia/Riyadh',
// 			'offset': -180
// 		}
// 	],
// 	'Кюрасао': [
// 		{
// 			'name': 'America/Curacao',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Лаос': [
// 		{
// 			'name': 'Asia/Bangkok',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Vientiane',
// 			'offset': -420
// 		}
// 	],
// 	'Латвия': [
// 		{
// 			'name': 'Europe/Riga',
// 			'offset': -180
// 		}
// 	],
// 	'Лесото': [
// 		{
// 			'name': 'Africa/Johannesburg',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Maseru',
// 			'offset': -120
// 		}
// 	],
// 	'Либерия': [
// 		{
// 			'name': 'Africa/Monrovia',
// 			'offset': 0
// 		}
// 	],
// 	'Ливан': [
// 		{
// 			'name': 'Asia/Beirut',
// 			'offset': -180
// 		}
// 	],
// 	'Ливия': [
// 		{
// 			'name': 'Africa/Tripoli',
// 			'offset': -120
// 		}
// 	],
// 	'Литва': [
// 		{
// 			'name': 'Europe/Vilnius',
// 			'offset': -180
// 		}
// 	],
// 	'Лихтенштейн': [
// 		{
// 			'name': 'Europe/Vaduz',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Zurich',
// 			'offset': -120
// 		}
// 	],
// 	'Люксембург': [
// 		{
// 			'name': 'Europe/Brussels',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Luxembourg',
// 			'offset': -120
// 		}
// 	],
// 	'Маврикий': [
// 		{
// 			'name': 'Indian/Mauritius',
// 			'offset': -240
// 		}
// 	],
// 	'Мавритания': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Nouakchott',
// 			'offset': 0
// 		}
// 	],
// 	'Мадагаскар': [
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Indian/Antananarivo',
// 			'offset': -180
// 		}
// 	],
// 	'Майотта': [
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Indian/Mayotte',
// 			'offset': -180
// 		}
// 	],
// 	'Макао': [
// 		{
// 			'name': 'Asia/Macau',
// 			'offset': -480
// 		}
// 	],
// 	'Малави': [
// 		{
// 			'name': 'Africa/Blantyre',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Maputo',
// 			'offset': -120
// 		}
// 	],
// 	'Малайзия': [
// 		{
// 			'name': 'Asia/Kuala_Lumpur',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Asia/Kuching',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Asia/Singapore',
// 			'offset': -480
// 		}
// 	],
// 	'Мали': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Bamako',
// 			'offset': 0
// 		}
// 	],
// 	'Мальдивы': [
// 		{
// 			'name': 'Indian/Maldives',
// 			'offset': -300
// 		}
// 	],
// 	'Мальта': [
// 		{
// 			'name': 'Europe/Malta',
// 			'offset': -120
// 		}
// 	],
// 	'Марокко': [
// 		{
// 			'name': 'Africa/Casablanca',
// 			'offset': -60
// 		}
// 	],
// 	'Мартиника': [
// 		{
// 			'name': 'America/Martinique',
// 			'offset': 240
// 		}
// 	],
// 	'Маршалловы о-ва': [
// 		{
// 			'name': 'Pacific/Kwajalein',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Pacific/Majuro',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Pacific/Tarawa',
// 			'offset': -720
// 		}
// 	],
// 	'Мексика': [
// 		{
// 			'name': 'America/Bahia_Banderas',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Cancun',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Chihuahua',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Ciudad_Juarez',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Hermosillo',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Matamoros',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Mazatlan',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Merida',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Mexico_City',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Monterrey',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Ojinaga',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Tijuana',
// 			'offset': 420
// 		}
// 	],
// 	'Мозамбик': [
// 		{
// 			'name': 'Africa/Maputo',
// 			'offset': -120
// 		}
// 	],
// 	'Молдова': [
// 		{
// 			'name': 'Europe/Chisinau',
// 			'offset': -180
// 		}
// 	],
// 	'Монако': [
// 		{
// 			'name': 'Europe/Monaco',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Paris',
// 			'offset': -120
// 		}
// 	],
// 	'Монголия': [
// 		{
// 			'name': 'Asia/Choibalsan',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Asia/Hovd',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Ulaanbaatar',
// 			'offset': -480
// 		}
// 	],
// 	'Монтсеррат': [
// 		{
// 			'name': 'America/Montserrat',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Мьянма (Бирма)': [
// 		{
// 			'name': 'Asia/Yangon',
// 			'offset': -390
// 		}
// 	],
// 	'Намибия': [
// 		{
// 			'name': 'Africa/Windhoek',
// 			'offset': -120
// 		}
// 	],
// 	'Науру': [
// 		{
// 			'name': 'Pacific/Nauru',
// 			'offset': -720
// 		}
// 	],
// 	'Непал': [
// 		{
// 			'name': 'Asia/Kathmandu',
// 			'offset': -345
// 		}
// 	],
// 	'Нигер': [
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Niamey',
// 			'offset': -60
// 		}
// 	],
// 	'Нигерия': [
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		}
// 	],
// 	'Нидерланды': [
// 		{
// 			'name': 'Europe/Amsterdam',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Brussels',
// 			'offset': -120
// 		}
// 	],
// 	'Никарагуа': [
// 		{
// 			'name': 'America/Managua',
// 			'offset': 360
// 		}
// 	],
// 	'Ниуэ': [
// 		{
// 			'name': 'Pacific/Niue',
// 			'offset': 660
// 		}
// 	],
// 	'Новая Зеландия': [
// 		{
// 			'name': 'Pacific/Auckland',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Pacific/Chatham',
// 			'offset': -765
// 		}
// 	],
// 	'Новая Каледония': [
// 		{
// 			'name': 'Pacific/Noumea',
// 			'offset': -660
// 		}
// 	],
// 	'Норвегия': [
// 		{
// 			'name': 'Europe/Berlin',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Oslo',
// 			'offset': -120
// 		}
// 	],
// 	'о-в Мэн': [
// 		{
// 			'name': 'Europe/Isle_of_Man',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Europe/London',
// 			'offset': -60
// 		}
// 	],
// 	'о-в Норфолк': [
// 		{
// 			'name': 'Pacific/Norfolk',
// 			'offset': -660
// 		}
// 	],
// 	'о-в Рождества': [
// 		{
// 			'name': 'Asia/Bangkok',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Indian/Christmas',
// 			'offset': -420
// 		}
// 	],
// 	'о-в Св. Елены': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Atlantic/St_Helena',
// 			'offset': 0
// 		}
// 	],
// 	'о-ва Кайман': [
// 		{
// 			'name': 'America/Cayman',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Panama',
// 			'offset': 300
// 		}
// 	],
// 	'о-ва Кука': [
// 		{
// 			'name': 'Pacific/Rarotonga',
// 			'offset': 600
// 		}
// 	],
// 	'о-ва Питкэрн': [
// 		{
// 			'name': 'Pacific/Pitcairn',
// 			'offset': 480
// 		}
// 	],
// 	'ОАЭ': [
// 		{
// 			'name': 'Asia/Dubai',
// 			'offset': -240
// 		}
// 	],
// 	'Оман': [
// 		{
// 			'name': 'Asia/Dubai',
// 			'offset': -240
// 		},
// 		{
// 			'name': 'Asia/Muscat',
// 			'offset': -240
// 		}
// 	],
// 	'Пакистан': [
// 		{
// 			'name': 'Asia/Karachi',
// 			'offset': -300
// 		}
// 	],
// 	'Палау': [
// 		{
// 			'name': 'Pacific/Palau',
// 			'offset': -540
// 		}
// 	],
// 	'Палестина': [
// 		{
// 			'name': 'Asia/Gaza',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Asia/Hebron',
// 			'offset': -120
// 		}
// 	],
// 	'Панама': [
// 		{
// 			'name': 'America/Panama',
// 			'offset': 300
// 		}
// 	],
// 	'Папуа — Новая Гвинея': [
// 		{
// 			'name': 'Pacific/Bougainville',
// 			'offset': -660
// 		},
// 		{
// 			'name': 'Pacific/Port_Moresby',
// 			'offset': -600
// 		}
// 	],
// 	'Парагвай': [
// 		{
// 			'name': 'America/Asuncion',
// 			'offset': 240
// 		}
// 	],
// 	'Перу': [
// 		{
// 			'name': 'America/Lima',
// 			'offset': 300
// 		}
// 	],
// 	'Польша': [
// 		{
// 			'name': 'Europe/Warsaw',
// 			'offset': -120
// 		}
// 	],
// 	'Португалия': [
// 		{
// 			'name': 'Atlantic/Azores',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Atlantic/Madeira',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Europe/Lisbon',
// 			'offset': -60
// 		}
// 	],
// 	'Пуэрто-Рико': [
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Республика Корея': [
// 		{
// 			'name': 'Asia/Seoul',
// 			'offset': -540
// 		}
// 	],
// 	'Реюньон': [
// 		{
// 			'name': 'Asia/Dubai',
// 			'offset': -240
// 		},
// 		{
// 			'name': 'Indian/Reunion',
// 			'offset': -240
// 		}
// 	],
// 	'Россия': [
// 		{
// 			'name': 'Asia/Anadyr',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Asia/Barnaul',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Chita',
// 			'offset': -540
// 		},
// 		{
// 			'name': 'Asia/Irkutsk',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Asia/Kamchatka',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Asia/Khandyga',
// 			'offset': -540
// 		},
// 		{
// 			'name': 'Asia/Krasnoyarsk',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Magadan',
// 			'offset': -660
// 		},
// 		{
// 			'name': 'Asia/Novokuznetsk',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Novosibirsk',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Omsk',
// 			'offset': -360
// 		},
// 		{
// 			'name': 'Asia/Sakhalin',
// 			'offset': -660
// 		},
// 		{
// 			'name': 'Asia/Srednekolymsk',
// 			'offset': -660
// 		},
// 		{
// 			'name': 'Asia/Tomsk',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Ust-Nera',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Asia/Vladivostok',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Asia/Yakutsk',
// 			'offset': -540
// 		},
// 		{
// 			'name': 'Asia/Yekaterinburg',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Europe/Astrakhan',
// 			'offset': -240
// 		},
// 		{
// 			'name': 'Europe/Kaliningrad',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Kirov',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Europe/Moscow',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Europe/Samara',
// 			'offset': -240
// 		},
// 		{
// 			'name': 'Europe/Saratov',
// 			'offset': -240
// 		},
// 		{
// 			'name': 'Europe/Simferopol',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Europe/Ulyanovsk',
// 			'offset': -240
// 		},
// 		{
// 			'name': 'Europe/Volgograd',
// 			'offset': -180
// 		}
// 	],
// 	'Руанда': [
// 		{
// 			'name': 'Africa/Kigali',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Maputo',
// 			'offset': -120
// 		}
// 	],
// 	'Румыния': [
// 		{
// 			'name': 'Europe/Bucharest',
// 			'offset': -180
// 		}
// 	],
// 	'Сальвадор': [
// 		{
// 			'name': 'America/El_Salvador',
// 			'offset': 360
// 		}
// 	],
// 	'Самоа': [
// 		{
// 			'name': 'Pacific/Apia',
// 			'offset': -780
// 		}
// 	],
// 	'Сан-Марино': [
// 		{
// 			'name': 'Europe/Rome',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/San_Marino',
// 			'offset': -120
// 		}
// 	],
// 	'Сан-Томе и Принсипи': [
// 		{
// 			'name': 'Africa/Sao_Tome',
// 			'offset': 0
// 		}
// 	],
// 	'Саудовская Аравия': [
// 		{
// 			'name': 'Asia/Riyadh',
// 			'offset': -180
// 		}
// 	],
// 	'Северная Македония': [
// 		{
// 			'name': 'Europe/Belgrade',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Skopje',
// 			'offset': -120
// 		}
// 	],
// 	'Северные Марианские о-ва': [
// 		{
// 			'name': 'Pacific/Guam',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Pacific/Saipan',
// 			'offset': -600
// 		}
// 	],
// 	'Сейшельские о-ва': [
// 		{
// 			'name': 'Asia/Dubai',
// 			'offset': -240
// 		},
// 		{
// 			'name': 'Indian/Mahe',
// 			'offset': -240
// 		}
// 	],
// 	'Сен-Бартелеми': [
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/St_Barthelemy',
// 			'offset': 240
// 		}
// 	],
// 	'Сен-Мартен': [
// 		{
// 			'name': 'America/Marigot',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Сен-Пьер и Микелон': [
// 		{
// 			'name': 'America/Miquelon',
// 			'offset': 120
// 		}
// 	],
// 	'Сенегал': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Dakar',
// 			'offset': 0
// 		}
// 	],
// 	'Сент-Винсент и Гренадины': [
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/St_Vincent',
// 			'offset': 240
// 		}
// 	],
// 	'Сент-Китс и Невис': [
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/St_Kitts',
// 			'offset': 240
// 		}
// 	],
// 	'Сент-Люсия': [
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/St_Lucia',
// 			'offset': 240
// 		}
// 	],
// 	'Сербия': [
// 		{
// 			'name': 'Europe/Belgrade',
// 			'offset': -120
// 		}
// 	],
// 	'Сингапур': [
// 		{
// 			'name': 'Asia/Singapore',
// 			'offset': -480
// 		}
// 	],
// 	'Синт-Мартен': [
// 		{
// 			'name': 'America/Lower_Princes',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Сирия': [
// 		{
// 			'name': 'Asia/Damascus',
// 			'offset': -180
// 		}
// 	],
// 	'Словакия': [
// 		{
// 			'name': 'Europe/Bratislava',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Prague',
// 			'offset': -120
// 		}
// 	],
// 	'Словения': [
// 		{
// 			'name': 'Europe/Belgrade',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Ljubljana',
// 			'offset': -120
// 		}
// 	],
// 	'Соединенные Штаты': [
// 		{
// 			'name': 'America/Adak',
// 			'offset': 540
// 		},
// 		{
// 			'name': 'America/Anchorage',
// 			'offset': 480
// 		},
// 		{
// 			'name': 'America/Boise',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Chicago',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Denver',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Detroit',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Indiana/Indianapolis',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Indiana/Knox',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Indiana/Marengo',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Indiana/Petersburg',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Indiana/Tell_City',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Indiana/Vevay',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Indiana/Vincennes',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Indiana/Winamac',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Juneau',
// 			'offset': 480
// 		},
// 		{
// 			'name': 'America/Kentucky/Louisville',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Kentucky/Monticello',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Los_Angeles',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Menominee',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Metlakatla',
// 			'offset': 480
// 		},
// 		{
// 			'name': 'America/New_York',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Nome',
// 			'offset': 480
// 		},
// 		{
// 			'name': 'America/North_Dakota/Beulah',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/North_Dakota/Center',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/North_Dakota/New_Salem',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Phoenix',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Sitka',
// 			'offset': 480
// 		},
// 		{
// 			'name': 'America/Yakutat',
// 			'offset': 480
// 		},
// 		{
// 			'name': 'Pacific/Honolulu',
// 			'offset': 600
// 		}
// 	],
// 	'Соломоновы о-ва': [
// 		{
// 			'name': 'Pacific/Guadalcanal',
// 			'offset': -660
// 		}
// 	],
// 	'Сомали': [
// 		{
// 			'name': 'Africa/Mogadishu',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		}
// 	],
// 	'Судан': [
// 		{
// 			'name': 'Africa/Khartoum',
// 			'offset': -120
// 		}
// 	],
// 	'Суринам': [
// 		{
// 			'name': 'America/Paramaribo',
// 			'offset': 180
// 		}
// 	],
// 	'Сьерра-Леоне': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Freetown',
// 			'offset': 0
// 		}
// 	],
// 	'Таджикистан': [
// 		{
// 			'name': 'Asia/Dushanbe',
// 			'offset': -300
// 		}
// 	],
// 	'Таиланд': [
// 		{
// 			'name': 'Asia/Bangkok',
// 			'offset': -420
// 		}
// 	],
// 	'Тайвань': [
// 		{
// 			'name': 'Asia/Taipei',
// 			'offset': -480
// 		}
// 	],
// 	'Танзания': [
// 		{
// 			'name': 'Africa/Dar_es_Salaam',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		}
// 	],
// 	'Тёркс и Кайкос': [
// 		{
// 			'name': 'America/Grand_Turk',
// 			'offset': 240
// 		}
// 	],
// 	'Того': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Lome',
// 			'offset': 0
// 		}
// 	],
// 	'Токелау': [
// 		{
// 			'name': 'Pacific/Fakaofo',
// 			'offset': -780
// 		}
// 	],
// 	'Тонга': [
// 		{
// 			'name': 'Pacific/Tongatapu',
// 			'offset': -780
// 		}
// 	],
// 	'Тринидад и Тобаго': [
// 		{
// 			'name': 'America/Port_of_Spain',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Тувалу': [
// 		{
// 			'name': 'Pacific/Funafuti',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Pacific/Tarawa',
// 			'offset': -720
// 		}
// 	],
// 	'Тунис': [
// 		{
// 			'name': 'Africa/Tunis',
// 			'offset': -60
// 		}
// 	],
// 	'Туркменистан': [
// 		{
// 			'name': 'Asia/Ashgabat',
// 			'offset': -300
// 		}
// 	],
// 	'Турция': [
// 		{
// 			'name': 'Europe/Istanbul',
// 			'offset': -180
// 		}
// 	],
// 	'Уганда': [
// 		{
// 			'name': 'Africa/Kampala',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		}
// 	],
// 	'Узбекистан': [
// 		{
// 			'name': 'Asia/Samarkand',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Asia/Tashkent',
// 			'offset': -300
// 		}
// 	],
// 	'Украина': [
// 		{
// 			'name': 'Europe/Kyiv',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Europe/Simferopol',
// 			'offset': -180
// 		}
// 	],
// 	'Уоллис и Футуна': [
// 		{
// 			'name': 'Pacific/Tarawa',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Pacific/Wallis',
// 			'offset': -720
// 		}
// 	],
// 	'Уругвай': [
// 		{
// 			'name': 'America/Montevideo',
// 			'offset': 180
// 		}
// 	],
// 	'Фарерские о-ва': [
// 		{
// 			'name': 'Atlantic/Faroe',
// 			'offset': -60
// 		}
// 	],
// 	'Федеративные Штаты Микронезии': [
// 		{
// 			'name': 'Pacific/Chuuk',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Pacific/Guadalcanal',
// 			'offset': -660
// 		},
// 		{
// 			'name': 'Pacific/Kosrae',
// 			'offset': -660
// 		},
// 		{
// 			'name': 'Pacific/Pohnpei',
// 			'offset': -660
// 		},
// 		{
// 			'name': 'Pacific/Port_Moresby',
// 			'offset': -600
// 		}
// 	],
// 	'Фиджи': [
// 		{
// 			'name': 'Pacific/Fiji',
// 			'offset': -720
// 		}
// 	],
// 	'Филиппины': [
// 		{
// 			'name': 'Asia/Manila',
// 			'offset': -480
// 		}
// 	],
// 	'Финляндия': [
// 		{
// 			'name': 'Europe/Helsinki',
// 			'offset': -180
// 		}
// 	],
// 	'Фолклендские (Мальвинские) о-ва': [
// 		{
// 			'name': 'Atlantic/Stanley',
// 			'offset': 180
// 		}
// 	],
// 	'Франция': [
// 		{
// 			'name': 'Europe/Paris',
// 			'offset': -120
// 		}
// 	],
// 	'Французская Гвиана': [
// 		{
// 			'name': 'America/Cayenne',
// 			'offset': 180
// 		}
// 	],
// 	'Французская Полинезия': [
// 		{
// 			'name': 'Pacific/Gambier',
// 			'offset': 540
// 		},
// 		{
// 			'name': 'Pacific/Marquesas',
// 			'offset': 570
// 		},
// 		{
// 			'name': 'Pacific/Tahiti',
// 			'offset': 600
// 		}
// 	],
// 	'Французские Южные территории': [
// 		{
// 			'name': 'Asia/Dubai',
// 			'offset': -240
// 		},
// 		{
// 			'name': 'Indian/Kerguelen',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Indian/Maldives',
// 			'offset': -300
// 		}
// 	],
// 	'Хорватия': [
// 		{
// 			'name': 'Europe/Belgrade',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Zagreb',
// 			'offset': -120
// 		}
// 	],
// 	'Центрально-Африканская Республика': [
// 		{
// 			'name': 'Africa/Bangui',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		}
// 	],
// 	'Чад': [
// 		{
// 			'name': 'Africa/Ndjamena',
// 			'offset': -60
// 		}
// 	],
// 	'Черногория': [
// 		{
// 			'name': 'Europe/Belgrade',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Podgorica',
// 			'offset': -120
// 		}
// 	],
// 	'Чехия': [
// 		{
// 			'name': 'Europe/Prague',
// 			'offset': -120
// 		}
// 	],
// 	'Чили': [
// 		{
// 			'name': 'America/Punta_Arenas',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Santiago',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'Pacific/Easter',
// 			'offset': 360
// 		}
// 	],
// 	'Швейцария': [
// 		{
// 			'name': 'Europe/Zurich',
// 			'offset': -120
// 		}
// 	],
// 	'Швеция': [
// 		{
// 			'name': 'Europe/Berlin',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Stockholm',
// 			'offset': -120
// 		}
// 	],
// 	'Шпицберген и Ян-Майен': [
// 		{
// 			'name': 'Arctic/Longyearbyen',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Berlin',
// 			'offset': -120
// 		}
// 	],
// 	'Шри-Ланка': [
// 		{
// 			'name': 'Asia/Colombo',
// 			'offset': -330
// 		}
// 	],
// 	'Эквадор': [
// 		{
// 			'name': 'America/Guayaquil',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'Pacific/Galapagos',
// 			'offset': 360
// 		}
// 	],
// 	'Экваториальная Гвинея': [
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Malabo',
// 			'offset': -60
// 		}
// 	],
// 	'Эритрея': [
// 		{
// 			'name': 'Africa/Asmara',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		}
// 	],
// 	'Эсватини': [
// 		{
// 			'name': 'Africa/Johannesburg',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Mbabane',
// 			'offset': -120
// 		}
// 	],
// 	'Эстония': [
// 		{
// 			'name': 'Europe/Tallinn',
// 			'offset': -180
// 		}
// 	],
// 	'Эфиопия': [
// 		{
// 			'name': 'Africa/Addis_Ababa',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		}
// 	],
// 	'Южная Георгия и Южные Сандвичевы о-ва': [
// 		{
// 			'name': 'Atlantic/South_Georgia',
// 			'offset': 120
// 		}
// 	],
// 	'Южно-Африканская Республика': [
// 		{
// 			'name': 'Africa/Johannesburg',
// 			'offset': -120
// 		}
// 	],
// 	'Южный Судан': [
// 		{
// 			'name': 'Africa/Juba',
// 			'offset': -120
// 		}
// 	],
// 	'Ямайка': [
// 		{
// 			'name': 'America/Jamaica',
// 			'offset': 300
// 		}
// 	],
// 	'Япония': [
// 		{
// 			'name': 'Asia/Tokyo',
// 			'offset': -540
// 		}
// 	]
// }

// const countryTimeZoneMapEn: CountryTimeZoneMap = {
// 	'Afghanistan': [
// 		{
// 			'name': 'Asia/Kabul',
// 			'offset': -270
// 		}
// 	],
// 	'Åland Islands': [
// 		{
// 			'name': 'Europe/Helsinki',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Europe/Mariehamn',
// 			'offset': -180
// 		}
// 	],
// 	'Albania': [
// 		{
// 			'name': 'Europe/Tirane',
// 			'offset': -120
// 		}
// 	],
// 	'Algeria': [
// 		{
// 			'name': 'Africa/Algiers',
// 			'offset': -60
// 		}
// 	],
// 	'American Samoa': [
// 		{
// 			'name': 'Pacific/Pago_Pago',
// 			'offset': 660
// 		}
// 	],
// 	'Andorra': [
// 		{
// 			'name': 'Europe/Andorra',
// 			'offset': -120
// 		}
// 	],
// 	'Angola': [
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Luanda',
// 			'offset': -60
// 		}
// 	],
// 	'Anguilla': [
// 		{
// 			'name': 'America/Anguilla',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Antarctica': [
// 		{
// 			'name': 'Antarctica/Casey',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Antarctica/Davis',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Antarctica/DumontDUrville',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Antarctica/Mawson',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Antarctica/McMurdo',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Antarctica/Palmer',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'Antarctica/Rothera',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'Antarctica/Syowa',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Antarctica/Troll',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Antarctica/Vostok',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Asia/Riyadh',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Pacific/Auckland',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Pacific/Port_Moresby',
// 			'offset': -600
// 		}
// 	],
// 	'Antigua & Barbuda': [
// 		{
// 			'name': 'America/Antigua',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Argentina': [
// 		{
// 			'name': 'America/Argentina/Buenos_Aires',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/Catamarca',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/Cordoba',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/Jujuy',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/La_Rioja',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/Mendoza',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/Rio_Gallegos',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/Salta',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/San_Juan',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/San_Luis',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/Tucuman',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Argentina/Ushuaia',
// 			'offset': 180
// 		}
// 	],
// 	'Armenia': [
// 		{
// 			'name': 'Asia/Yerevan',
// 			'offset': -240
// 		}
// 	],
// 	'Aruba': [
// 		{
// 			'name': 'America/Aruba',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Australia': [
// 		{
// 			'name': 'Antarctica/Macquarie',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Australia/Adelaide',
// 			'offset': -570
// 		},
// 		{
// 			'name': 'Australia/Brisbane',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Australia/Broken_Hill',
// 			'offset': -570
// 		},
// 		{
// 			'name': 'Australia/Darwin',
// 			'offset': -570
// 		},
// 		{
// 			'name': 'Australia/Eucla',
// 			'offset': -525
// 		},
// 		{
// 			'name': 'Australia/Hobart',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Australia/Lindeman',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Australia/Lord_Howe',
// 			'offset': -630
// 		},
// 		{
// 			'name': 'Australia/Melbourne',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Australia/Perth',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Australia/Sydney',
// 			'offset': -600
// 		}
// 	],
// 	'Austria': [
// 		{
// 			'name': 'Europe/Vienna',
// 			'offset': -120
// 		}
// 	],
// 	'Azerbaijan': [
// 		{
// 			'name': 'Asia/Baku',
// 			'offset': -240
// 		}
// 	],
// 	'Bahamas': [
// 		{
// 			'name': 'America/Nassau',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Toronto',
// 			'offset': 240
// 		}
// 	],
// 	'Bahrain': [
// 		{
// 			'name': 'Asia/Bahrain',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Asia/Qatar',
// 			'offset': -180
// 		}
// 	],
// 	'Bangladesh': [
// 		{
// 			'name': 'Asia/Dhaka',
// 			'offset': -360
// 		}
// 	],
// 	'Barbados': [
// 		{
// 			'name': 'America/Barbados',
// 			'offset': 240
// 		}
// 	],
// 	'Belarus': [
// 		{
// 			'name': 'Europe/Minsk',
// 			'offset': -180
// 		}
// 	],
// 	'Belgium': [
// 		{
// 			'name': 'Europe/Brussels',
// 			'offset': -120
// 		}
// 	],
// 	'Belize': [
// 		{
// 			'name': 'America/Belize',
// 			'offset': 360
// 		}
// 	],
// 	'Benin': [
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Porto-Novo',
// 			'offset': -60
// 		}
// 	],
// 	'Bermuda': [
// 		{
// 			'name': 'Atlantic/Bermuda',
// 			'offset': 180
// 		}
// 	],
// 	'Bhutan': [
// 		{
// 			'name': 'Asia/Thimphu',
// 			'offset': -360
// 		}
// 	],
// 	'Bolivia': [
// 		{
// 			'name': 'America/La_Paz',
// 			'offset': 240
// 		}
// 	],
// 	'Bosnia & Herzegovina': [
// 		{
// 			'name': 'Europe/Belgrade',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Sarajevo',
// 			'offset': -120
// 		}
// 	],
// 	'Botswana': [
// 		{
// 			'name': 'Africa/Gaborone',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Maputo',
// 			'offset': -120
// 		}
// 	],
// 	'Brazil': [
// 		{
// 			'name': 'America/Araguaina',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Bahia',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Belem',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Boa_Vista',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Campo_Grande',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Cuiaba',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Eirunepe',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Fortaleza',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Maceio',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Manaus',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Noronha',
// 			'offset': 120
// 		},
// 		{
// 			'name': 'America/Porto_Velho',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Recife',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Rio_Branco',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Santarem',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Sao_Paulo',
// 			'offset': 180
// 		}
// 	],
// 	'British Indian Ocean Territory': [
// 		{
// 			'name': 'Indian/Chagos',
// 			'offset': -360
// 		}
// 	],
// 	'British Virgin Islands': [
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Tortola',
// 			'offset': 240
// 		}
// 	],
// 	'Brunei': [
// 		{
// 			'name': 'Asia/Brunei',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Asia/Kuching',
// 			'offset': -480
// 		}
// 	],
// 	'Bulgaria': [
// 		{
// 			'name': 'Europe/Sofia',
// 			'offset': -180
// 		}
// 	],
// 	'Burkina Faso': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Ouagadougou',
// 			'offset': 0
// 		}
// 	],
// 	'Burundi': [
// 		{
// 			'name': 'Africa/Bujumbura',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Maputo',
// 			'offset': -120
// 		}
// 	],
// 	'Cambodia': [
// 		{
// 			'name': 'Asia/Bangkok',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Phnom_Penh',
// 			'offset': -420
// 		}
// 	],
// 	'Cameroon': [
// 		{
// 			'name': 'Africa/Douala',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		}
// 	],
// 	'Canada': [
// 		{
// 			'name': 'America/Atikokan',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Blanc-Sablon',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Cambridge_Bay',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Creston',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Dawson',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Dawson_Creek',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Edmonton',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Fort_Nelson',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Glace_Bay',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Goose_Bay',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Halifax',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Inuvik',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Iqaluit',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Moncton',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Panama',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Phoenix',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Rankin_Inlet',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Regina',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Resolute',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/St_Johns',
// 			'offset': 150
// 		},
// 		{
// 			'name': 'America/Swift_Current',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Toronto',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Vancouver',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Whitehorse',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Winnipeg',
// 			'offset': 300
// 		}
// 	],
// 	'Cape Verde': [
// 		{
// 			'name': 'Atlantic/Cape_Verde',
// 			'offset': 60
// 		}
// 	],
// 	'Caribbean Netherlands': [
// 		{
// 			'name': 'America/Kralendijk',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Cayman Islands': [
// 		{
// 			'name': 'America/Cayman',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Panama',
// 			'offset': 300
// 		}
// 	],
// 	'Central African Republic': [
// 		{
// 			'name': 'Africa/Bangui',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		}
// 	],
// 	'Chad': [
// 		{
// 			'name': 'Africa/Ndjamena',
// 			'offset': -60
// 		}
// 	],
// 	'Chile': [
// 		{
// 			'name': 'America/Punta_Arenas',
// 			'offset': 180
// 		},
// 		{
// 			'name': 'America/Santiago',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'Pacific/Easter',
// 			'offset': 360
// 		}
// 	],
// 	'China': [
// 		{
// 			'name': 'Asia/Shanghai',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Asia/Urumqi',
// 			'offset': -360
// 		}
// 	],
// 	'Christmas Island': [
// 		{
// 			'name': 'Asia/Bangkok',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Indian/Christmas',
// 			'offset': -420
// 		}
// 	],
// 	'Cocos (Keeling) Islands': [
// 		{
// 			'name': 'Asia/Yangon',
// 			'offset': -390
// 		},
// 		{
// 			'name': 'Indian/Cocos',
// 			'offset': -390
// 		}
// 	],
// 	'Colombia': [
// 		{
// 			'name': 'America/Bogota',
// 			'offset': 300
// 		}
// 	],
// 	'Comoros': [
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Indian/Comoro',
// 			'offset': -180
// 		}
// 	],
// 	'Congo - Brazzaville': [
// 		{
// 			'name': 'Africa/Brazzaville',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		}
// 	],
// 	'Congo - Kinshasa': [
// 		{
// 			'name': 'Africa/Kinshasa',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Lubumbashi',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Maputo',
// 			'offset': -120
// 		}
// 	],
// 	'Cook Islands': [
// 		{
// 			'name': 'Pacific/Rarotonga',
// 			'offset': 600
// 		}
// 	],
// 	'Costa Rica': [
// 		{
// 			'name': 'America/Costa_Rica',
// 			'offset': 360
// 		}
// 	],
// 	'Côte d’Ivoire': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		}
// 	],
// 	'Croatia': [
// 		{
// 			'name': 'Europe/Belgrade',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Zagreb',
// 			'offset': -120
// 		}
// 	],
// 	'Cuba': [
// 		{
// 			'name': 'America/Havana',
// 			'offset': 240
// 		}
// 	],
// 	'Curaçao': [
// 		{
// 			'name': 'America/Curacao',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Cyprus': [
// 		{
// 			'name': 'Asia/Famagusta',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Asia/Nicosia',
// 			'offset': -180
// 		}
// 	],
// 	'Czechia': [
// 		{
// 			'name': 'Europe/Prague',
// 			'offset': -120
// 		}
// 	],
// 	'Denmark': [
// 		{
// 			'name': 'Europe/Berlin',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Copenhagen',
// 			'offset': -120
// 		}
// 	],
// 	'Djibouti': [
// 		{
// 			'name': 'Africa/Djibouti',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		}
// 	],
// 	'Dominica': [
// 		{
// 			'name': 'America/Dominica',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Dominican Republic': [
// 		{
// 			'name': 'America/Santo_Domingo',
// 			'offset': 240
// 		}
// 	],
// 	'Ecuador': [
// 		{
// 			'name': 'America/Guayaquil',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'Pacific/Galapagos',
// 			'offset': 360
// 		}
// 	],
// 	'Egypt': [
// 		{
// 			'name': 'Africa/Cairo',
// 			'offset': -120
// 		}
// 	],
// 	'El Salvador': [
// 		{
// 			'name': 'America/El_Salvador',
// 			'offset': 360
// 		}
// 	],
// 	'Equatorial Guinea': [
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Malabo',
// 			'offset': -60
// 		}
// 	],
// 	'Eritrea': [
// 		{
// 			'name': 'Africa/Asmara',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		}
// 	],
// 	'Estonia': [
// 		{
// 			'name': 'Europe/Tallinn',
// 			'offset': -180
// 		}
// 	],
// 	'Eswatini': [
// 		{
// 			'name': 'Africa/Johannesburg',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Mbabane',
// 			'offset': -120
// 		}
// 	],
// 	'Ethiopia': [
// 		{
// 			'name': 'Africa/Addis_Ababa',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		}
// 	],
// 	'Falkland Islands (Islas Malvinas)': [
// 		{
// 			'name': 'Atlantic/Stanley',
// 			'offset': 180
// 		}
// 	],
// 	'Faroe Islands': [
// 		{
// 			'name': 'Atlantic/Faroe',
// 			'offset': -60
// 		}
// 	],
// 	'Fiji': [
// 		{
// 			'name': 'Pacific/Fiji',
// 			'offset': -720
// 		}
// 	],
// 	'Finland': [
// 		{
// 			'name': 'Europe/Helsinki',
// 			'offset': -180
// 		}
// 	],
// 	'France': [
// 		{
// 			'name': 'Europe/Paris',
// 			'offset': -120
// 		}
// 	],
// 	'French Guiana': [
// 		{
// 			'name': 'America/Cayenne',
// 			'offset': 180
// 		}
// 	],
// 	'French Polynesia': [
// 		{
// 			'name': 'Pacific/Gambier',
// 			'offset': 540
// 		},
// 		{
// 			'name': 'Pacific/Marquesas',
// 			'offset': 570
// 		},
// 		{
// 			'name': 'Pacific/Tahiti',
// 			'offset': 600
// 		}
// 	],
// 	'French Southern Territories': [
// 		{
// 			'name': 'Asia/Dubai',
// 			'offset': -240
// 		},
// 		{
// 			'name': 'Indian/Kerguelen',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Indian/Maldives',
// 			'offset': -300
// 		}
// 	],
// 	'Gabon': [
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Libreville',
// 			'offset': -60
// 		}
// 	],
// 	'Gambia': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Banjul',
// 			'offset': 0
// 		}
// 	],
// 	'Georgia': [
// 		{
// 			'name': 'Asia/Tbilisi',
// 			'offset': -240
// 		}
// 	],
// 	'Germany': [
// 		{
// 			'name': 'Europe/Berlin',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Busingen',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Zurich',
// 			'offset': -120
// 		}
// 	],
// 	'Ghana': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Accra',
// 			'offset': 0
// 		}
// 	],
// 	'Gibraltar': [
// 		{
// 			'name': 'Europe/Gibraltar',
// 			'offset': -120
// 		}
// 	],
// 	'Greece': [
// 		{
// 			'name': 'Europe/Athens',
// 			'offset': -180
// 		}
// 	],
// 	'Greenland': [
// 		{
// 			'name': 'America/Danmarkshavn',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'America/Nuuk',
// 			'offset': 60
// 		},
// 		{
// 			'name': 'America/Scoresbysund',
// 			'offset': 60
// 		},
// 		{
// 			'name': 'America/Thule',
// 			'offset': 180
// 		}
// 	],
// 	'Grenada': [
// 		{
// 			'name': 'America/Grenada',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Guadeloupe': [
// 		{
// 			'name': 'America/Guadeloupe',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Guam': [
// 		{
// 			'name': 'Pacific/Guam',
// 			'offset': -600
// 		}
// 	],
// 	'Guatemala': [
// 		{
// 			'name': 'America/Guatemala',
// 			'offset': 360
// 		}
// 	],
// 	'Guernsey': [
// 		{
// 			'name': 'Europe/Guernsey',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Europe/London',
// 			'offset': -60
// 		}
// 	],
// 	'Guinea': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Conakry',
// 			'offset': 0
// 		}
// 	],
// 	'Guinea-Bissau': [
// 		{
// 			'name': 'Africa/Bissau',
// 			'offset': 0
// 		}
// 	],
// 	'Guyana': [
// 		{
// 			'name': 'America/Guyana',
// 			'offset': 240
// 		}
// 	],
// 	'Haiti': [
// 		{
// 			'name': 'America/Port-au-Prince',
// 			'offset': 240
// 		}
// 	],
// 	'Honduras': [
// 		{
// 			'name': 'America/Tegucigalpa',
// 			'offset': 360
// 		}
// 	],
// 	'Hong Kong': [
// 		{
// 			'name': 'Asia/Hong_Kong',
// 			'offset': -480
// 		}
// 	],
// 	'Hungary': [
// 		{
// 			'name': 'Europe/Budapest',
// 			'offset': -120
// 		}
// 	],
// 	'Iceland': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Atlantic/Reykjavik',
// 			'offset': 0
// 		}
// 	],
// 	'India': [
// 		{
// 			'name': 'Asia/Kolkata',
// 			'offset': -330
// 		}
// 	],
// 	'Indonesia': [
// 		{
// 			'name': 'Asia/Jakarta',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Jayapura',
// 			'offset': -540
// 		},
// 		{
// 			'name': 'Asia/Makassar',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Asia/Pontianak',
// 			'offset': -420
// 		}
// 	],
// 	'Iran': [
// 		{
// 			'name': 'Asia/Tehran',
// 			'offset': -210
// 		}
// 	],
// 	'Iraq': [
// 		{
// 			'name': 'Asia/Baghdad',
// 			'offset': -180
// 		}
// 	],
// 	'Ireland': [
// 		{
// 			'name': 'Europe/Dublin',
// 			'offset': -60
// 		}
// 	],
// 	'Isle of Man': [
// 		{
// 			'name': 'Europe/Isle_of_Man',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Europe/London',
// 			'offset': -60
// 		}
// 	],
// 	'Israel': [
// 		{
// 			'name': 'Asia/Jerusalem',
// 			'offset': -180
// 		}
// 	],
// 	'Italy': [
// 		{
// 			'name': 'Europe/Rome',
// 			'offset': -120
// 		}
// 	],
// 	'Jamaica': [
// 		{
// 			'name': 'America/Jamaica',
// 			'offset': 300
// 		}
// 	],
// 	'Japan': [
// 		{
// 			'name': 'Asia/Tokyo',
// 			'offset': -540
// 		}
// 	],
// 	'Jersey': [
// 		{
// 			'name': 'Europe/Jersey',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Europe/London',
// 			'offset': -60
// 		}
// 	],
// 	'Jordan': [
// 		{
// 			'name': 'Asia/Amman',
// 			'offset': -180
// 		}
// 	],
// 	'Kazakhstan': [
// 		{
// 			'name': 'Asia/Almaty',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Asia/Aqtau',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Asia/Aqtobe',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Asia/Atyrau',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Asia/Oral',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Asia/Qostanay',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Asia/Qyzylorda',
// 			'offset': -300
// 		}
// 	],
// 	'Kenya': [
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		}
// 	],
// 	'Kiribati': [
// 		{
// 			'name': 'Pacific/Kanton',
// 			'offset': -780
// 		},
// 		{
// 			'name': 'Pacific/Kiritimati',
// 			'offset': -840
// 		},
// 		{
// 			'name': 'Pacific/Tarawa',
// 			'offset': -720
// 		}
// 	],
// 	'Kuwait': [
// 		{
// 			'name': 'Asia/Kuwait',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Asia/Riyadh',
// 			'offset': -180
// 		}
// 	],
// 	'Kyrgyzstan': [
// 		{
// 			'name': 'Asia/Bishkek',
// 			'offset': -360
// 		}
// 	],
// 	'Laos': [
// 		{
// 			'name': 'Asia/Bangkok',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Vientiane',
// 			'offset': -420
// 		}
// 	],
// 	'Latvia': [
// 		{
// 			'name': 'Europe/Riga',
// 			'offset': -180
// 		}
// 	],
// 	'Lebanon': [
// 		{
// 			'name': 'Asia/Beirut',
// 			'offset': -180
// 		}
// 	],
// 	'Lesotho': [
// 		{
// 			'name': 'Africa/Johannesburg',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Maseru',
// 			'offset': -120
// 		}
// 	],
// 	'Liberia': [
// 		{
// 			'name': 'Africa/Monrovia',
// 			'offset': 0
// 		}
// 	],
// 	'Libya': [
// 		{
// 			'name': 'Africa/Tripoli',
// 			'offset': -120
// 		}
// 	],
// 	'Liechtenstein': [
// 		{
// 			'name': 'Europe/Vaduz',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Zurich',
// 			'offset': -120
// 		}
// 	],
// 	'Lithuania': [
// 		{
// 			'name': 'Europe/Vilnius',
// 			'offset': -180
// 		}
// 	],
// 	'Luxembourg': [
// 		{
// 			'name': 'Europe/Brussels',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Luxembourg',
// 			'offset': -120
// 		}
// 	],
// 	'Macao': [
// 		{
// 			'name': 'Asia/Macau',
// 			'offset': -480
// 		}
// 	],
// 	'Madagascar': [
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Indian/Antananarivo',
// 			'offset': -180
// 		}
// 	],
// 	'Malawi': [
// 		{
// 			'name': 'Africa/Blantyre',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Maputo',
// 			'offset': -120
// 		}
// 	],
// 	'Malaysia': [
// 		{
// 			'name': 'Asia/Kuala_Lumpur',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Asia/Kuching',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Asia/Singapore',
// 			'offset': -480
// 		}
// 	],
// 	'Maldives': [
// 		{
// 			'name': 'Indian/Maldives',
// 			'offset': -300
// 		}
// 	],
// 	'Mali': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Bamako',
// 			'offset': 0
// 		}
// 	],
// 	'Malta': [
// 		{
// 			'name': 'Europe/Malta',
// 			'offset': -120
// 		}
// 	],
// 	'Marshall Islands': [
// 		{
// 			'name': 'Pacific/Kwajalein',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Pacific/Majuro',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Pacific/Tarawa',
// 			'offset': -720
// 		}
// 	],
// 	'Martinique': [
// 		{
// 			'name': 'America/Martinique',
// 			'offset': 240
// 		}
// 	],
// 	'Mauritania': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Nouakchott',
// 			'offset': 0
// 		}
// 	],
// 	'Mauritius': [
// 		{
// 			'name': 'Indian/Mauritius',
// 			'offset': -240
// 		}
// 	],
// 	'Mayotte': [
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Indian/Mayotte',
// 			'offset': -180
// 		}
// 	],
// 	'Mexico': [
// 		{
// 			'name': 'America/Bahia_Banderas',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Cancun',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Chihuahua',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Ciudad_Juarez',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Hermosillo',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Matamoros',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Mazatlan',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Merida',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Mexico_City',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Monterrey',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Ojinaga',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Tijuana',
// 			'offset': 420
// 		}
// 	],
// 	'Micronesia': [
// 		{
// 			'name': 'Pacific/Chuuk',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Pacific/Guadalcanal',
// 			'offset': -660
// 		},
// 		{
// 			'name': 'Pacific/Kosrae',
// 			'offset': -660
// 		},
// 		{
// 			'name': 'Pacific/Pohnpei',
// 			'offset': -660
// 		},
// 		{
// 			'name': 'Pacific/Port_Moresby',
// 			'offset': -600
// 		}
// 	],
// 	'Moldova': [
// 		{
// 			'name': 'Europe/Chisinau',
// 			'offset': -180
// 		}
// 	],
// 	'Monaco': [
// 		{
// 			'name': 'Europe/Monaco',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Paris',
// 			'offset': -120
// 		}
// 	],
// 	'Mongolia': [
// 		{
// 			'name': 'Asia/Choibalsan',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Asia/Hovd',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Ulaanbaatar',
// 			'offset': -480
// 		}
// 	],
// 	'Montenegro': [
// 		{
// 			'name': 'Europe/Belgrade',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Podgorica',
// 			'offset': -120
// 		}
// 	],
// 	'Montserrat': [
// 		{
// 			'name': 'America/Montserrat',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Morocco': [
// 		{
// 			'name': 'Africa/Casablanca',
// 			'offset': -60
// 		}
// 	],
// 	'Mozambique': [
// 		{
// 			'name': 'Africa/Maputo',
// 			'offset': -120
// 		}
// 	],
// 	'Myanmar (Burma)': [
// 		{
// 			'name': 'Asia/Yangon',
// 			'offset': -390
// 		}
// 	],
// 	'Namibia': [
// 		{
// 			'name': 'Africa/Windhoek',
// 			'offset': -120
// 		}
// 	],
// 	'Nauru': [
// 		{
// 			'name': 'Pacific/Nauru',
// 			'offset': -720
// 		}
// 	],
// 	'Nepal': [
// 		{
// 			'name': 'Asia/Kathmandu',
// 			'offset': -345
// 		}
// 	],
// 	'Netherlands': [
// 		{
// 			'name': 'Europe/Amsterdam',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Brussels',
// 			'offset': -120
// 		}
// 	],
// 	'New Caledonia': [
// 		{
// 			'name': 'Pacific/Noumea',
// 			'offset': -660
// 		}
// 	],
// 	'New Zealand': [
// 		{
// 			'name': 'Pacific/Auckland',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Pacific/Chatham',
// 			'offset': -765
// 		}
// 	],
// 	'Nicaragua': [
// 		{
// 			'name': 'America/Managua',
// 			'offset': 360
// 		}
// 	],
// 	'Niger': [
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Africa/Niamey',
// 			'offset': -60
// 		}
// 	],
// 	'Nigeria': [
// 		{
// 			'name': 'Africa/Lagos',
// 			'offset': -60
// 		}
// 	],
// 	'Niue': [
// 		{
// 			'name': 'Pacific/Niue',
// 			'offset': 660
// 		}
// 	],
// 	'Norfolk Island': [
// 		{
// 			'name': 'Pacific/Norfolk',
// 			'offset': -660
// 		}
// 	],
// 	'North Korea': [
// 		{
// 			'name': 'Asia/Pyongyang',
// 			'offset': -540
// 		}
// 	],
// 	'North Macedonia': [
// 		{
// 			'name': 'Europe/Belgrade',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Skopje',
// 			'offset': -120
// 		}
// 	],
// 	'Northern Mariana Islands': [
// 		{
// 			'name': 'Pacific/Guam',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Pacific/Saipan',
// 			'offset': -600
// 		}
// 	],
// 	'Norway': [
// 		{
// 			'name': 'Europe/Berlin',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Oslo',
// 			'offset': -120
// 		}
// 	],
// 	'Oman': [
// 		{
// 			'name': 'Asia/Dubai',
// 			'offset': -240
// 		},
// 		{
// 			'name': 'Asia/Muscat',
// 			'offset': -240
// 		}
// 	],
// 	'Pakistan': [
// 		{
// 			'name': 'Asia/Karachi',
// 			'offset': -300
// 		}
// 	],
// 	'Palau': [
// 		{
// 			'name': 'Pacific/Palau',
// 			'offset': -540
// 		}
// 	],
// 	'Palestine': [
// 		{
// 			'name': 'Asia/Gaza',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Asia/Hebron',
// 			'offset': -120
// 		}
// 	],
// 	'Panama': [
// 		{
// 			'name': 'America/Panama',
// 			'offset': 300
// 		}
// 	],
// 	'Papua New Guinea': [
// 		{
// 			'name': 'Pacific/Bougainville',
// 			'offset': -660
// 		},
// 		{
// 			'name': 'Pacific/Port_Moresby',
// 			'offset': -600
// 		}
// 	],
// 	'Paraguay': [
// 		{
// 			'name': 'America/Asuncion',
// 			'offset': 240
// 		}
// 	],
// 	'Peru': [
// 		{
// 			'name': 'America/Lima',
// 			'offset': 300
// 		}
// 	],
// 	'Philippines': [
// 		{
// 			'name': 'Asia/Manila',
// 			'offset': -480
// 		}
// 	],
// 	'Pitcairn Islands': [
// 		{
// 			'name': 'Pacific/Pitcairn',
// 			'offset': 480
// 		}
// 	],
// 	'Poland': [
// 		{
// 			'name': 'Europe/Warsaw',
// 			'offset': -120
// 		}
// 	],
// 	'Portugal': [
// 		{
// 			'name': 'Atlantic/Azores',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Atlantic/Madeira',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Europe/Lisbon',
// 			'offset': -60
// 		}
// 	],
// 	'Puerto Rico': [
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Qatar': [
// 		{
// 			'name': 'Asia/Qatar',
// 			'offset': -180
// 		}
// 	],
// 	'Réunion': [
// 		{
// 			'name': 'Asia/Dubai',
// 			'offset': -240
// 		},
// 		{
// 			'name': 'Indian/Reunion',
// 			'offset': -240
// 		}
// 	],
// 	'Romania': [
// 		{
// 			'name': 'Europe/Bucharest',
// 			'offset': -180
// 		}
// 	],
// 	'Russia': [
// 		{
// 			'name': 'Asia/Anadyr',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Asia/Barnaul',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Chita',
// 			'offset': -540
// 		},
// 		{
// 			'name': 'Asia/Irkutsk',
// 			'offset': -480
// 		},
// 		{
// 			'name': 'Asia/Kamchatka',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Asia/Khandyga',
// 			'offset': -540
// 		},
// 		{
// 			'name': 'Asia/Krasnoyarsk',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Magadan',
// 			'offset': -660
// 		},
// 		{
// 			'name': 'Asia/Novokuznetsk',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Novosibirsk',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Omsk',
// 			'offset': -360
// 		},
// 		{
// 			'name': 'Asia/Sakhalin',
// 			'offset': -660
// 		},
// 		{
// 			'name': 'Asia/Srednekolymsk',
// 			'offset': -660
// 		},
// 		{
// 			'name': 'Asia/Tomsk',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Ust-Nera',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Asia/Vladivostok',
// 			'offset': -600
// 		},
// 		{
// 			'name': 'Asia/Yakutsk',
// 			'offset': -540
// 		},
// 		{
// 			'name': 'Asia/Yekaterinburg',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Europe/Astrakhan',
// 			'offset': -240
// 		},
// 		{
// 			'name': 'Europe/Kaliningrad',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Kirov',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Europe/Moscow',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Europe/Samara',
// 			'offset': -240
// 		},
// 		{
// 			'name': 'Europe/Saratov',
// 			'offset': -240
// 		},
// 		{
// 			'name': 'Europe/Simferopol',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Europe/Ulyanovsk',
// 			'offset': -240
// 		},
// 		{
// 			'name': 'Europe/Volgograd',
// 			'offset': -180
// 		}
// 	],
// 	'Rwanda': [
// 		{
// 			'name': 'Africa/Kigali',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Maputo',
// 			'offset': -120
// 		}
// 	],
// 	'Samoa': [
// 		{
// 			'name': 'Pacific/Apia',
// 			'offset': -780
// 		}
// 	],
// 	'San Marino': [
// 		{
// 			'name': 'Europe/Rome',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/San_Marino',
// 			'offset': -120
// 		}
// 	],
// 	'São Tomé & Príncipe': [
// 		{
// 			'name': 'Africa/Sao_Tome',
// 			'offset': 0
// 		}
// 	],
// 	'Saudi Arabia': [
// 		{
// 			'name': 'Asia/Riyadh',
// 			'offset': -180
// 		}
// 	],
// 	'Senegal': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Dakar',
// 			'offset': 0
// 		}
// 	],
// 	'Serbia': [
// 		{
// 			'name': 'Europe/Belgrade',
// 			'offset': -120
// 		}
// 	],
// 	'Seychelles': [
// 		{
// 			'name': 'Asia/Dubai',
// 			'offset': -240
// 		},
// 		{
// 			'name': 'Indian/Mahe',
// 			'offset': -240
// 		}
// 	],
// 	'Sierra Leone': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Freetown',
// 			'offset': 0
// 		}
// 	],
// 	'Singapore': [
// 		{
// 			'name': 'Asia/Singapore',
// 			'offset': -480
// 		}
// 	],
// 	'Sint Maarten': [
// 		{
// 			'name': 'America/Lower_Princes',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Slovakia': [
// 		{
// 			'name': 'Europe/Bratislava',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Prague',
// 			'offset': -120
// 		}
// 	],
// 	'Slovenia': [
// 		{
// 			'name': 'Europe/Belgrade',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Ljubljana',
// 			'offset': -120
// 		}
// 	],
// 	'Solomon Islands': [
// 		{
// 			'name': 'Pacific/Guadalcanal',
// 			'offset': -660
// 		}
// 	],
// 	'Somalia': [
// 		{
// 			'name': 'Africa/Mogadishu',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		}
// 	],
// 	'South Africa': [
// 		{
// 			'name': 'Africa/Johannesburg',
// 			'offset': -120
// 		}
// 	],
// 	'South Georgia & South Sandwich Islands': [
// 		{
// 			'name': 'Atlantic/South_Georgia',
// 			'offset': 120
// 		}
// 	],
// 	'South Korea': [
// 		{
// 			'name': 'Asia/Seoul',
// 			'offset': -540
// 		}
// 	],
// 	'South Sudan': [
// 		{
// 			'name': 'Africa/Juba',
// 			'offset': -120
// 		}
// 	],
// 	'Spain': [
// 		{
// 			'name': 'Africa/Ceuta',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Atlantic/Canary',
// 			'offset': -60
// 		},
// 		{
// 			'name': 'Europe/Madrid',
// 			'offset': -120
// 		}
// 	],
// 	'Sri Lanka': [
// 		{
// 			'name': 'Asia/Colombo',
// 			'offset': -330
// 		}
// 	],
// 	'St. Barthélemy': [
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/St_Barthelemy',
// 			'offset': 240
// 		}
// 	],
// 	'St. Helena': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Atlantic/St_Helena',
// 			'offset': 0
// 		}
// 	],
// 	'St. Kitts & Nevis': [
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/St_Kitts',
// 			'offset': 240
// 		}
// 	],
// 	'St. Lucia': [
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/St_Lucia',
// 			'offset': 240
// 		}
// 	],
// 	'St. Martin': [
// 		{
// 			'name': 'America/Marigot',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'St. Pierre & Miquelon': [
// 		{
// 			'name': 'America/Miquelon',
// 			'offset': 120
// 		}
// 	],
// 	'St. Vincent & Grenadines': [
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/St_Vincent',
// 			'offset': 240
// 		}
// 	],
// 	'Sudan': [
// 		{
// 			'name': 'Africa/Khartoum',
// 			'offset': -120
// 		}
// 	],
// 	'Suriname': [
// 		{
// 			'name': 'America/Paramaribo',
// 			'offset': 180
// 		}
// 	],
// 	'Svalbard & Jan Mayen': [
// 		{
// 			'name': 'Arctic/Longyearbyen',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Berlin',
// 			'offset': -120
// 		}
// 	],
// 	'Sweden': [
// 		{
// 			'name': 'Europe/Berlin',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Stockholm',
// 			'offset': -120
// 		}
// 	],
// 	'Switzerland': [
// 		{
// 			'name': 'Europe/Zurich',
// 			'offset': -120
// 		}
// 	],
// 	'Syria': [
// 		{
// 			'name': 'Asia/Damascus',
// 			'offset': -180
// 		}
// 	],
// 	'Taiwan': [
// 		{
// 			'name': 'Asia/Taipei',
// 			'offset': -480
// 		}
// 	],
// 	'Tajikistan': [
// 		{
// 			'name': 'Asia/Dushanbe',
// 			'offset': -300
// 		}
// 	],
// 	'Tanzania': [
// 		{
// 			'name': 'Africa/Dar_es_Salaam',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		}
// 	],
// 	'Thailand': [
// 		{
// 			'name': 'Asia/Bangkok',
// 			'offset': -420
// 		}
// 	],
// 	'Timor-Leste': [
// 		{
// 			'name': 'Asia/Dili',
// 			'offset': -540
// 		}
// 	],
// 	'Togo': [
// 		{
// 			'name': 'Africa/Abidjan',
// 			'offset': 0
// 		},
// 		{
// 			'name': 'Africa/Lome',
// 			'offset': 0
// 		}
// 	],
// 	'Tokelau': [
// 		{
// 			'name': 'Pacific/Fakaofo',
// 			'offset': -780
// 		}
// 	],
// 	'Tonga': [
// 		{
// 			'name': 'Pacific/Tongatapu',
// 			'offset': -780
// 		}
// 	],
// 	'Trinidad & Tobago': [
// 		{
// 			'name': 'America/Port_of_Spain',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		}
// 	],
// 	'Tunisia': [
// 		{
// 			'name': 'Africa/Tunis',
// 			'offset': -60
// 		}
// 	],
// 	'Türkiye': [
// 		{
// 			'name': 'Europe/Istanbul',
// 			'offset': -180
// 		}
// 	],
// 	'Turkmenistan': [
// 		{
// 			'name': 'Asia/Ashgabat',
// 			'offset': -300
// 		}
// 	],
// 	'Turks & Caicos Islands': [
// 		{
// 			'name': 'America/Grand_Turk',
// 			'offset': 240
// 		}
// 	],
// 	'Tuvalu': [
// 		{
// 			'name': 'Pacific/Funafuti',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Pacific/Tarawa',
// 			'offset': -720
// 		}
// 	],
// 	'U.S. Outlying Islands': [
// 		{
// 			'name': 'Pacific/Midway',
// 			'offset': 660
// 		},
// 		{
// 			'name': 'Pacific/Pago_Pago',
// 			'offset': 660
// 		},
// 		{
// 			'name': 'Pacific/Tarawa',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Pacific/Wake',
// 			'offset': -720
// 		}
// 	],
// 	'U.S. Virgin Islands': [
// 		{
// 			'name': 'America/Puerto_Rico',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/St_Thomas',
// 			'offset': 240
// 		}
// 	],
// 	'Uganda': [
// 		{
// 			'name': 'Africa/Kampala',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Africa/Nairobi',
// 			'offset': -180
// 		}
// 	],
// 	'Ukraine': [
// 		{
// 			'name': 'Europe/Kyiv',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Europe/Simferopol',
// 			'offset': -180
// 		}
// 	],
// 	'United Arab Emirates': [
// 		{
// 			'name': 'Asia/Dubai',
// 			'offset': -240
// 		}
// 	],
// 	'United Kingdom': [
// 		{
// 			'name': 'Europe/London',
// 			'offset': -60
// 		}
// 	],
// 	'United States': [
// 		{
// 			'name': 'America/Adak',
// 			'offset': 540
// 		},
// 		{
// 			'name': 'America/Anchorage',
// 			'offset': 480
// 		},
// 		{
// 			'name': 'America/Boise',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Chicago',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Denver',
// 			'offset': 360
// 		},
// 		{
// 			'name': 'America/Detroit',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Indiana/Indianapolis',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Indiana/Knox',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Indiana/Marengo',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Indiana/Petersburg',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Indiana/Tell_City',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Indiana/Vevay',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Indiana/Vincennes',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Indiana/Winamac',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Juneau',
// 			'offset': 480
// 		},
// 		{
// 			'name': 'America/Kentucky/Louisville',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Kentucky/Monticello',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Los_Angeles',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Menominee',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Metlakatla',
// 			'offset': 480
// 		},
// 		{
// 			'name': 'America/New_York',
// 			'offset': 240
// 		},
// 		{
// 			'name': 'America/Nome',
// 			'offset': 480
// 		},
// 		{
// 			'name': 'America/North_Dakota/Beulah',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/North_Dakota/Center',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/North_Dakota/New_Salem',
// 			'offset': 300
// 		},
// 		{
// 			'name': 'America/Phoenix',
// 			'offset': 420
// 		},
// 		{
// 			'name': 'America/Sitka',
// 			'offset': 480
// 		},
// 		{
// 			'name': 'America/Yakutat',
// 			'offset': 480
// 		},
// 		{
// 			'name': 'Pacific/Honolulu',
// 			'offset': 600
// 		}
// 	],
// 	'Uruguay': [
// 		{
// 			'name': 'America/Montevideo',
// 			'offset': 180
// 		}
// 	],
// 	'Uzbekistan': [
// 		{
// 			'name': 'Asia/Samarkand',
// 			'offset': -300
// 		},
// 		{
// 			'name': 'Asia/Tashkent',
// 			'offset': -300
// 		}
// 	],
// 	'Vanuatu': [
// 		{
// 			'name': 'Pacific/Efate',
// 			'offset': -660
// 		}
// 	],
// 	'Vatican City': [
// 		{
// 			'name': 'Europe/Rome',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Europe/Vatican',
// 			'offset': -120
// 		}
// 	],
// 	'Venezuela': [
// 		{
// 			'name': 'America/Caracas',
// 			'offset': 240
// 		}
// 	],
// 	'Vietnam': [
// 		{
// 			'name': 'Asia/Bangkok',
// 			'offset': -420
// 		},
// 		{
// 			'name': 'Asia/Ho_Chi_Minh',
// 			'offset': -420
// 		}
// 	],
// 	'Wallis & Futuna': [
// 		{
// 			'name': 'Pacific/Tarawa',
// 			'offset': -720
// 		},
// 		{
// 			'name': 'Pacific/Wallis',
// 			'offset': -720
// 		}
// 	],
// 	'Western Sahara': [
// 		{
// 			'name': 'Africa/El_Aaiun',
// 			'offset': -60
// 		}
// 	],
// 	'Yemen': [
// 		{
// 			'name': 'Asia/Aden',
// 			'offset': -180
// 		},
// 		{
// 			'name': 'Asia/Riyadh',
// 			'offset': -180
// 		}
// 	],
// 	'Zambia': [
// 		{
// 			'name': 'Africa/Lusaka',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Maputo',
// 			'offset': -120
// 		}
// 	],
// 	'Zimbabwe': [
// 		{
// 			'name': 'Africa/Harare',
// 			'offset': -120
// 		},
// 		{
// 			'name': 'Africa/Maputo',
// 			'offset': -120
// 		}
// 	]
// }

// export const loadCountryTimeZones = (locale: 'en' | 'ru'): CountryTimeZoneMap => {
// 	switch (locale) {
// 		case 'en': return countryTimeZoneMapEn
// 		case 'ru': return countryTimeZoneMapRu
// 		default: return countryTimeZoneMapEn
// 	}
// }

// const getCountriesList = (countriesTimeZoneMap: CountryTimeZoneMap): string[] => {
// 	return Object.keys(countriesTimeZoneMap).sort();
// };

// export const loadCountries = (locale: 'en' | 'ru'): string[] => {
// 	switch (locale) {
// 		case 'ru':
// 			return getCountriesList(countryTimeZoneMapRu);
// 		case 'en':
// 			return getCountriesList(countryTimeZoneMapEn);
// 		default:
// 			return getCountriesList(countryTimeZoneMapEn);
// 	}
// };

// import moment from 'moment-timezone';
// function getLocalizedCountryNames(countries: string[], locale: string): CountryCodeAndName[] {
// 	const regionNames = new Intl.DisplayNames([locale], { type: 'region' });
// 	return countries.map(countryCode => ({
// 		countryCode,
// 		countryName: regionNames.of(countryCode) ?? countryCode
// 	}));
// }

// function getCountriesWithTimeZones(locale: string): CountryTimeZoneMap {
// 	const countryCodes = moment.tz.countries();
// 	const localizedCountries = getLocalizedCountryNames(countryCodes, locale);
// 	const countryTimeZones: CountryTimeZone[] = localizedCountries.map(country => {
// 		const zones = moment.tz.zonesForCountry(country.countryCode, true) as TimeZoneInfo[];
// 		return {
// 			...country,
// 			zones
// 		};
// 	});

// 	// Сортировка стран по названию
// 	countryTimeZones.sort((a, b) => a.countryName.localeCompare(b.countryName));

// 	// Преобразование в объект с ключом по названию страны
// 	const countryTimeZoneMap: CountryTimeZoneMap = {};
// 	countryTimeZones.forEach(country => {
// 		countryTimeZoneMap[country.countryName] = country.zones;
// 	});

// 	return countryTimeZoneMap;
// }

// // Пример использования для русского и английского языков
// const russianTimeZones = getCountriesWithTimeZones('ru');
// const englishTimeZones = getCountriesWithTimeZones('en');
// // console.log(russianTimeZones);
// // console.log(englishTimeZones);