import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customerDetails: FormGroup;
  districts: any;
  states: any;
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.customerDetails = new FormGroup({
      FirstName: new FormControl('', [Validators.required,
      Validators.minLength(1)]),
      LastName: new FormControl('', [Validators.required,
      Validators.minLength(1)]),
      Email: new FormControl('', [Validators.required,
      Validators.minLength(1), Validators.email]),
      Address: new FormControl('', [Validators.required,
      Validators.minLength(1)]),
      District: new FormControl('', [Validators.required,
      Validators.minLength(1)]),
      State: new FormControl('', [Validators.required,
      Validators.minLength(1)]),
      Gender: new FormControl('', [Validators.required,
      Validators.minLength(1)])
    }
    );
    this.getStates();
  }
  updateProfile() {
    this.spinner.show();
    this.http.post("api/customer/create", this.customerDetails.value).subscribe((data) => {
      this.toastr.success("Success", "Customer added successfully");
    }, (error) => {
      this.toastr.error("Failure", "Failed to add customer")
      console.error(error)
    });
    this.spinner.hide();
  }

  getDistricts(state) {
    if (state) {
      this.http.get("/api/states/getdistrict/" + state).subscribe((districts) => {
        if (districts) {
          this.districts = districts;
        } else {
          console.log("No data received");
        }
      }, (error) => console.error(error));
    }
  }

  getStates() {
    this.http.get("/api/states/getstates").subscribe((state) => {
      if (state) {
        this.states = state;
      } else {
        console.log("No data received");
      }
    }, (error) => console.error(error));
  }
}
