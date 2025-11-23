// Типы для sendMessage
export interface SendMessagePayload {
    chatId: string;
    message: string;
    quotedMessageId?: string;
    archiveChat?: boolean;
    linkPreview?: boolean;
}

export interface SendMessageResponse {
    status: number;
    data: {
        idMessage: string;
    };
}

// Типы для getChatHistory
export interface GetChatHistoryPayload {
    chatId: string;
    count: number;
}

export interface GetChatHistoryResponse {
    status: number;
    data: Array<{
        idMessage: string;
        timestamp: number;
        type: string;
        chatId: string;
        text: string;
        senderId?: string;
        senderName?: string;
    }>;
}

// Типы для getStateInstance
export interface GetStateInstanceResponse {
    stateInstance: 'notAuthorized' | 'authorized' | 'blocked' | 'sleepMode' | 'starting';
}

// Общие типы
export interface ApiError {
    response: {
        status: number;
        data: any;
    };
}