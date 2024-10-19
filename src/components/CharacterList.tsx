// src/components/CharacterList.tsx
import React from 'react';

interface Character {
  id: number;
  name: string;
  image: string;
}

interface CharacterListProps {
  characters: Character[] | undefined; 
  totalCharacters: number; 
  currentPage: number; 
  charactersPerPage: number; 
  onPageChange: (page: number) => void; 
  selectedEpisodeName: string | null; 
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  totalCharacters,
  currentPage,
  charactersPerPage,
  onPageChange,
  selectedEpisodeName,
}) => {
  const totalPages = Math.ceil(totalCharacters / charactersPerPage);

  return (
    <div className="w-3/4 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Characters</h2>

      {selectedEpisodeName && (
        <div className="mb-2 text-lg font-semibold text-gray-700">
          {totalCharacters} Characters in Episode "{selectedEpisodeName}"
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {characters?.map((character) => (
          <div key={character.id} className="border p-2 rounded-md shadow-md hover:shadow-lg transition">
            <img src={character.image} alt={character.name} className="w-24 h-24 object-cover mx-auto rounded" />
            <p className="text-center font-medium">{character.name}</p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterList;
