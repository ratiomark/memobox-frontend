/* eslint-disable */
const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const https = require('https');
const http = require('http');
// const { handleError } = require('./helpers');
const cors = require('cors');

const delayBeforeResponse = 500

// Then use it before your routes are set up:
const options = {
	key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
	cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
};

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));
// server.use(cors());
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
	res.header('Access-Control-Allow-Headers', '*')
	next()
})
server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
// server.use(async (req, res, next) => {
// 	await new Promise((res) => {
// 		setTimeout(res, 2000);
// 	});
// 	next();
// });

// server.get('/cards', async (req, res) => {
// 	const shelf = req.originalUrl.split('?')[1].split('=')[1]
// 	try {
// 		const db = await JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
// 		const { cards } = db
// 		if (shelf === 'all') {
// 			return res.json(cards.slice(0, 40))
// 		} else {
// 			// console.log(cards.map(card => (card.shelf, shelf)))
// 			// console.log(cards.map(card => card.shelf))
// 			const resCards = cards.filter(item => item.shelf === shelf)
// 			// console.log(resCards)
// 			return res.json(resCards)
// 		}
// 	} catch (e) {
// 		console.log(e);
// 		return res.status(500).json({ message: e.message });
// 	}
// })
// Эндпоинт для логина
server.post('/login', (req, res) => {
	try {
		const { username, password } = req.body;
		const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
		const { users = [] } = db;

		const userFromBd = users.find(
			(user) => user.username === username && user.password === password,
		);

		if (userFromBd) {
			return res.json(userFromBd);
		}

		return res.status(403).json({ message: 'User not found' });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.get('/cupboard', async (req, res) => {
	fs.readFile(path.join(__dirname, 'db.json'), 'UTF-8', async (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send({ message: 'Server error' });
			return;
		}

		const db = JSON.parse(data);
		const shelves = db.shelves
			.filter(shelf => !shelf.isDeleted)
			.map((shelf, index) => ({ ...shelf, index }))
			.sort((a, b) => a.index - b.index);
		const responseData = {
			commonShelf: db.commonShelf,
			shelves
		};

		setTimeout(() => {
			res.send(responseData)
		}, delayBeforeResponse);
		// res.send(responseData);
	})
	// const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
	// console.log(db)
	// const responseData = {
	// 	commonShelf: db.commonShelf,
	// 	shelves: db.shelves
	// };
	// res.json(responseData);
});

// изменяет данные карточек
server.patch('/cards', async (req, res) => {
	fs.readFile(path.join(__dirname, 'db.json'), 'UTF-8', async (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send({ message: 'Server error' });
			return;
		}

		const db = JSON.parse(data);
		const cards = db.cards
		const { requestAction, cardIds } = req.body

		let cardsUpdated;
		switch (requestAction) {
			case 'moveCards':
				const { boxIndex, shelfId } = req.body
				cardsUpdated = cards.map(card => {
					if (cardIds.includes(card.id)) {
						card.box = Number(boxIndex)
						card.shelf = shelfId
						return card
					}
					return card
				})
				db.cards = cardsUpdated
				break;
			case 'removeCards':
				cardsUpdated = cards.map(card => {
					if (cardIds.includes(card.id)) {
						card.deleted = true
						return card
					}
					return card
				})
				db.cards = cardsUpdated
				break
			case 'restoreCards':
				cardsUpdated = cards.map(card => {
					if (cardIds.includes(card.id)) {
						card.deleted = false
						return card
					}
					return card
				})
				db.cards = cardsUpdated
				break
			case 'removeCardsFromTrash':
				// cardsUpdated = cards.map(card => {
				// 	if (cardIds.includes(card.id)) {
				// 		card.deleted = false
				// 		return card
				// 	}
				// 	return card
				// })
				// db.cards = cardsUpdated
				break
			default:
				res.json({ data: 'requestAction is not implemented' })
		}

		fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(db), 'UTF-8', (err) => {
			if (err) {
				console.error(err);
				res.status(500).send({ message: 'Server error' });
				return;
			}

			res.send(cardsUpdated);
		});
	})
})

