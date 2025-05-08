import fs from 'fs';
import readline from 'readline';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Problem from './models/question.model.js'; 
import { connectDB } from './config/db.js';

dotenv.config();
connectDB();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const filePath = path.join(__dirname, 'basicMath.json');


function cleanAnswer(raw) {
  return raw.replace(/<<.*?>>/g, '');
}


async function seedProblems() {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      const problems = JSON.parse(data); // now an array
  
      for (const problem of problems) {
        problem.answer = cleanAnswer(problem.answer);
        await Problem.create(problem);
      }
  
      console.log('Seeding complete!');
    } catch (err) {
      console.error('Seeding error:', err.message);
    } finally {
      mongoose.connection.close();
    }
  }
  

seedProblems();
