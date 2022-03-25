import axios, { AxiosError, AxiosResponse,  } from 'axios';

import dotenv from "dotenv";
dotenv.config();

const _trycatchBlock = async(method: any, uri: String, body?: Object, params?: Object) => {
    let headers = {
        'Api-Token': process.env.AC_TOKEN
    }

    try {
        let res = await method(uri, { headers: headers });
        return {status: 200, data: res.data};
    } catch (error: any) {
        return {status: 404, data: error}
    }
}


const getUserById = async(id: Number) => {
    const uri = `${process.env.AC_URL}/contacts/${id}`;
    const method = axios.get;

    const response = await _trycatchBlock(method, uri)

    return response;
}


export { getUserById };