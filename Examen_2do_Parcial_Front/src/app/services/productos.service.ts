import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ICategoria } from '../interfaces/categoria';
import { IProducto } from '../interfaces/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private _endpoint: string = environment.endPoint;
  private apiUrl: string = this._endpoint + "Productos/"

  constructor(private _http: HttpClient) { }

  //Método para invocar al endpoint de ListaProductos.
  getList(): Observable<IProducto[]>{
    return this._http.get<IProducto[]>(`${this.apiUrl}ListaProductos`)
  }

  //Método para agregar una tarea del endpoint AgregarProducto.
  add(request: IProducto): Observable<IProducto>{
    return this._http.post<IProducto>(`${this.apiUrl}AgregarProducto`, request)
  }

  //Método para modificar una tarea del endpoint ModificarProducto.
  update(request: IProducto): Observable<void>{
    return this._http.put<void>(`${this.apiUrl}ModificarProducto/${request.Id_Producto}`, request)
  }

  //Método para eliminar una tarea del endpoint EliminarTarea.
  delete(Id_Producto: number): Observable<void>{
    return this._http.delete<void>(`${this.apiUrl}EliminarTarea/${Id_Producto}`)
  }

}
