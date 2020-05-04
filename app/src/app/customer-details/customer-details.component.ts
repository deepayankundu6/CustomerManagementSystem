import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ICustomers } from "../icustomers";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EditcustomerdetailsComponent } from '../editcustomerdetails/editcustomerdetails.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customer: ICustomers;
  canEdit: Boolean;
  customerID = Number(this.activatedRoute.snapshot.params.id);

  constructor(private http: HttpClient, private toastr: ToastrService,
    private spinner: NgxSpinnerService, private dialog: MatDialog,
    private activatedRoute: ActivatedRoute, private router: Router,
    private authenticate: AuthService
  ) { }

  ngOnInit(): void {
    this.getCustomer();
    this.canEdit = this.authenticate.CanEdit;
  }

  getCustomer() {
    this.spinner.show();
    let payload = {
      "CustomerID": this.customerID
    }
    this.http.post("/api/customer/get", payload).subscribe((customer: ICustomers) => {
      if (customer) {
        this.customer = customer;
      } else {
        console.log("No data received");
      }
      this.spinner.hide();
    }, (error) => {
      console.error(error);
      this.spinner.hide();
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
    this.spinner.show();
    this.customer.Comments.forEach(cmt => {
      if (cmt.Message == comment.Message) {
        comment.Pinned = !comment.Pinned;
        cmt = comment;
      } else {
        cmt.Pinned = false;
      }
    });
    this.http.post("api/customer/update", this.customer).subscribe(() => {
      this.getCustomer();
      this.spinner.hide();
    }, (error) => {
      console.error(error);
      this.spinner.hide();
    });
  }

  onDeleteClick(comment) {
    this.spinner.show();
    let index = -1;
    this.customer.Comments.forEach((cmt, i) => {
      if (cmt.Message == comment.Message) {
        index = i;
      }
    });
    if (index != -1) {
      this.customer.Comments.splice(index, 1);
    }
    this.http.post("api/customer/update", this.customer).subscribe(() => {
      this.getCustomer();
      this.toastr.success("Success", "Comment deleted successfully");
      this.spinner.hide();
    }, (error) => {
      this.toastr.error("Failure", "Failed to delete Cooment");
      console.error(error);
      this.spinner.hide();
    });
  }
  getMessage(PinStatus) {
    return PinStatus ? "Unpin" : "Pin";
  }
  backClick() {
    this.router.navigateByUrl("cms");
  }
}

