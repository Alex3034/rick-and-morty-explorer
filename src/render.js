export function renderCharacters(characters) {
    const container = document.getElementById("charactersContainer");

    container.innerHTML = "";

    characters.forEach(character => {
        const card = document.createElement("div");
        card.className = "bg-gray-800 rounded-lg p-4 shadow-lg";

        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}" class="rounded-md mb-4">
            <h2 class="text-xl font-semibold text-green-400">${character.name}</h2>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
        `;

        container.appendChild(card);
    });
}