server.get('/cards', async (req, res) => {
	fs.readFile(path.join(__dirname, 'db.json'), 'UTF-8', async (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send({ message: 'Server error' });
			return;
		}

		const db = await JSON.parse(data);
		const shelvesAndBoxesData = {}
		const shelvesDeleted = db.shelves.reduce((acc, curr) => {
			acc[curr.id] = curr.isDeleted
			return acc
		}, {})

		const shelves = db.shelves
			.forEach(shelf => {

				const boxes = shelf.boxesData
					.map(box => ({ id: box.id, index: box.index }))
					.sort((a, b) => a.index - b.index)

				shelvesAndBoxesData[shelf.id] = {
					maxIndexBox: shelf.boxesData.length - 1,
					boxesItems: boxes,
					shelfTitle: shelf.title,
					shelfIndex: shelf.index,
				}

			})
		const responseData = {
			cards: db.cards.filter(card => {
				if (!card.deleted && !shelvesDeleted[card.shelf]) {
					return true
				}
				return false
			}),
			shelvesAndBoxesData
		};

		// setTimeout(() => {
		// 	res.send(responseData)
		// }, 4000);
		res.send(responseData);
	})
});
server.get('/trash', async (req, res) => {
	fs.readFile(path.join(__dirname, 'db.json'), 'UTF-8', async (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send({ message: 'Server error' });
			return;
		}

		const db = JSON.parse(data);
		const shelvesAndBoxesData = {}
		const shelvesDeleted = db.shelves.filter(shelf => shelf.isDeleted)
		const cardsDeleted = db.cards.filter(card => card.isDeleted)

		const responseData = {
			shelves: shelvesDeleted,
			cards: cardsDeleted,
			boxes: [],
		};

		// setTimeout(() => {
		// 	res.send(responseData)
		// }, 4000);
		res.send(responseData);
	})
});

// server.put('/shelves', (req, res) => {
// 	const newShelves = req.body;
// 	// console.log(newShelves)
// 	// Читаем текущий файл JSON
// 	const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'UTF-8'))
// 	// console.log(db)

// 	db.shelves = newShelves;

// 	// Перезаписываем файл JSON с обновленными данными
// 	fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(db), 'UTF-8');

// 	// Отправляем обновленные данные обратно клиенту
// 	res.send(newShelves);
// });


server.post('/createNewShelf', (req, res) => {
	const titleFromUser = req.body.title;
	console.log(titleFromUser)

	fs.readFile(path.join(__dirname, 'db.json'), 'UTF-8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send({ message: 'Server error' });
			return;
		}

		const db = JSON.parse(data);

		// Обновляем поле shelves
		const shelf = db.shelves[0]
		shelf.title = titleFromUser
		shelf.id = titleFromUser + Math.random().toString()
		shelf.index = 0

		// Перезаписываем файл JSON с обновленными данными
		// fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(db), 'UTF-8', (err) => {
		// 	if (err) {
		// 		console.error(err);
		// 		res.status(500).send({ message: 'Server error' });
		// 		return;
		// 	}

		// Отправляем обновленные данные обратно клиенту
		res.send(shelf);
		// });
	});
});
server.put('/shelves', (req, res) => {
	const newShelves = req.body;

	// Читаем текущий файл JSON
	fs.readFile(path.join(__dirname, 'db.json'), 'UTF-8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send({ message: 'Server error' });
			return;
		}

		const db = JSON.parse(data);

		// Обновляем поле shelves
		db.shelves = newShelves;

		// Перезаписываем файл JSON с обновленными данными
		fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(db), 'UTF-8', (err) => {
			if (err) {
				console.error(err);
				res.status(500).send({ message: 'Server error' });
				return;
			}

			// Отправляем обновленные данные обратно клиенту
			res.send(newShelves);
		});
	});
});
server.post('/restoreAllShelves', (req, res) => {

	fs.readFile(path.join(__dirname, 'db.json'), 'UTF-8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send({ message: 'Server error' });
			return;
		}

		const db = JSON.parse(data);
		const shelves = db.shelves
		const newShelves = shelves.map(shelf => ({ ...shelf, isDeleted: false }))
		db.shelves = newShelves

		fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(db), 'UTF-8', (err) => {
			if (err) {
				console.error(err);
				res.status(500).send({ message: 'Server error' });
				return;
			}

			// Отправляем обновленные данные обратно клиенту
			res.send(newShelves);
		});
	});
});
server.patch('/shelvesOrder', (req, res) => {
	const newShelvesOrder = req.body;

	// Читаем текущий файл JSON
	fs.readFile(path.join(__dirname, 'db.json'), 'UTF-8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send({ message: 'Server error' });
			return;
		}

		const db = JSON.parse(data);
		const newShelves = []
		newShelvesOrder.forEach(shelfDndRepresentation => {
			const newShelfItem = db.shelves.find(shelf => shelf.id === shelfDndRepresentation.id)
			newShelfItem.index = shelfDndRepresentation.index
			newShelves.push(newShelfItem)
		})
		// Обновляем поле shelves
		db.shelves = newShelves;

		// Перезаписываем файл JSON с обновленными данными
		fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(db), 'UTF-8', (err) => {
			if (err) {
				console.error(err);
				res.status(500).send({ message: 'Server error' });
				return;
			}

			// Отправляем обновленные данные обратно клиенту
			res.send(newShelves);
		});
	});
});

