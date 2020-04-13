import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnfDialogBoxComponent } from './cnf-dialog-box.component';

describe('CnfDialogBoxComponent', () => {
  let component: CnfDialogBoxComponent;
  let fixture: ComponentFixture<CnfDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnfDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnfDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
