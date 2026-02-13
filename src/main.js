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
const prevPageBtn = document.getElementById("prevPageBtn");
const nextpagBtn = document.getElementById("nextPageBtn");
const pageNumber = document.getElementById("pageNumber");

prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        loadPage(currentPage);
        pageNumber.textContent = currentPage;
    }
});

nextpagBtn.addEventListener("click", () => {
    currentPage++;
    loadPage(currentPage);
    pageNumber.textContent = currentPage;
});

// Lógica de carga de personajes por página
let currentPage = 1;

async function loadPage(page) {
    const data = await fetchCharacters(page);
    renderCharacters(data.results);
}

// lógica de inicialización
async function init() {
    loadPage(currentPage);
}

init();