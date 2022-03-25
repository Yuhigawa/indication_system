import { Request, Response } from 'express';
import IpAdress from '../models/ip.model';


const getUserIpAdress = async(req: Request, res: Response) => {
    try {
        const ip_adress_brute = req.headers['x-forwarded-for'] || String(req.socket.remoteAddress);
        // const ip_adress_splitted = ip_adress_brute

        // console.log('ip get: ', ip_adress_splitted);
        // console.log('ip get: ', ip_adress_brute);
        
        const ip_already_registed = await IpAdress.findOne( { ip: String(ip_adress_brute) } );

        if( ip_already_registed ) {
            return {status: 200, data: 'registred'};
        }
        
        let ip_created = await IpAdress.create({
            ip: String(ip_adress_brute)
        })

        return {status: 201};
    } catch (error) {
        console.log('ip error: ', error);
        return {status: 400, error: 'Ip not found'};
    }
}

const getAllIps = async(req: Request, res: Response) => {
    try {
        IpAdress.find({}, (err, users) => 
            res.status(200).send(users.reduce((userMap, item) => {
                userMap[item.id] = item
                return userMap
            }, {}))
        )
    } catch (error) {
        return res.status(400).send({error: 'Couldnot get ips'});
    }
}

export { getUserIpAdress, getAllIps };