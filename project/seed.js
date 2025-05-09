import fs from 'fs';
import readline from 'readline';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Mathematics from './models/question.model.js';
import Grade from './models/grade.model.js';
import { connectDB } from './config/db.js';

dotenv.config();
connectDB();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const filePath = path.join(__dirname, 'basicMath.json');

const allowedTopics = ['algebra', 'exponents', 'fractions', 'percentages'];
const allowedDifficulties = ['Easy', 'Medium'];

async function seedQuestions() {
  try {
    const filteredQuestions = await Mathematics.find({
      topic: { $in: allowedTopics.map(topic => new RegExp(`^${topic}$`, 'i')) },
      difficulty: { $in: allowedDifficulties.map(diff => new RegExp(`^${diff}$`, 'i')) }
    });

    const formattedQuestions = filteredQuestions.map(q => ({
      grade: 'Middle School',
      subject: 'Math',
      question: q.question,
      answer: q.answer,
      topic: q.topic.charAt(0).toUpperCase() + q.topic.slice(1).toLowerCase(), 
      difficulty: q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1).toLowerCase() 
    }));
    

    await Grade.insertMany(formattedQuestions);
    console.log(`Migrated ${formattedQuestions.length} questions.`);
  } catch (err) {
    console.error('Migration failed:', err.message);
  } finally {
    mongoose.connection.close();
  }
}

seedQuestions();



