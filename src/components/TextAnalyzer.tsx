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
    <div>
      <h1>Text Analyzer</h1>
      <p><strong>Original Text:</strong></p>
      <p>{article}</p>

      <div>
        <h2>Pencarian Kata</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Masukkan kata untuk dicari"
        />
        <p>
          Ditemukan: {searchTerm ? countOccurrences(searchTerm) : 0} kali
        </p>
      </div>

      <div>
        <h2>Penggantian Kata</h2>
        <input
          type="text"
          value={replaceWord}
          onChange={(e) => setReplaceWord(e.target.value)}
          placeholder="Kata yang ingin diganti"
        />
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="Kata pengganti"
        />
        <button onClick={handleReplace}>Ganti Kata</button>
        <p><strong>Modified Text:</strong></p>
        <p>{modifiedText}</p>
      </div>

      <div>
        <h2>Pengurutan Kata Berdasar Abjad</h2>
        <button onClick={sortWords}>Urutkan Kata</button>
        <ul>
          {sortWords().map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TextAnalyzer;
