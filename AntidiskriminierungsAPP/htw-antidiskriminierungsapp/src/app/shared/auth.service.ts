import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Admin } from './admin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUrl = environment.apiUrl;
  admin: Admin = {id: 0, username: '', password: '', email: ''};
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

  registerAdmin(user:Admin): Observable<any> {
    return this.http.post(this.baseUrl + '/adm/register', user);
  }

  loginAdmin(username: string, password: string ): Observable<any>{
    return this.http.post(this.baseUrl + '/adm/login/', { username: username, password: password }, {observe: 'response'});
  }

  updateAdmin(id: number, updates: any): Observable<any> {
    return this.http.put(this.baseUrl + '/adm/' + id, updates);
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/adm/' + id, { observe: 'response' });
  }

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
    this.admin = {id: 0, username: '', password: '', email: ''};
    this.adminChange.next(this.admin);
  }
}