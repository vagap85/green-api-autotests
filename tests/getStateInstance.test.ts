import { getStateInstance } from '../src/api/getStateInstance';
import { GetStateInstanceResponse } from '../src/types/types';

jest.mock('axios');
const axios = require('axios');

describe('getStateInstance API Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return authorized state', async () => {
        const mockState: GetStateInstanceResponse = {
            stateInstance: 'authorized'
        };
        axios.get.mockResolvedValue({ data: mockState });

        const state = await getStateInstance();

        expect(state.stateInstance).toBe('authorized');
    });
});