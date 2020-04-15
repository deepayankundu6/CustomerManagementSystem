import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ICustomers } from "../icustomers";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CnfDialogBoxComponent } from '../cnf-dialog-box/cnf-dialog-box.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customer: ICustomers;
  customerID = Number(this.activatedRoute.snapshot.params.id);
  constructor(private http: HttpClient, private toastr: ToastrService,
    private spinner: NgxSpinnerService, private dialog: MatDialog, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCustomer()
  }

  getCustomer() {
    let payload = {
      "CustomerID": this.customerID
    }
    this.http.post("/api/customer/get", payload).subscribe((customer: ICustomers) => {
      if (customer) {
        this.customer = customer;
      } else {
        console.log("No data received");
      }
    }, (error) => {
      console.error(error);
    });
  }
}
