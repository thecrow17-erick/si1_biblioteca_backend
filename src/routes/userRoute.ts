import {
  Router
} from 'express'
import { getUsers, postUser } from '../controller/userController';
import { check } from 'express-validator';
import { validateFields } from '../middlewares';

export const userRoute = Router();

userRoute.get("/", getUsers);
userRoute.post("/",[
  check("nombre","El nombre es obligatorio").notEmpty().isString().isLength({min:8}),
  check("telefono","Ingrese un telefono valido").notEmpty().isString().isLength({max: 8}),
  check("email","Ingrese un email vlaido.").notEmpty().isEmail(),
  check("password","Ingrese un password valido.").notEmpty().isString().isLength({min: 8}),
  check("rolId","Ingrese un rol.").notEmpty(),
  validateFields
],postUser)