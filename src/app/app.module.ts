import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap'

//Angular material
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule} from '@angular/material/icon';
import { MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';

//importamos el modulo para hacer la conexion
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistrarseComponent } from './componentes/registrarse/registrarse.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { SpinnerComponent } from './utils/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { DetalleProductoComponent } from './componentes/dashboard/detalle-producto/detalle-producto.component';
import { ComprasComponent } from './componentes/compras/compras.component';
import { DialogComponent } from './utils/dialog/dialog.component';
import { CalificacionComponent } from './utils/calificacion/calificacion.component';

import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogSesionComponent } from './utils/dialog-sesion/dialog-sesion.component';
import { ChatGPTComponent } from './componentes/chat-gpt/chat-gpt.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarseComponent,
    DashboardComponent,
    NavbarComponent,
    SpinnerComponent,
    CarritoComponent,
    DetalleProductoComponent,
    ComprasComponent,
    DialogComponent,
    CalificacionComponent,
    DialogSesionComponent,
    ChatGPTComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    //DOCUMENTACION https://www.npmjs.com/package/ngx-toastr 
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatExpansionModule,
    NgbCollapseModule,
    MatSelectModule,
    MatGridListModule,
    NgbRatingModule,
    NgIf
    
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
