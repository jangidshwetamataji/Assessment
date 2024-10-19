// src/components/EpisodeList.tsx
import React, { useEffect, useState } from 'react';
import { fetchEpisodes } from '../services/api';

interface Episode {
  id: number;
  name: string;
}

interface EpisodeListProps {
  selectedEpisodeId: number | null;
  onEpisodeSelect: (id: number | null) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ selectedEpisodeId, onEpisodeSelect }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const getEpisodes = async () => {
      const data = await fetchEpisodes();
      setEpisodes(data.results);
    };
    getEpisodes();
  }, []);

  const handleEpisodeClick = (id: number) => {
    onEpisodeSelect(id === selectedEpisodeId ? null : id); // Toggle selection
  };

  return (
    <div className="w-1/4 p-4 h-screen overflow-y-auto bg-gray-200">
      <h2 className="text-xl font-bold mb-4">Episodes</h2>
      <ul>
        {episodes.map((episode) => (
          <li
            key={episode.id}
            className={`cursor-pointer p-2 rounded-md transition-colors ${selectedEpisodeId === episode.id ? 'bg-gray-400 border-l-4 border-blue-500' : 'hover:bg-gray-300'}`}
            onClick={() => handleEpisodeClick(episode.id)}
          >
            {episode.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
