export interface PersonGremium {
    person_id: number;
    gremium_id: number;
}

export interface PersonGremiumDetail extends PersonGremium {
    vorname: string;
    nachname: string;
    gremium: string;
}