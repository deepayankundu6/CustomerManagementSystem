import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {
  customers: Icustomer;
  SearchCustomer: String;
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }
  getCustomers() {
    this.http.get("/api/customer/getall").subscribe((customers: Icustomer) => {
      this.customers = customers;
    }, (error) => console.error(error));
  }
}

interface Icustomer {
  FirstName: String
  LastName: String
  Email: String
  Address: String
  District: String
  State: String
  Gender: String
  CustomerID: Number
  Comments: []
  Escalation: Number
  Appreciations: Number
}