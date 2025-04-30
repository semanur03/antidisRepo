import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    const defaultLanguage = 'de';
    const locale = localStorage.getItem('locale');
    if (locale) {
      this.translate.setDefaultLang(locale);
      this.translate.use(locale);
    } else {
      this.translate.setDefaultLang(defaultLanguage);
      this.translate.use(defaultLanguage);
      localStorage.setItem('locale', defaultLanguage);
    }
  }

  title = 'htw-antidiskriminierungsapp';
}