"use strict";

//Quando l’utente fa click sul bottone submit del form, il sito deve calcolare l’ammontare del preventivo per le ore di lavoro richieste.

// individuo il form nell documento html
const form = document.querySelector("#preventive-form");
// Supponiamo per semplicità che ogni progetto richieda lo stesso numero di ore di lavoro(es: 10 ore).
const workTime = 10;
//Il prezzo orario per una commissione varia in questo modo:
// se la commissione riguarda lo sviluppo backend il prezzo orario è di 20.50€/l’ora
// se la commissione riguarda lo sviluppo frontend il prezzo orario è di 15.30€/l’ora
// se la commissione riguarda l’analisi progettuale il prezzo orario è di 33.60€/l’ora
const rate = [20.5, 15.3, 33.6];
//L’utente potrebbe decidere di utilizzare un codice promozionale tra i seguenti: YHDNU32, JANJC63, PWKCN25, SJDPO96, POCIE24.
const validCodes = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];
const userCode = document.querySelector("#promo-code");
// individuo la selection nell documento html
const selection = document.querySelector("#selection-input");

// creo un listner che esegue una funzione qundo viene premuto il bottone
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //Il prezzo finale è dato dal numero di ore per prezzo orario.
  let finalPrice = workTime * rate[selection.value];
  console.log(finalPrice);
  //Se l’utente inserisce un codice promozionale valido, ha diritto ad uno sconto del 25% sul prezzo finale.
  if (validCodes.includes(userCode.value)) {
    console.log("il codice è corretto");
    finalPrice -= (25 * finalPrice) / 100;
    //Se il codice inserito non è valido,
  } else {
    //il sito deve informare l’utente che il codice non è valido. // il prezzo finale viene calcolato senza applicare sconti
    console.log("il codice non è corretto");
  }
  //Il risultato del calcolo del prezzo finale deve essere visualizzato in “forma umana” (con 2 decimali e il simbolo dell’euro).
  console.log(finalPrice.toFixed(2));
});
