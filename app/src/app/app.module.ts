import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { EditcustomerdetailsComponent } from './editcustomerdetails/editcustomerdetails.component';
import { PagetitleComponent } from './pagetitle/pagetitle.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerViewComponent,
    AddCustomerComponent,
    PagenotfoundComponent,
    EditcustomerdetailsComponent,
    PagetitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
