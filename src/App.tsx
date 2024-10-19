// src/App.tsx
import React, { useState, useEffect } from 'react';
import EpisodeList from './components/EpisodeList';
import CharacterList from './components/CharacterList';
import { fetchCharacters, fetchEpisodeCharacters } from './services/api';

interface Character {
  id: number;
  name: string;
  image: string;
}

const App: React.FC = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [selectedEpisodeName, setSelectedEpisodeName] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalCharacters, setTotalCharacters] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const charactersPerPage = 6;

  useEffect(() => {
    const getCharacters = async () => {
      if (selectedEpisode) {
        const res = await fetch(`https://rickandmortyapi.com/api/episode/${selectedEpisode}`);
        const episodeData = await res.json();
        const episodeCharacters = await fetchEpisodeCharacters(episodeData.characters);
        
        const paginatedEpisodeCharacters = episodeCharacters.slice(
          (currentPage - 1) * charactersPerPage,
          currentPage * charactersPerPage
        );
        setCharacters(paginatedEpisodeCharacters);
        setTotalCharacters(episodeCharacters.length);
        setSelectedEpisodeName(episodeData.name);
      } else {
        const data = await fetchCharacters(currentPage);
        setCharacters(data.results);
        setTotalCharacters(data.info.count);
        setSelectedEpisodeName(null);
      }
    };
    getCharacters();
  }, [selectedEpisode, currentPage]);

  const handleEpisodeSelect = (episodeId: number | null) => {
    setSelectedEpisode(episodeId);
    setCurrentPage(1); // Reset page when changing episode
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <EpisodeList selectedEpisodeId={selectedEpisode} onEpisodeSelect={handleEpisodeSelect} />
      <CharacterList
        characters={characters}
        totalCharacters={selectedEpisode ? totalCharacters : 0}
        currentPage={currentPage}
        charactersPerPage={charactersPerPage}
        onPageChange={setCurrentPage}
        selectedEpisodeName={selectedEpisodeName}
      />
    </div>
  );
};

export default App;
