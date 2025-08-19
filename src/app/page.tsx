// app/caesar/page.tsx
'use client';

import { useState } from 'react';

export default function CaesarCipher() {
  const [plainText, setPlainText] = useState('THIS IS A SECRET MESSAGE');
  const [cypherText, setCypherText] = useState('THIS IS A SECRET MESSAGE');
  const [shift, setShift] = useState(0);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const encrypt = (text: string, shift: number) => {
    return text
      .toUpperCase()
      .split('')
      .map((char: string) => {
        if (char === ' ') return " ";
        if (!alphabet.includes(char)) return '';
        const index = (alphabet.indexOf(char) + (shift % 26) + 26) % 26;
        return alphabet[index];
      })
      .join('');
  }
  const decrypt = (text: string, shift: number) => {
    return text.toUpperCase()
      .split('')
      .map((char: string) => {
        if (char === " ") return " ";
        if (!alphabet.includes(char)) return '';
        const index = (alphabet.indexOf(char) - (shift % 26) + 26) % 26;
        return alphabet[index];
      })
      .join('')
  }
  const handlePlainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z ]/g, '');
    setPlainText(value.toUpperCase());
    setCypherText(encrypt(value.toUpperCase(), shift));
  }
  const handleShiftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/\D/g, '')) || 0;
    setShift(value);
    setCypherText(encrypt(plainText.toUpperCase(), value));
  }
  const handleCypherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.replace(/[^a-zA-Z ]/g, '');
    setCypherText(text.toUpperCase());
    setPlainText(decrypt(text.toUpperCase(), shift))
  }
  // Frequency Analysis
  const freqPlainText: { [key: string]: number } = {};
  const freqCypherText: { [key: string]: number } = {};
  plainText.toUpperCase().split('').forEach(c => { if (alphabet.includes(c)) freqPlainText[c] = (freqPlainText[c] || 0) + 1; });
  cypherText.toUpperCase().split('').forEach(c => { if (alphabet.includes(c)) freqCypherText[c] = (freqCypherText[c] || 0) + 1; });

  const maxFreqPlain = Math.max(...Object.values(freqPlainText), 1);
  const maxFreqCypher = Math.max(...Object.values(freqCypherText), 1);

  const cypherAlphabet = alphabet.slice(shift % 26) + alphabet.slice(0, shift % 26);

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Caesar Cipher</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl mb-2" style={{ color: '#00f' }}>Encryption System</h2>
          <div className="flex items-center mb-2">
            <span style={{ color: '#00f', minWidth: '100px' }}>Plain Letter</span>
            <div className="flex-1 ml-2 bg-white text-black text-center" style={{ display: 'grid', gridTemplateColumns: 'repeat(26, 1fr)', gap: '1px', width: '520px', height: '40px', alignItems: 'center' }}>
              {alphabet.split('').map((letter, i) => (
                <div key={i} style={{ background: '#f5f5f5', border: '1px solid #ccc', color: 'black', textAlign: 'center', fontSize: '18px', lineHeight: '40px', height: '40px' }}>
                  {letter}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center mb-2">
            <span style={{ minWidth: '100px' }}>Encrypts to</span>
            <div className="flex-1 ml-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(26, 1fr)', gap: '1px', width: '520px', height: '20px', alignItems: 'center', justifyItems: 'center' }}>
              {Array(26).fill(0).map((_, i) => <span key={i} className="text-gray-500">↓</span>)}
            </div>
          </div>
          <div className="flex items-center">
            <span style={{ color: '#f60', minWidth: '100px' }}>Cipher Letter</span>
            <div className="flex-1 ml-2 bg-orange-500 text-white text-center" style={{ display: 'grid', gridTemplateColumns: 'repeat(26, 1fr)', gap: '1px', width: '520px', height: '40px', alignItems: 'center' }}>
              {cypherAlphabet.split('').map((letter, i) => (
                <div key={i} style={{ background: '#f60', color: 'white', textAlign: 'center', fontSize: '18px', lineHeight: '40px', height: '40px' }}>
                  {letter}
                </div>
              ))}
            </div>
          </div>
          <h2 className="text-xl mt-4 mb-2">Inputs and Outputs</h2>
          <label>Plain Text</label>
          <input value={plainText} onChange={handlePlainChange} className="w-full bg-gray-700 p-2 mb-2" style={{ textTransform: 'uppercase' }} />
          <label>Key (Shift)</label>
          <input type="text" value={shift} onChange={handleShiftChange} className="w-full bg-gray-700 p-2 mb-2" />
          <label>Cipher Text</label>
          <input value={cypherText} onChange={handleCypherChange} className="w-full bg-orange-500 p-2" style={{ textTransform: 'uppercase' }} />
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl mb-2" style={{ color: '#00f' }}>Frequency Analysis</h2>
          <div className="mb-2">
            <span style={{ color: '#00f' }}>Plain Text Letter Frequency</span>
            <div className="flex justify-between items-end h-32">
              {alphabet.split('').map(letter => (
                <div key={letter} className="flex flex-col items-center">
                  <div className="bg-blue-500" style={{ width: '10px', height: `${((freqPlainText[letter] || 0) / maxFreqPlain) * 100}px` }}></div>
                  <span className="text-xs mt-1">{letter}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span style={{ color: '#f60' }}>Cipher Text Letter Frequency</span>
            <div className="flex justify-between items-end h-32">
              {alphabet.split('').map(letter => (
                <div key={letter} className="flex flex-col items-center">
                  <div className="bg-orange-500" style={{ width: '10px', height: `${((freqCypherText[letter] || 0) / maxFreqCypher) * 100}px` }}></div>
                  <span className="text-xs mt-1">{letter}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}