import React, { useEffect, useState } from 'react'
import Questions from './Questions'

import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestions';
import { PushAnswer } from '../hooks/setResult';

/** redux store import */
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
export default function Quiz(){

    const [check,setChecked] = useState(undefined)

    const state = useSelector(state => state);
    const result = useSelector(state => state.result.result); // user choice array
    const { queue, trace} = useSelector(state => state.questions);
    const dispatch = useDispatch()
  

    function onNext(){
        // console.log('On onNext Click')
        if(trace<queue.length){ /** keep in bounds */
            /** increase trace value by one using MoveNSextAction */
            dispatch(MoveNextQuestion())
            if(result.length <= trace){ // if curr idx not in arr yet
                dispatch(PushAnswer(check)) // insert new result
            }
          
            
        }
         /** reset the value of the checked variable */
         setChecked(undefined)
    }


    
    function onPrev(){
        // console.log('On onPrev Click')
        if(trace>0){ /** keep in bounds */
            /** decrease trace value by one using MovePrevAction */
            dispatch(MovePrevQuestion())
        }
        
    }

    /** access the 'checked' option from questions component*/
    function onChecked(check){
        // console.log(check)
        setChecked(check)
    }

    /** finish exam after the last question */
    if(result.length && result.length >= queue.length){
        return <Navigate to='/contest/result' replace="true"></Navigate>
    }
    return (
        <div className='container'>
            <h1 className='title text-light'>Quiz Application</h1>
            {/* display questions */}
            <Questions onChecked={onChecked}/>
            <div className='grid'>
                {/* dont display prev button on 1st question */}
                { trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
                <button className='btn next' onClick={onNext}>Next</button>
            </div>
        </div>
        

    )
}