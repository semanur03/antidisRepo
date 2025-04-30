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
  { path: 'filter', component: FilterComponent }
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
