import { Component, OnInit } from '@angular/core';
import { EmailService } from '../shared/email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meldeformular',
  templateUrl: './meldeformular.component.html',
  styleUrls: ['./meldeformular.component.css']
})

export class MeldeformularComponent implements OnInit {
  formData = {
    mitgliedergruppe: '',
    betroffenheit: 'NA',
    message: '',
    category: '',
    lastname: '',
    firstname: '',
    email: '',
    checkbox: '',
    formulartyp: 'Meldeformular'
  };
  emailContactPerson: any = '';
  titelContactPerson: any = '';
  vornameContactPerson: any = '';
  nachnameContactPerson: any = '';
  sprache: any = localStorage.getItem('locale');

  constructor(private emailService: EmailService, private router: Router) { }

  ngOnInit(): void {
    this.openModel();
  }

  isLoggedIn = true;

  isLogged() {
    this.isLoggedIn = false;
  }

  submitForm() {
	  console.log(this.formData);
    this.emailService.sendEmail(this.formData.mitgliedergruppe, this.formData.betroffenheit, this.formData.message, this.formData.category, this.formData.lastname, this.formData.firstname, this.formData.email, this.formData.checkbox, this.formData.formulartyp, this.emailContactPerson, this.titelContactPerson, this.vornameContactPerson, this.nachnameContactPerson, this.sprache).subscribe(
      {
        next: (response) => {
          this.router.navigate(['/meldesuccess']);
        },
        error: (err) => {
          this.router.navigate(['/error']);
        },
        complete: () => {},
      }
    );
  }

  openModel() {
    const modelDiv = document.getElementById('MyModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModel() {
    const modelDiv = document.getElementById('MyModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  weiter = false;

  onWeiter() { this.weiter = true; }

  goBack() { this.weiter = false; }
}
