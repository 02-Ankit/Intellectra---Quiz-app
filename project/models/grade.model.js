import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    grade: {
      type: String,
      required: true,
      enum: ['Elementary School', 'Middle School', 'High School', 'College']
    },
    subject: {
      type: String,
      required: true,
      enum: ['Math', 'English', 'DSA', 'CS Fundamentals']
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    topic: {
      type: String
      
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['Easy', 'Medium', 'Hard']
    }
  });
  

const Grade = mongoose.model("Grade",gradeSchema)

export default Grade;