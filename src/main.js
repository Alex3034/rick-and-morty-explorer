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

// lógica de inicialización
async function init() {
    const data = await fetchCharacters(1);
    renderCharacters(data.results);
}

init();