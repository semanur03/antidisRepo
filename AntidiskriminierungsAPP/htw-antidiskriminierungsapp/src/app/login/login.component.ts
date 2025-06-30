import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit{
  hide = true;

  errorMessage: string | null = null;

  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private translate: TranslateService) {}

  onSubmit(): void {
    const values = this.loginForm.value;
    const username = values.username;
    const password = values.password;

    // Hinweistext vor neuem Login immer zurücksetzen:
    this.errorMessage = null;

    console.log('values username', username)
    console.log('values password', password)

    this.auth.loginAdmin(username!, password!).subscribe({
      next: (response) => {
        console.log('login response', response);
        if (response.status === 200 || response.status === 201) 
          {
          this.auth.getOneAdminByUsername(username!).subscribe(
            (admin) => {
              this.auth.login(admin);
              this.router.navigate(['/admin-home']);
            }
          );
        } else {
          console.log('Kein Login - Nutzername und/oder Passwort stimmen nicht');
          this.translate.get('login.page.error.invalid_credentials').subscribe((res: string) => {
            this.errorMessage = res; // z.B. "Nutzername und/oder Passwort sind falsch."
          });
        }
      },
      error: (err) => {
        console.log('login error', err);
        if (err.status === 400) {
          this.translate.get('login.page.error.user_not_exist').subscribe((res: string) => {
            this.errorMessage = res; // "Benutzer existiert nicht."
          });
        } else if (err.status === 401 || err.status === 403) {
          this.translate.get('login.page.error.wrong_password_or_no_access').subscribe((res: string) => {
            this.errorMessage = res; // "Falsches Passwort oder kein Zugriff."
          });
        } else if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.translate.get('login.page.error.unknown').subscribe((res: string) => {
            this.errorMessage = res; // "Ein unbekannter Fehler ist aufgetreten."
          });
        }
      },
      complete: () => console.log('login completed')
    })
  }
  
  ngOnInit(): void {
  }
}