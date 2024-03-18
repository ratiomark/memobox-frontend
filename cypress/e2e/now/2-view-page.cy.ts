import { MainPageTest } from '#/helpers/pageObjects/MainPage'
import { AuthPageTest } from '#/helpers/pageObjects/AuthPage'
import { loginAndGetToken, restoreDb, saveDb } from '#/helpers/backend/utils'
import { TEST_PAGES_IDS } from '@/shared/const/testConsts'
import { restoreLocalStorageData, clearLocalStorageData, saveLocalStorageData } from '#/helpers/localStorage'

describe('Проверка главной страницы', () => {
	let cleanUp: () => void

	beforeEach(() => {
		restoreLocalStorageData()
	})
	after(() => {
		loginAndGetToken().then((token) => {
			restoreDb(token)
		})
		clearLocalStorageData()
	})

	afterEach(() => {
		saveLocalStorageData()
	})

	it('initial auth', () => {
		loginAndGetToken().then((token) => {
			restoreDb(token)
			AuthPageTest.visit()
			AuthPageTest.goToLogin()
			AuthPageTest.login()
			cy.getByTestId(TEST_PAGES_IDS.mainPage).should('exist')
			saveDb(token)
		})

		cleanUp = () => {
			// MainPageTest.visit()
			// MainPageTest.pageReadyCheck()
			// MainPageTest.removeAllShelfExceptLast()
			// TrashPageTest.visit()
			// TrashPageTest.pageReadyCheck()
			// TrashPageTest.removeAll()
		}
	})
	it('Visit main page without login, create 3 new shelves', () => {
		// Cypress.env()
		MainPageTest.visit()
		MainPageTest.pageReadyCheck()
		MainPageTest.unfoldFirstShelf()
		MainPageTest.checkLabelOnBoxFirstShelf('new', 'allLabel', 5)
		MainPageTest.checkLabelOnBoxFirstShelf('learnt', 'allLabel', 5)
		MainPageTest.checkLabelOnBoxFirstShelf('learnt', 'trainLabel', 5)
		MainPageTest.checkLabelOnBoxFirstShelf('learnt', 'waitLabel', 0)
		MainPageTest.clickBoxTraining('new')
		// cy.wait(5000);
		// const shelfTestName = MainPageTest.createNewShelfFull() 
		// MainPageTest.clickShelfTrainByName('Shelf A')
	});
	it('Visit main page without login, create 3 new shelves', () => {
		// Cypress.env()
		MainPageTest.visit()
		MainPageTest.pageReadyCheck()
		cy.get('body').type('{t + 1}')
		cy.wait(8000);
		// MainPageTest.clickBoxTraining('learnt')
		const shelfTestName = MainPageTest.createNewShelfFull()
		// cy.wait(5000);
		MainPageTest.unfoldShelfByName(shelfTestName)
		cy.get('body').type('{t + 1}')
		cy.wait(1000);
		// MainPageTest.clickShelfTrainByName('Shelf A')
	});
	it('Visit main page without login, create 3 new shelves', () => {
		// Cypress.env()
		MainPageTest.visit()
		MainPageTest.pageReadyCheck()
		MainPageTest.clickBoxTraining(1)
		// cy.wait(5000);
		// const shelfTestName = MainPageTest.createNewShelfFull() 
		// MainPageTest.clickShelfTrainByName('Shelf A')
	});
	// it('Create cards, check labels in cupboard, go to view page and check labels in common shelf', () => {
	// 	let allCards = 30
	// 	let trainCards = 30
	// 	const waitCards = 0
	// 	MainPageTest.visit()
	// 	const shelfTestName = MainPageTest.createNewShelfFull()
	// 	const newCardNumber = 2
	// 	CommonTest.checkLabel('allLabel', allCards)
	// 	CommonTest.checkLabel('trainLabel', trainCards)
	// 	CommonTest.checkLabel('waitLabel', waitCards)
	// 	Array.from({ length: newCardNumber }, () => {
	// 		MainPageTest.createNewCardFull()
	// 	})
	// 	CommonTest.checkLabel('allLabel', allCards + newCardNumber)
	// 	allCards = allCards+newCardNumber
	// 	CommonTest.checkLabel('trainLabel', trainCards + newCardNumber)
	// 	trainCards = trainCards +newCardNumber
	// 	CommonTest.checkLabel('waitLabel', waitCards)

	// 	NavigateObject.navigateView()
	// 	ViewPageTest.pageReadyCheck()

	// 	// будет проверять общую полку + новые карточки.
	// 	CommonTest.checkLabel('allLabel', 5 + newCardNumber)
	// 	CommonTest.checkLabel('trainLabel', 5 + newCardNumber)
	// 	CommonTest.checkLabel('waitLabel', 0)

	// 	ViewPageTest.clickBox('all')
	// 	CommonTest.checkLabel('allLabel', allCards)
	// 	CommonTest.checkLabel('trainLabel', trainCards)
	// 	CommonTest.checkLabel('waitLabel', waitCards)

	// 	ViewPageTest.clickBox('learning')
	// 	CommonTest.checkLabel('allLabel', allCards - newCardNumber - 5 - 5)
	// 	CommonTest.checkLabel('trainLabel', trainCards - newCardNumber - 5 - 5)
	// 	CommonTest.checkLabel('waitLabel', waitCards)

	// 	ViewPageTest.clickBox('learnt')
	// 	CommonTest.checkLabel('allLabel', 5)
	// 	CommonTest.checkLabel('trainLabel', 5)
	// 	CommonTest.checkLabel('waitLabel', waitCards)

	// 	loginAndGetToken().then((token) => {
	// 		restoreDb(token)
	// 	})
	// })
	// it('Create shelf, create cards, check labels, go to view page, check shelf', () => {
	// 	const allCards = 30
	// 	const trainCards = 30
	// 	const waitCards = 0
	// 	MainPageTest.visit()
	// 	const shelfTestName = MainPageTest.createNewShelfFull()
	// 	const newCardNumber = 2
	// 	CommonTest.checkLabel('allLabel', allCards)
	// 	CommonTest.checkLabel('trainLabel', trainCards)
	// 	CommonTest.checkLabel('waitLabel', waitCards)
	// 	Array.from({ length: newCardNumber }, () => {
	// 		MainPageTest.createNewCardFull()
	// 	})
	// 	CommonTest.checkLabel('allLabel', allCards + newCardNumber)
	// 	CommonTest.checkLabel('trainLabel', trainCards + newCardNumber)
	// 	CommonTest.checkLabel('waitLabel', waitCards)

	// 	MainPageTest.clickShelfViewByName(shelfTestName)
	// 	ViewPageTest.pageReadyCheck()
	// 	ViewPageTest.checkShelfExistByName(shelfTestName)
	// 	ViewPageTest.clickShelfByName(shelfTestName)

	// 	// поскольку я нажал view на полке, то сразу попаду в все карточки
	// 	CommonTest.checkLabel('allLabel', newCardNumber)
	// 	CommonTest.checkLabel('trainLabel',newCardNumber)
	// 	CommonTest.checkLabel('waitLabel', 0)

	// 	ViewPageTest.clickBox('new')
	// 	CommonTest.checkLabel('allLabel', newCardNumber)
	// 	CommonTest.checkLabel('trainLabel', newCardNumber)
	// 	CommonTest.checkLabel('waitLabel', 0)

	// 	ViewPageTest.clickBox('learnt')
	// 	CommonTest.checkLabel('allLabel', 0)
	// 	CommonTest.checkLabel('trainLabel', 0)
	// 	CommonTest.checkLabel('waitLabel', 0)

	// 	loginAndGetToken().then((token) => {
	// 		restoreDb(token)
	// 	})
	// })
	// cleanUp()

	// 	TrashPageTest.visit()
	// 	TrashPageTest.getAllShelvesCount().then(count => {
	// 		MainPageTest.getAllShelves().should('exist')
	// 		cy.getByTestId(TEST_BUTTONS_IDS.shelf.skeletonButtons).should('not.exist');
	// 		MainPageTest.createNewShelfFull()
	// 		MainPageTest.createNewShelfFull()
	// 		MainPageTest.getAllShelves().should('have.length', count + 2);
	// 		MainPageTest.removeFirstShelf()
	// 		MainPageTest.removeFirstShelf()
	// 		NavigateObject.navigateSettings()
	// 		// cy.wait(1000);
	// 		NavigateObject.navigateMain()
	// 		MainPageTest.getAllShelves().should('have.length', count);
	// 	})
	// it('Visit main page without login, create 3 new shelves', () => {
	// 	// Cypress.env()
	// 	MainPageTest.visit()
	// 	cy.getByTestId(TEST_PAGES_IDS.mainPage).should('exist')
	// 	MainPageTest.getAllShelves().should('exist');
	// 	MainPageTest.getAllShelvesCount().then(count => {
	// 		createNewShelf()
	// 		createNewShelf()
	// 		createNewShelf()
	// 		MainPageTest.getAllShelves().should('have.length', count + 3);
	// 	})
	// });
	// it('User can remove all shelf except last', () => {
	// 	MainPageTest.visit()
	// 	MainPageTest.getAllShelves().should('exist')
	// 	cy.getByTestId(TEST_BUTTONS_IDS.shelf.skeletonButtons).should('not.exist');
	// 	MainPageTest.removeAllShelfExceptLast()
	// 	cy.wait(8000);
	// 	MainPageTest.getAllShelves().should('have.length', 1);
	// });
	// it("Can't create shelf with the same name", () => {
	// 	MainPageTest.visit()
	// 	MainPageTest.removeAllShelfExceptLast()
	// 	createNewShelf('test name')
	// 	MainPageTest.clickCreateNewShelf()
	// 	MainPageTest.typeShelfName('test name')
	// 	cy.getByTestId(TEST_INPUTS_IDS.common.inputShowError).should('exist')
	// 	MainPageTest.typeShelfName('2')
	// 	cy.getByTestId(TEST_INPUTS_IDS.common.inputShowError).should('not.exist')
	// 	MainPageTest.submitModal()
	// 	MainPageTest.getAllShelves().should('have.length', 3);
	// });
	// it('Should create 2 shelves, remove shelves, remove shelves from UI', () => {
	// 	MainPageTest.visit()
	// 	MainPageTest.getAllShelvesCount().then(count => {
	// 		MainPageTest.getAllShelves().should('exist')
	// 		cy.getByTestId(TEST_BUTTONS_IDS.shelf.skeletonButtons).should('not.exist');
	// 		createNewShelf()
	// 		createNewShelf()
	// 		MainPageTest.getAllShelves().should('have.length', count + 2);
	// 		MainPageTest.removeFirstShelf()
	// 		MainPageTest.removeFirstShelf()
	// 		NavigateObject.navigateSettings()
	// 		// cy.wait(1000);
	// 		NavigateObject.navigateMain()
	// 		MainPageTest.getAllShelves().should('have.length', count);
	// 	})
	// 	// MainPageTest.getAllShelvesCount().then(count => {
	// 	// 	MainPageTest.getAllShelves().should('exist')
	// 	// 	cy.getByTestId(TEST_BUTTONS_IDS.shelf.skeletonButtons).should('not.exist');
	// 	// 	createNewShelf()
	// 	// 	MainPageTest.getAllShelves().should('have.length', count + 1);
	// 	// 	MainPageTest.removeFirstShelf()
	// 	// 	NavigateObject.navigateTrash()
	// 	// 	cy.wait(3000);
	// 	// 	NavigateObject.navigateMain()
	// 	// 	MainPageTest.getAllShelves().should('have.length', count);
	// 	// })
	// });

	// it('Should create shelf, remove shelf, remove shelf from UI', () => {
	// 	MainPageTest.visit()
	// 	MainPageTest.getAllShelvesCount().then(count => {
	// 		MainPageTest.getAllShelves().should('exist')
	// 		cy.getByTestId(TEST_BUTTONS_IDS.shelf.skeletonButtons).should('not.exist');
	// 		createNewShelf()
	// 		MainPageTest.getAllShelves().should('have.length', count + 1);
	// 		MainPageTest.removeFirstShelf()
	// 		NavigateObject.navigateTrash()
	// 		// cy.wait(1000);
	// 		NavigateObject.navigateMain()
	// 		MainPageTest.getAllShelves().should('have.length', count);
	// 	})
	// 	// MainPageTest.getAllShelvesCount().then(count => {
	// 	// 	MainPageTest.getAllShelves().should('exist')
	// 	// 	cy.getByTestId(TEST_BUTTONS_IDS.shelf.skeletonButtons).should('not.exist');
	// 	// 	createNewShelf()
	// 	// 	MainPageTest.getAllShelves().should('have.length', count + 1);
	// 	// 	MainPageTest.removeFirstShelf()
	// 	// 	NavigateObject.navigateTrash()
	// 	// 	cy.wait(3000);
	// 	// 	NavigateObject.navigateMain()
	// 	// 	MainPageTest.getAllShelves().should('have.length', count);
	// 	// })
	// });

	// it('should drag the element 200 pixels down', () => {
	// 	// Посещаем нужную страницу
	// 	MainPageTest.visit()
	// 	MainPageTest.getAllShelves().should('exist')
	// 	cy.getByTestId(TEST_BUTTONS_IDS.shelf.skeletonButtons).should('not.exist');
	// 	const sourceSelector = `[data-shelf-index-testid="0"] [data-testid="${TEST_BUTTONS_IDS.shelf.dragButton}"]`;
	// 	// Находим кнопку для перетаскивания и получаем её координаты
	// 	cy.get(sourceSelector).then($el => {
	// 		const rect = $el[0].getBoundingClientRect();
	// 		const startX = rect.left + (rect.width / 2);
	// 		const startY = rect.top + (rect.height / 2);
	// 		console.log('startX', startX)
	// 		console.log('startY', startY)
	// 		// Зажимаем ПКМ на вычисленных координатах
	// 		$el.trigger('pointerdown', {
	// 			button: 0,
	// 			// clientX: startX,
	// 			// clientY: startY,
	// 			force: true // Используем force, чтобы гарантировать выполнение действия
	// 		}).trigger('pointermove', {
	// 			clientX: startX,
	// 			clientY: startY + 200,
	// 			force: true
	// 		}).trigger('pointerup', {
	// 			force: true
	// 		});

	// 		// Перемещаем на 200 пикселей вниз
	// 		// cy.get('body').trigger('pointermove', {
	// 		// 	clientX: startX,
	// 		// 	clientY: startY + 200,
	// 		// 	force: true
	// 		// });

	// 		// // Отпускаем мышку
	// 		// cy.get('body').trigger('pointerup', {
	// 		// 	force: true
	// 		// });
	// 	});

	// 	// В этом месте добавьте проверки, чтобы убедиться, что перетаскивание прошло успешно
	// });
	// it('Visit main page without login, create 3 new shelves', () => {
	// 	// Cypress.env()
	// 	MainPageTest.visit()
	// 	cy.get(`[data-shelf-index-testid="0"] [data-testid="${TEST_BUTTONS_IDS.shelf.dragButton}"]`).then($el => {
	// 		// Получаем позицию элемента
	// 		const rect = $el[0].getBoundingClientRect();

	// 		// Вычисляем координаты для симуляции pointerdown
	// 		// Здесь мы берем начальные координаты элемента и добавляем небольшое смещение,
	// 		// чтобы симулировать нажатие внутри элемента, а не на его границе.
	// 		const startX = rect.left + (rect.width / 2);
	// 		const startY = rect.top + (rect.height / 2);
	// 		$el.trigger('pointerdown', { button: 0 });
	// 		// Симулируем событие pointerdown с динамически полученными координатами
	// 		// cy.get('body').trigger('pointerdown', {
	// 		// 	button: 0,
	// 		// 	clientX: startX,
	// 		// 	clientY: startY,
	// 		// 	force: true // Используйте force, если элемент изначально не интерактивен
	// 		// });

	// 		const deltaY = 100; // Количество пикселей, на которое вы хотите переместить курсор вниз

	// 		cy.get('body').trigger('pointermove', {
	// 			clientX: startX, // X координата остаётся той же
	// 			clientY: startY + deltaY // Увеличиваем Y координату
	// 		}).trigger('pointerup', { force: true }); // Симулируем отпускание кнопки мыши
	// 		// cy.get('[data-drop-testid="target-dropzone-test-id"]') // Замените на ваш конкретный `data-testid`
	// 		// 	.trigger('pointerup', { force: true }); // Симулируем отпускание кнопки мыши
	// 	});

	// 	// const targetSelector = `[data-shelf-index-testid="2"] [data-testid="${TEST_BUTTONS_IDS.shelf.dragButton}"]`;
	// 	// const sourceSelector = `[data-shelf-index-testid="0"] [data-testid="${TEST_BUTTONS_IDS.shelf.dragButton}"]`;
	// 	// cy.get(sourceSelector) // Замените на ваш конкретный `data-testid`
	// 	// 	.trigger('pointerdown', { button: 0 }); // Симулируем нажатие левой кнопкой мыши

	// 	// // Здесь может быть добавлена логика для симуляции движения мыши, если это необходимо
	// 	// cy.wait(1000)

	// 	// cy.get('body').trigger('pointermove', { clientX: 100, clientY: 200 });
	// 	// cy.wait(1000)
	// 	// // Завершаем перетаскивание (пример, нужен ваш целевой селектор)
	// 	// cy.get('[data-drop-testid="target-dropzone-test-id"]') // Замените на ваш конкретный `data-testid`
	// 	// 	.trigger('pointerup', { force: true }); // Симулируем отпускание кнопки мыши

	// 	// cy.get(sourceSelector).drag(targetSelector);
	// 	// const targetSelector = `[data-shelf-index-testid="${2}"] ${TEST_BUTTONS_IDS.shelf.dragButton}`;
	// 	// const dataTransfer = new DataTransfer();
	// 	// // data - shelf - index - testid={ TEST_ENTITY_NAMES.shelfItem + props.shelf.index }
	// 	// cy.get(`[data-shelf-index-testid="${0}"]`)
	// 	// 	.findByTestId(TEST_BUTTONS_IDS.shelf.dragButton)
	// 	// 	.drag(targetSelector)

	// 	// // data-shelf-index-testid
	// 	// // Симуляция перемещения над целевым элементом
	// 	// cy.get(`[data-shelf-index-testid="${2}"]`).findByTestId(TEST_BUTTONS_IDS.shelf.dragButton).trigger('dragover');
	// 	// cy.get(`[data-shelf-index-testid="${2}"]`).findByTestId(TEST_BUTTONS_IDS.shelf.dragButton).trigger('drop', {
	// 	// 	dataTransfer
	// 	// });
	// });
})
