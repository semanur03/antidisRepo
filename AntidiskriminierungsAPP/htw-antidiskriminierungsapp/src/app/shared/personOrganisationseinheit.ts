export interface PersonOrganisationseinheit {
    person_id: number;
    organisationseinheit_id: number;
}

export interface PersonOrganisationseinheitDetail extends PersonOrganisationseinheit {
    vorname: string;
    nachname: string;
    organisationseinheit: string;
}