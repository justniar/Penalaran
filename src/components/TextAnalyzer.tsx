import React, { useState } from 'react';
import articleData from '../article.json';

const article: string = (articleData as { content: string }).content;

const TextAnalyzer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [replaceWord, setReplaceWord] = useState<string>('');
  const [newWord, setNewWord] = useState<string>('');
  const [modifiedText, setModifiedText] = useState<string>(article);

  const countOccurrences = (word: string): number => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    return (article.match(regex) || []).length;
  };

  const handleReplace = (): void => {
    const regex = new RegExp(`\\b${replaceWord}\\b`, 'gi');
    const newText = modifiedText.replace(regex, newWord);
    setModifiedText(newText);
  };

  const sortWords = (): string[] => {
    const words = modifiedText.toLowerCase().match(/\b\w+\b/g) || [];
    return Array.from(new Set(words)).sort();
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Text Analyzer</h1>

      <div className="mb-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Original Text</h2>
        <p className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 shadow-inner">{article}</p>
      </div>


      <div className="mb-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Pencarian Kata</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Masukkan kata untuk dicari"
          className="border border-gray-300 rounded-md p-2 w-full mb-2"
        />
        <p className="text-sm text-gray-700">
          Ditemukan: {searchTerm ? countOccurrences(searchTerm) : 0} kali
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Penggantian Kata</h2>
        <input
          type="text"
          value={replaceWord}
          onChange={(e) => setReplaceWord(e.target.value)}
          placeholder="Kata yang ingin diganti"
          className="max-w-6xl mx-auto border border-gray-300 rounded-md p-2 w-full mb-2"
        />
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="Kata pengganti"
          className="border border-gray-300 rounded-md p-2 w-full mb-2"
        />
        <button
          onClick={handleReplace}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
        >
          Ganti Kata
        </button>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Modified Text:</h3>
          <p className="bg-white p-4 rounded-md shadow-md text-sm">{modifiedText}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Pengurutan Kata Berdasar Abjad</h2>
        <button
          onClick={sortWords}
          className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 mb-4"
        >
          Urutkan Kata
        </button>
        <ul className="bg-white p-4 rounded-md shadow-md text-sm space-y-1">
          {sortWords().map((word, index) => (
            <li key={index} className="text-gray-800">
              {word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TextAnalyzer;
