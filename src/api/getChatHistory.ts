import axios from 'axios';
import { config } from '../config/config';
import { GetChatHistoryPayload, GetChatHistoryResponse } from '../types/types';

export async function getChatHistory(chatId: string): Promise<GetChatHistoryResponse> {
    const url = '${config.baseUrl}/waInstance${config.idInstance}/getChatHistory/${config.apiTokenInstance}';

    const payload: GetChatHistoryPayload = {
        chatId,
        count: 50
    };

    const response = await axios.post(url, payload);
    return response;
}