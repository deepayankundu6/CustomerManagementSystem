import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthService } from './auth.service';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'cms', component: CustomerViewComponent, canActivate: [AuthService] },
  { path: 'cms/add', component: AddCustomerComponent, canActivate: [AuthService] },
  { path: 'cms/view/:id', component: CustomerDetailsComponent, canActivate: [AuthService] },
  { path: '**', component: PagenotfoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
