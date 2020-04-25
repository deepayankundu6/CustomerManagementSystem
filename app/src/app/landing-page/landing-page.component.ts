import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoginComponentComponent } from '../login-component/login-component.component';
import { SignupComponentComponent } from '../signup-component/signup-component.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onLoginCLick() {
    let dialogRef = this.dialog.open(LoginComponentComponent, {
      width: '40em',
      height: '40em',
    });
    dialogRef.afterClosed().subscribe((data) => {
    });
  }

  onSignupClick() {
    let dialogRef = this.dialog.open(SignupComponentComponent, {
      width: '40em',
      height: '40em',
    });
    dialogRef.afterClosed().subscribe((data) => {
    });
  }

}
