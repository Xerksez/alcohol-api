import { Kontrola, kontrola1, kontrola2 } from "./task1.js";
/**
 * Zadanie 2.
 *
 * Rozszerz typ `Kontrola` o pole `notatkaOdSzefa` typu `string`.
 * Stwórz typ `WszystkieKontrole` będący tablicą obiektów typu `Kontrola` lub typu `KontrolaZNotatkąOdSzefa`.
 */

export type KontrolaZNotatkąOdSzefa = {
id: number;
data: string;
godzina: string;
miejsce: string;
typ: string;
opis: string;
status: "ok" | "nok";
notatkaOdSzefa: string;
};

export type WszystkieKontrole = Array<Kontrola>;

export const kontrolaZNotatką: KontrolaZNotatkąOdSzefa = {
    ...kontrola2,
    notatkaOdSzefa: "Kogoś chyba pogździło"
}

export const wszystkieKontrole: WszystkieKontrole = [
    kontrola1,
    kontrolaZNotatką,
    kontrola2
]