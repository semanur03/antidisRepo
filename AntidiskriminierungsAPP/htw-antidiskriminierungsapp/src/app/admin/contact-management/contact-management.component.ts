import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { Contacts } from 'src/app/shared/contacts';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-contact-management',
  templateUrl: './contact-management.component.html',
  styleUrl: './contact-management.component.css',
  standalone: false,
})
export class ContactManagementComponent implements OnInit {
  contacts: Contacts[] = [];
  selectedContact?: Contacts;

  newContact: Contacts = {
    id: 0,
    titel: '',
    vorname: '',
    nachname: '',
    telefon: '',
    email: '',
  };

  errorMessage: string | null = null;

  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;
  @ViewChild('addModal') addModal!: TemplateRef<any>;
  @ViewChild('editModal') editModal!: TemplateRef<any>;

  constructor(private backendService: BackendService, public modalService: NgbModal, config: NgbModalConfig, private translate: TranslateService) {
    config.backdrop = 'static';  // Klick außerhalb schließt Modal NICHT
    config.keyboard = false; // ESC-Taste schließt Modal NICHT
  }

  loadContacts(): void {
    this.backendService.getAllPerson().subscribe({
      next: (data) => this.contacts = data,
      error: (err) => console.error('Fehler beim Laden der Kontakte', err)
    });
  }

  openDeleteModal(contact: Contacts): void {
    this.selectedContact = contact;
    this.modalService.open(this.deleteModal);
  }

  deleteContact(id?: number): void {
    if (!id) return;
    this.backendService.deletePerson(id).subscribe({
      next: () => {
        this.contacts = this.contacts.filter(c => c.id !== id);
        console.log('Kontakt gelöscht:', id);
        this.modalService.dismissAll();
      },
      error: (err) => console.error('Fehler beim Löschen', err)
    });
  }

  openAddModal(): void {
    this.newContact = { id: 0, vorname: '', nachname: '', email: '', telefon: '' };
    this.errorMessage = null;
    this.modalService.open(this.addModal);
  }

  saveNewContact(): void {
    if (!this.isNewContactValid()) {
      this.translate.get('contacts-management.page.add_modal.error.check_entries').subscribe(msg => {
        this.errorMessage = msg;
      });
      return;
    }

    this.backendService.createPerson(this.newContact).subscribe({
      next: (res) => {
        console.log('Kontakt erfolgreich hinzugefügt', res);
        this.loadContacts();
        this.modalService.dismissAll();
      },
      error: (err) => console.error('Fehler beim Hinzufügen', err)
    });
  }

  openEditModal(contact: Contacts): void {
    this.selectedContact = { ...contact };
    this.modalService.open(this.editModal);
  }

  saveUpdatedContact(): void {
    if (!this.selectedContact?.id) return;

    this.backendService.updatePerson(this.selectedContact.id, this.selectedContact).subscribe({
      next: (res) => {
        console.log('Kontakt aktualisiert:', res);
        this.loadContacts();
        this.modalService.dismissAll();
      },
      error: (err) => console.error('Fehler beim Aktualisieren', err)
    });
  }

  isNewContactValid(): boolean {
    return !!(this.newContact.vorname && this.newContact.nachname && this.newContact.email);
  }

  trackByContact(index: number, contact: Contacts): number {
    return contact.id;
  }

  ngOnInit(): void {
    this.loadContacts();
  }

}
