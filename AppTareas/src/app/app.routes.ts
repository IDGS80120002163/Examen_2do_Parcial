import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ProductosService } from './services/productos.service';

export const routes: Routes = [
    {path: 'producto', component: PrincipalComponent},
    {path: 'principal', component: ProductosService},
    {path: 'contacto', component: ContactoComponent},
    {path: '', redirectTo: '/principal', pathMatch: 'full'}
];
