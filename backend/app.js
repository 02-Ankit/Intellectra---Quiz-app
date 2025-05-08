import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Question from './models/question.model.js';

dotenv.config();

const app = express();

app.get('/', async (req, res) => {
    try {
      const count = await Question.countDocuments();
      const random = Math.floor(Math.random() * count);
      const question = await Question.findOne().skip(random);
  
      res.send(`<h1>${question.question}</h1><p>Answer: ${question.answer}</p>`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching question');
    }
  });
  

app.listen(3000, () => {
    connectDB();
    console.log("LISTENING ON PORT 3000");
});

