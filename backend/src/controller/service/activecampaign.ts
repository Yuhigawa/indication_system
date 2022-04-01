import axios, { AxiosError, AxiosResponse,  } from 'axios';

import dotenv from "dotenv";
dotenv.config();

interface Provider {
    status: number,
    data?: any,
    error?: any,
}

// let countryProviders: Array<Provider>;
// let allProviders: Array<Provider>;

const _trycatchBlock = async(method: any, uri: String, body?: Object, params?: Object) => {
    let headers = {
        'Api-Token': process.env.AC_TOKEN
    }

    try {
        let res = await method(uri, { headers: headers });

        let response: Provider = {status: 200, data: res.data};
        return response;
    } catch (error: any) {
        let response: Provider = {status: 404, data: error};
        return response;
    }
}


const getUserById = async(id: Number): Promise<Provider> => {
    const uri = `${process.env.AC_URL}/contacts/${id}`;
    const method = axios.get;

    const response = await _trycatchBlock(method, uri)

    return response;
}


export { getUserById };