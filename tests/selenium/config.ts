export const seleniumConfig = {
    headless: process.env.HEADLESS !== 'false', // По умолчанию true
    timeout: 120000,
    baseUrl: 'https://web.whatsapp.com',
    testPhoneNumber: process.env.TEST_PHONE_NUMBER || '79876543210@c.us'
};