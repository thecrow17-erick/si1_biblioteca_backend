import {
  Router
} from 'express'
import { check } from 'express-validator';

import { signIn } from '../controller/authController';
import { validateFields } from '../middlewares';

export const authRoute = Router();

authRoute.post("/signIn", [
  check("email","ingrese un email valido.").notEmpty().isEmail(),
  check("password","ingrese un password correcto").notEmpty().isString(),
  validateFields
],signIn)