import {cleanup, screen} from '@testing-library/react';
import {renderApp} from "./utils/renderApp";
import {CartApi} from "../../src/client/api";
import {customApi} from "./utils/customApi";


describe('Проверка страниц', () => {
	afterEach(cleanup);

	it('Страница условий доставки имеет статичные данные', async () => {
		const api = new customApi("/hw/store", {except: true})
		const {container} = await renderApp("/delivery", new CartApi(), api);
		expect(api.isError).toBe(false)
	});

	it('Страница контактов имеет статичные данные', async () => {
		const api = new customApi("/hw/store", {except: true})
		const {container} = await renderApp("/contacts", new CartApi(), api);
		expect(api.isError).toBe(false)
	});

	it('Главная страница имеет статичные данные', async () => {
		const api = new customApi("/hw/store", {except: true})
		const {container} = await renderApp("", new CartApi(), api);
		expect(api.isError).toBe(false)
	});

	it('Главная страница открывается корректно', async () => {
		const {container} = await renderApp("");
		expect(container.innerHTML).toContain("Welcome to")
	});

	it('Каталог открывается корректно', async () => {
		const {container} = await renderApp("/catalog");
		const header = screen.getByRole('heading', {name: /catalog/i});
		expect(header).toBeTruthy()
	});

	it('Условия доставки корректно', async () => {
		const {container} = await renderApp("/delivery");
		const header = screen.getByRole('heading', {name: /delivery/i});
		expect(header).toBeTruthy()
	});

	it('Контакты корректно', async () => {
		const {container} = await renderApp("/contacts");
		const header = screen.getByRole('heading', {name: /contacts/i});
		expect(header).toBeTruthy()
	});
})

