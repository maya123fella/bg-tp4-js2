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

// Lit les champs, contrôle la saisie, ajoute au tableau persons et vide le formulaire.
function doNewData() {
  const nom = document.getElementById("nom_input").value.trim();
  const prenom = document.getElementById("prenom_input").value.trim();
  const pointsText = document.getElementById("points_input").value.trim();
  const notice = document.getElementById("notice");
  if (nom === "" || prenom === "" || pointsText === "") {
    notice.textContent = "Veuillez remplir les trois champs.";
    return; // Contrôle avant insertion
  }
  const points = Number(pointsText);
  if (!Number.isFinite(points) || points < 0) {
    notice.textContent = "Les points doivent être un nombre positif ou nul.";
    return;
  }
  const person = { nom: nom, prenom: prenom, points: points };
  persons.push(person);
  doInsert(person.nom, person.prenom, person.points);
  document.getElementById("nom_input").value = "";
  document.getElementById("prenom_input").value = "";
  document.getElementById("points_input").value = "";
  notice.textContent = "Personne ajoutée.";
}
