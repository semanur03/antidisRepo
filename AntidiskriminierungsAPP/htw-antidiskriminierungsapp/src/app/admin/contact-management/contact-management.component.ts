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
import { Mitgliedergruppe } from 'src/app/shared/mitgliedergruppe';
import { Organisationseinheit } from 'src/app/shared/organisationseinheit';
import { PersonOrganisationseinheit } from 'src/app/shared/personOrganisationseinheit';
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

  gremien: Gremium[] = []; // Neue Eigenschaft für Gremium
  selectedGremiumIds: number[] = [];
  selectedEditGremiumIds: number[] = [];

  mitgliedergruppen: Mitgliedergruppe[] = []; // Neue Eigenschaft für Mitgliedergrupp
  selectedMitgliedergruppeId: number | null = null;
  selectedEditMitgliedergruppeId: number | null = null;

  organisationseinheiten: Organisationseinheit[] = []; // Neue Eigenschaft für Organisationseinheit
  selectedOrganisationseinheitIds: number[] = [];
  selectedEditOrganisationseinheitIds: number[] = [];

  newContact: Contacts = {
    id: 0,
    titel: '',
    vorname: '',
    nachname: '',
    telefon: '',
    email: '',
  };

  newSprache: Sprache = { 
    id: 0, 
    sprache: '' 
  };
  selectedLanguageIdToDelete: number | null = null;

  errorMessage: string | null = null;

  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;
  @ViewChild('addModal') addModal!: TemplateRef<any>;
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  @ViewChild('languageModal') languageModal!: TemplateRef<any>;
  @ViewChild('languageDeleteModal') languageDeleteModal: any;

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
    this.selectedGremiumIds = []; // Auswahl zurücksetzen
    this.selectedMitgliedergruppeId = null; // Auswahl zurücksetzen
    this.selectedOrganisationseinheitIds = []; // Auswahl zurücksetzen
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
  
  isMitgliedergruppeSelected(mitgliedergruppeId: number): boolean {
    return this.selectedMitgliedergruppeId === mitgliedergruppeId;
  }

  selectMitgliedergruppe(mitgliedergruppeId: number): void {
    this.selectedMitgliedergruppeId = mitgliedergruppeId;
  }

  isOrganisationseinheitSelected(organisationseinheitId: number): boolean {
    return this.selectedOrganisationseinheitIds.includes(organisationseinheitId);
  }

  toggleOrganisationseinheitSelection(organisationseinheitId: number): void {
    const index = this.selectedOrganisationseinheitIds.indexOf(organisationseinheitId);
    if (index > -1) {
      this.selectedOrganisationseinheitIds.splice(index, 1);
    } else {
      if(this.selectedOrganisationseinheitIds.length < 2){
        this.selectedOrganisationseinheitIds.push(organisationseinheitId);
      } else {
        alert('Es können maximal 2 Organisationseinheiten ausgewählt werden.')
      }
    }
  }
 
  isNewContactValid(): boolean {
    const emailValid = this.isEmailValid(this.newContact.email);
    const hasGremium = this.selectedGremiumIds.length > 0;
    const hasSprache = this.selectedSpracheIds.length > 0;
    const hasOrganisationseinheit = this.selectedOrganisationseinheitIds.length > 0;
    const hasMitgliedergruppe = this.selectedMitgliedergruppeId !== null && this.selectedMitgliedergruppeId !== 0;
    return !!(this.newContact.vorname && this.newContact.nachname && emailValid && hasGremium && hasSprache && hasMitgliedergruppe && hasOrganisationseinheit);
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
            this.selectedMitgliedergruppeId = null;
            this.selectedOrganisationseinheitIds = [];
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

        // Mitgliedergruppe speichern (falls ausgewählt)
        const mitgliedergruppeRequests = this.selectedMitgliedergruppeId != null
          ? [this.backendService.createPersonMitgliedergruppe({
              person_id: res.id,
              mitgliedergruppe_id: this.selectedMitgliedergruppeId
            }).toPromise()]
          : [];
        
        // Organisationseinheit speichern (falls ausgewählt)
        const organisationseinheitRequests = (this.selectedOrganisationseinheitIds && this.selectedOrganisationseinheitIds.length > 0)
          ? this.selectedOrganisationseinheitIds.map(organisationeinheitId => {
              const personOrganisationseinheit: PersonOrganisationseinheit = {
                person_id: res.id,
                organisationseinheit_id: organisationeinheitId
              };
              return this.backendService.createPersonOrganisationseinheit(personOrganisationseinheit).toPromise();
            })
          : [];

        // Alle Zuordnungen speichern, dann abschließen
        Promise.all([...spracheRequests, ...gremiumRequests, ...mitgliedergruppeRequests, ...organisationseinheitRequests])
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
        this.selectedMitgliedergruppeId = 0;
        this.selectedOrganisationseinheitIds = [];
      }
    });
  }

  //Edit
  openEditModal(contact: Contacts): void {
    this.selectedContact = { ...contact };

    forkJoin({
      sprachen: this.backendService.getAllPersonSpracheByPersonId(contact.id),
      gremien: this.backendService.getAllPersonGremiumByPersonId(contact.id),
      mitgliedergruppen: this.backendService.getAllPersonMitgliedergruppeByPersonId(contact.id),
      organisationseinheiten: this.backendService.getAllPersonOrganisationseinheitByPersonId(contact.id),
    }).subscribe({
      next: ({ sprachen, gremien, mitgliedergruppen, organisationseinheiten}) => {
        this.selectedEditSpracheIds = sprachen.map(ps => ps.sprache_id);
        this.selectedEditGremiumIds = gremien.map(pg => pg.gremium_id);
        this.selectedEditMitgliedergruppeId = mitgliedergruppen.length > 0 ? mitgliedergruppen[0].mitgliedergruppe_id : null;
        this.selectedEditOrganisationseinheitIds = organisationseinheiten.map(po => po.organisationseinheit_id);
        console.log('Geladene Edit-Mitgliedergruppen:', this.selectedEditMitgliedergruppeId);

        this.modalService.open(this.editModal);
      },
      error: (err) => console.error('Fehler beim Laden der Zuordnungen', err)
    });
  }

  isEditContactValid(): boolean {
    if (!this.selectedContact) return false;
    const emailValid = this.isEmailValid(this.selectedContact.email ?? '');
    const hasGremium = this.selectedEditGremiumIds.length > 0;
    const hasSprache = this.selectedEditSpracheIds.length > 0; 
    const hasOrganisationseinheit = this.selectedEditSpracheIds.length > 0; 
    const hasMitgliedergruppe = this.selectedEditMitgliedergruppeId !== null; 
    return !!(this.selectedContact.vorname && this.selectedContact.nachname && emailValid && hasGremium && hasSprache && hasMitgliedergruppe && hasOrganisationseinheit);
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
  
  isEditMitgliedergruppeSelected(mitgliedergruppeId: number): boolean {
    return this.selectedEditMitgliedergruppeId === mitgliedergruppeId;
  }

  selectEditMitgliedergruppe(mitgliedergruppeId: number): void {
    this.selectedEditMitgliedergruppeId = mitgliedergruppeId;
  }
  
  isEditOrganisationseinheitSelected(organisationseinheitId: number): boolean {
    return this.selectedEditOrganisationseinheitIds.includes(organisationseinheitId);
  }

  toggleEditOrganisationseinheitSelection(organisationseinheitId: number): void {
    const index = this.selectedEditOrganisationseinheitIds.indexOf(organisationseinheitId);
    if (index > -1) {
      this.selectedEditOrganisationseinheitIds.splice(index, 1);
    } else {
      if (this.selectedEditOrganisationseinheitIds.length < 2) {
        this.selectedEditOrganisationseinheitIds.push(organisationseinheitId);
      } else {
        alert('Es können maximal 2 Organisationseinheiten ausgewählt werden.');
      }
    }
  }

  saveUpdatedContact(): void {
    if (!this.selectedContact?.id) return;

    if (!this.isEditContactValid()) {
      console.warn('Kontakt ist nicht gültig');
      this.errorMessage = 'Bitte alle Pflichtfelder ausfüllen';
      return;
    }

      
    console.log('Sprache-IDs:', this.selectedEditSpracheIds);
    console.log('Gremium-IDs:', this.selectedEditGremiumIds);
    console.log('Mitgliedergruppe-IDs:', this.selectedEditMitgliedergruppeId);
    console.log('Organisationseinheit-IDs:', this.selectedEditOrganisationseinheitIds);

    this.backendService.updatePerson(this.selectedContact.id, this.selectedContact).subscribe({
      next: () => {
        console.log('Kontakt aktualisiert.');
        // Zuerst alte Zuordnungen parallel laden
        forkJoin({
          oldSprachen: this.backendService.getAllPersonSpracheByPersonId(this.selectedContact!.id!),
          oldGremien: this.backendService.getAllPersonGremiumByPersonId(this.selectedContact!.id!),
          oldMitgliedergruppen: this.backendService.getAllPersonMitgliedergruppeByPersonId(this.selectedContact!.id),
          oldOrganisationseinheiten: this.backendService.getAllPersonOrganisationseinheitByPersonId(this.selectedContact!.id!),
        }).subscribe({
          next: ({ oldSprachen, oldGremien, oldMitgliedergruppen, oldOrganisationseinheiten}) => {
            // Alte Zuordnungen löschen
            const deleteSprachen = oldSprachen.map(ps =>
              this.backendService.deletePersonSprache(ps.person_id, ps.sprache_id).toPromise()
            );
            const deleteGremien = oldGremien.map(pg =>
              this.backendService.deletePersonGremium(pg.person_id, pg.gremium_id).toPromise()
            );
            const deleteMitgliedergruppen = oldMitgliedergruppen.map(pm =>
              this.backendService.deletePersonMitgliedergruppe(pm.person_id, pm.mitgliedergruppe_id).toPromise()
            );
            const deleteOrganisationseinheiten = oldOrganisationseinheiten.map(po =>
              this.backendService.deletePersonOrganisationseinheit(po.person_id, po.organisationseinheit_id).toPromise()
            );

            Promise.all([...deleteSprachen, ...deleteGremien, ...deleteMitgliedergruppen, deleteOrganisationseinheiten]).then(() => {
              // Neue Zuordnungen
              const addSprachen = this.selectedEditSpracheIds.map(spracheId => {
              const personSprache: PersonSprache = {
                  person_id: this.selectedContact!.id!,
                  sprache_id: spracheId
                };
                return this.backendService.createPersonSprache(personSprache).toPromise();
              });
              const addGremien = this.selectedEditGremiumIds.map(gremiumId => {
                const personGremium: PersonGremium = {
                  person_id: this.selectedContact!.id!,
                  gremium_id: gremiumId
                };
                return this.backendService.createPersonGremium(personGremium).toPromise();
              });
              const addMitgliedergruppen = this.selectedEditMitgliedergruppeId != null
                ? [this.backendService.createPersonMitgliedergruppe({
                    person_id: this.selectedContact!.id!,
                    mitgliedergruppe_id: this.selectedEditMitgliedergruppeId
                  }).toPromise()]
                : [];
              const addOrganisationseinheiten = this.selectedEditOrganisationseinheitIds.map(organisationseinheitId => {
              const personOrganisationseinheit: PersonOrganisationseinheit = {
                  person_id: this.selectedContact!.id!,
                  organisationseinheit_id: organisationseinheitId
                };
                return this.backendService.createPersonOrganisationseinheit(personOrganisationseinheit).toPromise();
              });



              Promise.all([...addSprachen, ...addGremien, ...addMitgliedergruppen, ...addOrganisationseinheiten]).then(() => {
                this.loadContacts();
                this.modalService.dismissAll();
                this.selectedEditSpracheIds = [];
                this.selectedEditGremiumIds = [];
                this.selectedEditMitgliedergruppeId = 0;
                this.selectedEditOrganisationseinheitIds = [];
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

  loadMitgliedergruppen(): void {
    this.backendService.getAllMitgliedergruppe().subscribe({
      next: (data) => {
        this.mitgliedergruppen = data;
      },
      error: (err) => console.error('Fehler beim Laden der Mitgliedergruppen', err)
    });
  }

  loadOrganisationseinheiten(): void {
    this.backendService.getAllOrganisationseinheit().subscribe({
      next: (data) => {
        this.organisationseinheiten = data;
      },
      error: (err) => console.error('Fehler beim Laden der Organisationseinheiten', err)
    });
  }

  openLanguageModal(): void {
    this.modalService.open(this.languageModal, {
      backdrop: 'static',
      size: 'md',
    });
  }

  // Prüft, ob die Eingabe gültig und noch nicht vorhanden ist
  isNewLanguageValid(): boolean {
    const name = this.newSprache?.sprache?.trim().toLowerCase();
    return !!name && !this.sprachen.some(
      (s) => s.sprache.trim().toLowerCase() === name
    );
  }

  // Neue Sprache speichern
  createSprache(): void {
    const name = this.newSprache?.sprache?.trim();

    if (!name) {
      this.errorMessage = 'Bitte einen gültigen Sprachnamen eingeben.';
      return;
    }

    const exists = this.sprachen.some(
      (s) => s.sprache.trim().toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      this.errorMessage = 'Diese Sprache existiert bereits.';
      return;
    }

    const spracheToCreate = { id: 0, sprache: name };

    this.backendService.createSprache(spracheToCreate).subscribe({
      next: (res) => {
        this.sprachen.push(res); // Oder this.loadSprachen();
        this.newSprache = { id: 0, sprache: '' };
        this.errorMessage = null;
        this.modalService.dismissAll();
      },
      error: (err) => {
        this.errorMessage = 'Fehler beim Speichern der Sprache.';
        console.error(err);
      }
    });
  }

  openLanguageDeleteModal(): void {
    this.selectedLanguageIdToDelete = null;
    this.modalService.open(this.languageDeleteModal);
  }

  deleteSprache(): void {
    if (this.selectedLanguageIdToDelete == null) return;

    this.backendService.deleteSprache(this.selectedLanguageIdToDelete).subscribe({
      next: () => {
        // Sprache aus der Liste entfernen
        this.sprachen = this.sprachen.filter(s => s.id !== this.selectedLanguageIdToDelete);
        this.selectedLanguageIdToDelete = null;
        this.modalService.dismissAll();
      },
      error: (err) => {
        console.error('Fehler beim Löschen der Sprache', err);
      }
    });
  }

  ngOnInit(): void {
    this.loadContacts();
    this.loadSprachen();
    this.loadGremien();
    this.loadMitgliedergruppen();
    this.loadOrganisationseinheiten();
    this.selectedSpracheIds = [];
    this.selectedGremiumIds = [];
    this.selectedMitgliedergruppeId = null;
    this.selectedOrganisationseinheitIds = [];
  }

}
