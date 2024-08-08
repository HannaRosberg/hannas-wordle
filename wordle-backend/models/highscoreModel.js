import mongoose from 'mongoose';

const highscoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true, index: true },
  timeElapsed: { type: Number, required: true, index: true },
  guesses: { type: [String], required: true },
  numLetters: { type: Number, required: true },
  allowRepeat: { type: Boolean, required: true },
});

export const Highscore = mongoose.model('Highscore', highscoreSchema);