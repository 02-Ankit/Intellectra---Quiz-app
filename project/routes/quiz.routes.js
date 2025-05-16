import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Grade from '../models/grade.model.js';
import { generateOptions } from '../utils/generateOptions.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, '../data/basicMath.json');


router.get('/', (req, res) => {
  try {
    res.render('quiz');
  } catch (err) {
    console.error('Error rendering quiz page:', err);
    res.status(500).send('Error loading quiz page');
  }
});

// POST /quiz/test
router.post('/test', async (req, res) => {
  const { grade, subject, difficulty } = req.body;
  if (!grade || !subject || !difficulty) {
    return res.status(400).send('Missing required fields: grade, subject, or difficulty');
  }
  let source = 'json';
  try {
    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const mathTopics = ['algebra', 'addition', 'subtraction', 'multiplication', 'division', 'exponents', 'fractions', 'percentages'];
    const filtered = fileData.filter(q => {
      const qDifficulty = q.difficulty.toLowerCase();
      const reqDifficulty = difficulty.toLowerCase();
      if (subject.toLowerCase() === 'math') {
        return qDifficulty === reqDifficulty && mathTopics.includes(q.topic.toLowerCase());
      } else {
        return qDifficulty === reqDifficulty && q.topic.toLowerCase().includes(subject.toLowerCase());
      }
    });
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const limited = shuffled.slice(0, 10); // Limit to 10 questions
    if (!limited.length) {
      return res.status(404).render('error', { message: 'No questions match your selection. Please try different criteria.' });
    }
    // Add options to each question
    const questions = limited.map(q => ({
      ...q,
      options: generateOptions(q.answer)
    }));
    res.render('questions', {
      questions,
      grade,
      subject,
      difficulty
    });
  } catch (err) {
    console.error('Error processing quiz request:', err);
    res.status(500).render('error', { message: 'An error occurred while processing your request. Please try again.' });
  }
});

// POST /quiz/submit-all
router.post('/submit-all', (req, res) => {
  try {
    const { answers = {}, questions = [] } = req.body;
    // questions is a JSON stringified array
    const questionsArr = typeof questions === 'string' ? JSON.parse(questions) : questions;
    const results = questionsArr.map((q, idx) => {
      const userAnswer = answers[`q${idx}`];
      return {
        question: q.question,
        correct: q.answer,
        userAnswer,
        isCorrect: userAnswer === q.answer,
        options: q.options,
        difficulty: q.difficulty
      };
    });
    res.render('results', { results });
  } catch (err) {
    console.error('Error processing all answers:', err);
    res.status(500).render('error', { message: 'Error processing your answers.' });
  }
});

// POST /quiz/submit
router.post('/submit', (req, res) => {
  try {
    const { selected, correct, question, options, difficulty } = req.body;
    if (!selected || !correct) {
      return res.status(400).send('Missing answer data');
    }
    const isCorrect = selected === correct;
    let feedback;
    if (isCorrect) {
      feedback = { message: 'Correct!', isCorrect: true };
    } else {
      feedback = { message: `Incorrect. The correct answer is ${correct}.`, isCorrect: false };
    }
    
    // Re-render the same question 
    res.render('question', {
      question,
      answer: correct,
      options: JSON.parse(options),
      difficulty,
      feedback,
      selected
    });
  } catch (err) {
    console.error('Error processing submission:', err);
    res.status(500).send('Error processing your answer');
  }
});

export default router;
