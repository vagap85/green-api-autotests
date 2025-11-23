import { Builder, By, until } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

describe('WhatsApp Web Basic Tests', () => {
    jest.setTimeout(120000);

    test('should load WhatsApp Web homepage', async () => {
        const options = new chrome.Options();

        // Headless режим по умолчанию
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
            console.log('Opening WhatsApp Web...');
            await driver.get('https://web.whatsapp.com');

            // Проверяем заголовок страницы
            const title = await driver.getTitle();
            expect(title).toContain('WhatsApp');

            console.log('Page title: ${title}');
            console.log('WhatsApp Web loaded successfully');

        } finally {
            await driver.quit();
            console.log('Browser closed');
        }
    });
});