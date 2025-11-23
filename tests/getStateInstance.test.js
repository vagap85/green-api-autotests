"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getStateInstance_1 = require("../../src/api/getStateInstance");
// Мок для axios
jest.mock('axios');
const axios = require('axios');
describe('getStateInstance API Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('should return authorized state', async () => {
        const mockState = {
            stateInstance: 'authorized'
        };
        axios.get.mockResolvedValue({ data: mockState });
        const state = await (0, getStateInstance_1.getStateInstance)();
        expect(state.stateInstance).toBe('authorized');
    });
    test('should handle not authorized state', async () => {
        const mockState = {
            stateInstance: 'notAuthorized'
        };
        axios.get.mockResolvedValue({ data: mockState });
        const state = await (0, getStateInstance_1.getStateInstance)();
        expect(state.stateInstance).toBe('notAuthorized');
    });
    test('should handle blocked state', async () => {
        const mockState = {
            stateInstance: 'blocked'
        };
        axios.get.mockResolvedValue({ data: mockState });
        const state = await (0, getStateInstance_1.getStateInstance)();
        expect(state.stateInstance).toBe('blocked');
    });
});
//# sourceMappingURL=getStateInstance.test.js.map