import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ICustomers } from "../icustomers";
@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {
  customers: ICustomers;
  SearchCustomer: String;
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.spinner.show();
    this.http.get("/api/customer/getall").subscribe((customers: ICustomers) => {
      if (customers) {
        this.customers = customers;
      } else {
        console.log("No data received");
      }
    }, (error) => {
      console.error(error);
    });
    this.spinner.hide();
  }
  deleteCustomers(cid) {
    let payload = {
      "CustomerID": cid
    }
    console.log("Delete:", payload);
    this.spinner.show();
    this.http.post("/api/customer/delete", payload).subscribe((resp) => {
      this.toastr.success("Success", "Customer removed successfully");
    }, (error) => {
      console.error(error);
      this.toastr.error("Failure", "Failed to remove customer")
    });
    this.getCustomers();
    this.spinner.hide();
  }

}
