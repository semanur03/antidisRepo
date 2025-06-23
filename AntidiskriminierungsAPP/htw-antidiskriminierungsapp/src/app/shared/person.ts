export interface Person {
    id: number;
    titel: string;
    vorname: string;
    nachname: string;
    telefon: string;
    email: string;
}

export interface PersonView extends Person {
    sprache: string;
    mitgliedsgruppe: string;
    gremium: string;
    organisationseinheit: string;
}