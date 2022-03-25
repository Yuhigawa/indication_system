import { Request, Response, Router } from "express";
import { increaseIndication, searchUserRoute, isUserCreated } from '../controller/user.controller';

import { getAllIps } from '../controller/ip.controller';

const router = Router();

router.post('/:id', isUserCreated);
router.get('/indication/:hashkey', increaseIndication);

// TODO: helper routes will get deleted in production
router.post('/indication/:id', searchUserRoute);
router.get('/ips', getAllIps);

export default router;