import {
  Router
} from 'express'
import { deleteUser, getUser, getUsers, postUser, putUser } from '../controller/userController';
import { check } from 'express-validator';
import { validateFields } from '../middlewares';
import { validarUsuario } from '../libs/validateDB';

export const userRoute = Router();

userRoute.get("/", getUsers);

userRoute.get("/:id",[
  check("id").notEmpty().custom(validarUsuario),
  validateFields
],getUser)

userRoute.post("/",[
  check("nombre","El nombre es obligatorio").notEmpty().isString().isLength({min:8}),
  check("telefono","Ingrese un telefono valido").notEmpty().isString().isLength({max: 8}),
  check("email","Ingrese un email vlaido.").notEmpty().isEmail(),
  check("password","Ingrese un password valido.").notEmpty().isString().isLength({min: 8}),
  check("rolId","Ingrese un rol.").notEmpty(),
  validateFields
],postUser)

userRoute.post("/:id",[
  check("id").notEmpty().custom(validarUsuario),
  check("nombre","El nombre es obligatorio").notEmpty().isString().isLength({min:8}),
  check("telefono","Ingrese un telefono valido").notEmpty().isString().isLength({max: 8}),
  check("email","Ingrese un email vlaido.").notEmpty().isEmail(),
  check("password","Ingrese un password valido.").notEmpty().isString().isLength({min: 8}),
  check("rolId","Ingrese un rol.").notEmpty(),
  validateFields
],putUser)

userRoute.delete("/:id",[
  check("id").notEmpty().custom(validarUsuario),
  validateFields
],deleteUser)

