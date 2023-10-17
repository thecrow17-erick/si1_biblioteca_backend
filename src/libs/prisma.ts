import {PrismaClient} from '@prisma/client';


export const {
  user,
  rol,
  inicioSesion,
  cerrarSesion,
  $transaction
} = new PrismaClient();

export default new PrismaClient();