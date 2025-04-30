import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private emailUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  sendEmail(mitgliedergruppe: string, betroffenheit: string, message: string, category: string, lastname: string, firstname: string, email: string, checkbox: string, formulartyp: string, apmail: string, titel: string, vorname: string, nachname: string, sprache: string) {
    const data = {
      mitgliedergruppe: mitgliedergruppe,
      betroffenheit: betroffenheit,
      message: message,
      category: category,
      lastname: lastname,
      firstname: firstname,
      email: email,
      checkbox: checkbox,
      formulartyp: formulartyp,
      apmail: apmail,
      titel: titel,
      vorname: vorname,
      nachname: nachname,
      sprache: sprache,
    };
    return this.http.post(this.emailUrl, data);
  }
}
