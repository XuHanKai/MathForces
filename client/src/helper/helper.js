import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios';

export function attempts_Number(result){
    return result.filter(r => r !== undefined).length;
}

export function earnPoints_Number(result, answers){
    let sum = 0;
    for(let i = 0;i<result.length;i++){
        if(result[i]==answers[i]){
            sum += 10;
        }
        else if(result[i] == undefined){
            sum += 5;
        }
    }
    return sum;
}

export function flagResult(totalPoints, earnPoints){
    return ( totalPoints * 60 / 100) <= earnPoints; /** pass = >= 60% */
}

/** check user auth: go back to /root link(start screen) if auth = false, else go to child link */

export function CheckUserExist({ children }){
    const auth = useSelector(state => state.result.userId)
    return auth ? children : <Navigate to = {'/'} replace = {true}></Navigate>
}

/** get server data( from backend to frontend) */

/** get server data */
export async function getServerData(url, callback){

    const data = await (await axios.get(url))?.data;
    // console.log(data);
    return callback ? callback(data) : data;
}


/** post server data */
export async function postServerData(url, result, callback){
    const data = await (await axios.post(url, result))?.data;
    return callback ? callback(data) : data;
}
