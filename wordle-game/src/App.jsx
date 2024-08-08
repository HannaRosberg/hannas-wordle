import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import wordlist from './wordlist.json';
import './App.css';
import Grid from './components/Grid.jsx';
import Keyboard from './components/Keyboard.jsx';
import About from './components/About.jsx';
import Highscores from './components/Highscores.jsx';

function getRandomWord(numLetters) {
  const filteredWords = wordlist.filter(word => word.length === numLetters);
  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

function App() {
  const [numLetters, setNumLetters] = useState(5);
  const [word, setWord] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [message, setMessage] = useState('');
  const [showSubmit, setShowSubmit] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [name, setName] = useState('');
  const [allowRepeat, setAllowRepeat] = useState(false);
  const [usedWords, setUsedWords] = useState(new Set());
  const [startTime, setStartTime] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    setWord(getRandomWord(numLetters));
    setGuesses([]);
    setCurrentGuess('');
    setIncorrectLetters([]);
    setMessage('');
    setShowSubmit(false);
    setShowTryAgain(false);
    setName('');
    setUsedWords(new Set());
    setStartTime(Date.now());
  }, [numLetters]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= numLetters) {
      setCurrentGuess(value.toLowerCase());
    }
  };

  const handleSubmit = () => {
    if (currentGuess.length !== numLetters) {
      setMessage(`Guess must be ${numLetters} letters long.`);
      return;
    }

    if (!allowRepeat && usedWords.has(currentGuess)) {
      setMessage("Sorry, you already used that word.");
      return;
    }

    setUsedWords((prev) => new Set(prev).add(currentGuess));

    if (currentGuess === word) {
      setMessage('You guessed it!');
      setShowSubmit(true);
      setTimeElapsed((Date.now() - startTime) / 1000);
    } else {
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);

      const newIncorrectLetters = currentGuess.split('').filter(letter => !word.includes(letter));
      setIncorrectLetters((prev) => [...new Set([...prev, ...newIncorrectLetters])]);

      setCurrentGuess('');

      if (newGuesses.length === 6) {
        setMessage(`Sorry, you guessed the word wrong. The correct word was: ${word}`);
        setShowTryAgain(true);
      } else {
        setMessage('');
      }
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmitScore = () => {
    const scoreData = {
      name,
      score: guesses.length + 1,
      timeElapsed,
      guesses,
      numLetters,
      allowRepeat,
    };

    axios.post('http://localhost:5080/api/highscores', scoreData)
      .then(() => {
        setMessage('Score submitted!');
        setShowSubmit(false);
      })
      .catch((error) => {
        console.error('Error submitting score:', error);
      });
  };

  const handleTryAgain = () => {
    setWord(getRandomWord(numLetters));
    setGuesses([]);
    setCurrentGuess('');
    setIncorrectLetters([]);
    setMessage('');
    setShowSubmit(false);
    setShowTryAgain(false);
    setName('');
    setUsedWords(new Set());
    setStartTime(Date.now());
  };

  const handleCheckboxChange = (e) => {
    setAllowRepeat(e.target.checked);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/highscores">Highscore</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/highscores" element={<Highscores />} />
          <Route path="/" element={
            <div>
              <h1>Wordle Game</h1>
              <div className="settings">
                <label>
                  Number of letters:
                  <input
                    type="number"
                    value={numLetters}
                    min="3"
                    max="10"
                    onChange={(e) => setNumLetters(parseInt(e.target.value))}
                  />
                </label>
                <label>
                  Allow Repeat:
                  <input
                    type="checkbox"
                    checked={allowRepeat}
                    onChange={handleCheckboxChange}
                  />
                </label>
              </div>
              <div className="guess-input">
                <label>
                  Your guess here:
                  <input
                    type="text"
                    value={currentGuess}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  />
                </label>
              </div>
              <Grid word={word} guesses={guesses} currentGuess={currentGuess} numLetters={numLetters} />
              <Keyboard incorrectLetters={incorrectLetters} />
              <div>{message}</div>
              {showSubmit && (
                <div>
                  <input type="text" placeholder="Enter your name" value={name} onChange={handleNameChange} />
                  <button onClick={handleSubmitScore}>Submit Score</button>
                </div>
              )}
              {showTryAgain && (
                <button onClick={handleTryAgain}>Try Again</button>
              )}
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
