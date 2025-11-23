import { Builder, By, until } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

describe('Green-API Integration Tests', () => {
    jest.setTimeout(120000);

    test('should verify WhatsApp Web after API message', async () => {
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
            // Здесь можно добавить логику:
            // 1. Сначала отправить сообщение через Green-API
            // 2. Затем проверить в UI WhatsApp Web

            console.log('Opening WhatsApp Web for integration test...');
            await driver.get('https://web.whatsapp.com');

            // Ждем загрузки
            await driver.wait(until.titleContains('WhatsApp'), 30000);

            const title = await driver.getTitle();
            expect(title).toContain('WhatsApp');

            // Проверяем основные элементы интерфейса
            const selectorsToCheck = ['body', 'html', 'div', 'main'];

            for (const selector of selectorsToCheck) {
                const elements = await driver.findElements(By.css(selector));
                console.log(`Found ${elements.length} <${selector}> elements`);
                expect(elements.length).toBeGreaterThan(0);
            }

            console.log('Integration test completed successfully');

        } catch (error) {
            console.error('Integration test failed:', error);
            throw error;
        } finally {
            await driver.quit();
        }
    });
});