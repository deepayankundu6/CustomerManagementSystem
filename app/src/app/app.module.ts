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
import { NgxSpinnerModule } from 'ngx-spinner';
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
import { LoginComponentComponent } from './login-component/login-component.component';
import { SignupComponentComponent } from './signup-component/signup-component.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { AddUserComponent } from './add-user/add-user.component';
import { MatRadioModule } from '@angular/material/radio';
import { EditUserComponent } from './edit-user/edit-user.component';

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
    LoginComponentComponent,
    SignupComponentComponent,
    AdminLoginComponent,
    AdminPanelComponent,
    AddUserComponent,
    EditUserComponent
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
    MatCheckboxModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatRadioModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
