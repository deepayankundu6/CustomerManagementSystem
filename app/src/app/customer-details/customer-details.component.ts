import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ICustomers } from "../icustomers";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EditcustomerdetailsComponent } from '../editcustomerdetails/editcustomerdetails.component';

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
    this.getCustomer();
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

  onEditClick() {
    let dialogReff = this.dialog.open(EditcustomerdetailsComponent, {
      height: "90em",
      width: "90em",
      data: this.customer
    });
    dialogReff.afterClosed().subscribe(() => {
      this.getCustomer();
    })
  }

  onPinClick(comment) {
    this.customer.Comments.forEach(cmt => {
      if (cmt.Message.includes(comment.Message)) {
        comment.Pinned = !comment.Pinned;
        cmt = comment;
      } else {
        cmt.Pinned = false;
      }
    });
    this.http.post("api/customer/update", this.customer).subscribe(() => {
      this.getCustomer();
    }, (error) => {
      console.error(error)
    });
  }

  onDeleteClick(comment) {
    let index = -1;
    this.customer.Comments.forEach((cmt, i) => {
      if (cmt.Message.includes(comment.Message)) {
        index = i;
      }
    });
    if (index != -1) {
      this.customer.Comments.splice(index, 1);
    }
    this.http.post("api/customer/update", this.customer).subscribe(() => {
      this.getCustomer();
      this.toastr.success("Success", "Comment deleted successfully");
    }, (error) => {
      this.toastr.error("Failure", "Failed to delete Cooment");
      console.error(error)
    });
  }
}
