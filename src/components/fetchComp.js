import React, { useState } from "react";

function FetchComp()
{
    const listOfItemOrderedList = document.querySelector("#list-of-items")
    const serverAPIUrl = "https://jsonplaceholder.typicode.com/posts"
    
    const specificPostInput = document.querySelector("#specificPost")
    
    const postTitle = document.querySelector("#postTitle")
    const postBody = document.querySelector("#postBody")
    const postUserId = document.querySelector("#postUserId")
   
    const idToUpdate = document.querySelector("#idToUpdate")
    const updatedTitle = document.querySelector("#putTitle")
    const updatedBody = document.querySelector("#putBody")
    const updatedUserId = document.querySelector("#putUserId")
   
    const idToPatch = document.querySelector("#idToPatch")
    const patchTitle = document.querySelector("#patchTitle")
    const patchBody = document.querySelector("#patchBody")
    const patchUserId = document.querySelector("#patchUserId")

    const deletePostId = document.querySelector("#deletePost")

    const filterPostUserId = document.querySelector("#filterPostUserId")

    const[filterUserId,setFilterUserId] = useState(1)
    const [postDeleteId,setPostDeleteId] = useState(1)
    const [output,setOutput]= useState('')

    //Get Request for All Data
    function getAllData()
    {
        fetch(serverAPIUrl)
        .then(res=>res.json())
        .then(data=>{
        data.forEach(item=>
            {
                const listItem = document.createElement('li')
                const titleText = `<h2>${item.title}</h2>`
                const bodyText = `<p>${item.body}</p>`

                listItem.innerHTML = `${titleText} ${bodyText}`
                console.log(listOfItemOrderedList)
                setOutput(listOfItemOrderedList.append(listItem))
            })
        })
    }

    //Get Request for Specific Data
    function getSpecificData()
    {
        let postNumber = specificPostInput.value
        
        let specificPostURL = `${serverAPIUrl}/${postNumber}`
    
        console.log(specificPostURL)
        fetch(specificPostURL)
        .then(res=>res.json())
        .then(data=>{
            const listItem = document.createElement('li')
            const itemTitle = `<h2>${data.title}</h2>`
            const itemBody = `<p>${data.body}</p>`
            
            listItem.innerHTML=`${itemTitle} ${itemBody}`
            setOutput(listOfItemOrderedList.append(listItem))
        })
    }

    //Post Request to Create Data
    function postData()
    {
        fetch(
            serverAPIUrl,
            {
                method : 'POST',
                body : JSON.stringify({
                    title: `${postTitle.value}`,
                    body : `${postBody.value}`,
                    userId: Number(postUserId.value)
                }),
                headers :{
                    'Content-type': 'application/json; charset=UTF-8'} 
            } 
         )
        .then(res=>res.json())
        .then(data=>{
            const postedItemLi = document.createElement('li')
            postedItemLi.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p><p>UserId :${data.userId}</p><p>Id :${data.id}</p>`
            setOutput(listOfItemOrderedList.append(postedItemLi))
        })
    }

    //Put Request to Update Existing Data
    function putData()
    {
        let urlOfPostToBeUpdated = `${serverAPIUrl}/${idToUpdate.value}`
    
        fetch(
            urlOfPostToBeUpdated,
            {
                method : 'PUT',
                body : JSON.stringify({
                    id : `${idToUpdate.value}`,
                    title : `${updatedTitle.value}`,
                    body : `${updatedBody.value}`,
                    userId : `${updatedUserId.value}`
                }),
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
        .then(res=>res.json())
        .then(data=>{
            const updatedLi = document.createElement('li')
            updatedLi.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p><p>UserId :${data.userId}</p><p>Id :${data.id}</p>`
            setOutput(listOfItemOrderedList.append(updatedLi))
        })
    }

    //Patch Request to Update Existing Specific Data
    function patchData()
    {
        let urlOfPostToBePatched = `${serverAPIUrl}/${idToPatch.value}`
        
        let obj = {
            id : `${idToPatch.value}`,
            title : `${patchTitle.value}`,
            body : `${patchBody.value}`,
            userId : `${patchUserId.value}`
        }

        let removeEmptyAttributeFunction = (obj) => {
            for (var propName in obj) {
            if (obj[propName] === "") {
                delete obj[propName];
            }
            }
            return obj
        }
        
        let patchedObject = removeEmptyAttributeFunction(obj)

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
        .then(data=>{
            const updatedLi = document.createElement('li')
            updatedLi.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p><p>UserId :${data.userId}</p><p>Id :${data.id}</p>`
            setOutput(listOfItemOrderedList.append(updatedLi))
        })
    }

    function changeDeletePostId()
    {
        setPostDeleteId(deletePostId.value)
    }

    function deleteData()
    {
        setPostDeleteId(deletePostId.value)
        let deletedPostURL = `${serverAPIUrl}/${deletePostId.value}`

        fetch(deletedPostURL,{method:'DELETE'})
        .then(res=>{
            if(res.status===200||res.status===201)
            {
                let listItem = document.createElement('li')
                listItem.innerText = `Item ${deletePostId.value} Deleted`
                setOutput(listOfItemOrderedList.append(listItem))
            }
        })
    }

    function changeUserId()
    {
        console.log(filterPostUserId.value)
        setFilterUserId(filterPostUserId.value)
    }

    function filterData()
    {
        const filterPostURL = `${serverAPIUrl}?userId=${filterUserId}`
        console.log(filterPostUserId)
        fetch(filterPostURL)
        .then(res=>res.json())
        .then(data=>{
            data.forEach(item=>
                {
                    const listItem = document.createElement('li')
                    const titleText = `<h2>${item.title}</h2>`
                    const id = `<p>Id :${item.id}</p>`
                    const bodyText = `<p>${item.body}</p>`
                    const userId = `<p>UserId :${item.userId}</p>`

                    listItem.innerHTML = `${titleText} ${id} ${bodyText} ${userId}`
                    setOutput(listOfItemOrderedList.append(listItem))
                })
        })
    }
    
    return (
        <div>
            <h2>Get All Data</h2>
            <button id="getAllData" onClick={getAllData} >Get all data</button>
            <hr/>
            <h2>Get Specific Data</h2>
            <input type="number" id="specificPost" placeholder="Enter number"></input>
            <button id="getSpecificData" onClick={getSpecificData}>Get specific data</button>
            <hr/>
            <h2>Post Data</h2>
            <input type="text" id="postTitle" placeholder="Enter Title"></input>
            <input type="text" id="postBody" placeholder="Enter Body"></input>
            <input type="number" id="postUserId" placeholder="Enter userId number"></input>
            <button id="postDataBtn" onClick={postData}>Post data</button>
            <hr/>
            <h2>Put Request (Updating Data)</h2>
            <input type="number" defaultValue="1" id="idToUpdate" placeholder="Enter post id to update"></input>
            <input type="text" id="putTitle" placeholder="Enter Title"></input>
            <input type="text" id="putBody" placeholder="Enter Body"></input>
            <input type="number" id="putUserId" placeholder="Enter userId number"></input>
            <button id="putDataBtn" onClick={putData}>Put data</button>
            <hr/>
            <h2>Patch Request (Updating Specific Data)</h2>
            <input type="number" defaultValue="1" id="idToPatch" placeholder="Enter post id to update"></input>
            <input type="text" id="patchTitle" placeholder="Enter Title"></input>
            <input type="text" id="patchBody" placeholder="Enter Body"></input>
            <input type="number" id="patchUserId" placeholder="Enter userId number"></input>
            <button id="patchDataBtn" onClick={patchData}>Patch data</button>
            <hr/>
            <h2>Delete Specific Data</h2>
            <input type="number" value={postDeleteId} id="deletePost" onChange={changeDeletePostId} placeholder="Enter number"></input>
            <button id="deleteSpecificData" onClick={deleteData}>Delete specific data</button>
            <hr/>
            <h2>Filter Specific Data</h2>
            <input type="number" value={filterUserId} onChange={changeUserId} id="filterPostUserId" placeholder="Enter number"/>
            <button id="filterSpecificDataBtn" onClick={filterData}>Filter specific data</button>
            <hr/>
            <h2>Output Response</h2>
            <ol id="list-of-items" value={output}></ol>
            <br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    )
}

export default FetchComp