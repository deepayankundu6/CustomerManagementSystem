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
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginDetails: FormGroup;
  IsValid: Boolean;
  IsAdmin: Boolean;
  showMessage: Boolean = false;
  nonAdminMessage: Boolean = false;

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
      IsAdmin: Boolean
    }) => {
      this.IsValid = data.IsValid;
      this.IsAdmin = data.IsAdmin;
      if (this.IsValid && this.IsAdmin == false) {
        this.nonAdminMessage = true;
        this.showMessage = false;
      }
      else if (this.IsValid && this.IsAdmin) {
        this.adminAuthenticate.setAdmin();
        this.router.navigateByUrl("admin");
        this.dialogRef.close();
      }
      else {
        this.nonAdminMessage = false;
        this.showMessage = true;
      }
      this.spinner.hide();
    });
  }
  backClick() {
    this.dialogRef.close();
  }

}
