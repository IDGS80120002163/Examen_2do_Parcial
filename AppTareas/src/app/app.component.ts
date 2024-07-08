import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet, NavigationEnd } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IProducto } from './interfaces/producto';
import { ICategoria } from './interfaces/categoria';
import Decimal from 'decimal.js';
import { ProductosService } from './services/productos.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listaProductos: IProducto[] = [];
  listaProductosFiltrada: IProducto[] = [];
  categorias: ICategoria[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  showProductList = true; // Nueva variable para controlar la visibilidad
  IDProductoActual: number = 0;
  IDCategoriaActual: number = 0;
  nombreProducto: string  = '';
  descripcionActual: string = '';
  precioActual: Decimal = new Decimal(0);
  imagenActual: string = '';
  imagenOriginal: string = ''; // Para almacenar la imagen original

  constructor(private _productoService: ProductosService, private router: Router) {
    this.obtenerProductos();
    this.obtenerCategorias();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showProductList = !['/producto', '/contacto'].includes(event.url);
      }
    });
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
        this.listaProductosFiltrada = [...this.listaProductos];
        this.isResultLoaded = true;
      }, error: (e) => { console.log(e) }
    });
  }

  filtrarProductos(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value.toLowerCase();
    this.listaProductosFiltrada = this.listaProductos.filter(producto =>
      producto.nombre.toLowerCase().includes(query)
    );
  }  
  
}
