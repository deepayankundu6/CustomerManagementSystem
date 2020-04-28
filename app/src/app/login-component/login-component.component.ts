import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { AuthService } from '../auth.service';
import { AdminCheckService } from '../admin-check.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  loginDetails: FormGroup;
  IsValid: Boolean;
  IsAdmin: Boolean;
  showMessage: Boolean = false;
  CanEdit: Boolean;

  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dialogRef: MatDialogRef<LandingPageComponent>,
    private authenticate: AuthService,
    private adminAuthenticate: AdminCheckService) { }


  ngOnInit(): void {
    this.loginDetails = new FormGroup({
      Email: new FormControl('', [Validators.required,
      Validators.minLength(1), Validators.email]),
      Password: new FormControl('', [Validators.required,
      Validators.minLength(1)]),
    })
  }
  verifyUser() {
    this.spinner.show();
    this.http.post("api/user/verify", this.loginDetails.value).subscribe((data: {
      IsValid: Boolean,
      IsAdmin: Boolean,
      CanEdit: Boolean
    }) => {
      this.IsValid = data.IsValid;
      this.IsAdmin = data.IsAdmin;
      this.CanEdit = data.CanEdit;
      if (this.IsValid && this.CanEdit == false) {
        this.authenticate.login();
        this.router.navigateByUrl("cms");
        this.dialogRef.close();
      }
      else if (this.IsValid && this.CanEdit) {
        this.authenticate.login();
        this.authenticate.enableEditing();
        this.router.navigateByUrl("cms");
        this.dialogRef.close();
      }
      else if (this.IsValid && this.IsAdmin) {
        this.authenticate.login();
        this.adminAuthenticate.setAdmin();
        this.authenticate.enableEditing();
        this.router.navigateByUrl("cms");
        this.dialogRef.close();
      }
      else {
        this.showMessage = true;
      }
      this.spinner.hide();
    });
  }
  backClick() {
    this.dialogRef.close();
  }
}