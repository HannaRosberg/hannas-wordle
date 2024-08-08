import React from 'react';

const Grid = ({ word, guesses, currentGuess, numLetters, showGrid }) => {
  const getCellStyle = (char, index) => {
    if (!word.includes(char)) return 'wrong';
    if (char === word[index]) return 'correct';
    return 'misplaced';
  };

  return (
    <div className="grid">
      {guesses.map((guess, rowIndex) => (
        <div key={rowIndex} className="row">
          {guess.split('').map((char, colIndex) => (
            <div key={colIndex} className={`cell ${getCellStyle(char, colIndex)}`}>{char}</div>
          ))}
        </div>
      ))}
      {guesses.length < 6 && (
        <div className="row">
          {Array.from({ length: numLetters }).map((_, colIndex) => (
            <div key={colIndex} className={`cell ${showGrid ? '' : 'hidden'}`}>{currentGuess[colIndex] || ''}</div>
          ))}
        </div>
      )}
      {Array.from({ length: 6 - guesses.length - 1 }).map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: numLetters }).map((_, colIndex) => (
            <div key={colIndex} className="cell hidden"></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
