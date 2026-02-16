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

// Lógica de paginación
let currentPage = 1;
let hasNextPage = true;
let hasPrevPage = false;

const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const pageNumber = document.getElementById("pageNumber");

prevPageBtn.addEventListener("click", async () => {
    if (!hasPrevPage) return;

    prevPageBtn.disabled = true;
    nextPageBtn.disabled = true;

    currentPage--;
    await loadPage(currentPage);
});

nextPageBtn.addEventListener("click", async () => {
    if (!hasNextPage) return;

    prevPageBtn.disabled = true;
    nextPageBtn.disabled = true;

    currentPage++;
    await loadPage(currentPage);
});

// Lógica de carga de personajes por página
async function loadPage(page) {
    const data = await fetchCharacters(page, currentSearch, currentStatus);

    if (!data) return;

    renderCharacters(data.results);

    hasNextPage = !!data.info.next;
    hasPrevPage = !!data.info.prev;

    prevPageBtn.disabled = !hasPrevPage;
    nextPageBtn.disabled = !hasNextPage;

    pageNumber.textContent = `Page ${page}`;
}


// Lógica de búsqueda por nombre y estado
let currentSearch = "";
let currentStatus = "";

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        currentSearch = e.target.value.trim();
        currentPage = 1;
        loadPage(currentPage);
    }
});

statusFilter.addEventListener("change", (e) => {
    currentStatus = e.target.value;
    currentPage = 1;
    loadPage(currentPage);
});

// lógica de inicialización
async function init() {
    loadPage(currentPage);
}

init();