import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private mitgliedergruppe: string | undefined;
  private gremium: string | undefined;
  private gremium1: string | undefined;
  private gremium2: string | undefined;
  private organisationseinheit: string | undefined;
  private sprache: string | undefined;

  constructor() { }

  getMitgliedergruppe(): string | undefined {
    return this.mitgliedergruppe;
  }

  setMitgliedergruppe(newMitgliedergruppe: string | undefined) {
    this.mitgliedergruppe = newMitgliedergruppe;
  }

  getGremium(): string | undefined {
    return this.gremium;
  }

  setGremium(newGremium: string | undefined) {
    this.gremium = newGremium;
  }

  getGremium1(): string | undefined {
    return this.gremium1;
  }

  setGremium1(newGremium: string | undefined) {
    this.gremium1 = newGremium;
  }

  getGremium2(): string | undefined {
    return this.gremium2;
  }

  setGremium2(newGremium: string | undefined) {
    this.gremium2 = newGremium;
  }

  getOrganisationseinheit(): string | undefined {
    return this.organisationseinheit;
  }

  setOrganisationseinheit(newOrganisationseinheit: string | undefined) {
    this.organisationseinheit = newOrganisationseinheit;
  }

  getSprache(): string | undefined {
    return this.sprache;
  }

  setSprache(newSprache: string | undefined) {
    this.sprache = newSprache;
  }
}
