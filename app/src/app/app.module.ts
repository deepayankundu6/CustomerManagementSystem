import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { EditcustomerdetailsComponent } from './editcustomerdetails/editcustomerdetails.component';
import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatCardModule } from '@angular/material/card';
import { CidFilterPipe } from './cid-filter.pipe';
import { CnfDialogBoxComponent } from './cnf-dialog-box/cnf-dialog-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginCOmponentComponent } from './login-component/login-component.component';
import { SignupComponentComponent } from './signup-component/signup-component.component';
@NgModule({
  declarations: [
    AppComponent,
    CustomerViewComponent,
    AddCustomerComponent,
    PagenotfoundComponent,
    EditcustomerdetailsComponent,
    PagetitleComponent,
    CidFilterPipe,
    CnfDialogBoxComponent,
    CustomerDetailsComponent,
    LandingPageComponent,
    LoginCOmponentComponent,
    SignupComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTabsModule,
    MatStepperModule,
    MatCheckboxModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
