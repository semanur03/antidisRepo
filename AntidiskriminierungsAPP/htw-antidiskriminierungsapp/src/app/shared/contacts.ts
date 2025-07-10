export interface Contacts {
    id: number;
    titel?: string;
    vorname: string;
    nachname: string;
    telefon?: string;
    email: string;
}

export interface ContactsView extends Contacts {
    sprache?: string;
    mitgliedergruppe?: string;
    gremium?: string;
    gremium1?: string;
    gremium2?: string;
    organisationseinheit?: string;
    organisationseinheit1?: string;
}
