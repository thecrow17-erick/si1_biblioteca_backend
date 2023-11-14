import {Router} from 'express'
import { getLibros, postLibro,getLibrosCliente } from '../controller/libroController';
import { check } from 'express-validator';
import { validateFields } from '../middlewares';


export const libroRouter = Router();

libroRouter.get("/",getLibros);
libroRouter.get("/cliente",getLibrosCliente);

libroRouter.post("/",[
  check("titulo","Ingrese un titulo valido").notEmpty().isString().isLength({min:10}),
  check("autor","Ingrese un autor valido").notEmpty().isString().isLength({min:10}),
  check("precio","Ingrese un precio adecuado").notEmpty().isDecimal(),
  check("fechaLanzamiento","Ingrese su fecha de lanzamiento").notEmpty(),
  validateFields
],postLibro)