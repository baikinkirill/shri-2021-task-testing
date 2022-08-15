import {cleanup, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderApp} from "./utils/renderApp";
import {customCartApi} from "./utils/customApi";
import {mockData} from "./utils/mockData";


describe('Проверка корзины', () => {
	afterEach(cleanup);
	beforeEach(() => {
		localStorage.clear()
	})

	it('В шапке рядом со ссылкой на корзину отображается количество не повторяющихся товаров в ней', async () => {
		const {container, history} = await renderApp("/catalog/0")
		await userEvent.click(screen.getByRole('button', {name: /add to cart/i}));
		await userEvent.click(screen.getByRole('button', {name: /add to cart/i}));
		await userEvent.click(screen.getByRole('button', {name: /add to cart/i}));
		expect(container.innerHTML).toContain("Cart (1)")
	});

	it('В корзине корректно отображается таблица с информацией о товарах', async () => {
		const cart = new customCartApi();
		const itemsCart = {
			0: {name: mockData[0].name, price: mockData[0].price, count: 2},
			1: {name: mockData[1].name, price: mockData[1].price, count: 3},
		}
		cart.setState(itemsCart)

		await renderApp("/cart", cart)

		const firstRow = screen.getByRole('row', {name: `1 ${mockData[0].name} $${mockData[0].price} 2 $${mockData[0].price * 2}`}).innerHTML
		const secondRow = screen.getByRole('row', {name: `2 ${mockData[1].name} $${mockData[1].price} 3 $${mockData[1].price * 3}`}).innerHTML

		expect(firstRow).toContain(mockData[0].name)
		expect(firstRow).toContain(mockData[0].price.toString())
		expect(firstRow).toContain("2")
		expect(firstRow).toContain((mockData[0].price * 2).toString())

		expect(secondRow).toContain(mockData[1].name)
		expect(secondRow).toContain(mockData[1].price.toString())
		expect(secondRow).toContain("3")
		expect(secondRow).toContain((mockData[1].price * 3).toString())
	});

	it('В корзине корректно отображается общая сумма заказа', async () => {
		const cart = new customCartApi();
		const itemsCart = {
			0: {name: mockData[0].name, price: mockData[0].price, count: 2},
			1: {name: mockData[1].name, price: mockData[1].price, count: 3},
		}
		cart.setState(itemsCart)

		await renderApp("/cart", cart)
		const row = screen.getByRole('row', {name: `Order price: $156`}).innerHTML
		expect(row).toContain("$156")
	});

	it('В корзине корректно работает кнопка очистки', async () => {
		const cart = new customCartApi();
		const itemsCart = {
			0: {name: mockData[0].name, price: mockData[0].price, count: 2},
			1: {name: mockData[1].name, price: mockData[1].price, count: 3},
		}
		cart.setState(itemsCart)

		await renderApp("/cart", cart)
		const button = screen.getByRole('button', {name: `Clear shopping cart`})
		await userEvent.click(button)

		expect(JSON.stringify(cart.getState())).toEqual("{}")
	});

	it('При пустой корзине отображается ссылка на каталог', async () => {
		const {container} = await renderApp("/cart")
		const linkParent = container.getElementsByClassName("Cart")[0]

		expect(linkParent.innerHTML.toLowerCase()).toContain("<a href=\"/catalog\">catalog</a>")
	});


})

