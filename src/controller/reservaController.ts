import {Request,Response} from 'express'
import { reservaLibros } from '../libs/prisma';

import {PrismaClient} from '@prisma/client'
const prismaClient = new PrismaClient();

export const getReservasCliente = async(req: Request,res:Response)=>{
  const clienteId = req.userId;
  const {skip, take} = req.query;
  try {
    const [total,reservas] = await Promise.all([
      reservaLibros.count({
        where: {
          clienteId
        }
      }),
      reservaLibros.findMany({
        where:{ 
          clienteId
        },
        skip: parseInt(String(skip))|0,
        take: parseInt(String(take))|5,
      }) 
    ]);
    return res.status(200).json({
      total,
      reservas
    })
  } catch (err) {
    console.log(err);
    return res.status(404).json(err)
  }
}

export const getReservasAdmin = async(req: Request,res:Response)=>{
  const {skip, take} = req.query;
  try {
    const [total,reservas] = await Promise.all([
      reservaLibros.count(),
      reservaLibros.findMany({
        skip: parseInt(String(skip))|0,
        take: parseInt(String(take))|5,
      }) 
    ]);
    return res.status(200).json({
      total,
      reservas
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
      return reservaCreate;
    })
    return res.status(200).json(response)
  } catch (err) {
    console.log(err);
    return res.status(404).json(err)
  }
}