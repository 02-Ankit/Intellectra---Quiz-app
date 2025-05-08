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


const filePath = path.join(__dirname, 'gradeSchoolMath.jsonl');


function cleanAnswer(raw) {
  return raw.replace(/<<.*?>>/g, '');
}


async function seedProblems() {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
      const problem = JSON.parse(line);
      problem.answer = cleanAnswer(problem.answer); 
      await Problem.create(problem);
    } catch (err) {
      console.error('Error parsing/inserting line:', line, err.message);
    }
  }

  console.log('Seeding complete!');
  mongoose.connection.close();
}

seedProblems();
