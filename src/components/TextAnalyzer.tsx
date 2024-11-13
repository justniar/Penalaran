import React, { useState } from 'react';
import articleData from '../article.json';

const article: string = (articleData as { content: string }).content;

const TextAnalyzer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [replaceWord, setReplaceWord] = useState<string>('');
  const [newWord, setNewWord] = useState<string>('');
  const [modifiedText, setModifiedText] = useState<string>(article);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; 
  const [_, setModifiedWords] = useState<Map<number, string>>(new Map());


  const countOccurrences = (word: string): number => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    return (article.match(regex) || []).length;
  };

  const handleReplace = (): void => {
    const regex = new RegExp(`\\b${replaceWord}\\b`, 'gi');
    const newText = modifiedText.replace(regex, (_, offset) => {
      const newWordWithHighlight = `<span class="bg-blue-300">${newWord}</span>`;
      setModifiedWords(prev => prev.set(offset, newWordWithHighlight)); 
      return newWordWithHighlight;
    });
    setModifiedText(newText);
  };

  const sortWords = (): string[] => {
    const words = modifiedText.toLowerCase().match(/\b\w+\b/g) || [];
    return Array.from(new Set(words)).sort();
  };

  const highlightText = (text: string, term: string): string => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<span class="bg-blue-200">$1</span>');
  };

  const sortedWords = sortWords();
  const totalPages = Math.ceil(sortedWords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentWords = sortedWords.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full mx-auto p-6 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Text Analyzer</h1>

      <div className="mb-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Original Text</h2>
        <p
          className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 shadow-inner"
          dangerouslySetInnerHTML={{
            __html: highlightText(article, searchTerm),
          }}
        ></p>
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

      <div className="mx-20 mb-6">
        <h2 className="text-xl font-semibold mb-4">Penggantian Kata</h2>

        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              value={replaceWord}
              onChange={(e) => setReplaceWord(e.target.value)}
              placeholder="Kata yang ingin diganti"
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              placeholder="Kata pengganti"
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleReplace}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
            >
              Ganti Kata
            </button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Modified Text:</h3>
          <p className="bg-white p-4 rounded-md shadow-md text-sm" dangerouslySetInnerHTML={{
            __html: modifiedText,
          }} />
        </div>
      </div>

      <div className='mx-20 mb-6'>
        <h2 className="text-xl font-semibold mb-2">Pengurutan Kata Berdasar Abjad</h2>
        <button
          onClick={() => setCurrentPage(1)} // Reset to first page
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 mb-4"
        >
          Urutkan Kata
        </button>

        <ul className="bg-white p-4 rounded-md shadow-md text-sm space-y-1">
          {currentWords.map((word, index) => (
            <li key={index} className="text-gray-800">
              {word}
            </li>
          ))}
        </ul>

        <div className="flex justify-center space-x-2 mt-4">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
          >
            Pertama
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
          >
            Sebelumnya
          </button>
          <span className="flex items-center justify-center px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
          >
            Selanjutnya
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
          >
            Terakhir
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextAnalyzer;
