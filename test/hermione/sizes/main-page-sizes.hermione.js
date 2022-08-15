const {assert} = require('chai');

async function loadPage(width, height, browser) {
	await browser.url('./');
	await browser.setWindowSize(width, height);
	await browser.assertView('plain', '#root', {
		ignoreElements:['Application-Brand'],
		screenshotDelay:1000,
	});
}

describe('Проверка верстки главной страницы на разных разрешениях экрана', async function () {
	it('2400x1080 -- ./', async function ({browser}) {
		await loadPage(2400, 1080, browser);
	});

	it('1920x1080 -- ./', async function ({browser}) {
		await loadPage(1920, 1080, browser);
	});

	it('1800x1080 -- ./', async function ({browser}) {
		await loadPage(1800, 1080, browser);
	});

	it('1500x1080 -- ./', async function ({browser}) {
		await loadPage(1500, 1080, browser);
	});

	it('1200x800 -- ./', async function ({browser}) {
		await loadPage(1200, 800, browser);
	});

	it('920x500 -- ./', async function ({browser}) {
		await loadPage(920, 500, browser);
	});

	it('360x800 -- ./', async function ({browser}) {
		await loadPage(360, 800, browser);
	});
});
