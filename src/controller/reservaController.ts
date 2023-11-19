import {Request,Response} from 'express'
import { reservaLibros } from '../libs/prisma';

import {PrismaClient} from '@prisma/client'
const prismaClient = new PrismaClient();

export const getReservasCliente = async(req: Request,res:Response)=>{
  const clienteId = req.userId;
  try {
    const [total,allReservas] = await Promise.all([
      reservaLibros.count({
        where: {
          clienteId
        }
      }),
      reservaLibros.findMany({
        where:{ 
          clienteId
        },
        select:{
          id: true,
          estado: true,
          fecha_reserva: true,
          libro:{
            select:{
              id: true,
              titulo: true,
              precio: true
            }
          }
        }
      }) 
    ]);
    return res.status(200).json({
      total,
      allReservas
    })
  } catch (err) {
    console.log(err);
    return res.status(404).json(err)
  }
}

export const getReservasAdmin = async(req: Request,res:Response)=>{
  const {skip, take} = req.query;
  try {
    const [total,allReservas] = await Promise.all([
      reservaLibros.count(),
      reservaLibros.findMany({
        skip: parseInt(String(skip))|0,
        take: parseInt(String(take))|5,
        select:{
          id: true,
          estado: true,
          fecha_reserva: true,
          cliente:{
            select:{
              id: true,
              nombre: true
            }
          },
          libro:{
            select:{
              id: true,
              titulo: true,
            }
          }
        }
      }) 
    ]);
    return res.status(200).json({
      total,
      allReservas
    })
  } catch (err) {
    console.log(err);
    return res.status(404).json(err)
  }
}

interface IBodyReserva {
  fecha_reserva: Date, 
  libroId: number
}
export const postReserva = async (req:Request,res:Response) => {
  const {fecha_reserva,libroId }: IBodyReserva =  req.body;
  const clienteId = req.userId;
  try {
    const response = await prismaClient.$transaction(async(tx)=>{
      const reservaCreate = await tx.reservaLibros.create({
        data:{
          clienteId,
          fecha_reserva,
          libroId
        }
      })
      await tx.libro.update({
        where:{
          id: libroId
        },
        data:{
          almacen:{
            update:{
              cantidad:{
                decrement: 1
              }
            }
          }
        }
      })
      return reservaCreate;
    })
    return res.status(200).json(response)
  } catch (err) {
    console.log(err);
    return res.status(404).json(err)
  }
}

export const deleteReserva =async (req:Request,res:Response) => {
  const {id} = req.params;
  const clienteId = req.userId;
  try {
    //veo si existe la reserva
    const response = await prismaClient.$transaction(async(tx)=>{
      const reservaDelete = await tx.reservaLibros.delete({
        where:{
          id: +id,
          clienteId
        }
      })
      return reservaDelete;
    })
    return res.status(202).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err)
  }
}