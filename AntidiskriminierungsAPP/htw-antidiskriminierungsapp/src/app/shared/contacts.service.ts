import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { ContactsView } from './contacts';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private backend: BackendService) {}

  async getAllContacts(): Promise<ContactsView[]> {
    const result = await firstValueFrom(this.backend.getAllPersonInformation());
    return result ?? [];
  }
}