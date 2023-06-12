JG.repeat(1, {
	shelves: JG.repeat(5, {
		id: JG.objectId(),
		index: JG.index(),
		title() {
			const shelfNames = ['math', 'books', 'английский', 'facts', 'biology'];
			return shelfNames[this.index];
		},

		boxesData() {
			const boxes = JG.repeat(2, 5,
				{
					_id: JG.objectId(),
					index: JG.index() + 1,
					specialType: 'none',
					data: {
						all() {
							return this.train + this.wait;
						},
						train: JG.integer(1, 7),
						wait: JG.integer(1, 7),
					}
				});

			const res = [
				{
					_id: JG.objectId(),
					index: 0,
					specialType: 'new',
					data: {
						all: JG.integer(1, 7),
					}
				},
				...boxes,
				{
					_id: JG.objectId(),
					index: boxes.length + 1,
					specialType: 'learnt',
					data: {
						all() {
							return this.train + this.wait;
						},
						train: JG.integer(1, 7),
						wait: JG.integer(1, 7),
					}
				}
			];
			res.slice(1).forEach(box => {
				box.data.all = box.data.train + box.data.wait;
			});
			return res;
		},

		data() {
			const obj = { all: 0, train: 0, wait: 0 };
			obj.all += this.boxesData[0].data.all;
			this.boxesData.slice(1).forEach(box => {
				obj.all += box.data.all;
				obj.train += box.data.train;
				obj.wait += box.data.wait;
			});
			return obj;
		}
	}),

	all() {
		let all = 0;
		this.shelves.forEach(shelf => {
			all += shelf.data.all;
		});
		return all;
	},
	train() {
		let train = 0;
		this.shelves.forEach(shelf => {
			train += shelf.data.train;
		});
		return train;
	},
	wait() {
		let wait = 0;
		this.shelves.forEach(shelf => {
			wait += shelf.data.wait;
		});
		return wait;
	},
});

JG.repeat(5, {
	id: JG.objectId(),
	index: JG.index(),
	title: "английский",

	boxesData() {
		const boxes = JG.repeat(2, 5,
			{
				_id: JG.objectId(),
				index: JG.index() + 1,
				specialType: 'none',
				data: {
					all() {
						return this.train + this.wait;
					},
					train: JG.integer(1, 7),
					wait: JG.integer(1, 7),
				}
			});
		const res = [
			{
				_id: JG.objectId(),
				index: 0,
				specialType: 'new',
				data: {
					all: JG.integer(1, 7),
				}
			},
			...boxes,
			{
				_id: JG.objectId(),
				index: boxes.length + 1,
				specialType: 'learnt',
				data: {
					all() {
						return this.train + this.wait;
					},
					train: JG.integer(1, 7),
					wait: JG.integer(1, 7),
				}
			}
		];
		res.slice(1).forEach(box => {
			box.data.all = box.data.train + box.data.wait;
		});
		return res;
	},
	data() {
		const obj = { all: 0, train: 0, wait: 0 };
		obj.all += this.boxesData[0].data.all;
		this.boxesData.slice(1).forEach(box => {
			obj.all += box.data.all;
			obj.train += box.data.train;
			obj.wait += box.data.wait;
		});
		return obj;
	}
});



[
	'{{repeat(100)}}',
	{
		_id: '{{objectId()}}',
		index: '{{index()}}',
		data: {
			all: 0,
			wait: 0,
			train: 0,
		},
		title: function (tags) {
			var shelves = ['books', 'английский', 'math', 'biology', 'programming'];
			return shelves[tags.integer(0, shelves.length - 1)];
		},
		// box: function (tags) {
		// return tags.integer(1, 4);
		// }
	}
]

// email: '{{email()}}',
// registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',

// ['books", "английский", "math", "biology", "programming"]
// 



[
	'{{repeat(40)}}',
	{
		value: '{{objectId()}}',
		content: 'shelf ' + '{{index()}}',
		title: '{{lorem(1, "words")}}'
	}
]




[
	'{{repeat(1)}}',
	{
		_id: '{{objectId()}}',
		index: '{{index()}}',
		guid: '{{guid()}}',
		isActive: '{{bool()}}',
		balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
		picture: 'http://placehold.it/32x32',
		age: '{{integer(20, 40)}}',
		eyeColor: '{{random("blue", "brown", "green")}}',
		name: '{{firstName()}} {{surname()}}',
		gender: '{{gender()}}',
		company: '{{company().toUpperCase()}}',
		email: '{{email()}}',
		phone: '+1 {{phone()}}',
		address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
		about: '{{lorem(1, "paragraphs")}}',
		registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
		latitude: '{{floating(-90.000001, 90)}}',
		longitude: '{{floating(-180.000001, 180)}}',
		tags: [
			'{{repeat(7)}}',
			'{{lorem(1, "words")}}'
		],
		friends: [
			'{{repeat(3)}}',
			{
				id: '{{index()}}',
				name: '{{firstName()}} {{surname()}}'
			}
		],
		greeting: function (tags) {
			return 'Hello, ' + this.name + '! You have ' + tags.integer(1, 10) + ' unread messages.';
		},
		favoriteFruit: function (tags) {
			var fruits = ['apple', 'banana', 'strawberry'];
			return fruits[tags.integer(0, fruits.length - 1)];
		}
	}
]

