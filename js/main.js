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
//const rate = [20.5, 15.3, 33.6];
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
  event.preventDefault();
  //Il prezzo finale è dato dal numero di ore per prezzo orario.
  let finalPrice = (workTime * selectionObject[selection.value].rate).toFixed(
    2
  );
  //Se l’utente ha inserito un codice promozionale
  if (userCode.value !== "") {
    //Se l’utente inserisce un codice promozionale valido
    if (validCodes.includes(userCode.value)) {
      // ha diritto ad uno sconto del 25% sul prezzo finale.
      finalPrice -= ((25 * finalPrice) / 100).toFixed(2); //con 2 decimali
      console.log(finalPrice);
      //Se il codice inserito non è valido,
    } else {
      //il sito deve informare l’utente che il codice non è valido.
      wrongCode.innerHTML = `il codice "${userCode.value}" non è valido`;
      //il prezzo finale viene visualizzato senza applicare sconti
    }
  }
  //visualizzo il div del prezzo nel documento html
  priceBanner.classList.remove("d-none");

  //stampo il prezzo e il simbolo dell’euro
  //numeri interi
  priceIntUI.innerHTML =
    `€ ` +
    finalPrice.toString().slice(0, finalPrice.toString().length - 3) +
    `,`;
  //numeri decimali
  priceFloatsUI.innerHTML = finalPrice
    .toString()
    .slice(finalPrice.toString().length - 2);
  //i numeri decimali sono grigi
  priceFloatsUI.style.color = "grey";
});

// ## bonus ##
// Prova a generare dinamicamente le opzioni della select a partire da un oggetto js.
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

selection.item(1).innerHTML = selectionObject[0].name;
selection.item(2).innerHTML = selectionObject[1].name;
selection.item(3).innerHTML = selectionObject[2].name;
