import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editcustomerdetails',
  templateUrl: './editcustomerdetails.component.html',
  styleUrls: ['./editcustomerdetails.component.css']
})
export class EditcustomerdetailsComponent implements OnInit {


  constructor(private http: HttpClient, private toastr: ToastrService,
    private spinner: NgxSpinnerService, private dialogRef: MatDialogRef<EditcustomerdetailsComponent>,
    private activatedRoute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public customer
  ) { }

  ngOnInit(): void {
  }

  onSubmitClick() {
    console.log("API Call");
    this.dialogRef.close();

  }
  onCancel() {
    this.dialogRef.close();
  }
}
