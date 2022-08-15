import {cleanup, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {mockData} from "./utils/mockData";
import {renderApp} from "./utils/renderApp";
import {customCartApi} from "./utils/customApi";
import {CartApi} from "../../src/client/api";

function getCart(){
	const cart = new customCartApi()
	const itemsCart = {
		0: {name: mockData[0].name, price: mockData[0].price, count: 1},
	}
	cart.setState(itemsCart);

	return cart
}

describe('Проверка каталога', () => {
	afterEach(cleanup);

	it('На странице каталога отображаются КОРРЕКТНЫЕ данные, которые пришли с сервера (название, цена и ссылка на страницу товара)', async () => {
		const {container} = await renderApp("/catalog")
		for (let i of mockData) {
			expect(container.innerHTML).toContain(i.name)
			expect(container.innerHTML).toContain(i.price.toString())
			expect(container.innerHTML).toContain(`/catalog/${i.id}`)
		}
	});

	it('На странице товара отображаются корректные данные', async () => {
		const {container, history} = await renderApp("/catalog/0")
		expect(container.innerHTML).toContain(mockData[0].name)
		expect(container.innerHTML).toContain(mockData[0].price.toString())
		expect(container.innerHTML).toContain(mockData[0].material)
		expect(container.innerHTML).toContain(mockData[0].color)
		expect(container.innerHTML).toContain(mockData[0].description)
	});

	it('Если товар уже добавлен в корзину, в каталоге отображается сообщение об этом', async () => {
		const {container, history} = await renderApp("/catalog", getCart())
		const card = Array.from(container.getElementsByClassName("row")[1].children)[0].innerHTML
		expect(card).toContain("Item in cart")
	});

	it('Если товар уже добавлен в корзину, НА СТРАНИЦЕ ТОВАРА отображается сообщение об этом', async () => {
		const {container, history} = await renderApp("/catalog/0", getCart())
		expect(container.innerHTML).toContain("Item in cart")
	});

	it('Если товар уже добавлен в корзину, в КОРЗИНЕ это отобразится', async () => {
		const {container, history} = await renderApp("/cart", getCart())
		expect(container.innerHTML).toContain(mockData[0].name)
		expect(container.innerHTML).toContain(mockData[0].price.toString())
	});

	it('Повторное нажатие на "Add to card" увеличивает количество в корзине', async () => {
		const {container, history} = await renderApp("/catalog/0", new customCartApi())
		await userEvent.click(screen.getByRole('button', {name: /add to cart/i}));
		await userEvent.click(screen.getByRole('button', {name: /add to cart/i}));
		await userEvent.click(screen.getByRole('button', {name: /add to cart/i}));

		const {container:container2} = await renderApp("/cart", new customCartApi())

		const count = container2.getElementsByClassName("Cart-Count")[0].innerHTML
		expect(Number(count) > 2).toBe(true)
	});

	it('Cодержимое корзины сохраняется между перезагрузками страницы', async () => {
		localStorage.clear()
		const cart = new CartApi()
		const itemsCart = {
			0: {name: mockData[0].name, price: mockData[0].price, count: 1},
		}
		cart.setState(itemsCart);

		const {container} = await renderApp("/cart", cart)
		expect(container.innerHTML).toContain(mockData[0].price.toString())
		expect(container.innerHTML).toContain(mockData[0].name)
	});
})

