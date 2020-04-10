import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customerDetails: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.customerDetails = new FormGroup({
      FirstName: new FormControl(''),
      LastName: new FormControl(''),
      Email: new FormControl(''),
      Address: new FormControl(''),
      City: new FormControl(''),
      State: new FormControl(''),
      Gender: new FormControl('')
    }
    );
  }
  updateProfile() {
    console.log(this.customerDetails.value);
  }

  getCities() {


  }
}