[
	'{{repeat(100)}}',
	{
		_id: '{{objectId()}}',
		index: '{{index()}}',
		question: '{{lorem(1, "paragraphs")}}',
		answer: '{{lorem(1, "paragraphs")}}',
		shelf: function (tags) {
			return tags.integer(1, 5);
		},
		box: function (tags) {
			return tags.integer(1, 4);
		},
		state: function (tags) {
			var states = ['wait', 'train'];
			return states[tags.integer(0, states.length - 1)];
		}
	}
]

1
: { train: 10, wait: 9 }
2
: { train: 10, wait: 6 }
3
: { wait: 10, train: 7 }
4
: { train: 14, wait: 8 }
5
: { train: 14, wait: 12 }



if (data) {
	const finalData = data.reduce((acc: any, current) => {
		const { state, shelf } = current
		// console.log(state, shelf, shelf.toString())
		// console.log(current)
		if (shelf.toString() in acc) {
			if (state in acc[shelf.toString()]) {

				acc[shelf.toString()][state] += 1
			} else {
				acc[shelf.toString()][state] = 1
			}
		} else {
			acc[shelf.toString()] = {}
			acc[shelf.toString()][state] = 1
		}
		return acc
	}, {})
	// console.log(data)
	console.log(finalData)
}


if (data) {
	const finalData = data.reduce((acc: any, current) => {
		const { data: { all, train, wait } } = current
		acc['all'] += all
		acc['train'] += train
		acc['wait'] += wait
		return acc
		// console.log(state, shelf, shelf.toString())
		// console.log(current)

	}, { all: 0, train: 0, wait: 0 })
	// console.log(data)
	console.log(finalData)
}


JG.repeat(4, {
	id: JG.objectId(),
	email() {
		return (
			_.snakeCase(this.profile.name) +
			'@' +
			this.profile.company +
			JG.domainZone()
		).toLowerCase();
	},
	username() {
		return (_.words(this.profile.name)[0] + moment(this.profile.dob).format('YY')).toLowerCase();
	},
	profile: {
		name: `${JG.firstName()} ${JG.lastName()}`,
		company: JG.company(),
		dob: moment(JG.date(new Date(1988, 0, 1), new Date(1995, 0, 1))).format('YYYY-MM-DD'),
		address: `${JG.integer(1, 100)} ${JG.street()}, ${JG.city()}, ${JG.state()}`,
		location: {
			lat: JG.floating(-90, 90, 6),
			long: JG.floating(-180, 180, 6),
		},
		about: JG.loremIpsum({ units: 'sentences', count: 2 }),
	},
	apiKey: JG.guid(),
	roles: _.uniq(JG.repeat(2, JG.random('owner', 'admin', 'member', 'guest'))),
	createdAt: JG.date(new Date(2010, 0, 1), new Date(2015, 0, 1)),
	updatedAt() {
		return moment(this.createdAt).add(1, 'days');
	},
});

JG.repeat(5, {
	id: JG.objectId(),
	index: JG.index(),
	title: "английский",

	boxesData: [
		{
			_id: JG.objectId(),
			index: 0,
			specialType: 'new',
			data: {
				all: JG.integer(1, 7),
			}
		},

		JG.repeat(3, 5,
			{
				_id: JG.objectId(),
				index: JG.index(),
				specialType: 'none',
				data: {
					all() {
						return this.train + this.wait;
					},
					train: JG.integer(1, 7),
					wait: JG.integer(1, 7),
				}
			}),
		{
			_id: JG.objectId(),
			index: JG.index(),
			specialType: 'learnt',
			data: {
				all() {
					return this.train + this.wait;
				},
				train: JG.integer(1, 7),
				wait: JG.integer(1, 7),
			}
		}
	],
	data() {
		const obj = { all: 0, train: 0, wait: 0 };
		obj.all += this.boxesData[0].data.all;
		this.boxesData[1].forEach(box => {
			obj.all += box.data.all;
			obj.train += box.data.train;
			obj.wait += box.data.wait;
		});
		obj.all += this.boxesData[2].data.all;
		obj.train += this.boxesData[2].data.train;
		obj.wait += this.boxesData[2].data.wait;
		return obj;
	}
});
