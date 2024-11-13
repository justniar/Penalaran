import React, { useState } from 'react';

const article = `Dalam kehidupan suatu negara, pendidikan memegang peranan yang amat
penting untuk menjamin kelangsungan hidup negara dan bangsa, karena pendidikan
merupakan wahana untuk meningkatkan dan mengembangkan kualitas sumber daya
manusia. Seiring dengan perkembangan teknologi komputer dan teknologi informasi,
sekolah-sekolah di Indonesia sudah waktunya mengembangkan Sistem Informasi
manajemennya agar mampu mengikuti perubahan jaman.
`;

const TextAnalyzer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceWord, setReplaceWord] = useState('');
  const [newWord, setNewWord] = useState('');
  const [modifiedText, setModifiedText] = useState(article);

  const countOccurrences = (word: string): number => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    return (article.match(regex) || []).length;
  };

  const handleReplace = () => {
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
