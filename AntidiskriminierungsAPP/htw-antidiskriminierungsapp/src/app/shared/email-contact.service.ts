import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailContactService {

  private emailContactPerson: string | undefined;
  private titelContactPerson: string | undefined;
  private vornameContactPerson: string | undefined;
  private nachnameContactPerson: string | undefined;

  constructor() { }

  getContactPersonEmail(): string | undefined {
    return this.emailContactPerson;
  }

  getContactPersonTitel(): string | undefined {
    return this.titelContactPerson;
  }

  getContactPersonVorname(): string | undefined {
    return this.vornameContactPerson;
  }

  getContactPersonNachname(): string | undefined {
    return this.nachnameContactPerson;
  }

  setContactPersonEmail(email: string | undefined) {
    this.emailContactPerson = email;
    return this.emailContactPerson;
  }

  setContactPersonTitel(titel: string | undefined) {
    this.titelContactPerson = titel;
    return this.titelContactPerson;
  }

  setContactPersonVorname(vorname: string | undefined) {
    this.vornameContactPerson = vorname;
    return this.vornameContactPerson;
  }

  setContactPersonNachname(nachname: string | undefined) {
    this.nachnameContactPerson = nachname;
    return this.nachnameContactPerson;
  }
}
