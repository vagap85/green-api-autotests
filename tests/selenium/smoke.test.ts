import { Builder, By, until } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

describe('WhatsApp Web Smoke Test', () => {
    jest.setTimeout(120000);

    test('should verify WhatsApp Web interface elements', async () => {
        const options = new chrome.Options();

        if (process.env.HEADLESS !== 'false') {
            options.addArguments('--headless');
        }

        options.addArguments(
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--window-size=1920,1080'
        );

        const driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        try {
            // Открываем WhatsApp Web
            await driver.get('https://web.whatsapp.com');

            // Ждем загрузки страницы
            await driver.wait(until.titleContains('WhatsApp'), 30000);

            const title = await driver.getTitle();
            console.log('Page title: ${title}');

            // Проверяем основные элементы
            expect(title).toContain('WhatsApp');

            // Проверяем что body загружен
            const body = await driver.findElement(By.tagName('body'));
            expect(await body.isDisplayed()).toBe(true);

            // Проверяем наличие основных тегов
            const html = await driver.findElement(By.tagName('html'));
            const pageSource = await html.getAttribute('innerHTML');
            expect(pageSource.length).toBeGreaterThan(0);

            console.log('Smoke test passed: All basic checks completed');

        } catch (error) {
            console.error('Smoke test failed:', error);
            throw error;
        } finally {
            await driver.quit();
        }
    });
});