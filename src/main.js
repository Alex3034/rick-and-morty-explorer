import { texts, updateTexts } from './i18n.js';

let currentLang = 'en';
updateTexts(currentLang);

document.getElementById("toggleLang").addEventListener("click", () => {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    updateTexts(currentLang);
});