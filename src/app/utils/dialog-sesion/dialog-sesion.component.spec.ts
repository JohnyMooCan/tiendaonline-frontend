import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSesionComponent } from './dialog-sesion.component';

describe('DialogSesionComponent', () => {
  let component: DialogSesionComponent;
  let fixture: ComponentFixture<DialogSesionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogSesionComponent]
    });
    fixture = TestBed.createComponent(DialogSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
