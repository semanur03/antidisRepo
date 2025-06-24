import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Person } from './person';
import { PersonView } from './person';
import { PersonSprache } from './personSprache';
import { Sprache } from './sprache';
import { PersonGremium } from './personGremium';
import { Gremium } from './gremium';
import { PersonMitgliedergruppe } from './personMitgliedergruppe';
import { Mitgliedergruppe } from './mitgliedergruppe';
import { PersonOrganisationseinheit } from './personOrganisationseinheit';
import { Organisationseinheit } from './organisationseinheit';
import { Mehrsprachigkeit } from './mehrsprachigkeit';
import { MehrsprachigkeitEntry } from './mehrsprachigkeit';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createPerson(data: Person): Observable<Person>{
    return this.http.post<Person>(this.baseUrl + '/person', data);
  }

  getAllPerson(): Observable<Person[]>{
    return this.http.get<Person[]>(this.baseUrl+ '/person');
  }

  getAllPersonInformation(): Observable<PersonView[]>{
    return this.http.get<PersonView[]>(this.baseUrl + '/person/joined');
  }

  getOnePerson(id: number): Observable<Person>{
    return this.http.get<Person>(this.baseUrl + '/person/' + id);
  }

  updatePerson(id: number, data: Person): Observable<Person>{
    return this.http.put<Person>(this.baseUrl + '/person/' + id, data);
  }

  deletePerson(id: number): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/person/' + id, {observe: 'response'});
  }

//////////////////////////////////////////////////////////////////////////////////////////

  createPersonSprache(data: PersonSprache): Observable<PersonSprache>{
    return this.http.post<PersonSprache>(this.baseUrl + '/person-sprache', data);
  }
  
  getAllPersonSprache(): Observable<PersonSprache[]>{
    return this.http.get<PersonSprache[]>(this.baseUrl+ '/person-sprache');
  }

  getAllPersonSpracheByPersonId(person_id: number): Observable<PersonSprache[]>{
    return this.http.get<PersonSprache[]>(this.baseUrl + '/person-sprache/person/' + person_id);
  }

  getAllPersonSpracheBySpracheId(sprache_id: number): Observable<PersonSprache[]>{
    return this.http.get<PersonSprache[]>(this.baseUrl + '/person-sprache/sprache/' + sprache_id);
  }

  getOnePersonSprache(person_id: number, sprache_id: number): Observable<PersonSprache>{
    return this.http.get<PersonSprache>(this.baseUrl + '/person-sprache/person/' + person_id + '/sprache/' + sprache_id);
  }

  updatePersonSprache(person_id: number, sprache_id: number, data: PersonSprache): Observable<PersonSprache>{
    return this.http.put<PersonSprache>(this.baseUrl + '/person-sprache/person/' + person_id + '/sprache/' + sprache_id, data);
  }

  deletePersonSprache(person_id: number, sprache_id: number): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/person-sprache/person/' + person_id + '/sprache/' + sprache_id, {observe: 'response'});
  }

//////////////////////////////////////////////////////////////////////////////////////////

  createSprache(data: Sprache): Observable<Sprache>{
    return this.http.post<Sprache>(this.baseUrl + '/sprache', data);
  }

  getAllSprache(): Observable<Sprache[]>{
    return this.http.get<Sprache[]>(this.baseUrl+ '/sprache');
  }

  getOneSprache(id: number): Observable<Sprache>{
    return this.http.get<Sprache>(this.baseUrl + '/sprache/' + id);
  }

  updateSprache(id: number, data: Sprache): Observable<Sprache>{
    return this.http.put<Sprache>(this.baseUrl + '/sprache/' + id, data);
  }

  deleteSprache(id: number): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/sprache/' + id, {observe: 'response'});
  }

//////////////////////////////////////////////////////////////////////////////////////////

  createPersonGremium(data: PersonGremium): Observable<PersonGremium>{
    return this.http.post<PersonGremium>(this.baseUrl + '/person-gremium', data);
  }
  
  getAllPersonGremium(): Observable<PersonGremium[]>{
    return this.http.get<PersonGremium[]>(this.baseUrl+ '/person-gremium');
  }

  getAllPersonGremiumByPersonId(person_id: number): Observable<PersonGremium[]>{
    return this.http.get<PersonGremium[]>(this.baseUrl + '/person-gremium/person/' + person_id);
  }

  getAllPersonGremiumByGremiumId(gremium_id: number): Observable<PersonGremium[]>{
    return this.http.get<PersonGremium[]>(this.baseUrl + '/person-gremium/gremium/' + gremium_id);
  }

  getOnePersonGremium(person_id: number, gremium_id: number): Observable<PersonGremium>{
    return this.http.get<PersonGremium>(this.baseUrl + '/person-gremium/person/' + person_id + '/gremium/' + gremium_id);
  }

  updatePersonGremium(person_id: number, gremium_id: number, data: PersonGremium): Observable<PersonGremium>{
    return this.http.put<PersonGremium>(this.baseUrl + '/person-gremium/person/' + person_id + '/gremium/' + gremium_id, data);
  }

  deletePersonGremium(person_id: number, gremium_id: number): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/person-gremium/person/' + person_id + '/gremium/' + gremium_id, {observe: 'response'});
  }

