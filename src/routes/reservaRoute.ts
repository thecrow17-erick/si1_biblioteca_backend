import {Router} from 'express'
import { getReservasAdmin, getReservasCliente, postReserva } from '../controller/reservaController';
import { tokenValidation, validateFields } from '../middlewares';
import { check } from 'express-validator';
import { validarLibro} from '../libs/validateDB';


export const reservaRoute = Router();

reservaRoute.get("/cliente", [
  tokenValidation
],getReservasCliente);

reservaRoute.get("/admin",getReservasAdmin);

reservaRoute.post("/",[
  check("fecha_reserva","Ingrese una fecha").notEmpty(),
  check("libroId","ingrese un libro valido").custom(validarLibro),
  validateFields,
  tokenValidation
],postReserva);

