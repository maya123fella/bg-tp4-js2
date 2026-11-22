"use strict";

// EXTRA 3 : sauvegarde locale (localStorage) pour conserver les données après actualisation.
const STORAGE_KEY = "tp4_persons_data";
const initialPersons = [
  { nom: "nom-1", prenom: "prenom-1", points: 5 },
  { nom: "nom-2", prenom: "prenom-2", points: 10 },
  { nom: "nom-3", prenom: "prenom-3", points: 15 }
];
let persons = JSON.parse(localStorage.getItem(STORAGE_KEY)) || initialPersons;
let lignes = 0;
let total_points = 0;
let sortAscending = true;

function savePersons() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persons));
}

// Reconstruit le tableau visible depuis persons, pour garder données et DOM cohérents.
function renderPersons() {
  const tbody = document.getElementById("persons_body");
  tbody.innerHTML = "";
  lignes = 0;
  total_points = 0;
  persons.forEach(function(person) {
    lignes++;
    total_points += Number(person.points);
    const row = document.createElement("tr");
    row.innerHTML = `<td class="col_number">${lignes}</td><td class="col_text"></td><td class="col_text"></td><td>${person.points}</td><td class="col_chkbox"><input type="checkbox"></td>`;
    // textContent évite d'interpréter les saisies comme du HTML.
    row.cells[1].textContent = person.nom;
    row.cells[2].textContent = person.prenom;
    row.dataset.personIndex = lignes - 1;
    tbody.appendChild(row); // DOM appendChild (cours slide 105)
  });
  update_summary();
  filterPersons();
}

function update_summary() {
  document.getElementById("summary_lines").textContent = lignes + " ligne(s)";
  document.getElementById("summary_points").textContent = "Total point(s) = " + total_points;
}

function consoleTableau() {
  console.table(persons);
}

function doNewData() {
  const nom = document.getElementById("nom_input").value.trim();
  const prenom = document.getElementById("prenom_input").value.trim();
  const pointsText = document.getElementById("points_input").value.trim();
  const notice = document.getElementById("notice");
  if (!nom || !prenom || pointsText === "") {
    notice.textContent = "Veuillez remplir les trois champs.";
    return;
  }
  const points = Number(pointsText);
  if (!Number.isFinite(points) || points < 0) {
    notice.textContent = "Les points doivent être un nombre positif ou nul.";
    return;
  }
  persons.push({ nom: nom, prenom: prenom, points: points });
  savePersons();
  renderPersons();
  document.getElementById("nom_input").value = "";
  document.getElementById("prenom_input").value = "";
  document.getElementById("points_input").value = "";
  notice.textContent = "Personne ajoutée.";
}

// Suppression des lignes cochées et des personnes correspondantes.
function deleteRow() {
  const rows = Array.from(document.querySelectorAll("#persons_body tr")); // Sélection par CSS (slide 77)
  const selectedIndices = rows.filter(row => row.querySelector("input[type=checkbox]").checked)
    .map(row => Number(row.dataset.personIndex));
  if (selectedIndices.length === 0) {
    document.getElementById("notice").textContent = "Sélectionnez au moins une ligne à supprimer.";
    return;
  }
  persons = persons.filter((person, index) => !selectedIndices.includes(index));
  savePersons();
  renderPersons();
  document.getElementById("notice").textContent = selectedIndices.length + " personne(s) supprimée(s).";
}

// EXTRA 1 : filtre instantané par nom/prénom (input event).
function filterPersons() {
  const query = document.getElementById("search_input").value.trim().toLowerCase();
  const rows = document.querySelectorAll("#persons_body tr");
  rows.forEach(row => {
    const name = row.cells[1].textContent.toLowerCase();
    const firstName = row.cells[2].textContent.toLowerCase();
    row.hidden = !(name.includes(query) || firstName.includes(query));
  });
}

// EXTRA 2 : tri croissant/décroissant selon les points.
function sortByPoints() {
  persons.sort((a, b) => sortAscending ? a.points - b.points : b.points - a.points);
  sortAscending = !sortAscending;
  savePersons();
  renderPersons();
}

window.addEventListener("DOMContentLoaded", renderPersons);
