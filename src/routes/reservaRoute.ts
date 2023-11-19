import {Router} from 'express'
import { deleteReserva, getReservasAdmin, getReservasCliente, postReserva } from '../controller/reservaController';
import { tokenValidation, validateFields } from '../middlewares';
import { check } from 'express-validator';
import { validarLibro, validarReserva} from '../libs/validateDB';


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


reservaRoute.delete("/:id",[
  check("id", "ingrese un reserva valida.").notEmpty().custom(validarReserva),
  tokenValidation,
  validateFields,
],deleteReserva);

