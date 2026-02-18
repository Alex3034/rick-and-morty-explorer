import { isFavorite, addFavorite, removeFavorite } from "./favorites.js";

const modal = document.getElementById("modal");
const modalName = document.getElementById("modalName");
const modalImage = document.getElementById("modalImage");
const modalInfo = document.getElementById("modalInfo");
const closeModalBtn = document.getElementById("closeModal");
const favModalBtn = document.getElementById("modalFavoriteBtn");

function renderModalContent(character) {
    modalName.textContent = character.name;
    modalImage.src = character.image;
    modalImage.alt = character.name;
    favModalBtn.textContent = isFavorite(character) ? "❤️ Remove Favorite" : "🤍 Add Favorite";
    
    modalInfo.innerHTML = `
    <p><strong>Status:</strong> ${character.status}</p>
    <p><strong>Species:</strong> ${character.species}</p>
    <p><strong>Origin:</strong> ${character.origin.name}</p>
    <p><strong>Location:</strong> ${character.location.name}</p>
    `;
    
    favModalBtn.onclick = () => {
      if (isFavorite(character)) {
        removeFavorite(character);
        favModalBtn.textContent = "🤍 Add Favorite";
      } else {
        addFavorite(character);
        favModalBtn.textContent = "❤️ Remove Favorite";
      }
    };
}


export function openModal(character) {
    renderModalContent(character);
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

closeModalBtn.addEventListener("click", closeModal);