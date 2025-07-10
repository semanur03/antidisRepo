import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Admin } from 'src/app/shared/admin';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrl: './admin-management.component.css',
  standalone: false,
})
export class AdminManagementComponent implements OnInit {
  admins: Admin[] = [];
  selectedAdmin?: Admin;
  newAdmin: Admin = {
    id: 0,
    username: '',
    email: '',
    password: ''
  };
  loggedInAdminId?: number;

  errorMessage: string | null = null;

  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;
  @ViewChild('addModal') addModal!: TemplateRef<any>; 

  constructor(private authService: AuthService, private modalService: NgbModal, config: NgbModalConfig, private translate: TranslateService ) {
  config.backdrop = 'static';  // Klick außerhalb schließt Modal NICHT
  config.keyboard = false; // ESC-Taste schließt Modal NICHT
  }

  loadAdmins(): void {
    this.authService.getAllAdmins().subscribe({
      next: (data) => this.admins = data,
      error: (err) => console.error('Fehler beim Laden der Admins', err)
    });
  }

  trackByAdmin(index: number, admin: Admin): number {
    return admin.id;
  }

  openDeleteModal(admin: Admin): void {
    if (admin.id === this.loggedInAdminId) {
      console.warn('Du kannst dich nicht selbst löschen.');
      return;
    }
    this.selectedAdmin = admin;
    this.modalService.open(this.deleteModal, { ariaLabelledBy: 'modal-basic-title' });
  }


  deleteAdmin(id?: number): void {
    if (!id) return;
    this.authService.deleteAdmin(id).subscribe({
      next: () => {
        // Admin aus Liste entfernen ohne Seite neu zu laden
        this.admins = this.admins.filter(a => a.id !== id);
        console.log('Admin gelöscht:', id);
      },
      error: (err) => console.error('Fehler beim Löschen', err)
    });
  }

  isNewAdminValid(): boolean {
    const emailValid = this.isEmailValid(this.newAdmin.email);
    const passwordValid = this.isPasswordValid(this.newAdmin.password);
    return !!this.newAdmin.username && emailValid && passwordValid;
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@([a-zA-Z0-9-]+\.)*htw-berlin\.de$/i;
    return emailRegex.test(email);
  }

  isPasswordValid(password: string): boolean {
    // Mindestens 8 Zeichen, 1 Groß-, 1 Kleinbuchstabe, 1 Zahl, 1 Sonderzeichen
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    return pattern.test(password);
  }

  get passwordChecks() {
    const password = this.newAdmin.password || '';

    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[^A-Za-z0-9]/.test(password)
    };
  }

  openAddModal(): void {
    this.newAdmin = { id: 0, username: '', email: '', password: '' };
    this.errorMessage = null;
    this.modalService.open(this.addModal);
  }

  saveNewAdmin(): void {
    if (!this.isNewAdminValid()) {
      this.translate.get('admin-management.page.add_modal.error.check_entries').subscribe(msg => {
        this.errorMessage = msg;
      });
      return;
    }

    this.errorMessage = null;

    this.authService.registerAdmin(this.newAdmin).subscribe({
      next: (res) => {
        console.log('Admin erfolgreich hinzugefügt', res);
        this.loadAdmins();
        this.modalService.dismissAll(); //Modal wird nur geschlossen wenn kein error
        this.newAdmin = { id: 0, username: '', email: '', password: '' };
      },
      error: (err) => {
        console.error('Fehler beim Hinzufügen', err);

        if (err.error?.error) {
          const backendError = err.error.error.toLowerCase();

          if (backendError.includes('username already exists')) {
            this.translate.get('admin-management.page.add_modal.error.username_exists')
              .subscribe(msg => this.errorMessage = msg);
          } else if (backendError.includes('email already exists')) {
            this.translate.get('admin-management.page.add_modal.error.email_exists')
              .subscribe(msg => this.errorMessage = msg);
          } else {
            this.translate.get('admin-management.page.add_modal.error.unknown')
              .subscribe(msg => this.errorMessage = msg);
          }
        } else {
          this.translate.get('admin-management.page.add_modal.error.unknown')
            .subscribe(msg => this.errorMessage = msg);
        }
      },
    });
  }

  ngOnInit(): void {
    this.loggedInAdminId = this.authService.admin?.id;
    this.loadAdmins();
  }
}
