import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { EmailContactService } from '../shared/email-contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getincontact',
  templateUrl: './getincontact.component.html',
  styleUrls: ['./getincontact.component.css']
})
export class GetincontactComponent {

  constructor(private location: Location, private emailService: EmailContactService, private router: Router) { }

  navigateBack() {
    this.location.back();
  }

  navigateContactPerson() {
    this.emailService.setContactPersonEmail('');
    this.emailService.setContactPersonTitel('');
    this.emailService.setContactPersonVorname('');
    this.emailService.setContactPersonNachname('');
    this.router.navigate(['/kontaktformular']);
  }
}