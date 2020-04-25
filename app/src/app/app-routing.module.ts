import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'cms', pathMatch: 'full' },
  { path: 'cms', component: CustomerViewComponent },
  { path: 'cms/add', component: AddCustomerComponent },
  { path: 'cms/view/:id', component: CustomerDetailsComponent },
  { path: '**', component: PagenotfoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
