import { Component } from '@angular/core';
import { FilterService } from '../shared/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  formData = {
    mitgliedergruppe: undefined,
    gremium: undefined,
    organisationseinheit: undefined,
    sprache: undefined
  };

  constructor(private filterService: FilterService, private router: Router) { }

  submitForm() {
    this.filterService.setMitgliedergruppe(this.formData.mitgliedergruppe);
    this.filterService.setGremium(this.formData.gremium);
    this.filterService.setOrganisationseinheit(this.formData.organisationseinheit);
    this.filterService.setSprache(this.formData.sprache);
    this.router.navigate(['/getincontact']);
  }
}