import { TEST_BUTTONS_IDS, TEST_ENTITY_NAMES, TEST_INPUTS_IDS, TEST_PAGES_IDS } from '@/shared/const/testConsts'; // Импортируем константы
import { MainPageTest } from '#/helpers/pageObjects/MainPage'
import { AuthPageTest } from '#/helpers/pageObjects/AuthPage'
import { generateDataTestIdSelector, generateRandomString } from '#/helpers';
import { NavigateObject } from '#/helpers/pageObjects/Navigation';
import { TrashPageTest } from '#/helpers/pageObjects/TrashPage';
import { ViewPage, ViewPageTest } from '#/helpers/pageObjects/ViewPage';

describe('Проверка главной страницы', () => {
	let cleanUp: () => void;

	const localStorageData: { [key: string]: any } = {};
	const saveLocalStorageData = () => {
		Object.keys(window.localStorage).forEach(key => {
			localStorageData[key] = window.localStorage.getItem(key);
		});
	}
	const restoreLocalStorageData = () => {
		Object.keys(localStorageData).forEach(key => {
			window.localStorage.setItem(key, localStorageData[key]);
		});
	}

	beforeEach(() => {
		restoreLocalStorageData()
	});

	afterEach(() => {
		saveLocalStorageData()
	});

	it('User can login, after login go to main page', () => {
		AuthPageTest.visit()
		AuthPageTest.goToLogin()
		AuthPageTest.login()
		cy.getByTestId(TEST_PAGES_IDS.mainPage).should('exist')

		cleanUp = () => {
			MainPageTest.visit()
			MainPageTest.pageReadyCheck()
			MainPageTest.removeAllShelfExceptLast()

			TrashPageTest.visit()
			TrashPageTest.pageReadyCheck()
			TrashPageTest.removeAll()
		}
	});

	it('Remove shelf from cupboard, navigate trash, remove from trash', () => {
		// Cypress.env()
		// initial clean up
		cleanUp()
		MainPageTest.visit()
		const shelfTestName = 'testShelf'
		MainPageTest.createNewShelfFull(shelfTestName)
		NavigateObject.navigateView()
		ViewPageTest.checkShelfExistByName(shelfTestName)
		// MainPageTest.removeFirstShelf()
		// NavigateObject.navigateTrash()
		// TrashPageTest.pageReadyCheck()
		// TrashPageTest.checkShelfExistByName(shelfTestName)
		// TrashPageTest.clickRemoveItem()
		// TrashPageTest.getAllShelves().should('have.length', 0);

		// MainPageTest.getAllShelves().should('have.length', 1);

		// TrashPageTest.pageReadyCheck()
		// TrashPageTest.getAllShelvesCount().then(count => {
		// 	TrashPageTest.clickRemoveItem()
		// 	TrashPageTest.getAllShelves().should('have.length', 0);
		// })
	});
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
});