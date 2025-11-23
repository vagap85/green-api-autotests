import axios from 'axios';
import { config } from '../config/config';
import { SendMessagePayload, SendMessageResponse } from '../types/types';

export async function sendMessage(payload: SendMessagePayload): Promise<SendMessageResponse> {
    const url = '${config.baseUrl}/waInstance${config.idInstance}/sendMessage/${config.apiTokenInstance}';

    const response = await axios.post(url, payload);
    return response;
}