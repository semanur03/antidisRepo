export interface PersonMitgliedergruppe {
    person_id: number;
    mitgliedergruppe_id: number;
}

export interface PersonMitgliedergruppeDetail extends PersonMitgliedergruppe {
    vorname: string;
    nachname: string;
    mitgliedergruppe: string;
}