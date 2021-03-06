import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ICustomers } from '../icustomers';

@Component({
  selector: 'app-editcustomerdetails',
  templateUrl: './editcustomerdetails.component.html',
  styleUrls: ['./editcustomerdetails.component.css']
})
export class EditcustomerdetailsComponent implements OnInit {
  updateDetails: FormGroup;
  districts: Object;
  states: Object;
  constructor(private http: HttpClient, private toastr: ToastrService,
    private spinner: NgxSpinnerService, private dialogRef: MatDialogRef<EditcustomerdetailsComponent>,
    private activatedRoute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public customer: ICustomers
  ) { }

  ngOnInit(): void {
    this.updateDetails = new FormGroup({
      FirstName: new FormControl(this.customer.FirstName, [Validators.required,
      Validators.minLength(1)]),
      LastName: new FormControl(this.customer.LastName, [Validators.required,
      Validators.minLength(1)]),
      Email: new FormControl(this.customer.Email, [Validators.required,
      Validators.minLength(1), Validators.email]),
      Address: new FormControl(this.customer.Address, [Validators.required,
      Validators.minLength(1)]),
      District: new FormControl(this.customer.District, [Validators.required,
      Validators.minLength(1)]),
      State: new FormControl(this.customer.State, [Validators.required,
      Validators.minLength(1)]),
      Gender: new FormControl(this.customer.Gender, [Validators.required,
      Validators.minLength(1)]),
      Escalation: new FormControl(this.customer.Escalation),
      Appreciations: new FormControl(this.customer.Appreciations),
      Comments: new FormControl(""),
      Pinned: new FormControl(false)
    }
    );
  }

  onSubmitClick() {
    this.spinner.show();
    let date = this.getDate();
    if (this.updateDetails.value.Comments.length > 0) {
      let comment = {
        "Message": this.updateDetails.value.Comments,
        "Time": date,
        "Pinned": this.updateDetails.value.Pinned
      }
      if (this.updateDetails.value.Pinned) {
        this.customer.Comments.forEach(cmt => {
          cmt.Pinned = false;
        })
      }
      this.customer.Comments.unshift(comment)
    }
    let payload =
    {
      "FirstName": this.updateDetails.value.FirstName,
      "LastName": this.updateDetails.value.LastName,
      "Email": this.updateDetails.value.Email,
      "Address": this.updateDetails.value.Address,
      "District": this.updateDetails.value.District,
      "State": this.updateDetails.value.State,
      "Comments": this.customer.Comments,
      "Gender": this.updateDetails.value.Gender,
      "Escalation": this.updateDetails.value.Escalation,
      "Appreciations": this.updateDetails.value.Appreciations,
      "CustomerID": this.customer.CustomerID
    }
    this.saveDetails(payload);

    this.dialogRef.close();
  }
  onCancel() {
    this.dialogRef.close();
  }

  getDate(): any {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    let today = day + ' - ' + month + ' - ' + year;
    return today;
  }
  saveDetails(payload) {
    this.http.post("api/customer/update", payload).subscribe((data) => {
      this.toastr.success("Success", "Customer updated successfully");
      this.spinner.hide();
    }, (error) => {
      this.toastr.error("Failure", "Failed to update customer");
      console.error(error)
      this.spinner.hide();
    });
  }
}



