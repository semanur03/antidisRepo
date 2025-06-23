export interface PersonMitgliedsgruppe {
    person_id: number;
    mitgliedsgruppe_id: number;
}

export interface PersonMitgliedsgruppeDetail extends PersonMitgliedsgruppe {
    vorname: string;
    nachname: string;
    mitgliedsgruppe: string;
}