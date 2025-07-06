import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private auth: AuthService, private router: Router, public translate: TranslateService,  private modalService: NgbModal, config: NgbModalConfig, ) {
    config.backdrop = 'static';  // Klick außerhalb schließt Modal NICHT
    config.keyboard = false; // ESC-Taste schließt Modal NICHT
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

  openLogoutModal(content: any) {
    this.modalService.open(content);
  }

  callLogout() {
    this.isLoggedIn = false;
    this.auth.logout();
    this.router.navigate(['/login'])
  }
  
}