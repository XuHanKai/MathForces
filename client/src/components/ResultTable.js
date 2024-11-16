import React, { useEffect, useState } from 'react'
import { getServerData } from '../helper/helper'

export default function ResultTable() { 


    const [data, setData] = useState([]) 
    // store backend result to 'data' variable, data is just ALL user result stored inside the database
    useEffect(() => {
        getServerData(`http://localhost:5000/api/result`).then(res => {
            setData(res)
        })
    }, []) // not adding '[]' will "infinite loop" get result request until we press restart again
  return (
    <div>
        <table>
            <thead className='table-header'>
                <tr className='table-row'>
                    <td>Name</td>
                    <td>Attempt</td>
                    <td>Earned Points</td>
                    <td>Result</td>
                </tr>
            </thead>
            <tbody>
                { ! data ?? <div>No Data Found</div>}
                {
                    data.map((v,i) => (
                        <tr className='table-body' key={i}>
                            <td>{v?.username || ''}</td>
                            <td>{v?.attempts || 0}</td>
                            <td>{v?.points || 0}</td>
                            <td>{v?.achived || ""}</td>
                        </tr>
                    ))
                }
                
            </tbody>
        </table>
    </div>
  )
}
