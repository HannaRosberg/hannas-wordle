import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import apiRouter from './routes/api.js';
import open from 'open';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, '../wordle-game/build')));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/api', apiRouter);

app.get('/highscores', async (req, res) => {
  try {
    const Highscore = await Highscore.find().sort({ score: 1 });
    res.render('Highscore', { Highscore });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Wordle API!');
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../wordle-game/build/index.html'));
});

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/wordle', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true,
 })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
    app.listen(5080, () => {
      console.log('Server is running on port 5080');
      open('http://localhost:5080');
    });


