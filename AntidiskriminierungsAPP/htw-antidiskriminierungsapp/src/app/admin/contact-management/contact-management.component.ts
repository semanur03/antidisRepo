import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { Contacts, ContactsView } from 'src/app/shared/contacts';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ContactsService } from 'src/app/shared/contacts.service';
import { Sprache } from 'src/app/shared/sprache';
import { PersonSprache } from 'src/app/shared/personSprache';


@Component({
  selector: 'app-contact-management',
  templateUrl: './contact-management.component.html',
  styleUrl: './contact-management.component.css',
  standalone: false,
})
export class ContactManagementComponent implements OnInit {
  contacts: Contacts[] = [];
  selectedContact?: Contacts;

  allcontacts: ContactsView[] = [];

  sprachen: Sprache[] = []; // Neue Eigenschaft für Sprachen
  selectedSpracheIds: number[] = [];
  selectedEditSpracheIds: number[] = [];


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

  constructor(private backendService: BackendService, private service: ContactsService, public modalService: NgbModal, config: NgbModalConfig, private translate: TranslateService) {
    config.backdrop = 'static';  // Klick außerhalb schließt Modal NICHT
    config.keyboard = false; // ESC-Taste schließt Modal NICHT
  }

   loadContacts(): void {
    this.service.getAllContacts().then(data => this.allcontacts = data);
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
      },
      error: (err) => console.error('Fehler beim Löschen', err)
    });
  }

  openAddModal(): void {
    this.newContact = { id: 0, vorname: '', nachname: '', email: '', telefon: '' };
    this.selectedSpracheIds = []; // Auswahl zurücksetzen
    this.errorMessage = null;
    this.modalService.open(this.addModal);
  }

  isSpracheSelected(spracheId: number): boolean {
    return this.selectedSpracheIds.includes(spracheId);
  }

  toggleSpracheSelection(spracheId: number): void {
    const index = this.selectedSpracheIds.indexOf(spracheId);
    if (index === -1) {
      this.selectedSpracheIds.push(spracheId);
    } else {
      this.selectedSpracheIds.splice(index, 1);
    }
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
        
        if (this.selectedSpracheIds && this.selectedSpracheIds.length > 0) {
          const spracheRequests = this.selectedSpracheIds.map(spracheId => {
            const personSprache: PersonSprache = {
              person_id: res.id,
              sprache_id: spracheId
            };
            return this.backendService.createPersonSprache(personSprache).toPromise();
          });

          // Warten auf alle Sprachzuordnungen
          Promise.all(spracheRequests).then(() => {
            this.service.getAllContacts().then(updatedContacts => {
              this.allcontacts = updatedContacts;
              this.modalService.dismissAll();
              this.selectedSpracheIds = [];
            });
          });
        } else {
          this.service.getAllContacts().then(updatedContacts => {
            this.allcontacts = updatedContacts;
            this.modalService.dismissAll();
            this.selectedSpracheIds = [];
          });
        }
      },
      error: (err) => {
        console.error('Fehler beim Hinzufügen', err);
        this.selectedSpracheIds = [];
      }
    });
  }

  openEditModal(contact: Contacts): void {
    this.selectedContact = { ...contact };
    this.backendService.getAllPersonSpracheByPersonId(contact.id).subscribe({
      next: (personSprachen) => {
        this.selectedEditSpracheIds = personSprachen.map(ps => ps.sprache_id);
        this.modalService.open(this.editModal);
      },
      error: (err) => console.error('Fehler beim Laden der Sprachzuordnungen', err)
    });
  }

  isEditSpracheSelected(spracheId: number): boolean {
    return this.selectedEditSpracheIds.includes(spracheId);
  }

  toggleEditSpracheSelection(spracheId: number): void {
    const index = this.selectedEditSpracheIds.indexOf(spracheId);
    if (index === -1) {
      this.selectedEditSpracheIds.push(spracheId);
    } else {
      this.selectedEditSpracheIds.splice(index, 1);
    }
  }

  saveUpdatedContact(): void {
    if (!this.selectedContact?.id) return;

    this.backendService.updatePerson(this.selectedContact.id, this.selectedContact).subscribe({
      next: () => {
        console.log('Kontakt aktualisiert.');

        // Zuerst alle alten Sprachzuordnungen löschen
        this.backendService.getAllPersonSpracheByPersonId(this.selectedContact!.id!).subscribe({
          next: (oldSprachen) => {
            const deleteRequests = oldSprachen.map(ps =>
              this.backendService.deletePersonSprache(ps.person_id, ps.sprache_id).toPromise()
            );

            Promise.all(deleteRequests).then(() => {
              // Neue Sprachzuordnungen speichern
              const addRequests = this.selectedEditSpracheIds.map(spracheId => {
                const personSprache: PersonSprache = {
                  person_id: this.selectedContact!.id!,
                  sprache_id: spracheId
                };
                return this.backendService.createPersonSprache(personSprache).toPromise();
              });

              Promise.all(addRequests).then(() => {
                this.loadContacts();
                this.modalService.dismissAll();
                this.selectedEditSpracheIds = [];
              });
            });
          },
          error: (err) => console.error('Fehler beim Laden der alten Sprachzuordnungen', err)
        });
      },
      error: (err) => console.error('Fehler beim Aktualisieren der Person', err)
    });
  }

  isNewContactValid(): boolean {
    return !!(this.newContact.vorname && this.newContact.nachname && this.newContact.email);
  }

  trackByContact(index: number, contact: ContactsView): number {
    return contact.id;
  }

  loadSprachen(): void {
    this.backendService.getAllSprache().subscribe({
      next: (data) => {
        this.sprachen = data;
      },
      error: (err) => console.error('Fehler beim Laden der Sprachen', err)
    });
  }

  ngOnInit(): void {
    this.loadContacts();
    this.loadSprachen();
    this.selectedSpracheIds = [];
  }

}
