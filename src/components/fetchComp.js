import React, { useState } from "react";

function FetchComp()
{
    const serverAPIUrl = "https://jsonplaceholder.typicode.com/posts"

    const [data,setData] = useState([])
    const [specificDataId,setSpecificDataId] = useState([])

    //Get Request for All Data
    function getAllData()
    {
        console.log(serverAPIUrl)
        fetch(serverAPIUrl)
        .then(res=>res.json())
        .then(resData=>{
            setData(resData)
        })
    }

    
    //Get Request for Specific Data
    function onSpecificDataIdChange(event)
    {
        setSpecificDataId(event.target.value)
    }
    function getSpecificData()
    {
        let specificDataURL = `${serverAPIUrl}/${specificDataId}`
        console.log(specificDataURL)
        fetch(specificDataURL)
        .then(res=>res.json())
        .then(resData=>{
            console.log(resData)
            setData([resData])
        })
    }

    
    return (
        <div>
            <h2>Get All Data</h2>
            <button id="getAllData" onClick={getAllData} >Get all data</button>
            <hr/>
            <h2>Get Specific Data</h2>
            <input type="number" value={specificDataId} onChange={onSpecificDataIdChange} id="specificPost" placeholder="Enter number"></input>
            <button id="getSpecificData" onClick={getSpecificData}>Get specific data</button>
            <hr/>
            {console.log(data)}
            <ol id="listOfItems">
                {
                    data.map(item=>(
                    <li key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.body}</p>
                        <p> User Id : {item.userId}</p>
                    </li>
                    ))
                }
            </ol>
            <br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    )
}

export default FetchComp