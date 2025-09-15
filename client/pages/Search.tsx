import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [params] = useSearchParams();
  const q = params.get('q') || '';

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Пошук</h1>
        <p className="text-gray-600">Запит: <span className="font-medium">{q}</span></p>
      </div>
    </div>
  );
};

export default Search;
