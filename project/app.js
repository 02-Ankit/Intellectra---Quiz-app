import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Mathematics from './models/question.model.js';
import path from 'path';
import ejsMate from 'ejs-mate';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import quizRoutes from './routes/quiz.routes.js';

// git add .
// git commit -m "Add quiz routes and grade model with filtered question logic"
// git push origin main --force

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(express.urlencoded({ extended: true })); 
app.use('/quiz', quizRoutes);

app.listen(3000, () => {
  connectDB();
  console.log('LISTENING ON PORT 3000');
});
