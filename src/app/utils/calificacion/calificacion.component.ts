import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent {
  @Input() calificacion: number = 5;
  @Input() detalleProducto: boolean = false;
  textoCalificacion: string = "";

  constructor() {

  }
  ngAfterViewInit() {
    
  
  }
  ngOnInit() {
  
      this.textoCalificacion = (this.detalleProducto) ? 'Calificación:' : 'Calificación';

  }

}
