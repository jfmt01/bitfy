import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaUserComponent } from './bienvenida-user.component';

describe('BienvenidaUserComponent', () => {
  let component: BienvenidaUserComponent;
  let fixture: ComponentFixture<BienvenidaUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienvenidaUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienvenidaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
