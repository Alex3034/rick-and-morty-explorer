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
const nextpagBtn = document.getElementById("nextPageBtn");
const pageNumber = document.getElementById("pageNumber");

prevPageBtn.addEventListener("click", async () => {
    if (!hasPrevPage) return;

    prevPageBtn.disabled = true;
    nextpagBtn.disabled = true;

    currentPage--;
    await loadPage(currentPage);
});

nextpagBtn.addEventListener("click", async () => {
    if (!hasNextPage) return;

    prevPageBtn.disabled = true;
    nextpagBtn.disabled = true;

    currentPage++;
    await loadPage(currentPage);
});

// Lógica de carga de personajes por página
async function loadPage(page) {
    try {
        const data = await fetchCharacters(page);

        if (!data?.results) {
            throw new Error("Datos inválidos");
        }

        renderCharacters(data.results);

        hasPrevPage = !!data.info.prev;
        hasNextPage = !!data.info.next;

        pageNumber.textContent = page;

    } catch (error) {
        console.error("Error:", error);
    } finally {
        prevPageBtn.disabled = !hasPrevPage;
        nextpagBtn.disabled = !hasNextPage;
    }
}



// lógica de inicialización
async function init() {
    loadPage(currentPage);
}

init();