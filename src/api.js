const BASE_URL = "https://rickandmortyapi.com/api/character";

export async function fetchCharacters(page = 1) {
    try {
        const response = await fetch(`${BASE_URL}?page=${page}`);

        if (!response.ok) {
            throw new Error("Error fetching characters");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("API Error:", error);
    }
}
