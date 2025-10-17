import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Admin } from './admin';
import { environment } from 'src/environments/environment';

interface AdminSafe {
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUrl = environment.apiUrl;

  // aktueller Admin
  admin: Admin = { id: 0, username: '', password: '', email: '' };
  adminChange: Subject<Admin> = new Subject<Admin>();

  // Login-Status
  loggedIn = false;
  loggedInChange: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
    // Subscribe, damit loggedIn und admin synchron bleiben
    this.loggedInChange.subscribe((value) => this.loggedIn = value);
    this.adminChange.subscribe((value) => this.admin = value);

    // Prüfen, ob Admin im sessionStorage gespeichert ist
    const storedAdmin = sessionStorage.getItem('admin');
    if (storedAdmin) {
      const adminData: AdminSafe = JSON.parse(storedAdmin);
      this.admin = adminData as Admin;
      this.loggedIn = true;
      this.loggedInChange.next(true);
      this.adminChange.next(this.admin);
      console.log('Admin aus sessionStorage geladen:', this.admin);
    }
  }

  // Admin-Methoden
  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.baseUrl + '/adm');
  }

  getOneAdminById(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/adm/${id}`);
  }

  getOneAdminByUsername(username: string): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/adm/username/${username}`);
  }

  getOneAdminByEmail(email: string): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/adm/email/${email}`);
  }

  registerAdmin(user: Admin): Observable<any> {
    return this.http.post(`${this.baseUrl}/adm/register`, user);
  }

  loginAdmin(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/adm/login/`, { username, password }, { observe: 'response' });
  }

  updateAdmin(id: number, updates: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/adm/${id}`, updates);
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/adm/${id}`, { observe: 'response' });
  }

  // Login-Status
  isLoggedin(): boolean {
    return this.loggedIn;
  }

  // Login setzen
  login(admin: Admin): void {
    this.loggedIn = true;
    this.loggedInChange.next(this.loggedIn);

    // nur sichere Daten speichern
    const safeAdmin: AdminSafe = {
      id: admin.id,
      username: admin.username,
      email: admin.email
    };

    this.admin = safeAdmin as Admin;
    this.adminChange.next(this.admin);

    // persistent in der Session speichern
    sessionStorage.setItem('admin', JSON.stringify(safeAdmin));

    console.log('login() : ', this.admin);
  }

  // Logout
  logout(): void {
    this.loggedIn = false;
    this.loggedInChange.next(false);

    this.admin = { id: 0, username: '', password: '', email: '' };
    this.adminChange.next(this.admin);

    // sessionStorage löschen
    sessionStorage.removeItem('admin');

    console.log('Admin ausgeloggt');
  }
}
