import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ICustomers } from "../icustomers";
import { MatDialog } from '@angular/material/dialog';
import { CnfDialogBoxComponent } from '../cnf-dialog-box/cnf-dialog-box.component';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../auth.service';
import { AdminCheckService } from '../admin-check.service';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {
  customers: ICustomers[];
  SearchCustomer: Number;
  canEdit: Boolean;
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;
  data: ICustomers[];
  constructor(private http: HttpClient, private toastr: ToastrService,
    private spinner: NgxSpinnerService, private dialog: MatDialog,
    private authenticate: AuthService
  ) { }

  ngOnInit(): void {
    this.getCustomers();
    this.canEdit = this.authenticate.CanEdit;
    console.log(this.canEdit);
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

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
      console.log(this.pageSizeOptions);
    }
  }
}
