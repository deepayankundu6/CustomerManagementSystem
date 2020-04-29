import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { LandingPageComponent } from '../landing-page/landing-page.component';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.css']
})
export class SignupComponentComponent implements OnInit {
  userDetails: FormGroup;
  resopnseData;

  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dialogRef: MatDialogRef<LandingPageComponent>
  ) { }

  ngOnInit(): void {
    this.userDetails = new FormGroup({
      Email: new FormControl('', [Validators.required,
      Validators.minLength(1), Validators.email]),
      Password: new FormControl('', [Validators.required,
      Validators.minLength(1)]),
      DOB: new FormControl('', [Validators.required,
      Validators.minLength(1)]),
      Name: new FormControl('', [Validators.required,
      Validators.minLength(1)])
    });
  }

  createUser() {
    this.spinner.show();
    let user = this.userDetails.value;
    user.IsAdmin = false;
    user.CanEdit = false;
    this.http.post("api/user/create", user).subscribe((data: { data }) => {
      this.resopnseData = data;
      if (this.resopnseData.Status == "SUCCESS") {
        this.toastr.success("Success", "User added successfully");
        this.dialogRef.close();
        this.spinner.hide();
      }
      else {
        this.toastr.error("Failure", "Failed to add user please try again");
        this.spinner.hide();
      }
    });
  }
  backClick() {
    this.dialogRef.close();
  }
}
