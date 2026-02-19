import { openModal } from "./modal.js";
import { isFavorite, addFavorite, removeFavorite } from "./favorites.js";

export function renderCharacters(characters) {
    const container = document.getElementById("charactersContainer");
    const fragment = document.createDocumentFragment();

    container.textContent = "";

    characters.forEach(character => {
        // ----- Card -----
        const card = document.createElement("div");
        card.className = `
            bg-gray-800
            rounded-xl
            overflow-hidden
            shadow-md
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
            flex
            flex-col
        `;


        // ----- Imagen -----
        const img = document.createElement("img");
        img.src = character.image;
        img.alt = character.name;
        img.className = "w-full h-56 object-cover";

        // ----- Nombre -----
        const title = document.createElement("h2");
        title.className = "text-xl font-semibold text-white tracking-wide px-6 pt-4";
        title.textContent = character.name;

        // ----- Contenedor info -----
        const infoContainer = document.createElement("div");
        infoContainer.className = "text-sm space-y-2 px-6 pb-6 pt-2 flex-1 flex flex-col justify-between";

        // ----- Status -----
        const status = document.createElement("p");

        let statusColor = "text-gray-400";
        if (character.status === "Alive") {
            statusColor = "text-green-400";
        } else if (character.status === "Dead") {
            statusColor = "text-red-400";
        } else {
            statusColor = "text-yellow-400";
        }

        status.className = statusColor;
        status.textContent = `Status: ${character.status}`;

        // ----- Species -----
        const species = document.createElement("p");
        species.className = "text-gray-300";
        species.textContent = `Species: ${character.species}`;

        // ----- Buttons -----
        const buttonsContainer = document.createElement("div");
        const infoBtn = document.createElement("button");
        const favoriteBtn = document.createElement("button");
        
        buttonsContainer.className = "flex justify-between items-center mt-4";
        favoriteBtn.textContent = isFavorite(character) ? "❤️" : "🤍";
        favoriteBtn.className = "text-xl hover:scale-110 transition-transform duration-200";

        favoriteBtn.onclick = () => {
            if (isFavorite(character)) {
                removeFavorite(character);
            } else {
                addFavorite(character);
            }
            favoriteBtn.textContent = isFavorite(character) ? "❤️" : "🤍";
        };

        infoBtn.textContent = "More Info";
        infoBtn.className = "mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm";
        infoBtn.onclick = () => openModal(character);

        infoContainer.appendChild(status);
        infoContainer.appendChild(species);
        buttonsContainer.appendChild(infoBtn);
        buttonsContainer.appendChild(favoriteBtn);
        infoContainer.appendChild(buttonsContainer);
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(infoContainer);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}
