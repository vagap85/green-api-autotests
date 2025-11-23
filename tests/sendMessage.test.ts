import { sendMessage } from '../src/api/sendMessage';
import { getStateInstance } from '../src/api/getStateInstance';
import { config } from '../src/config/config';
import { ApiError } from '../src/types/types';

// Мок для axios
jest.mock('axios');
const axios = require('axios');

describe('SendMessage API Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Проверка авторизации инстанса
    test('instance should be authorized', async () => {
        const mockState = { stateInstance: 'authorized' };
        axios.get.mockResolvedValue({ data: mockState });

        const state = await getStateInstance();
        expect(state.stateInstance).toBe('authorized');
    });

    // Успешная отправка сообщения
    test('should send message successfully - status 200', async () => {
        const mockResponse = {
            status: 200,
            data: { idMessage: '12345' }
        };
        axios.post.mockResolvedValue(mockResponse);

        const response = await sendMessage({
            chatId: config.chatId,
            message: "Test message from Jest"
        });

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('idMessage');
        expect(typeof response.data.idMessage).toBe('string');
    });

    // Проверка обязательных полей - отсутствие chatId
    test('should return 400 for missing chatId', async () => {
        const mockError = {
            response: {
                status: 400,
                data: { message: 'Missing required field: chatId' }
            }
        };
        axios.post.mockRejectedValue(mockError);

        try {
            await sendMessage({ message: "Test" } as any);
        } catch (error) {
            const apiError = error as ApiError;
            expect(apiError.response.status).toBe(400);
        }
    });

    // Проверка обязательных полей - отсутствие message
    test('should return 400 for missing message', async () => {
        const mockError = {
            response: {
                status: 400,
                data: { message: 'Missing required field: message' }
            }
        };
        axios.post.mockRejectedValue(mockError);

        try {
            await sendMessage({ chatId: config.chatId } as any);
        } catch (error) {
            const apiError = error as ApiError;
            expect(apiError.response.status).toBe(400);
        }
    });

    // Проверка на неавторизованный инстанс
    test('should return error for unauthorized instance', async () => {
        const mockError = {
            response: {
                status: 401,
                data: { message: 'Instance not authorized' }
            }
        };
        axios.post.mockRejectedValue(mockError);

        try {
            await sendMessage({
                chatId: config.chatId,
                message: "Test message"
            });
        } catch (error) {
            const apiError = error as ApiError;
            expect(apiError.response.status).toBe(401);
        }
    });
});