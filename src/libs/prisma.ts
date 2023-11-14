import {PrismaClient} from '@prisma/client';


export const {
  user,
  rol,
  inicioSesion,
  cerrarSesion,
  libro,
  almacen,
  detalleIngreso,
  notaIngreso,
  reservaLibros
} = new PrismaClient();

export default new PrismaClient();