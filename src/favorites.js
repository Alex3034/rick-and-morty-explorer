const FAVORITES_KEY = "rm_favorites";

// Obtener la lista de favoritos
export function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Comprobar si un personaje está en favoritos
export function isFavorite(character) {
  const favorites = getFavorites();
  return favorites.some(fav => fav.id === character.id);
}

// Añadir personaje a favoritos
export function addFavorite(character) {
  const favorites = getFavorites();
  if (!favorites.some(fav => fav.id === character.id)) {
    favorites.push(character);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

// Quitar personaje de favoritos
export function removeFavorite(character) {
  let favorites = getFavorites();
  favorites = favorites.filter(fav => fav.id !== character.id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
