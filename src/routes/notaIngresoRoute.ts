import {Router} from 'express'
import { getNotasIngreso, postNotasIngreso } from '../controller/notaIngresoController';
import { check } from 'express-validator';
import { validateFields } from '../middlewares';


export const ingresoRouter = Router();

ingresoRouter.get("/",getNotasIngreso)


ingresoRouter.post("/",[
  check("proveedor","ingrese un proveedor valido").notEmpty().isString(),
  check("detalle","Ingrese el detalle correctamente").notEmpty().isArray(),
  validateFields
],postNotasIngreso)