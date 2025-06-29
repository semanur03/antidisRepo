// Datei bindet wir das Backend an
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'; // nutzen Subject für das Einlogg Icon
import { Admin } from './admin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUrl = environment.apiUrl;
  admin: Admin = {username: '', password: '', email: ''};
  adminChange: Subject<Admin> = new Subject<Admin>();
  loggedIn = false;
  loggedInChange: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.loggedInChange.subscribe((value) => {
      this.loggedIn = value
    });
    this.adminChange.subscribe((value) => {
      this.admin = value
    });
    // gehört zum subject, um zu erkennen, ob userin eingelogged ist oder nicht
  }

  getAllAdmins(): Observable<Admin[]>{
    return this.http.get<Admin[]>(this.baseUrl + '/adm');
  }

  getOneAdminById(id: number): Observable<Admin>{
    return this.http.get<Admin>(this.baseUrl + '/adm/' + id);
  }

  getOneAdminByUsername(username: string): Observable<Admin>{
    return this.http.get<Admin>(this.baseUrl + '/adm/username/' + username);
  }

  getOneAdminByEmail(email: string): Observable<Admin>{
    return this.http.get<Admin>(this.baseUrl + '/adm/email/' + email);
  }

  // Registrierung
  registerAdmin(user:Admin): Observable<any> {
    return this.http.post(this.baseUrl + '/adm/register', user);
  }

  loginAdmin(username: string, password: string ): Observable<any>{
    return this.http.post(this.baseUrl + '/adm/login/', { username: username, password: password }, {observe: 'response'});
  }
  // noch die Option observe: 'response' hinzugefügt wurde, um die gesamte Response zu erhalten und nicht nur den body als json
  // können dadurch den Status der Response auswerten

  isLoggedin(): boolean {
    return this.loggedIn;
  }

  login(admin: Admin): void {
    this.loggedIn = true
    this.loggedInChange.next(this.loggedIn);
    this.admin = admin;
    this.adminChange.next(this.admin);
    console.log('login() : ', this.admin);
  }

  logout(): void {
    this.loggedIn = false;
    this.loggedInChange.next(this.loggedIn);
    this.admin = {username: '', password: '', email: ''};
    this.adminChange.next(this.admin);
  }
}