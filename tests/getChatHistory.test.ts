import { getChatHistory } from '../src/api/getChatHistory';
import { config } from '../src/config/config';
import { ApiError } from '../src/types/types';

// Мок для axios
jest.mock('axios');
const axios = require('axios');

describe('GetChatHistory API Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return chat history - status 200', async () => {
        const mockHistory = [
            {
                idMessage: '123',
                timestamp: 1620000000,
                type: 'outgoing',
                chatId: config.chatId,
                text: 'Test message'
            }
        ];
        const mockResponse = {
            status: 200,
            data: mockHistory
        };
        axios.post.mockResolvedValue(mockResponse);

        const response = await getChatHistory(config.chatId);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data[0]).toHaveProperty('idMessage');
        expect(response.data[0]).toHaveProperty('text');
    });

    test('should return 400 for invalid chatId', async () => {
        const mockError = {
            response: {
                status: 400,
                data: { message: 'Invalid chatId format' }
            }
        };
        axios.post.mockRejectedValue(mockError);

        try {
            await getChatHistory("invalid_chat_id");
        } catch (error) {
            const apiError = error as ApiError;
            expect(apiError.response.status).toBe(400);
        }
    });

    test('should return empty array for chat with no messages', async () => {
        const mockResponse = {
            status: 200,
            data: []
        };
        axios.post.mockResolvedValue(mockResponse);

        const response = await getChatHistory(config.chatId);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBe(0);
    });
});