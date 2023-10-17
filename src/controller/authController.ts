import {
  Request,
  Response
} from 'express'
import bcrypt from 'bcrypt'

import { IAuth } from '../interfaces/model/user'
import { inicioSesion, user } from '../libs/prisma';
import { generateToken } from '../libs/generateJwt';

export const signIn = async(req:Request, res:Response) => {
  const {email,password}:IAuth = req.body; 
  try {
    //verifico si el usuario existe
    const userDB = await user.findFirst({
      where:{
        email
      },
      select:{
        id:true,
        email: true,
        password: true,
        rol: true
      }
    });
    if(!userDB) return res.status(400).json("El email es incorrecto")
    //verifico el password
    const passwordValido: boolean = await bcrypt.compare(password,userDB.password);
    if(!passwordValido) return res.status(401).json("El password es incorrecto.");
    //envio a inicio de sesion
    await inicioSesion.create({
      data:{
        userId: userDB.id
      }
    })
    //envio un jwt si esta todo correcto
    const token = await generateToken(userDB.id.toString());
    return res.status(200).header({
      "auth-token": token
    }).json({
      user: userDB
    })
  } catch (err) {
    console.log(err);
    return res.status(401).json(err)
  }
}