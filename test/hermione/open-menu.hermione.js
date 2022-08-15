const { assert } = require('chai');

describe('Проверка верстки корзины на разных разрешениях экрана', async function() {
    it('2400x1080 -- ./cart', async function({browser}) {
        await browser.url('./cart');
        await browser.setWindowSize(320, 900);
        await browser.$(".Application-Toggler").click();
        await browser.pause(1000);
        await browser.$(".nav-link").click();
        await browser.assertView('plain', '.container', {
            screenshotDelay:1000,
        });
    });

});