server.delete('/shelves', (req, res) => {
	const { shelfId } = req.body;

	// Читаем текущий файл JSON
	fs.readFile(path.join(__dirname, 'db.json'), 'UTF-8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send({ message: 'Server error' });
			return;
		}

		const db = JSON.parse(data);

		// Обновляем поле shelves
		db.shelves = db.shelves.map(shelf => {
			if (shelf.id === shelfId) {
				return { ...shelf, isDeleted: true }
			}
			return shelf
		})

		// Перезаписываем файл JSON с обновленными данными
		fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(db), 'UTF-8', (err) => {
			if (err) {
				console.error(err);
				res.status(500).send({ message: 'Server error' });
				return;
			}

			// Отправляем обновленные данные обратно клиенту
			// res.send(newShelves);
			res.json({ message: 'полка удалена' })
		});
	});
});

server.get('/activeShelves', (req, res) => {
	fs.readFile(path.join(__dirname, 'db.json'), 'UTF-8', async (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send({ message: 'Server error' });
			return;
		}

		const db = await JSON.parse(data);
		const shelves = db.shelves.filter(shelf => shelf.isDeleted !== true)
		res.send(shelves)

	});
});
server.get('/deletedShelves', (req, res) => {
	fs.readFile(path.join(__dirname, 'db.json'), 'UTF-8', async (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send({ message: 'Server error' });
			return;
		}

		const db = await JSON.parse(data);
		const shelves = db.shelves.filter(shelf => shelf.isDeleted === true)
		res.send(shelves)

	});
});

server.patch('/updateBox', (req, res) => {
	// console.log('updateBox START')
	const { shelfId, box } = req.body;
	// console.log('Значение shelfId  ', shelfId)
	// console.log('Значение box  ', box)

	fs.readFile(path.join(__dirname, 'db.json'), 'UTF-8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send({ message: 'Server error' });
			return;
		}

		const db = JSON.parse(data);
		const shelfTargeted = db.shelves.find(shelf => shelf.id === shelfId)
		const shelfTargetedIndex = db.shelves.findIndex(shelf => shelf.id === shelfId)
		const boxTargeted = shelfTargeted.boxesData.find(boxFromDb => boxFromDb.id === box.id)
		const boxTargetedIndex = shelfTargeted.boxesData.findIndex(boxFromDb => boxFromDb.id === box.id)
		const boxUpdated = { ...boxTargeted, ...box }
		shelfTargeted.boxesData[boxTargetedIndex] = boxUpdated
		db.shelves[shelfTargetedIndex] = shelfTargeted

		const responseData = {
			commonShelf: db.commonShelf,
			shelves: db.shelves
		};


		fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(db), 'UTF-8', (err) => {
			if (err) {
				console.error(err);
				res.status(500).send({ message: 'Server error' });
				return;
			}
			res.send(responseData);
		});
	});
});

server.patch('/commonShelf/isCollapsed', (req, res) => {
	const { isCollapsed } = req.body;
	// console.log(req)
	console.log(isCollapsed)
	// Читаем текущий файл JSON
	fs.readFile(path.join(__dirname, 'db.json'), 'UTF-8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send({ message: 'Server error' });
			return;
		}

		const db = JSON.parse(data);
		const commonShelf = db.commonShelf
		commonShelf.isCollapsed = isCollapsed;

		fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(db), 'UTF-8', (err) => {
			if (err) {
				console.error(err);
				res.status(500).send({ message: 'Server error' });
				return;
			}
			res.send(commonShelf);
		});
	});
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	next();
});

server.use(router);

// запуск сервера
const PORT = 8443;
const HTTP_PORT = 8000;

const httpsServer = https.createServer(options, server);
const httpServer = http.createServer(server);

httpsServer.listen(PORT, () => {
	console.log(`server is running on ${PORT} port`);
});

httpServer.listen(HTTP_PORT, () => {
	console.log(`server is running on ${HTTP_PORT} port`);
});