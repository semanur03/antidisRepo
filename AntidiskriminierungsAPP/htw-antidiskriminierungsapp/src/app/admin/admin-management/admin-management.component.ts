import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Admin } from 'src/app/shared/admin';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrl: './admin-management.component.css',
  standalone: false,
})
export class AdminManagementComponent implements OnInit {
  admins: Admin[] = [];
  selectedAdmin?: Admin;

  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;

  constructor(private authService: AuthService, private modalService: NgbModal, config: NgbModalConfig ) {
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
    this.selectedAdmin = admin;
    this.modalService.open(this.deleteModal, {ariaLabelledBy: 'modal-basic-title'});
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

  ngOnInit(): void {
    this.loadAdmins();
  }
}
