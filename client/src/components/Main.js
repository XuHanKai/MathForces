import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Main.css'
import { useDispatch } from 'react-redux'
import { setUserId } from '../redux/result_reducer'
export default function Main(){
    
        const inputRef = useRef(null) 
        
        const dispatch = useDispatch()
        /** auth: only allow user to start quiz if they put in username */
        function startQuiz(){
            if(inputRef.current?.value){
                dispatch(setUserId(inputRef.current?.value))
            }
        }
    return (
        <div className = "container">
            <h1 className='title text-light'>Quiz Application</h1>

            <ol> 
                <h3>Rules</h3>
                <li>You will be asked 5 questions</li>
                <li>Results will be displayed at the end</li>
                <li>Have fun!</li>
            </ol>

            <form id="form">
                {/* stores username in variable */}
                <input ref = {inputRef} className = "userid" type="text" placeholder='Username*' /> 
            </form>

            <div className='start'>
                <Link className = 'btn' to = {'quiz'} onClick = {startQuiz}>Start Quiz</Link> {/* link to quiz root when pressed */}
            </div>
        </div>
        
    )
}