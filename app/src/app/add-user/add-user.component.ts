import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userDetails: FormGroup;
  resopnseData;
  values: string[] = ['IsAdmin', 'CanEdit', 'ViewOnly'];

  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dialogRef: MatDialogRef<AdminPanelComponent>) { }

  ngOnInit(): void {
    this.userDetails = new FormGroup({
      Email: new FormControl('', [Validators.required,
      Validators.minLength(1), Validators.email]),
      Password: new FormControl('', [Validators.required,
      Validators.minLength(1)]),
      DOB: new FormControl('', [Validators.required,
      Validators.minLength(1)]),
      Name: new FormControl('', [Validators.required,
      Validators.minLength(1)]),
      Priviledges: new FormControl("", [Validators.required,
      Validators.minLength(1)])
    });
  }
  createUser() {
    this.spinner.show();
    let user = this.userDetails.value;
    if (user.Priviledges == "CanEdit") {
      user.CanEdit = true;
      user.IsAdmin = false;
    }
    else if (user.Priviledges == "IsAdmin") {
      user.CanEdit = true;
      user.IsAdmin = true;
    }
    else {
      user.CanEdit = false;
      user.IsAdmin = false;
    }
    delete user.Priviledges;
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
