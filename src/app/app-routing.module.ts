import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistrarseComponent } from './componentes/registrarse/registrarse.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { AuthGuard } from './utils/auth.guard';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { ComprasComponent } from './componentes/compras/compras.component';
import { DetalleProductoComponent } from './componentes/dashboard/detalle-producto/detalle-producto.component';

const routes: Routes = [
  {path: '', redirectTo: 'tienda', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'registrarse', component: RegistrarseComponent},
  {path: 'tienda', component: DashboardComponent},
  {path: 'tienda/:id', component: DetalleProductoComponent},
  {path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard]},
  {path: 'compras', component: ComprasComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
