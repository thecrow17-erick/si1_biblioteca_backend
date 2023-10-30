import {
  Router
} from 'express'

import { deleteRol, getRoles, postRoles, putRoles } from '../controller/rolController';
import { check } from 'express-validator';
import { validateFields } from '../middlewares';
import { validarRol } from '../libs/validateDB';

export const rolRoute = Router();

rolRoute.get("/", getRoles);
rolRoute.post("/",[
  check("descripcion","Ponga un descripcion.").notEmpty().isString(),
  validateFields
],postRoles);

rolRoute.put("/:id",[
  check("id").notEmpty().custom(validarRol),
  check("descripcion","Ponga un descripcion.").notEmpty().isString(),
  validateFields
],putRoles);

rolRoute.delete("/:id",[
  check("id").notEmpty().custom(validarRol),
  validateFields
],deleteRol);

