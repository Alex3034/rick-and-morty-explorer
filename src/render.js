export function renderCharacters(characters) {
    const container = document.getElementById("charactersContainer");
    const fragment = document.createDocumentFragment();

    container.textContent = "";

    characters.forEach(character => {
        // ----- Card -----
        const card = document.createElement("div");
        card.className = `
            bg-gray-800 
            rounded-lg 
            p-4 
            shadow-lg 
            hover:scale-105 
            transition-transform 
            duration-300
        `;

        // ----- Imagen -----
        const img = document.createElement("img");
        img.src = character.image;
        img.alt = character.name;
        img.className = "rounded-lg mb-4 w-full";

        // ----- Nombre -----
        const title = document.createElement("h2");
        title.className = "text-lg font-bold text-green-400 mb-2";
        title.textContent = character.name;

        // ----- Contenedor info -----
        const infoContainer = document.createElement("div");
        infoContainer.className = "text-sm space-y-1";

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

        infoContainer.appendChild(status);
        infoContainer.appendChild(species);
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(infoContainer);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}
