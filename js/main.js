"use strict";

//Quando l’utente fa click sul bottone submit del form
//il sito deve calcolare l’ammontare del preventivo per le ore di lavoro richieste.

// individuo il form nel documento html
const form = document.querySelector("#preventive-form");
// Supponiamo per semplicità che ogni progetto richieda lo stesso numero di ore di lavoro(es: 10 ore).
const workTime = 10;
//Il prezzo orario per una commissione varia in questo modo:
// se la commissione riguarda lo sviluppo backend il prezzo orario è di 20.50€/l’ora
// se la commissione riguarda lo sviluppo frontend il prezzo orario è di 15.30€/l’ora
// se la commissione riguarda l’analisi progettuale il prezzo orario è di 33.60€/l’ora
// const rate = [20.5, 15.3, 33.6];
//L’utente potrebbe decidere di utilizzare un codice promozionale tra i seguenti: YHDNU32, JANJC63, PWKCN25, SJDPO96, POCIE24.
const validCodes = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];
const userCode = document.querySelector("#promo-code");
// individuo la selection nel documento html
const selection = document.querySelector("#selection-input");
// individuo il div del prezzo da visualizzare nel documento html
const priceBanner = document.querySelector("#price-banner");
// individuo gli elementi del prezzo da popolare nel documento html
const priceIntUI = document.querySelector("#price-int");
const priceFloatsUI = document.querySelector("#price-floats");
// individuo l'elemento del messaggio "codice sbagliato" da popolare nel documento html
const wrongCode = document.querySelector("#wrong-code");

// creo un listner che esegue una funzione qundo viene premuto il bottone
form.addEventListener("submit", (event) => {
  //prevengo il comportamento di default del browser
  event.preventDefault();
  //resetto il messaggio "codice non valido"
  wrongCode.innerHTML = "";
  //Il prezzo finale è dato dal numero di ore per prezzo orario.
  let finalPrice = workTime * selectionObject[selection.value - 1].rate;
  //Se l’utente ha inserito un codice promozionale
  if (userCode.value !== "") {
    //Se l’utente inserisce un codice promozionale valido
    if (validCodes.includes(userCode.value)) {
      // ha diritto ad uno sconto del 25% sul prezzo finale.
      finalPrice -= (25 * finalPrice) / 100;
      //Se il codice inserito non è valido,
    } else {
      //il sito deve informare l’utente che il codice non è valido.
      wrongCode.innerHTML = `il codice "${userCode.value}" non è valido`;
      // visualizzo il messaggo in rosso per attirare l'attenzione dell'utente
    }
  }
  //visualizzo il div del prezzo nel documento html
  priceBanner.classList.remove("d-none");
  //trasformo il prezzo in una stringa con due decimali
  finalPrice = finalPrice.toFixed(2);
  //stampo il prezzo e il simbolo dell’euro
  //numeri interi
  priceIntUI.innerHTML = `€ ` + finalPrice.slice(0, finalPrice.length - 3);
  //numeri decimali
  priceFloatsUI.innerHTML = `,` + finalPrice.slice(finalPrice.length - 2);
});

// ## bonus ##
// Prova a generare dinamicamente le opzioni della select a partire da un oggetto js.
// creo un array di oggetti contenenti i tipi di lavoro e la tariffa associata
const selectionObject = [
  {
    name: "Backed Development",
    rate: 20.5,
  },
  {
    name: "Frontend Development",
    rate: 15.3,
  },
  {
    name: "Project Analysis",
    rate: 33.6,
  },
];
//creo una funzione che generi un tag <option> nella <select> con testo e valore dati in input
function addOption(text, value) {
  let option = document.createElement("option");
  option.text = text;
  option.value = value;
  selection.add(option, selection[option.value]);
}
//creo una <option> per ogni oggetto nell'array
selectionObject.forEach((element, index) => addOption(element.name, index + 1));
