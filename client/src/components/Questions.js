import React, { useState, useEffect } from 'react'
import data from '../database/data' // get questions

import { useDispatch, useSelector } from 'react-redux'

/** Custom Hook */
import { useFetchQuestion } from '../hooks/FetchQuestions'
import { updateResultAction } from '../redux/result_reducer'
import { updateResult } from '../hooks/setResult'


export default function Questions({ onChecked }){
    
    const [checked, setChecked] = useState(undefined)
    const { trace } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const [{ isLoading, apiData, serverError}] = useFetchQuestion()
    // useSelector(state => console.log(state));
    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    const dispatch = useDispatch()
    useEffect(() => {
        // console.log({ trace, checked })
        dispatch(updateResult({ trace, checked }))
    }, [checked])

    function onSelect(i){
    
        // console.log(i)
        onChecked(i)
        // whenever user update option
        setChecked(i)
        // immediately update option(result) array after each selection
        dispatch(updateResult({ trace, checked })) 
    }

    if(isLoading) return <h3 className='text-light'>isLoading</h3>
    if(serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>
    
    return (
        <div className='questions'>
            { /** '?' = only access question property when we have it( not undef) */}
            <h2 className = 'text-light'>{questions?.question}</h2>

            
            <ul key={questions?.id}>
                {
                    questions?.options.map((q,i) => (
                        
                        <li key={i}>
                            <input
                                type="radio"
                                value={false}
                                name="options"
                                id={`q${i}-option`}
                                onChange={() => onSelect(i)}
                            />
                            {/* q = question choices */}
                            <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                            {/* class 'check' = no checkbox for button, class 'check checked' = checkbox for button */}
                            <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div > 
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}