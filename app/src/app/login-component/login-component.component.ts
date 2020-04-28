import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

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
    this.http.post("api/user/verify", this.loginDetails.value).subscribe((data: {
      IsValid: Boolean,
      IsAdmin: Boolean
    }) => {
      console.log("Data:", data);
      this.IsValid = data.IsValid;
      this.IsAdmin = data.IsAdmin;
      if (this.IsValid) {
        this.authenticate.login();
        if (this.IsValid && this.IsAdmin) {
          this.authenticate.setAdmin();
        }
        this.router.navigateByUrl("cms");
        this.dialogRef.close();
      }
      else {
        this.IsValid = false;
        this.showMessage = true;
      }
      console.log(this.IsValid);
      console.log(this.IsAdmin);
      this.spinner.hide();
    });
  }
  backClick() {
    this.dialogRef.close();
  }
}