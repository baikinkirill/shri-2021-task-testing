import {cleanup, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderApp} from "./utils/renderApp";


describe('Проверка навигации', () => {

	it('В шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', async () => {
		const {container} = await renderApp();

		const children = Array.from(container.getElementsByClassName("navbar-nav"))[0]

		const catalog = screen.getByRole('link', {name: /catalog/i});
		expect(catalog.innerHTML).toContain("Catalog")

		const delivery = screen.getByRole('link', {name: /delivery/i});
		expect(delivery.innerHTML).toContain("Delivery")

		const contacts = screen.getByRole('link', {name: /contacts/i});
		expect(contacts.innerHTML).toContain("Contacts")

		const cart = screen.getByRole('link', {name: /cart/i});
		expect(cart.innerHTML).toContain("Cart")
	});

	it('Название магазина является ссылкой на главную страницу', async () => {
		const {container} = await renderApp();

		const headerLink = container.getElementsByClassName("navbar-brand")[0]
		expect(headerLink.getAttribute("href")).toBe("/")
		expect(headerLink.tagName).toBe("A")

	});
})

