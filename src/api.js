const BASE_URL = "https://rickandmortyapi.com/api/character";

export async function fetchCharacters(page = 1, name = "", status = "") {
    try {
        const params = new URLSearchParams({
            page,
            ...(name && { name }),
            ...(status && { status })
        });

        const response = await fetch(`${BASE_URL}?${params}`);

        if (!response.ok) {
            throw new Error("Error fetching characters");
        }

        const data = await response.json();

        if (!data?.results) {
            throw new Error("Datos inválidos");
        }

        return data;

    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}
