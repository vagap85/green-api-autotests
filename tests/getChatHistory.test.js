"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getChatHistory_1 = require("../../src/api/getChatHistory");
const config_1 = require("../../src/config/config");
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
                chatId: config_1.config.chatId,
                text: 'Test message'
            }
        ];
        const mockResponse = {
            status: 200,
            data: mockHistory
        };
        axios.post.mockResolvedValue(mockResponse);
        const response = await (0, getChatHistory_1.getChatHistory)(config_1.config.chatId);
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
            await (0, getChatHistory_1.getChatHistory)("invalid_chat_id");
        }
        catch (error) {
            const apiError = error;
            expect(apiError.response.status).toBe(400);
        }
    });
    test('should return empty array for chat with no messages', async () => {
        const mockResponse = {
            status: 200,
            data: []
        };
        axios.post.mockResolvedValue(mockResponse);
        const response = await (0, getChatHistory_1.getChatHistory)(config_1.config.chatId);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBe(0);
    });
});
//# sourceMappingURL=getChatHistory.test.js.map