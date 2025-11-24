import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Admin } from 'src/app/shared/admin';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css'],
  standalone: false,
})
export class AdminUpdateComponent implements OnInit {
  updateForm: FormGroup;
  hideCurrent = true;
  hideNew = true;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loggedInAdmin?: Admin;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.updateForm = this.fb.group({
      username: ['', []],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    // Admin aus AuthService laden
    this.loggedInAdmin = this.authService.admin;

    // Formulardaten initial setzen, currentPassword bleibt leer
    this.updateForm.patchValue({
      username: this.loggedInAdmin?.username || '',
      email: this.loggedInAdmin?.email || ''
    });

    // auf Änderungen des Admins im Service reagieren
    this.authService.adminChange.subscribe(admin => {
      this.loggedInAdmin = admin;
      this.updateForm.patchValue({
        username: admin.username,
        email: admin.email
      });
    });
  }

  isPasswordValid(password: string): boolean {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    return pattern.test(password);
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@([a-zA-Z0-9-]+\.)*(htw-berlin|-htw)\.de$/i;
    return emailRegex.test(email);
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

    const adminId = this.authService.admin.id!;
    const formData = this.updateForm.value;

    this.authService.updateAdmin(adminId, formData).subscribe({
      next: (res) => {
        this.translate.get('admin-update.page.sucess.update').subscribe(msg => {
          this.successMessage = msg;

          setTimeout(() => {
            this.router.navigate(['/admin-home']);
          }, 1500);
        });

        // AdminService aktualisieren
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
}
