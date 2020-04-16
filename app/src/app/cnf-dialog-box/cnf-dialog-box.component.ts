import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cnf-dialog-box',
  templateUrl: './cnf-dialog-box.component.html',
  styleUrls: ['./cnf-dialog-box.component.css']
})
export class CnfDialogBoxComponent implements OnInit {
  constructor(private http: HttpClient, private toastr: ToastrService,
    private spinner: NgxSpinnerService, public dialogRef: MatDialogRef<CnfDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }
  deleteCustomers() {
    this.spinner.show();
    this.http.post("/api/customer/delete", this.data).subscribe((resp) => {
      this.toastr.success("Success", "Customer removed successfully");
      this.spinner.hide();
      this.dialogRef.close();
    }, (error) => {
      console.error(error);
      this.toastr.error("Failure", "Failed to remove customer");
      this.spinner.hide();
      this.dialogRef.close();
    });

  }
  onCancel() {
    this.dialogRef.close();
  }
}
