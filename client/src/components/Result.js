import React, { useEffect } from 'react'
import '../styles/Result.css'
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';

/** import actions */
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';



export default function Result(){

    const dispatch = useDispatch()
    // get state at the end
    const { questions : {queue, answers}, result: {result, userId}} = useSelector(state => state)

    useEffect(() => {
        // console.log(earnPoints) // display user selection
    })

    // each question is worth 10 points
    const totalPoints = queue.length * 10
    const attempts = attempts_Number(result) 
    /** calculate score */
    const earnPoints = earnPoints_Number(result, answers)
    /** If user passed or not( in the future, implement if user is top 25%) */
    const flag = flagResult(totalPoints, earnPoints)


    /** store user result in database */
    usePublishResult({
        result, 
        username : userId,
        attempts,
        points: earnPoints,
        achived : flag ? "Passed" : "Failed" 
    });

    function onRestart(){
        // console.log('on Restart')
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }
    return (
        <div className='container'>
            <h1 className = 'title text-light'>Quiz Application</h1>
            {/* display result card */}
            <div className = 'result flex-center'>


            
                <div className='flex'>
                    <span>Username: </span>
                    <span className='bold'>{userId}</span>
                </div>
                <div className='flex'>
                    <span>Total Quiz Points: </span>
                    <span className='bold'>{totalPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Questions: </span>
                    <span className='bold'>{queue.length || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Attempts: </span>
                    <span className='bold'>{attempts || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Earned Points: </span>
                    <span className='bold'>{earnPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Quiz Result: </span>
                    { /* put color green if pass, put color red if fail */}
                    <span style = {{ color : `${flag ? "#2aff95" : "#ff2a66"}`}}className='bold'>{flag ? "Passed" : "Failed"}</span>
                </div>
            </div>

            <div className="start">
                <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
            </div>

            <div className="container">
                {/* leaderboard */}
                <ResultTable></ResultTable>
            </div>
        </div>
    )
}