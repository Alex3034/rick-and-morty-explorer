import './style.css';
import { updateTexts } from './i18n.js';
import { fetchCharacters } from "./api.js";
import { renderCharacters } from "./render.js";

// Lógica de cambio de idioma
let currentLang = 'en';
const toggleBtn = document.getElementById('toggleLang');

toggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    updateTexts(currentLang);
    toggleBtn.textContent = currentLang === 'en' ? 'ES' : 'EN';
});

updateTexts(currentLang);
toggleBtn.textContent = 'ES';

// Estado global para paginación y filtros
let state = {
    currentPage: 1,
    currentName: "",
    currentStatus: ""
};

// Función para actualizar la lista de personajes según el estado actual
async function updateCharacters() {
    const charactersContainer = document.getElementById("charactersContainer");
    const loading = document.getElementById("loadingIndicator");
    loading.classList.remove("hidden");

    try {
        const data = await fetchCharacters(state.currentPage, state.currentName, state.currentStatus);

        if (!data?.results || data.results.length === 0) {
            charactersContainer.innerHTML = "<p>No characters found</p>";
            prevPageBtn.disabled = true;
            nextPageBtn.disabled = true;
            return;
        }

        renderCharacters(data.results);

        prevPageBtn.disabled = !data.info.prev;
        nextPageBtn.disabled = !data.info.next;

        pageNumber.textContent = state.currentPage;

    } catch (error) {
        console.error("Error updating characters:", error);
        document.getElementById("charactersContainer").innerHTML = "<p>Error loading characters</p>";
    } finally {
        loading.classList.add("hidden");
    }
}


// Lógica de paginación
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const pageNumber = document.getElementById("pageNumber");

prevPageBtn.addEventListener("click", () => {
    if (state.currentPage > 1) {
        state.currentPage--;
        updateCharacters();
    }
});

nextPageBtn.addEventListener("click", () => {
    state.currentPage++;
    updateCharacters();
});


// Lógica de búsqueda por nombre y estado
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        state.currentName = searchInput.value.trim();
        state.currentPage = 1;
        updateCharacters();
    }
});

statusFilter.addEventListener("change", () => {
    state.currentStatus = statusFilter.value;
    state.currentPage = 1;
    updateCharacters();
});

// lógica de inicialización
async function init() {
    updateCharacters();
}

init();