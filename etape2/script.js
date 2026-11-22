"use strict";

// Création d'une ligne HTML (cours DOM : créer/ajouter un élément, slide 105).
function doInsertRowTable(num, nom, prenom, points) {
  const tbody = document.getElementById("persons_body"); // Recherche par id (slide 62)
  const row = document.createElement("tr");
  row.innerHTML = `<td class="col_number">${num}</td><td class="col_text">${nom}</td><td class="col_text">${prenom}</td><td>${points}</td><td class="col_chkbox"><input type="checkbox"></td>`;
  tbody.appendChild(row); // Insère la ligne dans le DOM (slide 105)
}
