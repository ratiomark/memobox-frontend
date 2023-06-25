import _ from 'lodash'
const shelves = [
	{
		'id': '648c920baa3edb04cec38442',
		'index': 0,
		'isCollapsed': false,
		'title': 'math',
		'boxesData': [
			{
				'_id': '648c920b72600d6e8a083121',
				'index': 0,
				'specialType': 'new',
				'data': {
					'all': 6
				}
			},
			{
				'_id': '648c920b658987f904c91de8',
				'index': 1,
				'specialType': 'none',
				'data': {
					'all': 11,
					'train': 5,
					'wait': 6
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920b4e92c440326da23b',
				'index': 2,
				'specialType': 'none',
				'data': {
					'all': 9,
					'train': 4,
					'wait': 5
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920b3a0af0c593c0089e',
				'index': 3,
				'specialType': 'none',
				'data': {
					'all': 10,
					'train': 5,
					'wait': 5
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920b42ff6a183c9537e2',
				'index': 4,
				'specialType': 'none',
				'data': {
					'all': 12,
					'train': 7,
					'wait': 5
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920bb89bead4305761a6',
				'index': 5,
				'specialType': 'learnt',
				'data': {
					'all': 6,
					'train': 4,
					'wait': 2
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			}
		],
		'data': {
			'all': 54,
			'train': 25,
			'wait': 23
		}
	},
	{
		'id': '648c920b3e40b5930a6e1603',
		'index': 1,
		'isCollapsed': true,
		'title': 'books',
		'boxesData': [
			{
				'_id': '648c920bc3e7e23e046d84d4',
				'index': 0,
				'specialType': 'new',
				'data': {
					'all': 4
				}
			},
			{
				'_id': '648c920b1e98e062cccbddd0',
				'index': 1,
				'specialType': 'none',
				'data': {
					'all': 11,
					'train': 5,
					'wait': 6
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920beed2f369ce36956b',
				'index': 2,
				'specialType': 'none',
				'data': {
					'all': 4,
					'train': 1,
					'wait': 3
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920b0d275a1c78856870',
				'index': 3,
				'specialType': 'none',
				'data': {
					'all': 9,
					'train': 6,
					'wait': 3
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920b8d625846cc72c887',
				'index': 4,
				'specialType': 'none',
				'data': {
					'all': 8,
					'train': 5,
					'wait': 3
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920bb47b52fcdc46b742',
				'index': 5,
				'specialType': 'learnt',
				'data': {
					'all': 8,
					'train': 2,
					'wait': 6
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			}
		],
		'data': {
			'all': 44,
			'train': 19,
			'wait': 21
		}
	},
	{
		'id': '648c920b6adf96517748f3c1',
		'index': 2,
		'isCollapsed': true,
		'title': 'английский',
		'boxesData': [
			{
				'_id': '648c920bb9f34563e51dc7c2',
				'index': 0,
				'specialType': 'new',
				'data': {
					'all': 3
				}
			},
			{
				'_id': '648c920b1ab0db449c60fa6c',
				'index': 1,
				'specialType': 'none',
				'data': {
					'all': 5,
					'train': 3,
					'wait': 2
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920bf46cf9b533a32075',
				'index': 2,
				'specialType': 'none',
				'data': {
					'all': 11,
					'train': 5,
					'wait': 6
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920bf5f065d98a38788b',
				'index': 3,
				'specialType': 'none',
				'data': {
					'all': 13,
					'train': 6,
					'wait': 7
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920baf3426c25284a0a1',
				'index': 4,
				'specialType': 'none',
				'data': {
					'all': 4,
					'train': 1,
					'wait': 3
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920baf3426c2528sdaf0a1',
				'index': 5,
				'specialType': 'learnt',
				'data': {
					'all': 4,
					'train': 1,
					'wait': 3
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			}
		],
		'data': {
			'all': 36,
			'train': 15,
			'wait': 18
		}
	},
	{
		'id': '648c920b07d1f8f9ed46604e',
		'index': 3,
		'isCollapsed': true,
		'title': 'facts',
		'boxesData': [
			{
				'_id': '648c920bb26ca5ad01d95fc4',
				'index': 0,
				'specialType': 'new',
				'data': {
					'all': 2
				}
			},
			{
				'_id': '648c920be2995e8d1c585be5',
				'index': 1,
				'specialType': 'none',
				'data': {
					'all': 10,
					'train': 7,
					'wait': 3
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920bddc77c636d511d81',
				'index': 2,
				'specialType': 'none',
				'data': {
					'all': 11,
					'train': 7,
					'wait': 4
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920b609485fe207e7da6',
				'index': 3,
				'specialType': 'none',
				'data': {
					'all': 6,
					'train': 2,
					'wait': 4
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920b609485fe207easf6',
				'index': 4,
				'specialType': 'none',
				'data': {
					'all': 6,
					'train': 2,
					'wait': 4
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920b609485fe207easfia23f6',
				'index': 5,
				'specialType': 'learnt',
				'data': {
					'all': 6,
					'train': 2,
					'wait': 4
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			}
		],
		'data': {
			'all': 29,
			'train': 16,
			'wait': 11
		}
	},
	{
		'id': '648c920beba56ba6cd7db7bb',
		'index': 4,
		'isCollapsed': true,
		'title': 'biology',
		'boxesData': [
			{
				'_id': '648c920b2b1955290236f2b0',
				'index': 0,
				'specialType': 'new',
				'data': {
					'all': 2
				}
			},
			{
				'_id': '648c920b695caf7cf2f9ea31',
				'index': 1,
				'specialType': 'none',
				'data': {
					'all': 9,
					'train': 5,
					'wait': 4
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920b62fc2a35ca871cbd',
				'index': 2,
				'specialType': 'none',
				'data': {
					'all': 6,
					'train': 4,
					'wait': 2
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920b7212942e717eb194',
				'index': 3,
				'specialType': 'none',
				'data': {
					'all': 9,
					'train': 7,
					'wait': 2
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920bf67015fa3e6de0f1',
				'index': 4,
				'specialType': 'none',
				'data': {
					'all': 10,
					'train': 3,
					'wait': 7
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			},
			{
				'_id': '648c920bfcd36e426938b758',
				'index': 5,
				'specialType': 'learnt',
				'data': {
					'all': 12,
					'train': 5,
					'wait': 7
				},
				'timing': {
					'minutes': 0,
					'hours': 0,
					'days': 0,
					'weeks': 0,
					'months': 0
				}
			}
		],
		'data': {
			'all': 48,
			'train': 24,
			'wait': 22
		}
	}
]
const shelvesBoxObject = shelves.reduce((acc, curr) => {
	acc[curr.id] = {}
	curr.boxesData.map(box => {
		acc[curr.id][box.index] = box._id
	})
	return acc
}, {})

const cards = [
	{
		'_id': '6495b7a7f020e4bd7077882a',
		'box': 3,
		'index': 0,
		'shelf': '648c920baa3edb04cec38442',
		'state': 'wait',
		'answer': 'Irure qui quis ut laborum enim consequat esse. Labore ad sint consequat pariatur ullamco aute exercitation aliqua ex non ipsum do eu.',
		'question': 'Veniam occaecat irure sit veniam ex et dolore sint sint duis cillum consectetur. Dolor excepteur aliqua ex et in excepteur enim.',
		'createdAt': '2022-04-18T20:09:49.091Z',
		'specialType': 'none',
		'lastTraining': '2022-05-14T20:09:49.091Z'
	},
	{
		'_id': '6495b7a747f3edcc8d6abebf',
		'box': 4,
		'index': 1,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'wait',
		'answer': 'Mollit non nisi minim mollit. Qui fugiat eiusmod irure laboris amet minim non magna.',
		'question': 'Cupidatat pariatur voluptate enim amet in cillum excepteur nisi officia aliqua culpa et fugiat nostrud. Lorem officia ipsum enim ea sunt ea veniam consectetur ad minim excepteur sint amet.',
		'createdAt': '2022-03-24T03:49:00.458Z',
		'specialType': 'none',
		'lastTraining': '2022-05-30T03:49:00.458Z'
	},
	{
		'_id': '6495b7a798c781483f98ceee',
		'box': 1,
		'index': 2,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'train',
		'answer': 'Ea nisi do magna consectetur do. Enim eiusmod duis sit dolor mollit amet ullamco reprehenderit culpa fugiat pariatur officia.',
		'question': 'Id amet cillum enim et et esse ullamco commodo. Velit enim mollit minim ullamco eiusmod fugiat in ullamco esse excepteur.',
		'createdAt': '2022-09-25T03:37:59.319Z',
		'specialType': 'none',
		'lastTraining': '2022-11-15T03:37:59.319Z'
	},
	{
		'_id': '6495b7a75a3b171928b6aaa8',
		'box': 0,
		'index': 3,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'train',
		'answer': 'Dolore anim Lorem cupidatat consequat. Aliqua tempor mollit ad amet deserunt laborum.',
		'question': 'Laborum ad reprehenderit sunt aute labore aliqua ad nulla quis nisi. Laborum incididunt duis velit ullamco eu aliqua amet amet incididunt ex nulla.',
		'createdAt': '2022-05-24T21:03:22.848Z',
		'specialType': 'new',
		'lastTraining': '2022-06-26T21:03:22.848Z'
	},
	{
		'_id': '6495b7a72d799f4379131df3',
		'box': 1,
		'index': 4,
		'shelf': '648c920beba56ba6cd7db7bb',
		'state': 'wait',
		'answer': 'Aute qui et labore occaecat culpa et aute ullamco consectetur eu consectetur. Nostrud aliquip ipsum elit dolor aute aute exercitation voluptate reprehenderit cupidatat consectetur adipisicing qui.',
		'question': 'Minim irure magna proident consequat non consectetur esse Lorem ea laboris proident fugiat. In nostrud pariatur cupidatat commodo anim labore irure reprehenderit enim.',
		'createdAt': '2022-01-29T08:34:32.106Z',
		'specialType': 'none',
		'lastTraining': '2022-03-31T08:34:32.106Z'
	},
	{
		'_id': '6495b7a7750b26a2cf46b683',
		'box': 3,
		'index': 5,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'wait',
		'answer': 'Tempor eu veniam nulla eiusmod tempor sunt voluptate cillum sint consequat sit eu velit. Irure in ullamco labore quis nulla.',
		'question': 'Est ex voluptate reprehenderit mollit ea tempor labore occaecat amet dolore in reprehenderit amet. Cillum esse eu reprehenderit incididunt id Lorem esse elit irure.',
		'createdAt': '2022-02-05T08:07:34.065Z',
		'specialType': 'none',
		'lastTraining': '2022-05-05T08:07:34.065Z'
	},
	{
		'_id': '6495b7a79f07c371e01a1034',
		'box': 2,
		'index': 6,
		'shelf': '648c920beba56ba6cd7db7bb',
		'state': 'wait',
		'answer': 'Velit tempor adipisicing anim tempor ullamco fugiat voluptate consequat deserunt veniam voluptate sunt nulla. Proident culpa nulla nulla adipisicing.',
		'question': 'Irure occaecat ullamco magna ad minim fugiat incididunt ut consectetur mollit sunt. Aute nisi pariatur est labore voluptate do excepteur laboris.',
		'createdAt': '2022-06-18T07:54:30.147Z',
		'specialType': 'none',
		'lastTraining': '2022-08-03T07:54:30.147Z'
	},
	{
		'_id': '6495b7a72bf30fc72c727f2c',
		'box': 3,
		'index': 7,
		'shelf': '648c920baa3edb04cec38442',
		'state': 'train',
		'answer': 'Consequat cupidatat fugiat laborum consequat ex irure aliquip Lorem in. Sint sit laborum laboris veniam consequat et officia.',
		'question': 'Veniam anim magna Lorem ut eu et tempor adipisicing mollit eiusmod. Occaecat magna fugiat voluptate consequat irure labore duis ad ipsum et ipsum proident.',
		'createdAt': '2022-09-06T10:03:07.764Z',
		'specialType': 'none',
		'lastTraining': '2022-10-18T10:03:07.764Z'
	},
	{
		'_id': '6495b7a7d6895feb7acab47d',
		'box': 1,
		'index': 8,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'wait',
		'answer': 'Sit laboris quis nisi elit nulla aliqua magna commodo nulla consectetur laborum pariatur non. Incididunt adipisicing irure consequat minim ut.',
		'question': 'Exercitation dolor minim amet veniam quis aliqua. Esse elit amet ex esse minim ad consequat deserunt amet et quis fugiat qui.',
		'createdAt': '2022-06-23T20:45:39.072Z',
		'specialType': 'none',
		'lastTraining': '2022-07-24T20:45:39.072Z'
	},
	{
		'_id': '6495b7a71ba48dc5128d85c3',
		'box': 5,
		'index': 9,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'train',
		'answer': 'Lorem et magna ex eu ad labore anim do minim tempor qui et. Laboris pariatur nisi proident enim cupidatat sint est non.',
		'question': 'Ex veniam ipsum voluptate incididunt officia laboris. Lorem deserunt duis velit est dolor laboris est eiusmod exercitation aute id occaecat sit ullamco.',
		'createdAt': '2022-10-31T18:15:25.499Z',
		'specialType': 'learnt',
		'lastTraining': '2023-01-21T18:15:25.499Z'
	},
	{
		'_id': '6495b7a7ba5ce635a644f36e',
		'box': 2,
		'index': 10,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'wait',
		'answer': 'Labore tempor Lorem proident enim. Quis elit laborum est consectetur irure non cupidatat cillum commodo do.',
		'question': 'Deserunt irure tempor deserunt sit qui tempor do dolore eu laboris reprehenderit fugiat voluptate magna. Amet ut enim consectetur do sit excepteur fugiat amet fugiat officia id velit eiusmod eiusmod.',
		'createdAt': '2022-10-21T19:21:44.223Z',
		'specialType': 'none',
		'lastTraining': '2022-12-27T19:21:44.223Z'
	},
	{
		'_id': '6495b7a76a66ed6390ef518c',
		'box': 3,
		'index': 11,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'wait',
		'answer': 'Qui amet eu ex elit tempor sunt deserunt est pariatur proident anim nulla aute anim. Enim est adipisicing consectetur ad aliqua exercitation occaecat culpa proident.',
		'question': 'Ullamco sunt labore laborum cillum adipisicing excepteur nulla esse sunt mollit et officia cillum. Ex culpa elit ullamco pariatur veniam irure cillum occaecat aute commodo minim id commodo duis.',
		'createdAt': '2022-02-22T17:28:30.251Z',
		'specialType': 'none',
		'lastTraining': '2022-03-24T17:28:30.251Z'
	},
	{
		'_id': '6495b7a76dc73aad1d0aa1d3',
		'box': 4,
		'index': 12,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'wait',
		'answer': 'Magna voluptate Lorem deserunt do minim aute ullamco ex culpa labore. Sint proident est velit anim esse ad ea aliquip labore sint ea aute in deserunt.',
		'question': 'Aute elit ut incididunt ad magna eiusmod aute enim esse. Id magna incididunt est amet anim et do fugiat est ex do occaecat in enim.',
		'createdAt': '2022-05-13T02:58:44.624Z',
		'specialType': 'none',
		'lastTraining': '2022-07-17T02:58:44.624Z'
	},
	{
		'_id': '6495b7a724557c692a89b558',
		'box': 5,
		'index': 13,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'wait',
		'answer': 'Eu exercitation sunt mollit labore occaecat cillum minim exercitation commodo ut officia ex. Minim in fugiat sunt non dolor elit ex enim aliquip adipisicing sint.',
		'question': 'Sint commodo nostrud qui non consectetur enim amet amet. Ea quis est aute id excepteur velit esse aliqua.',
		'createdAt': '2022-05-03T17:47:37.285Z',
		'specialType': 'learnt',
		'lastTraining': '2022-07-19T17:47:37.285Z'
	},
	{
		'_id': '6495b7a76bd2876b489335f3',
		'box': 4,
		'index': 14,
		'shelf': '648c920beba56ba6cd7db7bb',
		'state': 'wait',
		'answer': 'Aute labore labore Lorem tempor consequat qui ex est pariatur pariatur et ut. Culpa dolor laboris consequat qui tempor quis dolore et aliquip ullamco dolor incididunt.',
		'question': 'Labore culpa ut mollit adipisicing adipisicing duis eiusmod. Eiusmod ea sunt sunt aliqua labore mollit dolore dolore aliqua.',
		'createdAt': '2022-07-31T11:00:03.210Z',
		'specialType': 'none',
		'lastTraining': '2022-10-02T11:00:03.210Z'
	},
	{
		'_id': '6495b7a727d107ebd1859e4b',
		'box': 0,
		'index': 15,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'train',
		'answer': 'Esse quis culpa do cillum culpa cillum voluptate commodo nostrud mollit reprehenderit enim occaecat consectetur. Aliqua incididunt ea quis anim eu laboris officia.',
		'question': 'Ea excepteur anim qui Lorem officia irure consequat deserunt cillum culpa eiusmod anim. Cillum consequat minim mollit voluptate enim nostrud incididunt non minim mollit.',
		'createdAt': '2022-10-06T01:40:22.066Z',
		'specialType': 'new',
		'lastTraining': '2022-12-12T01:40:22.066Z'
	},
	{
		'_id': '6495b7a7d12840fb63a6b65c',
		'box': 0,
		'index': 16,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'train',
		'answer': 'Ut reprehenderit in exercitation officia magna esse aliqua esse sint labore id voluptate. Esse sunt proident ut ut cillum ad quis sunt aute laborum qui quis ex non.',
		'question': 'Incididunt fugiat minim commodo quis do adipisicing voluptate enim aliqua veniam exercitation incididunt voluptate. Irure ea incididunt minim dolor.',
		'createdAt': '2022-01-31T08:36:08.269Z',
		'specialType': 'new',
		'lastTraining': '2022-03-27T08:36:08.269Z'
	},
	{
		'_id': '6495b7a78e1f137c37d9ba6e',
		'box': 5,
		'index': 17,
		'shelf': '648c920baa3edb04cec38442',
		'state': 'wait',
		'answer': 'Ullamco sit consequat aliqua esse aute. In veniam irure dolore amet proident proident et et est eu reprehenderit excepteur Lorem anim.',
		'question': 'Voluptate minim duis adipisicing quis dolore fugiat. Nisi dolore voluptate ex ea nisi id est.',
		'createdAt': '2022-02-14T06:28:37.209Z',
		'specialType': 'learnt',
		'lastTraining': '2022-04-07T06:28:37.209Z'
	},
	{
		'_id': '6495b7a7020702a3718f8a93',
		'box': 5,
		'index': 18,
		'shelf': '648c920baa3edb04cec38442',
		'state': 'train',
		'answer': 'Ex consectetur nisi sint consequat laborum. Aliquip elit veniam amet nisi.',
		'question': 'Commodo fugiat officia qui laboris minim nulla tempor nulla amet nostrud laboris Lorem. Incididunt irure amet et commodo veniam incididunt pariatur.',
		'createdAt': '2022-06-12T17:33:10.526Z',
		'specialType': 'learnt',
		'lastTraining': '2022-08-26T17:33:10.526Z'
	},
	{
		'_id': '6495b7a7ae0d4e9cb055ba42',
		'box': 0,
		'index': 19,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'train',
		'answer': 'Mollit amet est magna laboris non occaecat eu ipsum. Occaecat duis duis consequat nulla tempor.',
		'question': 'Id quis anim esse laborum sit consequat nostrud eu. Proident magna ullamco consequat eu.',
		'createdAt': '2022-06-14T02:15:07.468Z',
		'specialType': 'new',
		'lastTraining': '2022-07-22T02:15:07.468Z'
	},
	{
		'_id': '6495b7a7df1ecc84c333fd5a',
		'box': 1,
		'index': 20,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'train',
		'answer': 'Quis irure minim deserunt occaecat Lorem Lorem et excepteur. Duis irure aute irure mollit minim labore magna.',
		'question': 'Laboris nulla tempor consequat officia velit in fugiat ad exercitation aliquip magna ea. Duis consectetur culpa deserunt exercitation cupidatat aliqua anim occaecat ut.',
		'createdAt': '2022-03-11T00:44:55.479Z',
		'specialType': 'none',
		'lastTraining': '2022-06-09T00:44:55.479Z'
	},
	{
		'_id': '6495b7a7e1278b04749ffdc9',
		'box': 0,
		'index': 21,
		'shelf': '648c920baa3edb04cec38442',
		'state': 'train',
		'answer': 'Ullamco laboris dolor id ad aliqua in occaecat incididunt est elit ex. Est laborum adipisicing aute et duis sint do commodo nulla dolor proident.',
		'question': 'Voluptate culpa exercitation id occaecat culpa exercitation quis excepteur cillum quis culpa laborum nulla amet. Officia aliquip in ea velit ex ut reprehenderit tempor aute quis.',
		'createdAt': '2022-09-26T07:45:53.868Z',
		'specialType': 'new',
		'lastTraining': '2022-11-09T07:45:53.868Z'
	},
	{
		'_id': '6495b7a7e6298a5dc8e459ae',
		'box': 4,
		'index': 22,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'train',
		'answer': 'Amet et mollit aliquip quis proident esse velit dolor. Dolor exercitation sit ut ex laboris dolor eu consectetur irure dolore consectetur cupidatat.',
		'question': 'Magna nostrud minim est dolore fugiat. In laborum nisi sit dolore voluptate non culpa cillum proident dolor sunt id.',
		'createdAt': '2022-03-18T07:29:39.487Z',
		'specialType': 'none',
		'lastTraining': '2022-05-13T07:29:39.487Z'
	},
	{
		'_id': '6495b7a7e13a2bc496206d4d',
		'box': 3,
		'index': 23,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'train',
		'answer': 'Aliqua esse commodo fugiat proident labore reprehenderit ullamco et. Ex esse commodo amet sint fugiat deserunt dolore enim quis tempor ad fugiat ad est.',
		'question': 'Veniam incididunt ullamco ut quis dolor dolor eiusmod velit esse nostrud. Id nostrud est esse tempor proident.',
		'createdAt': '2022-01-07T06:24:28.361Z',
		'specialType': 'none',
		'lastTraining': '2022-04-06T06:24:28.361Z'
	},
	{
		'_id': '6495b7a7803e985f8a8f4821',
		'box': 4,
		'index': 24,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'train',
		'answer': 'Fugiat tempor in non in labore cupidatat amet eiusmod mollit eu. Ullamco aliquip sit aliqua do reprehenderit proident sunt labore.',
		'question': 'Laboris cupidatat ad in voluptate eiusmod cupidatat eiusmod labore ad in ipsum ea incididunt. Qui veniam dolor qui veniam aliqua cupidatat voluptate in exercitation reprehenderit in.',
		'createdAt': '2022-08-24T01:46:56.695Z',
		'specialType': 'none',
		'lastTraining': '2022-08-31T01:46:56.695Z'
	},
	{
		'_id': '6495b7a79271d03672f1d1ea',
		'box': 4,
		'index': 25,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'train',
		'answer': 'Quis voluptate Lorem mollit eiusmod nulla minim ipsum irure do. Eiusmod consectetur velit aliquip in irure excepteur.',
		'question': 'Esse sit occaecat eu nulla culpa eu do minim. Velit voluptate dolore excepteur nulla sunt ea labore nisi aute occaecat magna.',
		'createdAt': '2022-07-14T05:19:56.279Z',
		'specialType': 'none',
		'lastTraining': '2022-08-19T05:19:56.279Z'
	},
	{
		'_id': '6495b7a7cc14b6f2accf408d',
		'box': 3,
		'index': 26,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'wait',
		'answer': 'Deserunt dolore voluptate incididunt voluptate ex in officia. Labore officia amet culpa ullamco nostrud.',
		'question': 'Ut id est ullamco irure deserunt deserunt aute non. Sint reprehenderit mollit exercitation fugiat exercitation nulla do ad sunt.',
		'createdAt': '2022-01-05T19:03:23.514Z',
		'specialType': 'none',
		'lastTraining': '2022-02-13T19:03:23.514Z'
	},
	{
		'_id': '6495b7a7d7e317e8305b0822',
		'box': 0,
		'index': 27,
		'shelf': '648c920beba56ba6cd7db7bb',
		'state': 'train',
		'answer': 'Sit ut qui commodo minim veniam dolore adipisicing culpa ut in exercitation amet. Velit incididunt Lorem ipsum velit non.',
		'question': 'Ullamco laborum magna consequat anim nostrud officia pariatur amet dolor aute irure nulla do. Sint est Lorem do dolor enim reprehenderit nulla occaecat ut ex consequat id.',
		'createdAt': '2022-06-07T09:48:07.359Z',
		'specialType': 'new',
		'lastTraining': '2022-06-16T09:48:07.359Z'
	},
	{
		'_id': '6495b7a76b0eba4bb63a2507',
		'box': 2,
		'index': 28,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'train',
		'answer': 'Labore excepteur duis aliquip voluptate reprehenderit elit voluptate. Qui minim amet eu tempor adipisicing excepteur amet.',
		'question': 'Sint esse qui veniam laborum aliquip consectetur ea officia id esse fugiat deserunt. Consectetur esse laborum culpa consectetur non.',
		'createdAt': '2022-08-21T02:44:26.837Z',
		'specialType': 'none',
		'lastTraining': '2022-09-15T02:44:26.837Z'
	},
	{
		'_id': '6495b7a7780de7cf531248b4',
		'box': 5,
		'index': 29,
		'shelf': '648c920beba56ba6cd7db7bb',
		'state': 'train',
		'answer': 'Ad consequat irure consectetur do anim Lorem Lorem excepteur mollit sint culpa. Excepteur pariatur officia ipsum incididunt nisi nostrud irure deserunt.',
		'question': 'Laboris reprehenderit pariatur velit ea commodo culpa labore. Velit exercitation amet pariatur non aliquip elit reprehenderit laborum nostrud culpa elit minim eiusmod.',
		'createdAt': '2022-08-06T19:43:04.909Z',
		'specialType': 'learnt',
		'lastTraining': '2022-09-21T19:43:04.909Z'
	},
	{
		'_id': '6495b7a7aecc226a88ec760d',
		'box': 5,
		'index': 30,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'wait',
		'answer': 'Reprehenderit ut pariatur exercitation duis tempor duis veniam occaecat sint duis duis. Voluptate commodo aliqua consequat consectetur commodo proident sint sunt.',
		'question': 'Et sunt laborum in labore nisi amet mollit culpa ullamco. Lorem labore ad laboris in quis enim labore velit excepteur.',
		'createdAt': '2022-03-23T15:37:10.551Z',
		'specialType': 'learnt',
		'lastTraining': '2022-03-28T15:37:10.551Z'
	},
	{
		'_id': '6495b7a7fb0091bca4d9424c',
		'box': 3,
		'index': 31,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'wait',
		'answer': 'Ad sunt qui esse ullamco sunt nostrud aliqua fugiat. Cupidatat nulla dolor id duis cupidatat cupidatat amet officia voluptate duis.',
		'question': 'Laborum Lorem quis aliqua excepteur voluptate non nostrud ea enim dolore tempor. Pariatur reprehenderit officia consectetur commodo consectetur mollit proident cillum quis.',
		'createdAt': '2022-02-04T06:57:25.894Z',
		'specialType': 'none',
		'lastTraining': '2022-03-01T06:57:25.894Z'
	},
	{
		'_id': '6495b7a7197b1d343f207fcd',
		'box': 2,
		'index': 32,
		'shelf': '648c920baa3edb04cec38442',
		'state': 'train',
		'answer': 'Officia cillum elit mollit eu ipsum fugiat tempor minim velit quis dolor. Non duis aliqua eiusmod id et reprehenderit sit amet esse anim dolor velit adipisicing culpa.',
		'question': 'Est nostrud adipisicing adipisicing ex cupidatat reprehenderit ullamco ad labore ex dolore laborum quis. Velit ex enim deserunt consectetur anim eu incididunt labore cupidatat eiusmod aute.',
		'createdAt': '2022-08-14T11:05:24.195Z',
		'specialType': 'none',
		'lastTraining': '2022-09-16T11:05:24.195Z'
	},
	{
		'_id': '6495b7a76d6f8f6dc6e9fcca',
		'box': 4,
		'index': 33,
		'shelf': '648c920beba56ba6cd7db7bb',
		'state': 'train',
		'answer': 'Pariatur est ipsum quis deserunt ex enim culpa sit proident non culpa. Eu aute in non ea ad magna cupidatat minim.',
		'question': 'Ut dolore adipisicing consequat cillum velit esse Lorem incididunt. Laborum quis ea occaecat est.',
		'createdAt': '2022-10-21T09:26:50.722Z',
		'specialType': 'none',
		'lastTraining': '2022-11-24T09:26:50.722Z'
	},
	{
		'_id': '6495b7a74bae498e74254e59',
		'box': 2,
		'index': 34,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'wait',
		'answer': 'Ullamco incididunt proident exercitation deserunt ipsum. Veniam aute dolore laborum laborum labore.',
		'question': 'Consectetur reprehenderit nisi laboris occaecat ad aute excepteur ea in nisi. Sint sint reprehenderit cupidatat do qui occaecat proident exercitation exercitation amet proident do consectetur commodo.',
		'createdAt': '2022-06-28T20:38:52.944Z',
		'specialType': 'none',
		'lastTraining': '2022-07-25T20:38:52.944Z'
	},
	{
		'_id': '6495b7a753937aa5bf97b85e',
		'box': 4,
		'index': 35,
		'shelf': '648c920baa3edb04cec38442',
		'state': 'wait',
		'answer': 'Et ullamco quis ea deserunt ex nostrud non. Dolor culpa aute excepteur sunt minim non quis laborum nulla aute Lorem esse.',
		'question': 'Duis excepteur magna quis officia dolore tempor. Sint Lorem labore incididunt in pariatur cupidatat aliquip sint.',
		'createdAt': '2022-03-25T17:58:27.088Z',
		'specialType': 'none',
		'lastTraining': '2022-05-09T17:58:27.088Z'
	},
	{
		'_id': '6495b7a72473595ebe3e0a05',
		'box': 5,
		'index': 36,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'train',
		'answer': 'Cillum nisi ipsum nisi qui non qui pariatur ea cupidatat deserunt ea dolore incididunt et. Elit quis labore sint in culpa.',
		'question': 'Eiusmod ea sit nulla reprehenderit minim et eiusmod aliqua sit culpa proident. Ut veniam qui minim quis laboris.',
		'createdAt': '2022-11-12T05:54:58.835Z',
		'specialType': 'learnt',
		'lastTraining': '2022-11-21T05:54:58.835Z'
	},
	{
		'_id': '6495b7a79967b92fed7905d2',
		'box': 2,
		'index': 37,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'wait',
		'answer': 'Adipisicing non ullamco officia aute minim culpa pariatur laborum Lorem non fugiat excepteur ut. Officia enim Lorem anim anim et cupidatat ipsum et aute labore consequat labore est anim.',
		'question': 'Sunt do duis aliqua consequat nisi qui sint sint est. Sit esse tempor duis sit velit incididunt laboris sunt est labore esse.',
		'createdAt': '2022-06-06T03:49:00.629Z',
		'specialType': 'none',
		'lastTraining': '2022-06-27T03:49:00.629Z'
	},
	{
		'_id': '6495b7a7f26a45f35778fd20',
		'box': 5,
		'index': 38,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'train',
		'answer': 'Laborum sunt esse Lorem est. Id esse non sunt cillum ea ad.',
		'question': 'Duis magna ex nulla quis qui minim eu labore cillum enim voluptate anim. Labore irure tempor cillum Lorem consectetur duis tempor labore nisi.',
		'createdAt': '2022-06-26T22:33:03.191Z',
		'specialType': 'learnt',
		'lastTraining': '2022-08-25T22:33:03.191Z'
	},
	{
		'_id': '6495b7a7c7f90d4ec334a52a',
		'box': 4,
		'index': 39,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'wait',
		'answer': 'Cupidatat eiusmod veniam ullamco deserunt do sunt nulla culpa dolore id excepteur velit deserunt. Sint Lorem commodo sunt amet non id eiusmod culpa aliquip.',
		'question': 'Reprehenderit velit aute cillum sit pariatur commodo nisi incididunt aute. Tempor magna aliquip laborum Lorem incididunt aliqua magna nulla.',
		'createdAt': '2022-10-29T20:28:02.407Z',
		'specialType': 'none',
		'lastTraining': '2022-12-28T20:28:02.407Z'
	},
	{
		'_id': '6495b7a77f74f6d1ed0bfb63',
		'box': 1,
		'index': 40,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'wait',
		'answer': 'Dolore elit ut cupidatat dolore. Qui labore aute non elit qui laborum duis quis elit ea.',
		'question': 'Est non tempor sit duis. Velit Lorem duis elit ipsum irure aute reprehenderit aliquip.',
		'createdAt': '2022-08-21T02:34:16.558Z',
		'specialType': 'none',
		'lastTraining': '2022-10-23T02:34:16.558Z'
	},
	{
		'_id': '6495b7a7886901f80ac46c46',
		'box': 3,
		'index': 41,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'wait',
		'answer': 'Amet do ipsum velit id eiusmod non Lorem dolore esse nulla. Ut ad culpa aute est ipsum esse velit quis eu excepteur adipisicing adipisicing proident laboris.',
		'question': 'Aute veniam sit occaecat sint magna ipsum mollit in eu voluptate cillum voluptate occaecat. Do officia sit aliquip reprehenderit aliquip magna laboris non labore culpa minim eiusmod.',
		'createdAt': '2022-10-18T23:25:44.852Z',
		'specialType': 'none',
		'lastTraining': '2023-01-04T23:25:44.852Z'
	},
	{
		'_id': '6495b7a7c86bf13ec29670fa',
		'box': 1,
		'index': 42,
		'shelf': '648c920beba56ba6cd7db7bb',
		'state': 'train',
		'answer': 'Labore qui elit nulla laborum dolore quis. Sit amet consectetur cillum sint dolor duis reprehenderit sit elit enim commodo.',
		'question': 'Deserunt enim ullamco occaecat ut culpa reprehenderit quis officia irure tempor Lorem ad. Quis mollit officia fugiat esse.',
		'createdAt': '2022-12-30T18:02:09.479Z',
		'specialType': 'none',
		'lastTraining': '2023-03-18T18:02:09.479Z'
	},
	{
		'_id': '6495b7a7de2bf663d0044235',
		'box': 4,
		'index': 43,
		'shelf': '648c920baa3edb04cec38442',
		'state': 'train',
		'answer': 'Et cupidatat consequat anim minim nisi ut non consequat labore. Aliquip pariatur anim cillum eiusmod Lorem ullamco non.',
		'question': 'Deserunt cupidatat reprehenderit enim pariatur. Non nisi magna excepteur ullamco cillum sint anim minim.',
		'createdAt': '2022-12-28T02:09:07.559Z',
		'specialType': 'none',
		'lastTraining': '2023-02-12T02:09:07.559Z'
	},
	{
		'_id': '6495b7a75c309523bd984d53',
		'box': 0,
		'index': 44,
		'shelf': '648c920beba56ba6cd7db7bb',
		'state': 'train',
		'answer': 'Pariatur veniam magna nostrud mollit. Cupidatat deserunt anim ullamco aliquip enim.',
		'question': 'Anim duis proident elit exercitation est veniam non officia excepteur duis laborum quis voluptate. Amet nostrud Lorem voluptate incididunt amet tempor deserunt in ipsum pariatur.',
		'createdAt': '2022-08-30T09:38:47.352Z',
		'specialType': 'new',
		'lastTraining': '2022-10-06T09:38:47.352Z'
	},
	{
		'_id': '6495b7a75ab78c2c4166dd4e',
		'box': 5,
		'index': 45,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'wait',
		'answer': 'Sunt nostrud esse eu ut cillum minim ad eiusmod reprehenderit. Incididunt reprehenderit labore excepteur laborum mollit aliquip anim do dolore.',
		'question': 'Dolor dolore quis ullamco ut ullamco culpa est labore magna magna nisi labore nisi consequat. Id cupidatat cillum deserunt adipisicing cillum ad et commodo laboris velit sunt aute eu nulla.',
		'createdAt': '2022-01-11T05:58:41.779Z',
		'specialType': 'learnt',
		'lastTraining': '2022-03-16T05:58:41.779Z'
	},
	{
		'_id': '6495b7a7d75577964aac37b1',
		'box': 5,
		'index': 46,
		'shelf': '648c920beba56ba6cd7db7bb',
		'state': 'wait',
		'answer': 'Ipsum consequat sunt in incididunt enim velit. Eu proident adipisicing laboris eu laboris consectetur commodo.',
		'question': 'Deserunt Lorem minim ullamco incididunt labore nisi adipisicing. Magna excepteur velit ut ullamco quis magna pariatur do magna ut qui consequat.',
		'createdAt': '2022-03-31T00:11:28.272Z',
		'specialType': 'learnt',
		'lastTraining': '2022-04-14T00:11:28.272Z'
	},
	{
		'_id': '6495b7a7fd36fe7d31666161',
		'box': 1,
		'index': 47,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'train',
		'answer': 'Quis pariatur Lorem ut Lorem commodo voluptate labore proident non. Voluptate sunt fugiat et ut dolore ipsum occaecat ex dolor nisi sit.',
		'question': 'Commodo magna do occaecat duis. Dolore elit ex irure aliqua aliqua.',
		'createdAt': '2022-09-01T04:15:59.396Z',
		'specialType': 'none',
		'lastTraining': '2022-09-13T04:15:59.396Z'
	},
	{
		'_id': '6495b7a720bc95f0005c94e5',
		'box': 3,
		'index': 48,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'wait',
		'answer': 'Velit voluptate amet elit nostrud do id occaecat dolore consequat. Ullamco velit sit aute deserunt deserunt laborum aliquip tempor.',
		'question': 'Commodo duis cupidatat magna sint sit. Et fugiat exercitation qui quis excepteur.',
		'createdAt': '2022-12-04T15:12:59.491Z',
		'specialType': 'none',
		'lastTraining': '2022-12-27T15:12:59.491Z'
	},
	{
		'_id': '6495b7a75e092bd83046c573',
		'box': 2,
		'index': 49,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'wait',
		'answer': 'Sint enim aliqua consectetur est in aute deserunt reprehenderit minim. Consequat nostrud nisi excepteur nulla anim.',
		'question': 'Mollit Lorem ex esse aliquip veniam cillum. Nisi proident culpa do sit minim tempor mollit est laborum tempor do proident laborum.',
		'createdAt': '2022-03-22T06:10:03.536Z',
		'specialType': 'none',
		'lastTraining': '2022-06-09T06:10:03.536Z'
	},
	{
		'_id': '6495b7a7678c0ac114a28bd3',
		'box': 1,
		'index': 50,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'train',
		'answer': 'Id sit ullamco laborum cupidatat dolore eiusmod elit. Velit veniam officia enim dolore commodo Lorem.',
		'question': 'Excepteur fugiat id nulla culpa eiusmod. Eiusmod incididunt qui do officia adipisicing voluptate incididunt.',
		'createdAt': '2022-03-09T03:30:41.857Z',
		'specialType': 'none',
		'lastTraining': '2022-04-12T03:30:41.857Z'
	},
	{
		'_id': '6495b7a7014e08d05cd63100',
		'box': 3,
		'index': 51,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'train',
		'answer': 'Sunt laborum voluptate nisi nisi sunt eiusmod laborum nisi aliqua dolor dolor est. Ut laborum ipsum consectetur Lorem esse enim reprehenderit ullamco adipisicing ut.',
		'question': 'Dolore elit ipsum fugiat veniam sit aliqua sint eiusmod occaecat labore sint qui labore in. Incididunt minim magna occaecat officia officia ullamco ad consectetur duis esse.',
		'createdAt': '2022-06-14T13:20:33.060Z',
		'specialType': 'none',
		'lastTraining': '2022-07-25T13:20:33.060Z'
	},
	{
		'_id': '6495b7a755af9a92e3b4d428',
		'box': 2,
		'index': 52,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'wait',
		'answer': 'Cillum incididunt est est eu culpa qui occaecat eiusmod officia proident. Qui labore elit in reprehenderit proident do fugiat et in aliquip consequat mollit nostrud.',
		'question': 'Dolor irure pariatur veniam irure commodo aute voluptate reprehenderit labore aliqua. Non nisi voluptate ut non laboris nostrud esse est ea.',
		'createdAt': '2022-11-19T15:56:21.629Z',
		'specialType': 'none',
		'lastTraining': '2023-01-02T15:56:21.629Z'
	},
	{
		'_id': '6495b7a723fda5d762f6cea1',
		'box': 1,
		'index': 53,
		'shelf': '648c920baa3edb04cec38442',
		'state': 'wait',
		'answer': 'Ad adipisicing excepteur proident incididunt. Occaecat ad proident anim eu sit velit nostrud dolore commodo minim.',
		'question': 'Aliquip consequat aliquip est voluptate do deserunt tempor occaecat sunt exercitation. Aliqua ea eiusmod irure aute laborum eiusmod non.',
		'createdAt': '2022-07-05T20:04:50.949Z',
		'specialType': 'none',
		'lastTraining': '2022-07-22T20:04:50.949Z'
	},
	{
		'_id': '6495b7a76db1e6b774e01120',
		'box': 3,
		'index': 54,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'train',
		'answer': 'Nulla et aliquip culpa exercitation cupidatat proident dolore est nulla fugiat sint amet fugiat. Ullamco amet amet anim magna ut.',
		'question': 'Reprehenderit cillum excepteur veniam tempor enim officia occaecat culpa. Exercitation enim est exercitation elit.',
		'createdAt': '2022-08-28T17:49:07.926Z',
		'specialType': 'none',
		'lastTraining': '2022-09-14T17:49:07.926Z'
	},
	{
		'_id': '6495b7a722d8c2f22d279c57',
		'box': 0,
		'index': 55,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'train',
		'answer': 'Occaecat pariatur sit voluptate consequat non reprehenderit proident. Laboris minim mollit laboris anim officia ad commodo do.',
		'question': 'Reprehenderit Lorem do minim commodo incididunt excepteur consectetur dolore veniam quis culpa et. Nulla quis reprehenderit enim pariatur labore culpa.',
		'createdAt': '2022-10-06T15:16:14.942Z',
		'specialType': 'new',
		'lastTraining': '2022-10-22T15:16:14.942Z'
	},
	{
		'_id': '6495b7a753a16d43725ea21c',
		'box': 5,
		'index': 56,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'wait',
		'answer': 'Adipisicing et dolor sint exercitation cupidatat dolor sit labore do nisi commodo adipisicing. Dolor ad aliquip et cupidatat cillum commodo commodo.',
		'question': 'Velit nostrud in in ullamco non velit duis do do culpa velit sit incididunt elit. Excepteur ea pariatur laborum tempor sit fugiat sunt et culpa ipsum consectetur.',
		'createdAt': '2022-01-06T04:21:51.929Z',
		'specialType': 'learnt',
		'lastTraining': '2022-03-27T04:21:51.929Z'
	},
	{
		'_id': '6495b7a7731b432d4748427c',
		'box': 1,
		'index': 57,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'train',
		'answer': 'Nostrud in tempor in aliquip deserunt culpa et dolor incididunt officia labore proident ullamco velit. Amet culpa cillum incididunt nisi proident proident officia sunt velit exercitation culpa dolore.',
		'question': 'Aliqua et elit id dolor labore non ullamco et elit sint tempor qui tempor amet. Et ut aliquip incididunt eu enim dolore elit deserunt sunt duis Lorem.',
		'createdAt': '2022-11-23T18:57:32.280Z',
		'specialType': 'none',
		'lastTraining': '2023-01-29T18:57:32.280Z'
	},
	{
		'_id': '6495b7a75ef3d40fd52ee527',
		'box': 4,
		'index': 58,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'train',
		'answer': 'Eu culpa esse do exercitation officia deserunt Lorem ipsum ea id voluptate nulla. Velit elit nisi irure cupidatat.',
		'question': 'Eiusmod incididunt consequat non irure magna in ipsum incididunt exercitation. Anim est duis aliqua amet aliqua amet sint incididunt et exercitation adipisicing culpa ullamco exercitation.',
		'createdAt': '2022-10-25T22:48:33.745Z',
		'specialType': 'none',
		'lastTraining': '2022-11-07T22:48:33.745Z'
	},
	{
		'_id': '6495b7a72848e2a5285b2b88',
		'box': 3,
		'index': 59,
		'shelf': '648c920baa3edb04cec38442',
		'state': 'wait',
		'answer': 'Est deserunt nostrud tempor duis ipsum nisi. Aliqua laborum nisi officia ad ex esse excepteur duis ipsum deserunt commodo pariatur quis cupidatat.',
		'question': 'Do aliquip dolor dolore sunt voluptate id occaecat. Sit minim qui sit eu.',
		'createdAt': '2022-09-29T19:18:55.152Z',
		'specialType': 'none',
		'lastTraining': '2022-10-07T19:18:55.152Z'
	},
	{
		'_id': '6495b7a72cbc9e5df4a5ed25',
		'box': 3,
		'index': 60,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'train',
		'answer': 'Do id ex dolor ea deserunt excepteur exercitation in eiusmod officia. Lorem fugiat ut ipsum aliquip.',
		'question': 'Sunt nisi elit deserunt ipsum laborum do officia sint commodo. Adipisicing consectetur in minim mollit deserunt commodo ut consequat.',
		'createdAt': '2022-01-27T23:15:20.651Z',
		'specialType': 'none',
		'lastTraining': '2022-03-20T23:15:20.651Z'
	},
	{
		'_id': '6495b7a7fe778f65088a726f',
		'box': 5,
		'index': 61,
		'shelf': '648c920baa3edb04cec38442',
		'state': 'wait',
		'answer': 'Veniam et eu consectetur enim reprehenderit esse. Ad voluptate consequat voluptate Lorem reprehenderit aliqua veniam.',
		'question': 'Pariatur voluptate nulla duis amet anim elit sunt excepteur. Ad elit labore fugiat anim proident pariatur in exercitation pariatur labore culpa cupidatat proident.',
		'createdAt': '2022-01-17T17:20:47.746Z',
		'specialType': 'learnt',
		'lastTraining': '2022-03-18T17:20:47.746Z'
	},
	{
		'_id': '6495b7a703817fa17f8b02aa',
		'box': 3,
		'index': 62,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'train',
		'answer': 'Dolore ut magna ea eiusmod. Consequat consectetur officia fugiat elit consectetur pariatur tempor tempor.',
		'question': 'Aliquip pariatur ex adipisicing nostrud tempor magna irure. Excepteur amet anim fugiat officia in consequat ad dolore ad.',
		'createdAt': '2022-09-16T06:55:32.932Z',
		'specialType': 'none',
		'lastTraining': '2022-10-21T06:55:32.932Z'
	},
	{
		'_id': '6495b7a734db2e3460ddfd5c',
		'box': 1,
		'index': 63,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'wait',
		'answer': 'Aliqua exercitation mollit pariatur minim. Nostrud irure fugiat incididunt ad aliquip occaecat nisi nulla aute laboris fugiat.',
		'question': 'Ad exercitation reprehenderit mollit deserunt veniam Lorem ea quis irure ea. Commodo elit est tempor qui reprehenderit tempor elit deserunt elit magna occaecat dolore adipisicing reprehenderit.',
		'createdAt': '2022-03-06T21:56:01.564Z',
		'specialType': 'none',
		'lastTraining': '2022-05-19T21:56:01.564Z'
	},
	{
		'_id': '6495b7a7daba666cc9776e62',
		'box': 2,
		'index': 64,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'wait',
		'answer': 'Incididunt voluptate Lorem eiusmod consequat elit officia exercitation nostrud. In elit aliquip veniam Lorem eiusmod nostrud.',
		'question': 'Officia sint in consectetur incididunt reprehenderit ad culpa aute nostrud esse. Laborum pariatur Lorem eu laborum.',
		'createdAt': '2022-07-25T05:38:44.034Z',
		'specialType': 'none',
		'lastTraining': '2022-10-11T05:38:44.034Z'
	},
	{
		'_id': '6495b7a72353f4c288f50c5f',
		'box': 2,
		'index': 65,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'wait',
		'answer': 'In voluptate nisi ullamco ad quis duis est cillum eu sunt labore. Esse reprehenderit irure esse fugiat et.',
		'question': 'Qui occaecat quis qui velit laborum labore ex adipisicing proident sit. Culpa aliquip voluptate anim pariatur ex veniam mollit ut dolor aute in veniam nisi mollit.',
		'createdAt': '2022-12-20T21:07:19.878Z',
		'specialType': 'none',
		'lastTraining': '2023-01-08T21:07:19.878Z'
	},
	{
		'_id': '6495b7a78e3679ac23ff792f',
		'box': 2,
		'index': 66,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'train',
		'answer': 'Nulla ad commodo dolor laboris sunt officia esse officia reprehenderit laboris. Nostrud sint anim tempor ex veniam quis ex ea sunt aute qui sit.',
		'question': 'Elit occaecat sit veniam tempor incididunt tempor sit ut aute consequat consectetur mollit aute sint. Enim duis minim et eiusmod adipisicing sit ad nulla adipisicing voluptate quis consectetur tempor.',
		'createdAt': '2022-03-09T02:36:38.230Z',
		'specialType': 'none',
		'lastTraining': '2022-03-23T02:36:38.230Z'
	},
	{
		'_id': '6495b7a73ddd51e08534106d',
		'box': 2,
		'index': 67,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'train',
		'answer': 'Ea proident ullamco ipsum Lorem magna qui commodo magna. Dolore sit reprehenderit ea ad labore proident occaecat.',
		'question': 'Do ad labore nostrud ipsum ullamco fugiat nostrud qui. Occaecat aliqua voluptate non ad ut deserunt laborum est id pariatur ex.',
		'createdAt': '2022-12-21T16:24:37.953Z',
		'specialType': 'none',
		'lastTraining': '2023-02-17T16:24:37.953Z'
	},
	{
		'_id': '6495b7a705b734bcfab5ac9c',
		'box': 4,
		'index': 68,
		'shelf': '648c920beba56ba6cd7db7bb',
		'state': 'train',
		'answer': 'Lorem cillum labore sunt veniam voluptate laborum minim enim dolor. Sint aute nulla esse et quis.',
		'question': 'Elit proident est non nostrud quis ea culpa incididunt consequat aute. Minim in veniam fugiat esse eiusmod ex irure.',
		'createdAt': '2022-10-23T13:04:30.139Z',
		'specialType': 'none',
		'lastTraining': '2022-11-21T13:04:30.139Z'
	},
	{
		'_id': '6495b7a724439d2078fa10b6',
		'box': 2,
		'index': 69,
		'shelf': '648c920beba56ba6cd7db7bb',
		'state': 'wait',
		'answer': 'Ea Lorem aliquip sunt enim aliquip ipsum magna ad. Lorem ex sunt minim fugiat minim magna quis enim non incididunt.',
		'question': 'Ex sit qui veniam commodo nostrud incididunt enim eu velit. Deserunt sunt laborum irure sunt est reprehenderit pariatur nulla id consectetur minim reprehenderit.',
		'createdAt': '2022-09-07T16:27:59.924Z',
		'specialType': 'none',
		'lastTraining': '2022-11-10T16:27:59.924Z'
	},
	{
		'_id': '6495b7a70b3e1dd3d476d993',
		'box': 2,
		'index': 70,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'wait',
		'answer': 'Commodo cillum culpa veniam ullamco eiusmod cupidatat nulla est Lorem voluptate consectetur. Est enim velit aliquip mollit ad sint fugiat esse exercitation quis deserunt mollit reprehenderit tempor.',
		'question': 'Qui adipisicing sit est irure quis commodo adipisicing eu exercitation exercitation tempor ullamco laborum. Veniam id consectetur amet cillum ut tempor proident amet do.',
		'createdAt': '2022-05-04T06:23:06.017Z',
		'specialType': 'none',
		'lastTraining': '2022-05-10T06:23:06.017Z'
	},
	{
		'_id': '6495b7a7a87da77d933f949f',
		'box': 3,
		'index': 71,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'wait',
		'answer': 'Culpa eiusmod ipsum culpa Lorem culpa ut. Et mollit consectetur commodo elit aliqua tempor consequat do esse do esse officia id incididunt.',
		'question': 'Amet irure deserunt nostrud occaecat. Velit magna nulla occaecat in sunt culpa sunt cupidatat nostrud.',
		'createdAt': '2022-04-20T17:36:40.551Z',
		'specialType': 'none',
		'lastTraining': '2022-06-07T17:36:40.551Z'
	},
	{
		'_id': '6495b7a7d7d1b4936346e81a',
		'box': 5,
		'index': 72,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'wait',
		'answer': 'Officia qui culpa eu anim cillum non do. Minim eiusmod aliquip in anim do adipisicing excepteur consequat ex.',
		'question': 'Culpa deserunt quis ipsum aute consequat laborum elit elit sint dolore laborum. Dolor qui cillum aute esse quis anim eu mollit dolore minim in consectetur.',
		'createdAt': '2022-12-26T22:25:57.054Z',
		'specialType': 'learnt',
		'lastTraining': '2023-01-21T22:25:57.054Z'
	},
	{
		'_id': '6495b7a7950386bf5be4640e',
		'box': 0,
		'index': 73,
		'shelf': '648c920baa3edb04cec38442',
		'state': 'train',
		'answer': 'Mollit fugiat aute est duis cillum exercitation elit incididunt. Occaecat est dolor proident incididunt adipisicing proident voluptate dolor.',
		'question': 'Nisi nulla tempor dolor quis magna velit ipsum adipisicing fugiat. Labore ut id id deserunt commodo qui minim mollit aliqua minim elit proident aliqua.',
		'createdAt': '2022-08-13T16:57:30.762Z',
		'specialType': 'new',
		'lastTraining': '2022-11-07T16:57:30.762Z'
	},
	{
		'_id': '6495b7a73828568f7ee86a5e',
		'box': 4,
		'index': 74,
		'shelf': '648c920beba56ba6cd7db7bb',
		'state': 'wait',
		'answer': 'Ea fugiat Lorem sit eiusmod duis occaecat tempor pariatur anim fugiat et. Proident exercitation enim dolor officia ullamco incididunt.',
		'question': 'Officia et aute officia do eu in ipsum dolore nulla tempor. Id voluptate consequat esse deserunt anim ea consequat ea aliqua occaecat velit.',
		'createdAt': '2022-04-12T14:14:16.724Z',
		'specialType': 'none',
		'lastTraining': '2022-07-04T14:14:16.724Z'
	},
	{
		'_id': '6495b7a76afa3ccfe4255c0b',
		'box': 5,
		'index': 75,
		'shelf': '648c920baa3edb04cec38442',
		'state': 'train',
		'answer': 'Sit adipisicing do commodo eiusmod dolor voluptate cillum proident eiusmod laborum minim ipsum sunt. Consectetur adipisicing ex deserunt aliquip adipisicing nostrud nulla cupidatat qui duis quis sint sint nostrud.',
		'question': 'Nostrud et sunt dolor aute adipisicing est velit qui consequat enim Lorem ipsum esse consectetur. Cillum proident cillum laboris culpa sit.',
		'createdAt': '2022-10-25T22:42:49.385Z',
		'specialType': 'learnt',
		'lastTraining': '2022-11-18T22:42:49.385Z'
	},
	{
		'_id': '6495b7a7d9dc1488ad968a73',
		'box': 5,
		'index': 76,
		'shelf': '648c920beba56ba6cd7db7bb',
		'state': 'train',
		'answer': 'Aliqua quis nisi nisi eiusmod aute eiusmod aliquip. Quis et cupidatat nostrud amet officia duis esse consectetur eu proident enim.',
		'question': 'Nisi culpa cillum sunt qui fugiat laboris nulla fugiat eu ex ea et minim duis. Irure velit aliqua ut aliquip id.',
		'createdAt': '2022-01-09T01:56:12.688Z',
		'specialType': 'learnt',
		'lastTraining': '2022-01-21T01:56:12.688Z'
	},
	{
		'_id': '6495b7a708e9f19c7fd51c9f',
		'box': 4,
		'index': 77,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'wait',
		'answer': 'Fugiat aute cillum non dolor quis elit excepteur exercitation fugiat aliquip aliqua ipsum velit. Consequat elit magna eiusmod enim proident ex culpa dolor fugiat cillum reprehenderit sint id nostrud.',
		'question': 'Ex ad dolore consequat esse nostrud qui minim culpa et. Veniam deserunt cupidatat magna proident culpa cillum laborum in.',
		'createdAt': '2022-07-12T22:58:05.732Z',
		'specialType': 'none',
		'lastTraining': '2022-09-29T22:58:05.732Z'
	},
	{
		'_id': '6495b7a72b6a1d9476f5ada1',
		'box': 0,
		'index': 78,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'train',
		'answer': 'Elit voluptate veniam laboris et ex quis sunt. Minim velit sit esse fugiat exercitation quis aliqua sit velit veniam voluptate esse ad ipsum.',
		'question': 'Reprehenderit id ad veniam sint id excepteur duis irure. Esse dolor minim amet commodo exercitation eu.',
		'createdAt': '2022-07-27T10:25:11.307Z',
		'specialType': 'new',
		'lastTraining': '2022-08-05T10:25:11.307Z'
	},
	{
		'_id': '6495b7a7a45f70341223d0ac',
		'box': 2,
		'index': 79,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'train',
		'answer': 'Nisi nostrud aute consequat nulla nostrud minim et ipsum sit id. Commodo commodo exercitation commodo mollit.',
		'question': 'Officia deserunt dolore eu veniam nisi laboris consectetur amet eu aliqua ex sit veniam. Dolore ut reprehenderit pariatur ex qui nulla aliqua cupidatat cillum.',
		'createdAt': '2022-06-26T16:56:44.811Z',
		'specialType': 'none',
		'lastTraining': '2022-08-10T16:56:44.811Z'
	},
	{
		'_id': '6495b7a74d9ce36de558834f',
		'box': 4,
		'index': 80,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'train',
		'answer': 'Pariatur exercitation qui dolor in officia nostrud culpa adipisicing qui culpa. Eiusmod reprehenderit quis aliqua laborum.',
		'question': 'Duis non sit laborum cupidatat culpa excepteur. Nulla duis sint proident duis eiusmod consequat anim duis nisi.',
		'createdAt': '2022-04-03T09:40:08.455Z',
		'specialType': 'none',
		'lastTraining': '2022-05-14T09:40:08.455Z'
	},
	{
		'_id': '6495b7a71c49eff2f92ca9d3',
		'box': 5,
		'index': 81,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'train',
		'answer': 'Dolore laborum duis esse dolor laboris. Duis occaecat eu id commodo non eu.',
		'question': 'Non adipisicing veniam proident cupidatat. Nulla in exercitation deserunt eiusmod in ut ea voluptate ea magna velit duis reprehenderit amet.',
		'createdAt': '2022-02-24T14:42:03.949Z',
		'specialType': 'learnt',
		'lastTraining': '2022-03-29T14:42:03.949Z'
	},
	{
		'_id': '6495b7a79c00e67b4919c4d6',
		'box': 1,
		'index': 82,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'wait',
		'answer': 'Esse ea magna aute commodo. Irure ea exercitation incididunt enim mollit eu labore laborum culpa commodo sit ea.',
		'question': 'Do dolor minim tempor amet irure. Excepteur cillum ad minim sint est.',
		'createdAt': '2022-01-21T01:16:58.003Z',
		'specialType': 'none',
		'lastTraining': '2022-03-28T01:16:58.003Z'
	},
	{
		'_id': '6495b7a7ae163c602bd6190e',
		'box': 4,
		'index': 83,
		'shelf': '648c920beba56ba6cd7db7bb',
		'state': 'train',
		'answer': 'Voluptate excepteur ex ullamco laboris in exercitation aute commodo commodo esse ea mollit consequat. Ea sint est deserunt ipsum esse proident amet quis exercitation.',
		'question': 'Esse id enim veniam dolor exercitation non quis adipisicing irure veniam cupidatat fugiat pariatur adipisicing. Laboris magna dolor incididunt duis qui excepteur amet sint eiusmod nostrud pariatur pariatur.',
		'createdAt': '2022-03-07T07:47:26.280Z',
		'specialType': 'none',
		'lastTraining': '2022-04-12T07:47:26.280Z'
	},
	{
		'_id': '6495b7a7de0d396abf9812fd',
		'box': 5,
		'index': 84,
		'shelf': '648c920baa3edb04cec38442',
		'state': 'wait',
		'answer': 'Et quis pariatur non consectetur eu adipisicing ut fugiat esse. Quis adipisicing magna minim laborum incididunt consectetur.',
		'question': 'Nulla nulla exercitation elit id irure laboris. Velit dolore duis aliqua laborum dolore eiusmod nostrud nisi irure ullamco.',
		'createdAt': '2022-09-11T17:10:40.585Z',
		'specialType': 'learnt',
		'lastTraining': '2022-09-16T17:10:40.585Z'
	},
	{
		'_id': '6495b7a73aaa0aeb05bb16d3',
		'box': 2,
		'index': 85,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'wait',
		'answer': 'Consectetur officia in incididunt Lorem esse et voluptate et. Ea eiusmod laborum ad cillum proident velit minim minim.',
		'question': 'Ipsum qui in pariatur minim et in tempor ad. Pariatur aliqua tempor aliqua minim incididunt officia quis culpa.',
		'createdAt': '2022-07-28T07:27:59.228Z',
		'specialType': 'none',
		'lastTraining': '2022-09-05T07:27:59.228Z'
	},
	{
		'_id': '6495b7a7453c3d5f1f98d58f',
		'box': 1,
		'index': 86,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'train',
		'answer': 'Ullamco commodo enim excepteur sunt consectetur. Pariatur est ad tempor deserunt elit quis.',
		'question': 'Consectetur esse culpa commodo id excepteur aliquip exercitation sunt ut magna ipsum nulla ad in. Ullamco nisi occaecat ullamco laborum deserunt consectetur incididunt veniam est.',
		'createdAt': '2022-08-13T04:36:36.289Z',
		'specialType': 'none',
		'lastTraining': '2022-09-10T04:36:36.289Z'
	},
	{
		'_id': '6495b7a788f5b8f8a5629a4c',
		'box': 4,
		'index': 87,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'wait',
		'answer': 'Consectetur reprehenderit aliquip Lorem sint id ex enim laborum laboris voluptate. Labore ut ad mollit magna sit velit.',
		'question': 'Et ullamco est velit excepteur dolore cupidatat. Ex sunt velit voluptate velit enim eu.',
		'createdAt': '2022-05-05T05:58:09.177Z',
		'specialType': 'none',
		'lastTraining': '2022-07-08T05:58:09.177Z'
	},
	{
		'_id': '6495b7a70833af0be1ccc19b',
		'box': 0,
		'index': 88,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'train',
		'answer': 'Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.',
		'question': 'Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur reprehenderit tempor non ullamco.',
		'createdAt': '2022-12-27T17:58:59.569Z',
		'specialType': 'new',
		'lastTraining': '2023-03-05T17:58:59.569Z'
	},
	{
		'_id': '6495b7a7f864a05c893e1fd1',
		'box': 2,
		'index': 89,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'train',
		'answer': 'Ea esse officia elit tempor nisi consectetur commodo eiusmod est esse culpa Lorem. Est aliqua officia officia cillum Lorem aute nisi fugiat labore.',
		'question': 'Adipisicing qui consectetur proident eiusmod non tempor eiusmod sit qui excepteur. Culpa aute dolor cillum ad anim non consectetur esse anim ipsum non nisi velit magna.',
		'createdAt': '2022-08-05T01:51:42.483Z',
		'specialType': 'none',
		'lastTraining': '2022-10-29T01:51:42.483Z'
	},
	{
		'_id': '6495b7a7f800c67e6eccc1f1',
		'box': 5,
		'index': 90,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'wait',
		'answer': 'Adipisicing fugiat labore amet ad aute mollit eu mollit. Nisi incididunt commodo deserunt tempor aliquip sit qui eiusmod sint.',
		'question': 'Ea pariatur proident est anim incididunt veniam excepteur. Proident ullamco pariatur ea enim non commodo nisi incididunt.',
		'createdAt': '2022-01-29T06:26:31.729Z',
		'specialType': 'learnt',
		'lastTraining': '2022-03-26T06:26:31.729Z'
	},
	{
		'_id': '6495b7a755245988df578e24',
		'box': 2,
		'index': 91,
		'shelf': '648c920b07d1f8f9ed46604e',
		'state': 'wait',
		'answer': 'Consectetur amet et veniam proident pariatur. Culpa nostrud pariatur elit anim labore aute sunt sint ullamco.',
		'question': 'Ex tempor ea cillum labore irure cupidatat ullamco irure mollit excepteur. Amet do ea tempor deserunt labore ex voluptate occaecat eiusmod tempor incididunt aliqua consectetur dolor.',
		'createdAt': '2022-03-06T08:01:44.143Z',
		'specialType': 'none',
		'lastTraining': '2022-05-26T08:01:44.143Z'
	},
	{
		'_id': '6495b7a7616fdcc0201508c3',
		'box': 4,
		'index': 92,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'train',
		'answer': 'Dolore eiusmod eu sit qui consectetur sint sunt nulla. Amet duis incididunt consectetur enim et Lorem.',
		'question': 'Consequat aute commodo veniam nisi Lorem mollit. Reprehenderit pariatur fugiat velit fugiat non culpa do.',
		'createdAt': '2022-10-13T18:43:20.917Z',
		'specialType': 'none',
		'lastTraining': '2022-11-09T18:43:20.917Z'
	},
	{
		'_id': '6495b7a7208b49449e8bae04',
		'box': 3,
		'index': 93,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'wait',
		'answer': 'Id ex pariatur irure ex laboris fugiat non nostrud id. Occaecat non tempor irure id dolore adipisicing incididunt sint qui qui magna anim.',
		'question': 'Fugiat qui et duis voluptate deserunt aute nostrud qui ea. Aute Lorem occaecat mollit velit amet irure officia est occaecat nulla ullamco velit fugiat aute.',
		'createdAt': '2022-12-11T21:17:44.329Z',
		'specialType': 'none',
		'lastTraining': '2023-02-28T21:17:44.329Z'
	},
	{
		'_id': '6495b7a7d4de8d38cf65630e',
		'box': 3,
		'index': 94,
		'shelf': '648c920baa3edb04cec38442',
		'state': 'train',
		'answer': 'Dolore laborum minim amet deserunt minim consectetur officia aute minim veniam id. Occaecat dolor eiusmod culpa et non qui cupidatat excepteur.',
		'question': 'Aliqua culpa amet reprehenderit do ex pariatur. Elit irure laboris non ex ullamco voluptate.',
		'createdAt': '2022-06-28T16:16:28.600Z',
		'specialType': 'none',
		'lastTraining': '2022-09-21T16:16:28.600Z'
	},
	{
		'_id': '6495b7a71f9772622a95cbaf',
		'box': 3,
		'index': 95,
		'shelf': '648c920b6adf96517748f3c1',
		'state': 'train',
		'answer': 'Ullamco irure consequat ex id proident aliquip non. Magna reprehenderit anim cillum velit culpa.',
		'question': 'Anim anim deserunt dolore aute velit amet consequat ea enim. Ea laborum est nisi non sunt Lorem cupidatat.',
		'createdAt': '2022-09-24T20:08:46.055Z',
		'specialType': 'none',
		'lastTraining': '2022-12-05T20:08:46.055Z'
	},
	{
		'_id': '6495b7a76e7a66ff2e7fb888',
		'box': 3,
		'index': 96,
		'shelf': '648c920beba56ba6cd7db7bb',
		'state': 'train',
		'answer': 'Ullamco amet non deserunt exercitation cillum pariatur velit ad qui deserunt. Enim culpa nostrud ut sint nostrud elit commodo magna veniam anim labore qui adipisicing.',
		'question': 'Sunt Lorem eiusmod irure deserunt voluptate mollit. Officia elit sit nisi deserunt cupidatat fugiat elit.',
		'createdAt': '2022-05-11T03:04:23.296Z',
		'specialType': 'none',
		'lastTraining': '2022-06-14T03:04:23.296Z'
	},
	{
		'_id': '6495b7a7061768782ce4c6fd',
		'box': 5,
		'index': 97,
		'shelf': '648c920beba56ba6cd7db7bb',
		'state': 'wait',
		'answer': 'Aute officia nisi quis laboris sunt quis exercitation sint aliqua. Nulla sint voluptate excepteur proident eu dolore do.',
		'question': 'In Lorem proident est exercitation aute sunt ullamco quis qui dolore ea. Id commodo cillum in ipsum.',
		'createdAt': '2022-11-07T05:23:32.358Z',
		'specialType': 'learnt',
		'lastTraining': '2022-11-25T05:23:32.358Z'
	},
	{
		'_id': '6495b7a7dc5cbad289abfd76',
		'box': 2,
		'index': 98,
		'shelf': '648c920baa3edb04cec38442',
		'state': 'train',
		'answer': 'Cupidatat ad Lorem quis sint sunt proident deserunt. Eu ad fugiat fugiat ad elit ipsum.',
		'question': 'Officia anim non est do in magna ut in pariatur eiusmod dolore. Do ex cillum est non dolore irure et in deserunt consectetur.',
		'createdAt': '2022-06-26T08:25:37.555Z',
		'specialType': 'none',
		'lastTraining': '2022-07-30T08:25:37.555Z'
	},
	{
		'_id': '6495b7a7a22ba1cd15e3a3b8',
		'box': 3,
		'index': 99,
		'shelf': '648c920b3e40b5930a6e1603',
		'state': 'wait',
		'answer': 'Occaecat aliquip do duis exercitation sunt in velit non esse aliqua nostrud minim velit consequat. Adipisicing consequat magna cillum voluptate cillum mollit commodo voluptate commodo magna.',
		'question': 'Aliqua duis quis laborum minim laborum in non dolore sint est incididunt reprehenderit. Cillum velit sunt exercitation eu mollit Lorem.',
		'createdAt': '2022-04-05T10:03:50.620Z',
		'specialType': 'none',
		'lastTraining': '2022-06-19T10:03:50.620Z'
	}
]

const newCards = cards.map(card => {
	const shelf = card.shelf
	const box = card.box
	if (shelvesBoxObject[shelf][box]) {
		return card
	} else {
		// console.log(box, shelf, card.specialType)

		card.box = card.box - 1
		card.specialType = 'learnt'
		return card
	}
})

// const list = []
// const obj = {}
// const newCards2 = newCards.map(card => {
// 	const shelfId = card.shelf
// 	if (shelfId in obj) {
// 		if (card.specialType === 'learnt') {
// 			obj[shelfId].push(card.box)
// 		}
// 	} else {
// 		if (card.specialType === 'learnt') {
// 			obj[shelfId] = [card.box]
// 		}
// 	}
// 	// if (card.specialType === 'learnt') {
// 	// 	list.push(card)
// 	// }
// })
// const obj = {}
// const list2 = list.forEach(card => obj[card.shelf] = [])
// list.forEach(card => obj[card.shelf].push(card))
// list.forEach(card => obj[card.shelf].push(card))
// console.log(obj)

const deepCopy = _.cloneDeep(shelves)
const blankShelves = deepCopy.map(shelf => {
	const shelfBoxesData = _.cloneDeep(shelf.boxesData)
	for (const key in shelf.data) {
		shelf.data[key] = 0
	}
	for (const box of shelfBoxesData) {
		const boxData = box.data
		for (const key in boxData) {
			boxData[key] = 0
		}
	}
	shelf.boxesData = shelfBoxesData
	return shelf
})

// console.log(JSON.stringify(blankShelves, null, 2))

const setCardCountOnBlankShelves = (cards, blankShelves) => {
	const blankShelvesCopy = _.cloneDeep(blankShelves)
	cards.forEach(card => {
		const shelfId = card.shelf
		const boxIndex = card.box
		const state = card.state
		const currShelf = blankShelvesCopy.find(shelf => shelf.id === shelfId)
		const box = currShelf.boxesData.find(box => box.index === boxIndex)
		// if (box.specialType === 'learnt' && card.shelf == '648c920b6adf96517748f3c1') {
		// 	// console.log(card)
		// }
		currShelf.data.all += 1
		currShelf.data[state] += 1
		box.data.all += 1
		box.data[state] += 1
	})
	return blankShelvesCopy
}

const countCommonShelfData = (cards) => {
	const commonShelf = {}
	const data = { all: 0, train: 0, wait: 0 }
	const newCardAll = { all: 0 }
	const learning = { all: 0, train: 0, wait: 0 }
	const learnt = { all: 0, train: 0, wait: 0 }
	cards.forEach(card => {
		const type = card.specialType
		const state = card.state
		data.all += 1
		data[state] += 1
		if (type === 'new') {
			newCardAll.all += 1
		}
		if (type === 'none') {
			learning.all += 1
			learning[card.state] += 1
		}
		if (type === 'learnt') {
			learnt.all += 1
			learnt[card.state] += 1
		}
		commonShelf['new'] = newCardAll
		commonShelf['learning'] = learning
		commonShelf['learnt'] = learnt
		commonShelf['data'] = data
		commonShelf['isCollapsed'] = false
	})
	return commonShelf
}

const shelvesWithSettedData = setCardCountOnBlankShelves(newCards, blankShelves)
const commonShelf = countCommonShelfData(newCards)

const cupboard = { shelves: [], commonShelf: {} }
cupboard.commonShelf = commonShelf
cupboard.shelves = shelvesWithSettedData

// const newCardsFiltered = newCards.filter(card => card.shelf == '648c920b6adf96517748f3c1' && card.box === 4)
// console.log(newCardsFiltered.length)

// console.log(JSON.stringify(cupboard, null, 2))
// console.log(JSON.stringify(shelvesWithSettedData.find(shelf => shelf.title == 'английский'), null, 4))
console.log(JSON.stringify(newCards))
// console.log(JSON.stringify(blankShelves))
// const data = { all: 0, train: 0, wait: 0 }
// newCards.forEach(card => {
// 	const shelfId = card.shelf
// 	const boxIndex = card.box
// 	const state = card.state
// 	const currShelf = blankShelves.find(shelf => shelf.id === shelfId)
// 	const box = currShelf.boxesData.find(box => box.index === boxIndex)
// 	currShelf.data.all += 1
// 	currShelf.data[state] += 1
// 	box.data.all += 1
// 	box.data[state] += 1
// 	data.all += 1
// 	data[state] += 1
// })
// const data2 = { all: 0, train: 0, wait: 0 }
// const commonShelf = {}
// const newCardAll = { all: 0 }
// const learning = { all: 0, train: 0, wait: 0 }
// const learnt = { all: 0, train: 0, wait: 0 }
// newCards.forEach(card => {
// 	const type = card.specialType
// 	if (type === 'new') {
// 		newCardAll.all += 1
// 	}
// 	if (type === 'none') {
// 		learning.all += 1
// 		learning[card.state] += 1
// 	}
// 	if (type === 'learnt') {
// 		learnt.all += 1
// 		learnt[card.state] += 1
// 	}
// 	commonShelf['newCards'] = newCardAll
// 	commonShelf['learning'] = learning
// 	commonShelf['learnt'] = learnt
// })
// console.log(commonShelf)


// console.log(data)
// console.log(JSON.stringify(blankShelves, null, 4))
// blankShelves.map(shelf => {
// 	const { boxesData, ...other } = shelf
// 	console.log(other)
// 	console.log(boxesData)
// })
// console.dir(blankShelves[0].boxesData)
// console.dir(JSON.stringify(blankShelves))
// console.log([...shelves])
// const shelvesFinnal = newCards
// const newCards2 = newCards.map(card => {
// 	const shelf = card.shelf
// 	const box = card.box
// 	if (shelvesBoxObject[shelf][box]) {
// 		// return card
// 	} else {
// 		// card.box = card.box- 1
// 		// return card
// 		console.log(box, shelf, card.specialType)
// 	}
// })

// console.log(newCards)
// console.log(shelvesBoxObject)