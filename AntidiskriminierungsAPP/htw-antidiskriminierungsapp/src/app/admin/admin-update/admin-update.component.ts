import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css'],
  standalone: false,
})
export class AdminUpdateComponent implements OnInit{
  updateForm: FormGroup;
  hideCurrent = true;
  hideNew = true;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private translate: TranslateService
  ) {
    this.updateForm = this.fb.group({
      username: [this.authService.admin.username, []],
      email: [this.authService.admin.email, [Validators.required, Validators.email]],
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.minLength(8)]]
    });
  }

  isPasswordValid(password: string): boolean {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    return pattern.test(password);
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@([a-zA-Z0-9-]+\.)*htw-berlin\.de$/i;
    return emailRegex.test(email);
  }

  isUpdateFormValid(): boolean {
    const email = this.updateForm.get('email')?.value || '';
    const newPassword = this.updateForm.get('newPassword')?.value || '';
    const username = this.updateForm.get('username')?.value || '';

    const emailValid = this.isEmailValid(email);

    // Passwort nur prüfen, wenn eines eingegeben wurde
    const passwordValid = newPassword ? this.isPasswordValid(newPassword) : true;

    // username nicht leer, email gültig und Passwort valid (wenn eingegeben)
    return !!username && emailValid && passwordValid;
  }

  get passwordChecks() {
    const password = this.updateForm.get('newPassword')?.value || '';

    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[^A-Za-z0-9]/.test(password)
    };
  }

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.updateForm.invalid) {
      this.translate.get('admin-update.page.invalid_form').subscribe(msg => {
        this.errorMessage = msg;
      });
      return;
    }

    const adminId = this.authService.admin.id!; // ID aus dem Service
    const formData = this.updateForm.value;

    this.authService.updateAdmin(adminId, formData).subscribe({
      next: (res) => {
        this.translate.get('admin-update.page.sucess.update').subscribe(msg => {
          this.successMessage = msg; 

          setTimeout(() => {
            this.router.navigate(['/admin-home']);
          }, 1500);
        });
        this.authService.adminChange.next(res.user);
        this.authService.admin = res.user;
      },
      error: (err) => {
        console.error(err);

        if (err.error?.error === 'username_exists') {
          this.translate.get('admin-update.page.error.username_exists').subscribe(msg => this.errorMessage = msg);
        } else if (err.error?.error === 'email_exists') {
          this.translate.get('admin-update.page.error.email_exists').subscribe(msg => this.errorMessage = msg);
        } else if (err.error?.error === 'no_fields') {
          this.translate.get('admin-update.page.error.no_fields').subscribe(msg => this.errorMessage = msg);
        } else if (err.status === 403) {
          this.translate.get('admin-update.page.error.wrong_password').subscribe(msg => this.errorMessage = msg);
        } else {
          this.translate.get('admin-update.page.error.unknown').subscribe(msg => this.errorMessage = msg);
        }
      }
    });
  }

   ngOnInit(): void {
  }
}
