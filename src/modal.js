import { isFavorite, addFavorite, removeFavorite } from "./favorites.js";

const modal = document.getElementById("modal");
const modalName = document.getElementById("modalName");
const modalImage = document.getElementById("modalImage");
const modalInfo = document.getElementById("modalInfo");
const closeModalBtn = document.getElementById("closeModalBtn");
const favModalBtn = document.getElementById("modalFavoriteBtn");

function renderModalContent(character) {
    modalName.textContent = character.name;
    modalImage.src = character.image;
    modalImage.alt = character.name;
    favModalBtn.textContent = isFavorite(character) ? "❤️ Remove Favorite" : "🤍 Add Favorite";

    modalInfo.innerHTML = `
        <div class="flex justify-between border-b border-gray-700 pb-2">
            <span class="text-gray-400">Status</span>
            <span>${character.status}</span>
        </div>

        <div class="flex justify-between border-b border-gray-700 pb-2">
            <span class="text-gray-400">Species</span>
            <span>${character.species}</span>
        </div>

        <div class="flex justify-between border-b border-gray-700 pb-2">
            <span class="text-gray-400">Origin</span>
            <span>${character.origin.name}</span>
        </div>

        <div class="flex justify-between">
            <span class="text-gray-400">Location</span>
            <span>${character.location.name}</span>
        </div>
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