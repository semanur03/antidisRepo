import { Component, OnInit, inject } from '@angular/core';
import { ContactsService } from './../shared/contacts.service';
import { ContactsView } from '../shared/contacts';
import { FilterService } from '../shared/filter.service';
import { EmailContactService } from '../shared/email-contact.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-contactlist',
    templateUrl: './contactlist.component.html',
    styleUrls: ['./contactlist.component.css'],
    standalone: false
})
export class ContactlistComponent implements OnInit {

  constructor(private filterService: FilterService, private emailService: EmailContactService, private router: Router) { }

  private service = inject(ContactsService);
  allcontacts: ContactsView[] = [];
  filteredContacts: ContactsView[] = [];
  emailContactPerson: string = '';
  nachnameContactPerson: string = '';
  showFilterMessage = false;

  async ngOnInit(): Promise<void> {
    this.allcontacts = await this.service.getAllContacts();
    this.filteredContacts = this.filter();
  }

  filter(): ContactsView[] {
    let filteredContacts = this.allcontacts;

    const mitgliedergruppe = this.filterService.getMitgliedergruppe();
    const gremium = this.filterService.getGremium();
    const gremium1 = this.filterService.getGremium1();
    const gremium2 = this.filterService.getGremium2();
    const organisationseinheit = this.filterService.getOrganisationseinheit();
    const sprache = this.filterService.getSprache();

    if (mitgliedergruppe || gremium || gremium1 || gremium2 || organisationseinheit || sprache) {
      filteredContacts = filteredContacts.filter(contact =>
        // Mitgleidergruppe-Filter (nur wenn gesetzt)
        (!mitgliedergruppe || contact.mitgliedergruppe === mitgliedergruppe) &&
        // Gremium-Filter: mind. eins der drei gremium-Felder muss passen, wenn einer gesetzt ist
        (
          (gremium !== "" && (contact.gremium === gremium || contact.gremium1 === gremium || contact.gremium2 === gremium)) ||
          (gremium1 !== "" && (contact.gremium === gremium1 || contact.gremium1 === gremium1 || contact.gremium2 === gremium1)) ||
          (gremium2 !== "" && (contact.gremium === gremium2 || contact.gremium1 === gremium2 || contact.gremium2 === gremium2)) ||
          // Falls kein Gremium-Filter gesetzt ist, immer true
          (gremium === "" && gremium1 === "" && gremium2 === "")
        ) &&
        // Organisationsfilter (nur wenn gesetzt)
        (!organisationseinheit || contact.organisationseinheit === organisationseinheit) &&
        // Sprachfilter (nur wenn gesetzt)
        (!sprache || contact.sprache === sprache)
      );
    }
    if (filteredContacts.length < this.allcontacts.length) {
      this.showFilterMsg();
    }
    return filteredContacts;
  }

  contactPerson(emailToBeShared: string, titelToBeShared: string, vornameToBeShared: string, nachnameToBeShared: string) {
    this.emailService.setContactPersonEmail(emailToBeShared);
    this.emailService.setContactPersonTitel(titelToBeShared);
    this.emailService.setContactPersonVorname(vornameToBeShared);
    this.emailService.setContactPersonNachname(nachnameToBeShared);
    this.router.navigate(['/kontaktformular']);
  }

  showFilterMsg() {
    this.showFilterMessage = true;

    setTimeout(() => {
      this.showFilterMessage = false;
    }, 8000);
  }
}