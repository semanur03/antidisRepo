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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SuccessComponent } from './success/success.component';
import { KontaktsuccessComponent } from './kontaktsuccess/kontaktsuccess.component';
import { MeldesuccessComponent } from './meldesuccess/meldesuccess.component';
import { ErrorComponent } from './error/error.component';
import { MeldeformularComponent } from './meldeformular/meldeformular.component';
import { KontaktformularComponent } from './kontaktformular/kontaktformular.component';
import { FilterComponent } from './filter/filter.component';

export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
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
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
              new TranslateHttpLoader(http, '../assets/i18n/', '.json'),
        deps: [HttpClient],
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
