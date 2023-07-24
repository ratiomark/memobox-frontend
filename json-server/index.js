/* eslint-disable */
const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const https = require('https');
const http = require('http');

const options = {
	key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
	cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
};

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
// server.use(async (req, res, next) => {
// 	await new Promise((res) => {
// 		setTimeout(res, 1000);
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
		const responseData = {
			commonShelf: db.commonShelf,
			shelves: db.shelves
		};

		setTimeout(() => {
			res.send(responseData)
		}, 2000);
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
server.get('/cards', async (req, res) => {
	fs.readFile(path.join(__dirname, 'db.json'), 'UTF-8', async (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send({ message: 'Server error' });
			return;
		}

		const db = JSON.parse(data);
		const shelvesAndBoxesData = {}
		const shelves = db.shelves.forEach(shelf => {
			shelf.map
		})
		const responseData = {
			commonShelf: db.cards,
			shelves: db.shelves
		};

		res.send(responseData)
		
		// res.send(responseData);
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