import axios from 'axios';
import { config } from '../config/config';
import { GetStateInstanceResponse } from '../types/types';

export async function getStateInstance(): Promise<GetStateInstanceResponse> {
    const url = '${config.baseUrl}/waInstance${config.idInstance}/getStateInstance/${config.apiTokenInstance}';

    const response = await axios.get(url);
    return response.data;
}