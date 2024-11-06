let currentPage = 1;
const apiUrl = "https://rickandmortyapi.com/api/character";

async function loadCharacters() {
  const name = document.getElementById("search-name").value;
  const status = document.querySelector('input[name="status"]:checked').value;
  const url = `${apiUrl}/?page=${currentPage}&name=${name}&status=${status}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    displayCharacters(data.results);
    updatePagination(data.info);
  } catch (error) {
    console.error(error);
    document.getElementById("character-container").innerHTML =
      "Nie znaleziono postaci spełniających kryteria wyszukiwania.";
  }
}

function searchCharacters() {
  currentPage = 1;
  loadCharacters();
}

function displayCharacters(characters) {
  const container = document.getElementById("character-container");
  container.innerHTML = "";

  characters.forEach((character) => {
    const characterCard = document.createElement("div");
    characterCard.classList.add("character-card");
    characterCard.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <p>Status: ${character.status}</p>
        <p>Gatunek: ${character.species}</p>
      `;
    container.appendChild(characterCard);
  });
}

function updatePagination(info) {
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  prevButton.disabled = !info.prev;
  nextButton.disabled = !info.next;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    loadCharacters();
  }
}

function nextPage() {
  currentPage++;
  loadCharacters();
}

document.addEventListener("DOMContentLoaded", loadCharacters);
