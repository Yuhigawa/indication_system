import { Request, Response, Router } from "express";
import { createIndication, increaseIndication, searchUserRoute, isUserCreated } from '../controller/user.controller';
const router = Router();

router.post('/:id', isUserCreated);
router.post('/indication/:id', increaseIndication);
router.get('/indication/:id', searchUserRoute);

export default router;