import express from "express";
import Grade from '../models/grade.model.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('quiz');
});

router.post('/test', async (req, res) => {
    const { grade, subject, difficulty } = req.body;
  
    try {

      const filteredQuestions = await Grade.find({
        grade,
        subject,
        difficulty
      });
  

      let q = null;
      if (filteredQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
        q = filteredQuestions[randomIndex];
      }
      
  
      res.render('quiz-test', {
        questions: filteredQuestions,
        selectedOptions: req.body,
        grade,
        subject,
        difficulty,
        q
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching questions from Grade model');
    }
  });
  

export default router;
