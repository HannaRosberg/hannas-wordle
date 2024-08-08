
import React from 'react';


const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

const Keyboard = ({ onKeyPress = () => {}, incorrectLetters }) => {
  const handleButtonClick = (key) => {
    onKeyPress(key);
  };

  return (
    <div className="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleButtonClick(key)}
              className={incorrectLetters.includes(key) ? 'incorrect' : ''}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="keyboard-row">
        <button onClick={() => handleButtonClick('Enter')}>Enter</button>
        <button onClick={() => handleButtonClick('Backspace')}>Backspace</button>
      </div>
    </div>
  );
};

export default Keyboard;
