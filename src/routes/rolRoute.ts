import {
  Router
} from 'express'

import { getRoles, postRoles } from '../controller/rolController';
import { check } from 'express-validator';
import { validateFields } from '../middlewares';

export const rolRoute = Router();

rolRoute.get("/", getRoles);
rolRoute.post("/",[
  check("descripcion","Ponga un descripcion.").notEmpty().isString(),
  validateFields
],postRoles);
