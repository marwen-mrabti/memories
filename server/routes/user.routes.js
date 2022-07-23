import express from 'express';
const UserRouter = express.Router();

//load handlers
import { UserRegister, UserLogin } from '../controllers/user.controllers.js';

//user login => post ==> /api/auth/login
UserRouter.post('/login', UserLogin);
//user register => post ==> /api/auth/register
UserRouter.post('/register', UserRegister);

export default UserRouter;
