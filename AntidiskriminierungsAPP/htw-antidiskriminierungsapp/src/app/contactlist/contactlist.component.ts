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
  const organisationseinheit = this.filterService.getOrganisationseinheit();
  const sprache = this.filterService.getSprache();

  if (mitgliedergruppe || gremium || organisationseinheit || sprache) {
    filteredContacts = filteredContacts.filter(contact => {
      const mitgliedergruppeMatch = !mitgliedergruppe || contact.mitgliedergruppe === mitgliedergruppe;
      const gremiumMatch = !gremium || (
        contact.gremium === gremium ||
        contact.gremium1 === gremium ||
        contact.gremium2 === gremium
      );
      const organisationseinheitMatch = !organisationseinheit || (contact.organisationseinheit && contact.organisationseinheit.includes(organisationseinheit));
      const spracheMatch = !sprache || (contact.sprache && contact.sprache.includes(sprache));
      return mitgliedergruppeMatch && gremiumMatch && organisationseinheitMatch && spracheMatch;
    });
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