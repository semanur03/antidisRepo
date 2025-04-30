import { Component, OnDestroy, OnInit } from '@angular/core';
import { KontaktformularService } from '../kontaktformular.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmailContactService } from '../shared/email-contact.service';
import { EmailService } from '../shared/email.service';

@Component({
  selector: 'app-kontaktformular',
  templateUrl: './kontaktformular.component.html',
  styleUrls: ['./kontaktformular.component.css']
})
export class KontaktformularComponent implements OnInit {

  emailContactPerson: any = '';
  titelContactPerson: any = '';
  vornameContactPerson: any = '';
  nachnameContactPerson: any = '';
  sprache: any = localStorage.getItem('locale');

  constructor(private kontaktformularService: KontaktformularService, private router: Router, private location: Location, private emailContactService: EmailContactService, private emailService: EmailService) { }

  async ngOnInit(): Promise<void> {
    this.emailContactPerson = '';
    this.titelContactPerson = '';
    this.vornameContactPerson = '';
    this.nachnameContactPerson = '';
    this.emailContactPerson = this.setContactPersonEmail(this.emailContactService);
    this.titelContactPerson = this.setContactPersonTitel(this.emailContactService);
    this.vornameContactPerson = this.setContactPersonVorname(this.emailContactService);
    this.nachnameContactPerson = this.setContactPersonNachname(this.emailContactService);
  }

  formData = {
    mitgliedergruppe: '',
    betroffenheit: '',
    message: '',
    category: '',
    lastname: '',
    firstname: '',
    email: '',
    checkbox: '',
    formulartyp: 'Kontaktformular'
  };
  contactPersonEmail: string = '';
  contactPersonTitel: string = '';
  contactPersonVorname: string = '';
  contactPersonNachname: string = '';

  setContactPersonEmail(emailService: EmailContactService) {
    this.emailContactPerson = '';
    const email = emailService.getContactPersonEmail();

    if (email) {
      this.emailContactPerson = email; 
    }
    else {
      this.emailContactPerson = 'antidiskriminierungs-app@htw-berlin.de';
    }
    return this.emailContactPerson;
  }

  setContactPersonTitel(emailService: EmailContactService) {
    this.titelContactPerson = '';
    const titel = emailService.getContactPersonTitel();

    if (titel) {
      this.titelContactPerson = titel;
    }
    return this.titelContactPerson;
  }

  setContactPersonVorname(emailService: EmailContactService) {
    this.vornameContactPerson = '';
    const vorname = emailService.getContactPersonVorname();

    if (vorname) {
      this.vornameContactPerson = vorname;
    }
    return this.vornameContactPerson;
  }

  setContactPersonNachname(emailService: EmailContactService) {
    this.nachnameContactPerson = '';
    const nachname = emailService.getContactPersonNachname();

    if (nachname) {
      this.nachnameContactPerson = nachname;
    }
    else {
      this.nachnameContactPerson = 'NA';
    }
    return this.nachnameContactPerson;
  }

  submitForm() {
    this.emailService.sendEmail(this.formData.mitgliedergruppe, this.formData.betroffenheit, this.formData.message, this.formData.category, this.formData.lastname, this.formData.firstname, this.formData.email, this.formData.checkbox, this.formData.formulartyp, this.emailContactPerson, this.titelContactPerson, this.vornameContactPerson, this.nachnameContactPerson, this.sprache).subscribe(
      {
        next: (response) => {
          this.router.navigate(['/kontaktsuccess']);
        },
        error: (err) => {
          this.router.navigate(['/error']);
        },
        complete: () => { },
      }
    );
  }

  weiter = false;

  onWeiter() { this.weiter = true; }

  goBack() { this.weiter = false; }

  navigateBack() {
    this.location.back();
  }
}