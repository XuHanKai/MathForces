import mongoose from "mongoose";
const { Schema } = mongoose;

/** question model structure */
const questionModel = new Schema({
    questions : { type : Array, default: []},
    answers : { type : Array, default: []},
    createdAt : { type : Date, default : Date.now }

});

/** 'Question' structure/model is questionModel */
export default mongoose.model('Questions', questionModel)
