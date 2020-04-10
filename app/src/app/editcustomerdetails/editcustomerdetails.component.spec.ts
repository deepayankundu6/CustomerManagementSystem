import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcustomerdetailsComponent } from './editcustomerdetails.component';

describe('EditcustomerdetailsComponent', () => {
  let component: EditcustomerdetailsComponent;
  let fixture: ComponentFixture<EditcustomerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcustomerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcustomerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
