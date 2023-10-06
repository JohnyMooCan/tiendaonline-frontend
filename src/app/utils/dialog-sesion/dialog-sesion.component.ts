import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-sesion',
  templateUrl: './dialog-sesion.component.html',
  styleUrls: ['./dialog-sesion.component.css']
})
export class DialogSesionComponent {

  displayStyle = "none"; 
  onInit(){
    this.openPopup()
  }
  
  openPopup() { 
    this.displayStyle = "block"; 
  } 
  closePopup() { 
    this.displayStyle = "none"; 
  } 

}
