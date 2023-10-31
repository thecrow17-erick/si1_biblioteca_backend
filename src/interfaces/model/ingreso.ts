export interface IBodyIngreso{
  proveedor: string,
  detalle: Array<IDetalle>
}

interface IDetalle{
  libroId: number,
  cantidad: number
}