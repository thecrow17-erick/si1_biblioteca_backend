import {Request,Response} from 'express'
import {  notaIngreso } from '../libs/prisma';
import { IBodyIngreso } from '../interfaces/model';
import {PrismaClient} from '@prisma/client'

const prismaClient = new PrismaClient();

//mostrar todas las notas de ingreso
export const getNotasIngreso = async(req: Request,res:Response)=>{
  const {take, skip} = req.query;
  try {
    const [total,allNotasIngreso] = await Promise.all([
      notaIngreso.count(),
      notaIngreso.findMany({
        skip: +String(skip) || 0,
        take: +String(take) || 5,
        select:{
          id: true,
          proveedor: true,
          fechaIngreso:true,
        }
      })
    ])

    return res.status(200).json({
      total,
      allNotasIngreso
    }) 

  } catch (error) {
    console.log(error);
    return res.status(404).json(error)
  }
}

//crear la nota de ventas
export const postNotasIngreso =async (req:Request,res:Response) => {
  const {proveedor,detalle}:IBodyIngreso = req.body;
  try {
    const response = await prismaClient.$transaction(async(tx)=>{
      //creo la nota de ingreso      
      const notaIngresoCreate = await tx.notaIngreso.create({
        data:{
          proveedor
        },
        select:{
          id:true,
          fechaIngreso:true,
          proveedor: true,
        }
      })
      //actualizo el almacen
      detalle.map(async(d) => {
        await tx.almacen.update({
          where:{
            id: d.libroId
          },
          data:{
            cantidad:{
              increment: d.cantidad
            }
          }
        })
      });
      //mapeo y creo otro arreglo para agregar al detalle de ingreso
      const dataDetalle = detalle.map((value)=>(({
        libroId: value.libroId,
        cantidad: value.cantidad,
        notaId: notaIngresoCreate.id
      })));
      //creo los detalles de ingreso
      await tx.detalleIngreso.createMany({
        data: dataDetalle
      })
      return notaIngresoCreate;
    })

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(404).json(error)
  }
}