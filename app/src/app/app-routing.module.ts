import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { EditcustomerdetailsComponent } from './editcustomerdetails/editcustomerdetails.component';


const routes: Routes = [
  { path: '', component: CustomerViewComponent },
  { path: 'add', component: AddCustomerComponent },
  { path: 'modify', component: EditcustomerdetailsComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
