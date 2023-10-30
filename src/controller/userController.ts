import {
  Request,
  Response
} from 'express'
import { User } from '@prisma/client';
import bcrypt from 'bcrypt'

import prismaClient,{ user } from '../libs/prisma';
import {IUser} from '../interfaces/model/user'

export const getUsers = async(req:Request, res:Response)=>{
  const {take,skip} = req.query;
  try {
    const [total,allUsers] = await Promise.all([
      user.count(),
      user.findMany({
        skip: parseInt(String(skip))|0,
        take: parseInt(String(take))|5,
        select: {
          id:true,
          nombre: true,
          email: true,
          telefono: true,
          rol:{
            select:{
              descripcion: true
            }
          },
        }
      })
    ])
    return res.status(200).json({
      total,
      allUsers
    })
  } catch (err) {
    console.log(err);
    return res.status(401).json(err)    
  }
}

export const getUser =async (req:Request,res:Response) => {
  const {id} = req.params;
  try {
    const UserDB = await user.findUnique({
      where:{
        id: +id
      },
      select:{
        id:true,
        nombre:true,
        telefono: true,
        email:true,
        rolId: true,
      }
    })
    return res.status(200).json({
      user: UserDB
    })
  } catch (error) {
    console.log(error);
    return res.status(404).json(error)
  }
}

export const postUser = async(req:Request, res:Response)=>{
  const {rolId,email,nombre,password,telefono}:IUser = req.body;
  try {
    //verifico si el email o telefono no estan registrado
    const userDB: User|null = await user.findFirst({
      where:{
        OR: [
          {
            telefono
          },{
            email
          }
        ]
      }
    });
    if(userDB) return res.status(401).json("Usuario ya esta registrado.")
    //hago el saltos que tendra el password
    const salt = await bcrypt.genSalt(10);
    //ahora creo el usuario
    const [userCreate] = await prismaClient.$transaction([
      user.create({
        data:{
          nombre,
          email,
          password: await bcrypt.hash(password,salt),
          telefono,
          rolId
        }
      })
    ])
    return res.status(200).json({
      user: userCreate
    })
  } catch (err) {
    console.log(err);
    return res.status(401).json(err)
  } 
}

export const putUser =async (req:Request,res:Response) => {
  const {id} = req.params;
  const {rolId,email,nombre,password,telefono}:IUser = req.body;
  try {
    //verifico si el email o telefono no estan registrado
    const userDB: User|null = await user.findFirst({
      where:{
        OR: [
          {
            telefono
          },{
            email
          }
        ]
      }
    });
    if(userDB) return res.status(401).json("Usuario ya esta registrado.")
    //hago el saltos que tendra el password
    const salt = await bcrypt.genSalt(10);
    //ahora actualizo el usuario
    const updateUser = await user.update({
      where:{
        id: +id
      },
      data:{
        nombre,
        rolId,
        email,
        password: await bcrypt.hash(password,salt),
        telefono,
      }
    });
    return res.status(200).json({
      user: updateUser,
    })  
  } catch (error) {
    console.log(error);
    return res.status(404).json(error)
  }
}

export const deleteUser = async(req:Request,res:Response) => {
  const {id} = req.params;
  try {
    const deleteUser = await user.delete({
      where:{
        id: +id
      }
    })
    return res.status(200).json({
      user: deleteUser,
    })
  } catch (error) {
    console.log(error);
    return res.status(404).json(error)
  }
}