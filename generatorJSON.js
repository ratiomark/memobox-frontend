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
	'{{repeat(2)}}',
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
