import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Question from './models/question.model.js';
import path from 'path';
import ejsMate from 'ejs-mate';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.get('/quiz', async (req, res) => {
  try {
    const count = await Question.countDocuments();
    const random = Math.floor(Math.random() * count);
    const question = await Question.findOne().skip(random);

    res.render('quiz', { question });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching question');
  }
});

app.listen(3000, () => {
  connectDB();
  console.log('LISTENING ON PORT 3000');
});
