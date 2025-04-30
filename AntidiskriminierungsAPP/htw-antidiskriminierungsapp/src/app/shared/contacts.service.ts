import { Injectable } from '@angular/core';
import { Contacts } from './contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  async getAllContacts(): Promise<Contacts[]> {
    let response = await fetch('../../assets/data/contacts.json');
    let contacts = await response.json();

    return contacts;
  }
}