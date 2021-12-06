import React, { useState } from "react";

function FetchComp()
{
    const serverAPIUrl = "https://jsonplaceholder.typicode.com/posts"

    const [data,setData] = useState([])
    const [specificDataId,setSpecificDataId] = useState([])
    const [postTitle,setPostTitle] = useState()
    const [postBody,setPostBody] = useState()
    const [postUserId,setPostUserId] = useState()
    const [putId,setPutId] = useState()
    const [putTitle,setPutTitle] = useState()
    const [putBody,setPutBody] = useState()
    const [putUserId,setPutUserId] = useState()
    const [patchId,setPatchId] = useState()
    const [patchTitle,setPatchTitle] = useState()
    const [patchBody,setPatchBody] = useState()
    const [patchUserId,setPatchUserId] = useState()
    const [deletePostId,setDeletePostId] = useState()
    const [filterPostId,setFilterPostId] = useState()

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
    
    //Post Request to Create Data
    function onPostTitleChange(event)
    {
        setPostTitle(event.target.value)
    }
    function onPostBodyChange(event)
    {
        setPostBody(event.target.value)
    }
    function onPostUserIdChange(event)
    {
        setPostUserId(event.target.value)
    }
    function postData()
    {
        fetch(
                serverAPIUrl,
                {
                    method : 'POST',
                    body : JSON.stringify({
                        title: `${postTitle}`,
                        body : `${postBody}`,
                        userId: Number(postUserId)
                    }),
                    headers :{
                        'Content-type': 'application/json; charset=UTF-8'} 
                } 
            )
        .then(res=>res.json())
        .then(resData=>{
            setData([resData])
        })
    }

    //Put Request to Update Existing Data
    function onPutIdChange(event)
    {
        setPutId(event.target.value)
    }
    function onPutTitleChange(event)
    {
        setPutTitle(event.target.value)
    }
    function onPutBodyChange(event)
    {
        setPutBody(event.target.value)
    }
    function onPutUserIdChange(event)
    {
        setPutUserId(event.target.value)
    }
    function putData()
    {
        let urlOfPostToBeUpdated = `${serverAPIUrl}/${putId}`
        
        fetch(
            urlOfPostToBeUpdated,
            {
                method : 'PUT',
                body : JSON.stringify({
                    id : `${putId}`,
                    title : `${putTitle}`,
                    body : `${putBody}`,
                    userId : `${putUserId}`
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
        .then(res=>res.json())
        .then(resData=>{
            setData([resData])
        })
    }


    //Patch Request to Update Existing Specific Data
    function onPatchIdChange(event)
    {
        setPatchId(event.target.value)
    }
    function onPatchTitleChange(event)
    {
        setPatchTitle(event.target.value)
    }
    function onPatchBodyChange(event)
    {
        setPatchBody(event.target.value)
    }
    function onPatchUserIdChange(event)
    {
        setPatchUserId(event.target.value)
    }
    function patchData()
    {
        let urlOfPostToBePatched = `${serverAPIUrl}/${patchId}`
        
        let obj = {
            id : `${patchId}`,
            title : `${patchTitle}`,
            body : `${patchBody}`,
            userId : `${patchUserId}`
        }

        let removeEmptyAttributeFunction = (obj) => {
            for (var propName in obj) {
            if (obj[propName] === "" || obj[propName] === 'undefined') {
                delete obj[propName];
            }
            }
            return obj
        }
        
        let patchedObject = removeEmptyAttributeFunction(obj)
        console.log(patchedObject)

        fetch(
            urlOfPostToBePatched,
            {
                method : 'PATCH',
                body : JSON.stringify(patchedObject),
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
        .then(res=>res.json())
        .then(resData=>{
            setData([resData])
        })
    }

    //Delete Specific Post
    function onDeletePostIdChange(event)
    {
        setDeletePostId(event.target.value)
    }
    function deleteData()
    {
        let deletedPostURL = `${serverAPIUrl}/${deletePostId}`

        fetch(deletedPostURL,{method:'DELETE'})
        .then(res=>{
            if(res.status==200||res.status==201)
            {
                setData([{id:deletePostId,title:"Post deleted",body:"",userId:""}])
            }
        })
    }

    //Filter specific posts for a specific User
    function onFilterPostIdChange(event)
    {
        setFilterPostId(event.target.value)
    }
    function filterData()
    {
        const filterPostURL = `${serverAPIUrl}?userId=${filterPostId}`
        
        fetch(filterPostURL)
        .then(res=>res.json())
        .then(resData=>{
            setData(resData) 
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
            <h2>Post Data</h2>
            <input type="text" value={postTitle} onChange={onPostTitleChange} id="postTitle" placeholder="Enter Title"></input>
            <input type="text" value={postBody} onChange={onPostBodyChange} id="postBody" placeholder="Enter Body"></input>
            <input type="number" value={postUserId} onChange={onPostUserIdChange} id="postUserId" placeholder="Enter userId number"></input>
            <button id="postDataBtn" onClick={postData}>Post data</button>
            <hr/>
            <h2>Put Request (Updating Data)</h2>
            <input type="number" value={putId} onChange={onPutIdChange} id="idToUpdate" placeholder="Enter post id to update"></input>
            <input type="text" value={putTitle} onChange={onPutTitleChange} id="putTitle" placeholder="Enter Title"></input>
            <input type="text" value={putBody} onChange={onPutBodyChange} id="putBody" placeholder="Enter Body"></input>
            <input type="number" value={putUserId} onChange={onPutUserIdChange} id="putUserId" placeholder="Enter userId number"></input>
            <button id="putDataBtn" onClick={putData}>Put data</button>
            <hr/>
            <h2>Patch Request (Updating Specific Data)</h2>
            <input type="number" value={patchId} onChange={onPatchIdChange} id="patchId" placeholder="Enter post id to update"></input>
            <input type="text" value={patchTitle} onChange={onPatchTitleChange} id="patchTitle" placeholder="Enter Title"></input>
            <input type="text" value={patchBody} onChange={onPatchBodyChange} id="patchBody" placeholder="Enter Body"></input>
            <input type="number" value={patchUserId} onChange={onPatchUserIdChange} id="patchUserId" placeholder="Enter userId number"></input>
            <button id="patchDataBtn" onClick={patchData}>Patch data</button>
            <hr/>
            <h2>Delete Specific Data</h2>
            <input type="number" value={deletePostId} onChange={onDeletePostIdChange} id="deletePost" placeholder="Enter number"></input>
            <button id="deleteSpecificData" onClick={deleteData}>Delete specific data</button>
            <hr/>
            <h2>Filter Specific Data</h2>
            <input type="number" value={filterPostId} onChange={onFilterPostIdChange} id="filterPostUserId" placeholder="Enter number"></input>
            <button id="filterSpecificDataBtn" onClick={filterData}>Filter specific data</button>
            <hr/>
            {console.log(data)}
            <ol id="listOfItems">
                {
                    data.map(item=>(
                    <li key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.body}</p>
                        {
                            item.userId?(<p>UserId : {item.userId}</p>):(<></>)
                        }
                    </li>
                    ))
                }
            </ol>
            <br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    )
}

export default FetchComp