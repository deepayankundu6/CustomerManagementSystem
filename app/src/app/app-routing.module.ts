import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';


const routes: Routes = [
  { path: '', component: CustomerViewComponent },
  { path: 'add', component: AddCustomerComponent },
  { path: 'view/:id', component: CustomerDetailsComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
