import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Highscores.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5080';

const Highscores = () => {
  const [highscores, setHighscores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHighscores = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/highscores`);
        console.log('Fetched highscores:', response.data);
        setHighscores(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching highscores:', error);
        setError('Failed to fetch highscores. Please try again later.');
        setLoading(false);
      }
    };

    fetchHighscores();
  }, []);

  if (loading) {
    return <div>Loading highscores...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="highscores">
      <h2>Highscores</h2>
      {highscores.length === 0 ? (
        <p>No highscores available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Time Elapsed (s)</th>
              <th>Guesses</th>
              <th>Number of Letters</th>
              <th>Allow Repeat</th>
            </tr>
          </thead>
          <tbody>
            {highscores.map((highscore, index) => (
              <tr key={index}>
                <td>{highscore.name}</td>
                <td>{highscore.score}</td>
                <td>{highscore.timeElapsed}</td>
                <td>{highscore.guesses.join(', ')}</td>
                <td>{highscore.numLetters}</td>
                <td>{highscore.allowRepeat ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Highscores;
