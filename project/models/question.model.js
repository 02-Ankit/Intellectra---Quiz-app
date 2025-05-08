import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    topic:{
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Question = mongoose.model('Question',questionSchema);

export default Question;