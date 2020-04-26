import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  loginDetails: FormGroup;
  isValid: Boolean;
  showMessage: Boolean = false;

  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dialogRef: MatDialogRef<LandingPageComponent>,
    private authenticate: AuthService) { }


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
    this.http.post("api/user/verify", this.loginDetails.value).subscribe((data: { IsValid: Boolean }) => {
      this.isValid = data.IsValid;
      if (this.isValid) {
        this.authenticate.login();
        this.router.navigateByUrl("cms");
        this.dialogRef.close();
      }
      else {
        this.isValid = false;
        this.showMessage = true;
      }
      this.spinner.hide();
    });
  }
  backClick() {
    this.dialogRef.close();
  }
}