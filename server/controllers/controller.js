import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js';
/** get all questions */

export async function getQuestion(req, res){
    // res.json("questions api get request");
    try {
        const q = await Questions.find();
        res.json(q);
    } catch (error) {
        res.json({ error })
    }
}




/** insert all questions */

export async function insertQuestion(req, res){
    // res.json("questions api post request")
    try {
        Questions.insertMany({questions, answers}).then(function(err, data){
            res.json({ msg: "Data Saved Successfully" })
        })
    } catch (error) {
        res.json({ error })
    }
}

/** Delete all Questions */
export async function dropQuestions(req, res){
    // res.json("questions api delete request")
    try {
        await Questions.deleteMany(); // doesn't work if you don't put 'await'
        res.json({ msg: "Question Deleted Succesfully"});
    } catch (error) {
        res.json({ error });
    }
}


/** get all result */
export async function getResult(req, res){
    // res.json("result api get request")
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error });
    }
}

/** post all result */
export async function storeResult(req, res){
    // res.json("result api post request");
    try {
        // get data from user
        const { username, result, attempts, points, achieved } = req.body; // user passed data in body object
        if(!username && !result) throw new Error('Data Not Provided');
        // use create() to insert only one object, use insertmany to insert many objects
        Results.create({ username, result, attempts, points, achieved }).then(function(err, data){
            res.json({ msg : "Result Saved Successfully" });
        }) 
        
    } catch (error) {
        res.json({ error });
    }
}

/** delete all result */
export async function dropResult(req, res){
    // res.json("result api delete request");
    try {
        await Results.deleteMany();
        res.json({ msg: "Result Deleted Successfully" });
    } catch (error) {
        res.json({ error });
    }
}