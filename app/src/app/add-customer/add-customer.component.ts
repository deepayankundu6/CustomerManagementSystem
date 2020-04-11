import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customerDetails: FormGroup;
  districts: any;
  states: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.customerDetails = new FormGroup({
      FirstName: new FormControl(''),
      LastName: new FormControl(''),
      Email: new FormControl(''),
      Address: new FormControl(''),
      District: new FormControl(''),
      State: new FormControl(''),
      Gender: new FormControl('')
    }
    );
    this.getStates();
  }
  updateProfile() {
    console.log(this.customerDetails.value);
  }

  getDistricts(state) {
    if (state) {
      this.http.get("/api/states/getdistrict/" + state).subscribe(districts => {
        this.districts = districts;
      }, error => console.error(error));
    } else {
      console.log(state);
    }

  }

  getStates() {
    this.http.get("/api/states/getstates").subscribe(state => {
      this.states = state;
    }, error => console.error(error));
  }
}
