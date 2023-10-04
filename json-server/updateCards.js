const updateDB = async () => {
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

					boxesItems: boxes,
				}

			})
		console.log(shelvesAndBoxesData)
		const cardsFromDB = db.cards
		const newCardsData = cardsFromDB.map(card => {
			const { box, shelf, ...otherPart } = card
			// if (!card.box && card.box !== 0) {
			// 	console.log(card.id)
			// }
			// if (!shelvesAndBoxesData[card.shelf]) {
			// 	return null
			// }
			// const boxId = shelvesAndBoxesData[card.shelf].boxesItems[card.box].id
			// console.log(boxId)
			// card.boxId = boxId
			return { ...otherPart, boxIndex: box, shelfId: shelf }
			// console.log( boxId[card.box].id)
			// console.log(card.box, boxId[card.box].id)
		})
		const newCardsFiltered = newCardsData.filter(card => card !== null)
		db.cards = newCardsFiltered
		console.log(newCardsData)
		fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(db), 'UTF-8', (err) => {
			if (err) {
				console.error(err);
				res.status(500).send({ message: 'Server error' });
				return;
			}
		});
	});
}
updateDB()