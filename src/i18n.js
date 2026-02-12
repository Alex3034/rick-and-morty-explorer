export const texts = {
    en: {
        title: "Rick and Morty Explorer",
        searchPlaceholder: "Search character...",
        all: "All",
        alive: "Alive",
        dead: "Dead",
        unknown: "Unknown",
        prev: "Previous",
        next: "Next",
        page: "Page"
    },
    es: {
        title: "Explorador de Rick y Morty",
        searchPlaceholder: "Buscar personaje...",
        all: "Todos",
        alive: "Vivo",
        dead: "Muerto",
        unknown: "Desconocido",
        prev: "Anterior",
        next: "Siguiente",
        page: "Página"
    }
};

export function updateTexts(lang) {
    const t = texts[lang];
    document.getElementById("title").textContent = t.title;
    document.getElementById("searchInput").placeholder = t.searchPlaceholder;
    document.getElementById("statusFilter").options[0].textContent = t.all;
    document.getElementById("statusFilter").options[1].textContent = t.alive;
    document.getElementById("statusFilter").options[2].textContent = t.dead;
    document.getElementById("statusFilter").options[3].textContent = t.unknown;
    document.getElementById("prevPage").textContent = t.prev;
    document.getElementById("nextPage").textContent = t.next;
}
