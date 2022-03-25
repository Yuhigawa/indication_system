import { Request, Response } from 'express';
import User from '../models/user.model';

import crypto from 'crypto';

import { getUserById } from './service/activecampaign';

const createIndication = async(id: Number, req: Request, res: Response) => {
    try {
        const object_response = await getUserById(id);
        const object_keys = Object.keys(object_response);
        
        if( !object_keys.includes('data') ) {
            console.log(object_keys)
            console.log(object_keys.includes('data'))
            throw Error;
        };

        const user_created = await User.create({
            user_id: id,
            name: object_response['data'].contact.firstName,
            email: object_response['data'].contact.email,
            link: crypto.createHash('sha256').update(req.params.id).digest('hex'),
        });

        return res.status(201).send({data: 'created'})
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Registration failed' })
    }
};

const isUserCreated = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const responseId = await searchUser(id);

    if( responseId['status'] == 404 ) {
        return await createIndication(id, req, res);
    }

    // const userIndication: Number = await getUserIndications(id);

    const data_response = {
        'indications': responseId['data'].indications,
        'name': responseId['data'].name
    }

    return res.status(200).send(data_response);
}

const searchUser = async(id: Number) => {
    try {
        const user = await User.findOne({ user_id: id }).exec()
        // const user = await User.findById(id).exec()
        if( !user ) throw Error;

        return {status: 200, data: user}
    } catch (error: any) {
        return {status: 404, data: 'User Not found'}
    }
}

const searchUserRoute = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        const user = await User.findOne({user_id: id}).exec()
        // const user = await User.findById(id).exec()

        if( !user ) throw Error;
        
        return res.status(200).send({ user })
    } catch (error: any) {
        return res.status(404).send({ msg: 'user not found'})
    }
}

import { getUserIpAdress } from './ip.controller';

const increaseIndication = async(req: Request, res: Response) => {
    const query = { link: req.params.hashkey}
    const user_response = await User.findOne( query );
    
    if( !user_response ) return res.status(404).send({error: 'indication invalid'});

    const user_not_registed = await getUserIpAdress(req, res);
    const user_ip_keys = Object.keys(user_not_registed);

    if( user_ip_keys.length !== 1 ) {
        return res.redirect('https://dominnebpo.com.br')
    }

    let indication_counter: number = parseInt(user_response['indications']) + 1
    let res_update = await User.findOneAndUpdate( query, { indications: indication_counter } )
    
    return res.redirect('https://dominnebpo.com.br')
}

export { increaseIndication, searchUserRoute, isUserCreated, getUserIpAdress };