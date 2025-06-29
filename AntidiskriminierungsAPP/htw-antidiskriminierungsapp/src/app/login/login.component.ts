import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Confirm2Component } from './confirm2/confirm2.component';

export interface DialogData {
  headline: string;
  info: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit{
  hide = true;

  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, public dialog: MatDialog) {}

  onSubmit(): void {
    const values = this.loginForm.value;
    const username = values.username;
    const password =  values.password;
    console.log('values username', username)
    console.log('values password', password)

    this.auth.loginAdmin(username!, password!).subscribe({
        next: (response) => {
          console.log('login response',response);
          if(response.status == 201)
          {
            this.auth.getOneAdminByUsername(username!).subscribe(
              (response) => {
                this.auth.login(response);
                this.router.navigate(['/mytasklist'])
              }
            )
          } else {
            console.log('kein Login - Nutzername und/oder Passwort stimmen nicht');
            this.openDialog({ headline: "Fehler", info: 'Kein Login - Passwort stimmt nicht' });
          }
        },
        error: (err) => {
          console.log('login error',err);
          if (err.status === 400) {
            this.openDialog({ headline: "Fehler", info: 'Benutzer existiert nicht' });
          } else {} // Z.51: anonyme callback Funktion für den error Fall
        },
        complete: () => console.log('login completed')
      }
    )
  }
  // Wenn das Login erfolgreich war, wird direkt die mytasklist-Komponente aufgerufen

  openDialog(data: DialogData) {
    this.dialog.open(Confirm2Component, { data });
  }

  ngOnInit(): void {
  }
}