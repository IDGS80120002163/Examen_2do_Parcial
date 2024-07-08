import Decimal from "decimal.js";

export interface IProducto{
    idProducto: number,
    idCategoria: number,
    nombre: string,
    descripcion: string, 
    precio: Decimal,
    imagen: string
}