export interface PersonSprache {
    person_id: number;
    sprache_id: number;
}

export interface PersonSpracheDetail extends PersonSprache {
    vorname: string;
    nachname: string;
    sprache: string;
}