//////////////////////////////////////////////////////////////////////////////////////////

  createGremium(data: Gremium): Observable<Gremium>{
    return this.http.post<Gremium>(this.baseUrl + '/gremium', data);
  }

  getAllGremium(): Observable<Gremium[]>{
    return this.http.get<Gremium[]>(this.baseUrl+ '/gremium');
  }

  getOneGremium(id: number): Observable<Gremium>{
    return this.http.get<Gremium>(this.baseUrl + '/gremium/' + id);
  }

  updateGremium(id: number, data: Gremium): Observable<Gremium>{
    return this.http.put<Gremium>(this.baseUrl + '/gremium/' + id, data);
  }

  deleteGremium(id: number): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/gremium/' + id, {observe: 'response'});
  }

//////////////////////////////////////////////////////////////////////////////////////////

  createPersonMitgliedergruppe(data: PersonMitgliedergruppe): Observable<PersonMitgliedergruppe>{
    return this.http.post<PersonMitgliedergruppe>(this.baseUrl + '/person-mitgliedergruppe', data);
  }
  
  getAllPersonMitgliedergruppe(): Observable<PersonMitgliedergruppe[]>{
    return this.http.get<PersonMitgliedergruppe[]>(this.baseUrl+ '/person-mitgliedergruppe');
  }

  getAllPersonMitgliedergruppeByPersonId(person_id: number): Observable<PersonMitgliedergruppe[]>{
    return this.http.get<PersonMitgliedergruppe[]>(this.baseUrl + '/person-mitgliedergruppe/person/' + person_id);
  }

  getAllPersonMitgliedergruppeByMitgliedergruppeId(mitgliedergruppe_id: number): Observable<PersonMitgliedergruppe[]>{
    return this.http.get<PersonMitgliedergruppe[]>(this.baseUrl + '/person-mitgliedergruppe/mitgliedergruppe/' + mitgliedergruppe_id);
  }

  getOnePersonMitgliedergruppe(person_id: number, mitgliedergruppe_id: number): Observable<PersonMitgliedergruppe>{
    return this.http.get<PersonMitgliedergruppe>(this.baseUrl + '/person-mitgliedergruppe/person/' + person_id + '/mitgliedergruppe/' +mitgliedergruppe_id);
  }

  updatePersonMitgliedergruppe(person_id: number, mitgliedergruppe_id: number, data: PersonMitgliedergruppe): Observable<PersonMitgliedergruppe>{
    return this.http.put<PersonMitgliedergruppe>(this.baseUrl + '/person-mitgliedergruppe/person/' + person_id + '/mitgliedergruppe/' + mitgliedergruppe_id, data);
  }

  deletePersonMitgliedergruppe(person_id: number, mitgliedergruppe_id: number): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/person-mitgliedergruppe/person/' + person_id + '/mitgliedergruppe/' + mitgliedergruppe_id, {observe: 'response'});
  }

//////////////////////////////////////////////////////////////////////////////////////////

  createMitgliedergruppe(data: Mitgliedergruppe): Observable<Mitgliedergruppe>{
    return this.http.post<Mitgliedergruppe>(this.baseUrl + '/mitgliedergruppe', data);
  }

  getAllMitgliedergruppe(): Observable<Mitgliedergruppe[]>{
    return this.http.get<Mitgliedergruppe[]>(this.baseUrl+ '/mitgliedergruppe');
  }

  getOneMitgliedergruppe(id: number): Observable<Mitgliedergruppe>{
    return this.http.get<Mitgliedergruppe>(this.baseUrl + '/mitgliedergruppe/' + id);
  }

  updateMitgliedergruppe(id: number, data: Mitgliedergruppe): Observable<Mitgliedergruppe>{
    return this.http.put<Mitgliedergruppe>(this.baseUrl + '/mitgliedergruppe/' + id, data);
  }

  deleteMitgliedergruppe(id: number): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/mitgliedergruppe/' + id, {observe: 'response'});
  }

