import { createSlice } from "@reduxjs/toolkit"
import { resetAllAction } from "./question_reducer";

export const resultReducer = createSlice({
    name: 'result',
    initialState : {
        userId : null,
        result: []
    },
    reducers : {
        setUserId : (state, action) => {
            state.userId = action.payload
        },
        /** push the answer into result array */
        pushResultAction : (state, action) => {
            state.result.push(action.payload)
        },
        updateResultAction : (state, action) => {
            const { trace, checked } = action.payload;
            state.result.fill(checked, trace, trace+1) // update arr[trace] = checked: (val, start, end)
        },
        resetResultAction : () => {
            return {
                userId : null,
                result: []
            }
        }
    } 
})


export const { setUserId, pushResultAction, updateResultAction, resetResultAction }  = resultReducer.actions;

export default resultReducer.reducer;