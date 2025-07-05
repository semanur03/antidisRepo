import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { FaqComponent } from './faq/faq.component';
import { GetincontactComponent } from './getincontact/getincontact.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuccessComponent } from './success/success.component';
import { KontaktsuccessComponent } from './kontaktsuccess/kontaktsuccess.component';
import { MeldesuccessComponent } from './meldesuccess/meldesuccess.component';
import { ErrorComponent } from './error/error.component';
import { MeldeformularComponent } from './meldeformular/meldeformular.component';
import { KontaktformularComponent } from './kontaktformular/kontaktformular.component';
import { FilterComponent } from './filter/filter.component';
import { TranslationLoader } from './shared/translationLoader';
import { LoginForwarderComponent } from './login-forwarder/login-forwarder.component';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminUpdateComponent } from './admin/admin-update/admin-update.component';
import { AdminManagementComponent } from './admin/admin-management/admin-management.component';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslationLoader(http);
}

@NgModule({ declarations: [
        AppComponent,
        FooterComponent,
        HomeComponent,
        ImprintComponent,
        PrivacypolicyComponent,
        FaqComponent,
        GetincontactComponent,
        ContactlistComponent,
        SuccessComponent,
        KontaktsuccessComponent,
        MeldesuccessComponent,
        ErrorComponent,
        MeldeformularComponent,
        KontaktformularComponent,
        FilterComponent,
        LoginComponent,
        LoginForwarderComponent,
        AdminHomeComponent,
        AdminUpdateComponent,
        AdminManagementComponent,
    ],
    imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        TranslateModule.forRoot({
            defaultLanguage: 'de',
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoaderFactory,
                deps: [HttpClient],
            },
        }),
        MatTableModule,
        MatPaginatorModule,
        MatSortModule], 
        providers: [provideHttpClient(withInterceptorsFromDi())],
        bootstrap: [AppComponent], })
export class AppModule { }
