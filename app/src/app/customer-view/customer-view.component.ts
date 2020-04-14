import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ICustomers } from "../icustomers";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CnfDialogBoxComponent } from '../cnf-dialog-box/cnf-dialog-box.component';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {
  customers: ICustomers[];
  SearchCustomer: string;
  constructor(private http: HttpClient, private toastr: ToastrService,
    private spinner: NgxSpinnerService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.http.get("/api/customer/getall").subscribe((customers: ICustomers[]) => {
      if (customers) {
        this.customers = customers;
      } else {
        console.log("No data received");
      }
    }, (error) => {
      console.error(error);
    });
  }

  openCnfDialogue(cid): void {
    let payload = {
      "CustomerID": cid
    }
    let dialogRef = this.dialog.open(CnfDialogBoxComponent, {
      width: '30em',
      height: '15em',
      data: payload
    })
    dialogRef.afterClosed().subscribe((data) => {
      this.getCustomers();
    });
  }
}
