import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { IProducto } from '../interfaces/producto';
import { ICategoria } from '../interfaces/categoria';
import Decimal from 'decimal.js';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, NgFor, NgIf],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})

export class PrincipalComponent {

  listaProductos: IProducto[] = [];
  categorias: ICategoria[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;  
  IDProductoActual: number = 0;
  IDCategoriaActual: number = 0;
  nombreProducto: string  = '';
  descripcionActual: string = '';
  precioActual: Decimal = new Decimal(0); 
  imagenActual: string = '';
  imagenOriginal: string = ''; // Para almacenar la imagen original

  constructor(private _productoService: ProductosService) {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this._productoService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      }, error: (e) => { console.log(e); }
    });
  }

  obtenerProductos() {
    this._productoService.getList().subscribe({
      next: (data) => {
        // Convertir las imágenes a base64
        this.listaProductos = data.map(producto => ({
          ...producto,
          imagen: producto.imagen ? `data:image/png;base64,${producto.imagen}` : ''
        }));
        this.isResultLoaded = true;
      }, error: (e) => { console.log(e) }
    });
  }

  agregarProducto() {
    const request: IProducto = {
      idProducto: 0,
      idCategoria: this.IDCategoriaActual,
      nombre: this.nombreProducto,
      descripcion: this.descripcionActual,
      precio: this.precioActual,
      imagen: this.imagenActual
    }

    this._productoService.add(request).subscribe({
      next: (data) => {
        this.IDCategoriaActual = 0;
        this.nombreProducto = '';
        this.descripcionActual = '';
        this.precioActual = new Decimal(0);
        this.imagenActual = '';
        this.obtenerProductos();
      }, error: (e) => { console.log(e) }
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenActual = e.target.result.split(',')[1]; // Obtener solo la parte base64
      };
      reader.readAsDataURL(file);
    }
  }  

  obtenerProducto(data: IProducto) {
    this.IDCategoriaActual = data.idCategoria;
    this.nombreProducto = data.nombre;
    this.IDProductoActual = data.idProducto;
    this.descripcionActual = data.descripcion;
    this.precioActual = data.precio;
    this.imagenActual = ''; // Limpiar la imagen actual para obligar al usuario a subir una nueva si desea cambiarla
    this.imagenOriginal = data.imagen; // Almacenar la imagen original
  }

  modificarProducto() {
    const request: IProducto = {
      idProducto: this.IDProductoActual,
      nombre: this.nombreProducto,
      idCategoria: this.IDCategoriaActual,
      descripcion: this.descripcionActual,
      precio: this.precioActual,
      imagen: this.imagenActual ? this.imagenActual : this.imagenOriginal // Usar la imagen original si no se ha seleccionado una nueva
    }

    this._productoService.update(request).subscribe({
      next: (data) => {
        this.IDCategoriaActual = 0;
        this.nombreProducto = '';
        this.IDProductoActual = 0;
        this.descripcionActual = '';
        this.precioActual = new Decimal(0);
        this.imagenActual = '';
        this.imagenOriginal = '';
        this.obtenerProductos();
      }, error: (e) => { console.log(e) }
    });
  }
  
  guardar() {
    if (this.IDProductoActual == 0) {
      this.agregarProducto();
    } else {
      this.modificarProducto();
    }
  }

  eliminarProducto(producto: IProducto) {
    this._productoService.delete(producto.idProducto).subscribe({
      next: (data) => {
        this.obtenerProductos();
      }, error: (e) => { console.log(e) }
    });
  }

}
