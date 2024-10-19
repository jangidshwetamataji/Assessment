// src/services/api.ts
export const fetchCharacters = async (page: number = 1) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
  return res.json();
};

export const fetchEpisodes = async () => {
  const res = await fetch('https://rickandmortyapi.com/api/episode');
  return res.json();
};

export const fetchEpisodeCharacters = async (characterUrls: string[]) => {
  const characterPromises = characterUrls.map((url) => fetch(url).then((res) => res.json()));
  return Promise.all(characterPromises);
};
