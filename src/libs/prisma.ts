import {PrismaClient} from '@prisma/client';


export const {
  user,
  rol,
  inicioSesion,
  cerrarSesion,
  libro,
  almacen,
  detalleIngreso,
  notaIngreso
} = new PrismaClient();

export default new PrismaClient();