import {
  Request,
  Response
} from 'express'


import prismaClient,{ rol } from '../libs/prisma';
import { IRol } from '../interfaces/model/user';


export const getRoles = async(req:Request, res:Response)=>{
  const {take,skip} = req.query;
  try {
    const [total,allRoles] = await Promise.all([
      rol.count(),
      rol.findMany({
        skip: parseInt(String(skip))|0,
        take: parseInt(String(take))|5,
      })
    ])
    return res.status(200).json({
      total,
      allRoles
    })
  } catch (err) {
    console.log(err);
    return res.status(401).json(err)    
  }
}

export const postRoles =async (req:Request,res:Response) => {
  const {descripcion}: IRol = req.body;
  try {
    //verifico que otro rol no tenga el mismo desc
    const rolDB = await rol.findFirst({
      where:{
        descripcion
      }
    })
    if(rolDB) return res.status(400).json("rol ya esta en el sistema.");
    //creo el rol 
    const [rolCreate] = await prismaClient.$transaction([
      rol.create({
        data:{
          descripcion
        }
      })
    ]); 
    return res.status(200).json({
      rol: rolCreate
    })

  } catch (err) {
    console.log(err);
    return res.status(401).json(err)    
  }
}