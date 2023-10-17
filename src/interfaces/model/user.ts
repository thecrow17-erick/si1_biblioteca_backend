export interface IUser{
  nombre: string,
  telefono: string,
  email: string,
  password: string,
  rolId: number
}

export interface IRol {
  descripcion : string
}

export interface IAuth { 
  email: string,
  password: string
}