import { postServerData } from '../helper/helper'
import * as Action from '../redux/result_reducer'

/** push the answer and store as data */
export const PushAnswer = (result) => async (dispatch) => {
    try{    
        await dispatch(Action.pushResultAction(result))
    } catch (error){
        console.log(error)
    }
}

export const updateResult = (index, checked) => async (dispatch) => {
    try{
        dispatch(Action.updateResultAction(index))
    } catch (error){
        console.log(error)
    }
}

/** Insert user result back into database */
export const usePublishResult = (resultData) => {
    const { result, username } = resultData;
    (async () => {
        try {
            if(result != [] && !username) throw new Error("Couldn't get Result");
            await postServerData(`http://localhost:5000/api/result`, resultData, data => data)
        } catch (error) {
            console.log(error)
        }
    })();
}

