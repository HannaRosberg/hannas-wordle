import express from 'express';
import { Highscore } from '../models/highscoreModel.js';

const router = express.Router();

router.get('/highscores', async (req, res) => {
  try {
    const highscores = await Highscore.find().sort({ score: 1, timeElapsed: 1 });
    console.log('Fetched highscores:', highscores);
    res.json(highscores);
  } catch (error) {
    console.error("An error occurred while fetching highscores:", error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

router.post('/highscores', async (req, res) => {
  try {
    const highscoreData = req.body;
    console.log('Received highscore data:', highscoreData);
    const highscoreModel = new Highscore(highscoreData);
    const savedHighscore = await highscoreModel.save();
    console.log('Saved highscore:', savedHighscore);
    
    res.status(201).json({ message: 'Highscore saved successfully', highscore: savedHighscore });
  } catch (error) {
    console.error("An error occurred while saving highscore:", error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

export default router;


