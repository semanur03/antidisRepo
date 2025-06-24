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
    mitgliedergruppe: string;
    gremium: string;
    organisationseinheit: string;
}