//////////////////////////////////////////////////////////////////////////////////////////

  createPersonOrganisationseinheit(data: PersonOrganisationseinheit): Observable<PersonOrganisationseinheit>{
    return this.http.post<PersonOrganisationseinheit>(this.baseUrl + '/person-organisationseinheit', data);
  }
  
  getAllPersonOrganisationseinheit(): Observable<PersonOrganisationseinheit[]>{
    return this.http.get<PersonOrganisationseinheit[]>(this.baseUrl+ '/person-organisationseinheit');
  }

  getAllPersonOrganisationseinheitByPersonId(person_id: number): Observable<PersonOrganisationseinheit[]>{
    return this.http.get<PersonOrganisationseinheit[]>(this.baseUrl + '/person-organisationseinheit/person/' + person_id);
  }

  getAllPersonOrganisationseinheitByOrganisationseinheitId(organisationseinheit_id: number): Observable<PersonOrganisationseinheit[]>{
    return this.http.get<PersonOrganisationseinheit[]>(this.baseUrl + '/person-organisationseinheit/organisationseinheit/' + organisationseinheit_id);
  }

  getOnePersonOrganisationseinheit(person_id: number, organisationseinheit_id: number): Observable<PersonOrganisationseinheit>{
    return this.http.get<PersonOrganisationseinheit>(this.baseUrl + '/person-organisationseinheit/person/' + person_id + '/organisationseinheit/' + organisationseinheit_id);
  }

  updatePersonOrganisationseinheit(person_id: number, organisationseinheit_id: number, data: PersonOrganisationseinheit): Observable<PersonOrganisationseinheit>{
    return this.http.put<PersonOrganisationseinheit>(this.baseUrl + '/person-organisationseinheit/person/' + person_id + '/organisationseinheit/' + organisationseinheit_id, data);
  }

  deletePersonOrganisationseinheit(person_id: number, organisationseinheit_id: number): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/person-organisationseinheit/person/' + person_id + '/organisationseinheit/' + organisationseinheit_id, {observe: 'response'});
  }

//////////////////////////////////////////////////////////////////////////////////////////

  createOrganisationseinheit(data: Organisationseinheit): Observable<Organisationseinheit>{
    return this.http.post<Organisationseinheit>(this.baseUrl + '/organisationseinheit', data);
  }

  getAllOrganisationseinheit(): Observable<Organisationseinheit[]>{
    return this.http.get<Organisationseinheit[]>(this.baseUrl+ '/organisationseinheit');
  }

  getOneOrganisationseinheit(id: number): Observable<Organisationseinheit>{
    return this.http.get<Organisationseinheit>(this.baseUrl + '/organisationseinheit/' + id);
  }

  updateOrganisationseinheit(id: number, data: Organisationseinheit): Observable<Organisationseinheit>{
    return this.http.put<Organisationseinheit>(this.baseUrl + '/organisationseinheit/' + id, data);
  }

  deleteOrganisationseinheit(id: number): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/organisationseinheit/' + id, {observe: 'response'});
  }

//////////////////////////////////////////////////////////////////////////////////////////

  createMehrsprachigkeit(data: Mehrsprachigkeit): Observable<Mehrsprachigkeit>{
    return this.http.post<Mehrsprachigkeit>(this.baseUrl + '/mehrsprachigkeit', data);
  }

  getAllMehrsprachigkeit(): Observable<Mehrsprachigkeit[]>{
    return this.http.get<Mehrsprachigkeit[]>(this.baseUrl+ '/mehrsprachigkeit');
  }

  getOneMehrsprachigkeit(id: number): Observable<Mehrsprachigkeit>{
    return this.http.get<Mehrsprachigkeit>(this.baseUrl + '/mehrsprachigkeit/' + id);
  }

  updateMehrsprachigkeit(id: number, data: Mehrsprachigkeit): Observable<Mehrsprachigkeit>{
    return this.http.put<Mehrsprachigkeit>(this.baseUrl + '/mehrsprachigkeit/' + id, data);
  }

  deleteMehrsprachigkeit(id: number): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/mehrsprachigkeit/' + id, {observe: 'response'});
  }

  getAllMehrsprachigkeitByLanguage(lang: string): Observable<MehrsprachigkeitEntry[]>{
    return this.http.get<MehrsprachigkeitEntry[]>(this.baseUrl + '/mehrsprachigkeit/sprache/' + lang);
  }

  getOneMehrsprachigkeitByLanguage(id: string, lang: string): Observable<MehrsprachigkeitEntry>{
    return this.http.get<MehrsprachigkeitEntry>(this.baseUrl + '/mehrsprachigkeit/' + id + '/sprache/' + lang);
  }

//////////////////////////////////////////////////////////////////////////////////////////

}
