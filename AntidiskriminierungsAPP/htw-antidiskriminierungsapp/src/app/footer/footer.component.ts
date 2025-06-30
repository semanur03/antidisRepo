import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Admin } from '../shared/admin';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: false
})
export class FooterComponent implements OnInit {
  selectedLanguage = 'de';
  deutsch = 'de';
  english = 'en';

  isLoggedIn = false;
  username: string = '';

  constructor(private auth: AuthService, private router: Router, public translate: TranslateService ) {
    this.selectedLanguage = localStorage.getItem('locale') || 'de';
    this.auth.loggedInChange.subscribe(value => {
    this.isLoggedIn = value;
    if (this.isLoggedIn) {
      this.auth.adminChange.subscribe(val => {
        console.log('nav user', val);
        this.username = val?.username;
        console.log('nav username', this.username);
      });
    }
  });
  }

  ngOnInit(): void {
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  selectLang(): void {
    if (this.selectedLanguage) {
      this.switchLanguage(this.selectedLanguage);
      localStorage.setItem('locale', this.selectedLanguage)
    }
  }

  callLogin() {
    this.router.navigate(['/login'])
  }

  callLogout() {
    this.isLoggedIn = false;
    this.auth.logout();
    this.router.navigate(['/login'])
  }

  confirmLogout() {
    const shouldLogout = window.confirm(
      this.translate.instant('footer.page.confirmLogout')
    );
    
    if (shouldLogout) {
      this.callLogout();
      this.router.navigate(['/']); // Startseite
    }
  }
  
}