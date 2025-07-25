import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { GetincontactComponent } from './getincontact/getincontact.component'
import { SuccessComponent } from './success/success.component';
import { KontaktsuccessComponent } from './kontaktsuccess/kontaktsuccess.component';
import { MeldesuccessComponent } from './meldesuccess/meldesuccess.component';
import { ErrorComponent } from './error/error.component';
import { MeldeformularComponent } from './meldeformular/meldeformular.component';
import { KontaktformularComponent } from './kontaktformular/kontaktformular.component';
import { FilterComponent } from './filter/filter.component';
import { LoginComponent } from './login/login.component';
import { AuthguardGuard } from './shared/authguard.guard';
import { LoginForwarderComponent } from './login-forwarder/login-forwarder.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminUpdateComponent } from './admin/admin-update/admin-update.component';
import { AdminManagementComponent } from './admin/admin-management/admin-management.component';
import { ContactManagementComponent } from './admin/contact-management/contact-management.component';
import { TextManagementComponent } from './admin/text-management/text-management.component';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: 'full' },
  { path: 'imprint', component: ImprintComponent, pathMatch: 'full' },
  { path: 'privacypolicy', component: PrivacypolicyComponent, pathMatch: 'full' },
  { path: 'faq', component: FaqComponent },
  { path: 'getincontact', component: GetincontactComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'kontaktsuccess', component: KontaktsuccessComponent },
  { path: 'meldesuccess', component: MeldesuccessComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'meldeformular', component: MeldeformularComponent },
  { path: 'kontaktformular', component: KontaktformularComponent },
  { path: 'filter', component: FilterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-forwarder', component: LoginForwarderComponent },
  { path: 'admin-home', component: AdminHomeComponent, 
    canActivate: [AuthguardGuard]},
  { path: 'admin-update', component: AdminUpdateComponent, 
    canActivate: [AuthguardGuard]},
  { path: 'admin-management', component: AdminManagementComponent,
    canActivate: [AuthguardGuard]},
  { path: 'contact-management', component: ContactManagementComponent,
    canActivate: [AuthguardGuard]},
  { path: 'text-management', component: TextManagementComponent,
    canActivate: [AuthguardGuard]},
];

@NgModule({
  imports: [[
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    })
  ]],
  exports: [RouterModule]
})
export class AppRoutingModule { }
