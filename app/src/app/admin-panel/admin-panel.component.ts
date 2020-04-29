import { Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from '../iuser';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  data: IUser[];
  UsersData: MatTableDataSource<IUser>;
  displayedColumns: string[] = ['Name', 'Email', 'Password', 'DOB', 'Actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private http: HttpClient, private toastr: ToastrService,
    private spinner: NgxSpinnerService, private dialog: MatDialog,
    private router: Router) {
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.sort = this.sort;
  }

  getAllUsers() {
    this.spinner.show();
    this.http.get("/api/user/getall").subscribe((users: IUser[]) => {
      if (users) {
        this.data = users;
        this.UsersData = new MatTableDataSource(this.data);
        this.spinner.hide();
      } else {
        console.log("No data received");
        this.spinner.hide();
      }
    }, (error) => {
      console.error(error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.UsersData.filter = filterValue.trim().toLowerCase();
  }

  GoBack() {
    this.router.navigateByUrl("");
  }

  OpenNewUser() {
    let dialogRef = this.dialog.open(AddUserComponent,
      {
        "height": "40em",
        "width": "40em"
      });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllUsers();
    });
  }

  onDeleteClick(user) {
    let payload = {
      "Email": user.Email
    }
    this.http.post("api/user/remove", payload).subscribe((data) => {
      this.toastr.success("Success", "User removed successfully");
      this.getAllUsers();
    }, (error) => {
      this.toastr.error("Failure", "Failed toremove user");
    });
  }

  OpenEditUser(user) {
    let dialogRef = this.dialog.open(EditUserComponent,
      {
        "height": "40em",
        "width": "40em",
        data: user
      });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllUsers();
    });
  }

}

