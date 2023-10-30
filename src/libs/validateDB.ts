import { rol, user } from "./prisma"



export const validarUsuario = async(id:string)=>{
  const UserDB = await user.findUnique({
    where:{
      id: +id
    }
  })
  if(!UserDB) throw new Error("Ingrese un usuario valido")
}

export const validarRol = async(id:string)=>{
  const rolDB = await rol.findUnique({
    where:{
      id: +id
    }
  })
  if(!rolDB) throw new Error("Ingrese un usuario valido")
}