"use strict";

// Tableau d'objets : données de départ (cours JavaScript, tableaux/objets).
let persons = [
  { nom: "nom-1", prenom: "prenom-1", points: 5 },
  { nom: "nom-2", prenom: "prenom-2", points: 10 },
  { nom: "nom-3", prenom: "prenom-3", points: 15 }
];
let lignes = 0;
let total_points = 0;

// Construit une ligne et lui ajoute une checkbox. DOM : createElement/appendChild (slide 105).
function doInsertRowTable(num, nom, prenom, points) {
  const tbody = document.getElementById("persons_body"); // Recherche par id (slide 62)
  const row = document.createElement("tr");
  row.innerHTML = `<td class="col_number">${num}</td><td class="col_text">${nom}</td><td class="col_text">${prenom}</td><td>${points}</td><td class="col_chkbox"><input type="checkbox"></td>`;
  tbody.appendChild(row);
}

// Ajoute une personne au tableau HTML et met à jour le compteur.
function doInsert(nom, prenom, points) {
  lignes++;
  total_points += Number(points);
  doInsertRowTable(lignes, nom, prenom, points);
  if (typeof update_summary === "function") update_summary();
}

// Parcourt le tableau persons et insère chaque personne (boucle, cours slide 45).
function init() {
  persons.forEach(function(person) {
    doInsert(person.nom, person.prenom, person.points);
  });
}

// Affiche le tableau de données dans la console (slide 30 du TP).
function consoleTableau() {
  console.table(persons);
}

// Ajouter l'entrée statique demandée dans les étapes 3 et 4.
function addStaticPerson() {
  const p = { nom: "nom", prenom: "prenom", points: 10 };
  persons.push(p); // Ajoute dans le tableau JS
  doInsert(p.nom, p.prenom, p.points);
}

window.addEventListener("DOMContentLoaded", init); // Événement de chargement du DOM

// Met à jour le résumé affiché sous le tableau (slide 63 : innerHTML).
function update_summary() {
  document.getElementById("summary_lines").textContent = lignes + " ligne(s)";
  document.getElementById("summary_points").textContent = "Total point(s) = " + total_points;
}
