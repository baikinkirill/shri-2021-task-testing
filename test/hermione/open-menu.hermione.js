const { assert } = require('chai');

describe('При выборе элемента из меню "гамбургера", меню закрывается', async function() {
    it('2400x1080 -- ./cart', async function({browser}) {
        await browser.url('./cart');
        await browser.setWindowSize(320, 900);
        await browser.$(".Application-Toggler").click();
        await browser.pause(1000);
        await browser.$(".nav-link").click();
        await browser.assertView('plain', '.container', {
            allowViewportOverflow: true,
            captureElementFromTop: false,
            compositeImage: false,
            screenshotDelay: 1000,
        });
    });

});
