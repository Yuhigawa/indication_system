import { Request, Response } from 'express';
import User from '../models/user.model';

import crypto from 'crypto';

import { getUserById } from './service/activecampaign';

const createIndication = async(id: Number, req: Request, res: Response) => {
    try {
        const response = await getUserById(id);
        if( response['status'] != 200 ) throw Error;

        const user = await User.create({
            _id: id,
            name: response['data'].contact.firtName,
            email: response['data'].contact.email,
            link: crypto.createHash('sha256').update(req.params.id).digest('hex')
        });

        return res.status(201).send({ user })
    } catch (error) {
        return res.status(400).send({ error: 'Registration failed' })
    }
};

const isUserCreated = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const responseId = await searchUser(id);

    if( responseId['status'] == 404 ) {
        await createIndication(id, req, res);
    }

    // const response = await getUserData(id);

    const userIndication: Number = await getUserIndications(id);

    res.status(200).send({})
}

const getUserData = async() => {
    return;
}

const searchUser = async(id: Number) => {
    try {
        const user = await User.findById(id).exec()
        if( !user ) throw Error;

        return {status: 200, data: user}
    } catch (error: any) {
        return {status: 404, data: 'User Not found'}
    }
}

const searchUserRoute = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        const user = await User.findById(id).exec()

        console.log(id, user)
        if( !user ) throw Error;
        
        return res.status(200).send({ user })
    } catch (error: any) {
        return res.status(404).send({ msg: 'user not found'})
    }
}

const getUserIndications = async(userId: Number) => {
    return 1;
}

const increaseIndication = async(req: Request, res: Response) => {
    return null;
}

export { createIndication, increaseIndication, searchUserRoute, isUserCreated };