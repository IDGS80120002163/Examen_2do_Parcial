import Decimal from "decimal.js";

export interface IProducto{
    Id_Producto: number,
    Nombre: string,
    Descripcion: string, 
    Precio: Decimal,
    Imagen: string
}