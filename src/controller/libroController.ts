import {
  Request,
  Response
} from 'express'
import { libro } from '../libs/prisma';
import  {  UploadedFile } from 'express-fileupload';
import { PrismaClient} from '@prisma/client'
import { v4 } from 'uuid';
import { addProductImg } from '../libs/addImagen';

const prismaCliet = new PrismaClient();

export const getLibrosCliente = async(_:Request,res:Response) => {
  try {
    const[total,allLibros] = await Promise.all([
      libro.count({
        where:{
          almacen:{
            cantidad:{
              gt: 0
            }
          }
        }
      }),
      libro.findMany({
        where:{
          almacen:{
            cantidad:{
              gt: 0
            }
          }
        },
        select:{
          id: true,
          titulo: true,
          autor: true,
          edicion: true,
          imagen: true,
          precio: true,
          fechaLanzamiento: true,
          almacen: {
            select:{
              cantidad: true,
            }
          }
        }
      })
    ])
    //pongo bien el link de imagenes
    allLibros.forEach(libro => {
      libro.imagen = `${process.env.HOST_COUNT_STORAGE}libros/${libro.imagen}` 
    });

    return res.status(200).json({
      total,
      allLibros
    })
  } catch (err) {
    console.log(err);
    return res.status(404).json(err)
  }
}

export const getLibros =async (req:Request,res:Response) => {
  const {take,skip} = req.query;
  try {
    const [total,allLibros] = await Promise.all([
      libro.count(),
      libro.findMany({
        skip: parseInt(String(skip))|0,
        take: parseInt(String(take))|5,
        select: {
          id: true,
          titulo: true,
          edicion: true,
          autor: true,
          fechaLanzamiento: true,
          precio: true,
          almacen:{
            select:{
              id: true,
              cantidad: true
            }
          }
        }
      })
    ])
    return res.status(200).json({
      total,
      allLibros
    })
  } catch (err) {
    console.log(err);
    return res.status(401).json(err)    
  }
}

export const postLibro =async (req:Request,res:Response) => {
  const {titulo,autor,edicion,precio,fechaLanzamiento} = req.body;
  const files= req.files!
  console.log(files);
  const imagen = files.img as UploadedFile;
  try {
    const libroDB = await libro.findFirst({
      where:{
        OR: [
          {
            titulo
          },{
            autor
          }
        ]
      }
    });
    if(libroDB) return res.status(401).json("El libro ya se encuentra en el sistema.")
    //ahora si lo creo
    const response = await prismaCliet.$transaction(async(tx)=>{
      //sacar el nombre con la extension
      const name = v4();
      const extension = imagen.name.split('.')[1];
      //crear el libro
      const libroCreate = await tx.libro.create({
        data:{
          titulo,
          autor,
          edicion,
          fechaLanzamiento,
          precio,
          imagen: `${name}.${extension}`, 
          almacen:{
            create:{
              cantidad: 0
            }
          }
        }
      })
      //agregar la imagen en el blob
      await addProductImg(imagen,name);
      return libroCreate;
    })
    return res.status(200).json({
      libro: response
    })
  } catch (error) {
    console.log(error);
    return res.status(404).json(error)
  }
}