import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { Contacts, ContactsView } from 'src/app/shared/contacts';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ContactsService } from 'src/app/shared/contacts.service';
import { Sprache } from 'src/app/shared/sprache';
import { PersonSprache } from 'src/app/shared/personSprache';
import { Gremium } from 'src/app/shared/gremium';
import { PersonGremium } from 'src/app/shared/personGremium';
import { forkJoin } from 'rxjs';


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

  gremien: Gremium[] = [];
  selectedGremiumIds: number[] = [];
  selectedEditGremiumIds: number[] = [];


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
        this.allcontacts = this.allcontacts.filter(c => c.id !== id);
        this.modalService.dismissAll();
      },
      error: (err) => console.error('Fehler beim Löschen', err)
    });
  }

  //Add
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

  isGremiumSelected(gremiumId: number): boolean {
    return this.selectedGremiumIds.includes(gremiumId);
  }

  toggleGremiumSelection(gremiumId: number): void {
    const index = this.selectedGremiumIds.indexOf(gremiumId);
    if (index > -1) {
      this.selectedGremiumIds.splice(index, 1);
    } else {
      if(this.selectedGremiumIds.length < 3){
        this.selectedGremiumIds.push(gremiumId);
      } else {
        alert('Es können maximal 3 Gremien ausgewählt werden.')
      }
    }
  }

  isNewContactValid(): boolean {
    const emailValid = this.isEmailValid(this.newContact.email);
    const hasGremium = this.selectedGremiumIds.length > 0;
    return !!(this.newContact.vorname && this.newContact.nachname && emailValid && hasGremium);
  }

  isEmailValidSafe(email?: string): boolean {
    if (!email) return false;
    return this.isEmailValid(email);
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

        // Funktion, um Kontakte zu aktualisieren und Modal zu schließen
        const finalize = () => {
          this.service.getAllContacts().then(updatedContacts => {
            this.allcontacts = updatedContacts;
            this.modalService.dismissAll();
            this.selectedSpracheIds = [];
            this.selectedGremiumIds = [];
          });
        };

        // Sprache speichern (falls ausgewählt)
        const spracheRequests = (this.selectedSpracheIds && this.selectedSpracheIds.length > 0)
          ? this.selectedSpracheIds.map(spracheId => {
              const personSprache: PersonSprache = {
                person_id: res.id,
                sprache_id: spracheId
              };
              return this.backendService.createPersonSprache(personSprache).toPromise();
            })
          : [];

        // Gremium speichern (falls ausgewählt)
        const gremiumRequests = (this.selectedGremiumIds && this.selectedGremiumIds.length > 0)
          ? this.selectedGremiumIds.map(gremId => {
              const personGremium: PersonGremium = {
                person_id: res.id,
                gremium_id: gremId
              };
              return this.backendService.createPersonGremium(personGremium).toPromise();
            })
          : [];

        // Alle Zuordnungen speichern, dann abschließen
        Promise.all([...spracheRequests, ...gremiumRequests])
          .then(() => finalize())
          .catch(err => {
            console.error('Fehler beim Speichern der Zuordnungen', err);
            finalize();
          });
      },
      error: (err) => {
        console.error('Fehler beim Hinzufügen', err);
        this.selectedSpracheIds = [];
        this.selectedGremiumIds = [];
      }
    });
  }

  //Edit
  openEditModal(contact: Contacts): void {
    this.selectedContact = { ...contact };

    // Sprach- und Gremium-Zuordnungen parallel laden
    forkJoin({
      sprachen: this.backendService.getAllPersonSpracheByPersonId(contact.id),
      gremien: this.backendService.getAllPersonGremiumByPersonId(contact.id)
    }).subscribe({
      next: ({ sprachen, gremien }) => {
        this.selectedEditSpracheIds = sprachen.map(ps => ps.sprache_id);
        this.selectedEditGremiumIds = gremien.map(pg => pg.gremium_id);
        this.modalService.open(this.editModal);
      },
      error: (err) => console.error('Fehler beim Laden der Zuordnungen', err)
    });
  }

  isEditContactValid(): boolean {
    if (!this.selectedContact) return false;
    const emailValid = this.isEmailValid(this.selectedContact.email ?? '');
    const hasGremium = this.selectedEditGremiumIds.length > 0;
    return !!(this.selectedContact.vorname && this.selectedContact.nachname && emailValid && hasGremium);
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

  isEditGremiumSelected(gremiumId: number): boolean {
    return this.selectedEditGremiumIds.includes(gremiumId);
  }

  toggleEditGremiumSelection(gremiumId: number): void {
    const index = this.selectedEditGremiumIds.indexOf(gremiumId);
    if (index > -1) {
      this.selectedEditGremiumIds.splice(index, 1);
    } else {
      if (this.selectedEditGremiumIds.length < 3) {
        this.selectedEditGremiumIds.push(gremiumId);
      } else {
        alert('Es können maximal 3 Gremien ausgewählt werden.');
      }
    }
  }

  saveUpdatedContact(): void {
  if (!this.selectedContact?.id) return;

  if (!this.isEditContactValid()) {
    console.warn('Kontakt ist nicht gültig. Speichern abgebrochen.');
    return;
  }

  this.backendService.updatePerson(this.selectedContact.id, this.selectedContact).subscribe({
    next: () => {
      console.log('Kontakt aktualisiert.');

      // Zuerst alte Sprach- und Gremium-Zuordnungen parallel laden
      forkJoin({
        oldSprachen: this.backendService.getAllPersonSpracheByPersonId(this.selectedContact!.id!),
        oldGremien: this.backendService.getAllPersonGremiumByPersonId(this.selectedContact!.id!)
      }).subscribe({
        next: ({ oldSprachen, oldGremien }) => {
          // Alte Sprachzuordnungen löschen
          const deleteSprachen = oldSprachen.map(ps =>
            this.backendService.deletePersonSprache(ps.person_id, ps.sprache_id).toPromise()
          );
          // Alte Gremiumzuordnungen löschen
          const deleteGremien = oldGremien.map(pg =>
            this.backendService.deletePersonGremium(pg.person_id, pg.gremium_id).toPromise()
          );

          Promise.all([...deleteSprachen, ...deleteGremien]).then(() => {
            // Neue Sprachzuordnungen anlegen
            const addSprachen = this.selectedEditSpracheIds.map(spracheId => {
              const personSprache: PersonSprache = {
                person_id: this.selectedContact!.id!,
                sprache_id: spracheId
              };
              return this.backendService.createPersonSprache(personSprache).toPromise();
            });
            // Neue Gremiumzuordnungen anlegen
            const addGremien = this.selectedEditGremiumIds.map(gremiumId => {
              const personGremium: PersonGremium = {
                person_id: this.selectedContact!.id!,
                gremium_id: gremiumId
              };
              return this.backendService.createPersonGremium(personGremium).toPromise();
            });

            Promise.all([...addSprachen, ...addGremien]).then(() => {
              this.loadContacts();
              this.modalService.dismissAll();
              this.selectedEditSpracheIds = [];
              this.selectedEditGremiumIds = [];
            });
          }).catch(err => console.error('Fehler beim Löschen alter Zuordnungen', err));
        },
        error: (err) => console.error('Fehler beim Laden alter Zuordnungen', err)
      });
    },
    error: (err) => console.error('Fehler beim Aktualisieren der Person', err)
  });
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

  loadGremien(): void {
    this.backendService.getAllGremium().subscribe({
      next: data => this.gremien = data,
      error: err => console.error('Fehler beim Laden der Gremien', err)
    });
  }

  ngOnInit(): void {
    this.loadContacts();
    this.loadSprachen();
    this.loadGremien();
    this.selectedSpracheIds = [];
    this.selectedGremiumIds = [];
  }

}
