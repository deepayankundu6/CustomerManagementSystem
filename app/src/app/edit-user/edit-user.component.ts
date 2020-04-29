import { Component, OnInit, Inject } from '@angular/core';
import { IUser } from '../iuser';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userDetails: FormGroup;
  resopnseData;
  values: string[] = ['IsAdmin', 'CanEdit', 'ViewOnly'];
  Priviledges;

  constructor(private http: HttpClient, private toastr: ToastrService,
    private spinner: NgxSpinnerService, private dialog: MatDialog,
    private router: Router, private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: IUser) { }

  ngOnInit(): void {

    if (this.user.IsAdmin) {
      this.Priviledges = this.values[0]
    }
    else if (this.user.CanEdit) {
      this.Priviledges = this.values[1]
    }
    else {
      this.Priviledges = this.values[2]
    }

    this.userDetails = new FormGroup({
      Email: new FormControl(this.user.Email, [Validators.required,
      Validators.minLength(1), Validators.email]),
      Password: new FormControl(this.user.Password, [Validators.required,
      Validators.minLength(1)]),
      DOB: new FormControl(this.user.DOB, [Validators.required,
      Validators.minLength(1)]),
      Name: new FormControl(this.user.Name, [Validators.required,
      Validators.minLength(1)]),
      Priviledges: new FormControl(this.Priviledges, [Validators.required,
      Validators.minLength(1)])
    })
  }
  editUser() {
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
    this.http.post("api/user/modify", user).subscribe((data: { data }) => {
      this.resopnseData = data;
      this.toastr.success("Success", "User updated successfully");
      this.dialogRef.close();
      this.spinner.hide()
    },
      (error) => {
        this.toastr.error("Failure", "Failed to update user");
        console.error(error);
        this.spinner.hide()
      });

  }

  backClick() {
    this.dialogRef.close();
  }
}
