import Alert from "react-bootstrap/Alert";
import {getLink} from "../StaticLinks";

function makeFormDict(e){
    let formDict = {}

    for (const htmlObject of e.target)
    {
        if (htmlObject.id !== "" && htmlObject.value !== "")
        {
            let value = null
            if (htmlObject.type === "checkbox")
                value = htmlObject.checked
            else
                value = htmlObject.value

            formDict[htmlObject.id] = value
            console.log(htmlObject.id, value)
        }

        // for (const [key, value] of (index)) {
        //     console.log(key, value);
        // }

    }

    // for(const target in Object.getOwnPropertyNames(e.target)){
    //     console.log(target)
    //     formDict[target.id] = target.value
    // }
    return formDict
}

function showErrors(errors){
    if (errors.length === 0)
        return null
    else
        return (
            <Alert variant={'danger'}>
                {errors.map((stringValue, index) => <span key={index}>{stringValue}</span>)}
            </Alert>)
}


function getRequest(linkKey, parameters, auth=null) {
    let link = getLink(linkKey)
    link += parameters === null ? "" : new URLSearchParams(parameters).toString()
    return callAPI(link, 'GET', auth)
}

function postRequest(linkKey, parameters, auth=null) {
    let link = getLink(linkKey)
    return callAPI(link, 'POST', parameters, auth)
}

// 'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin Content-Type',

const callAPI = (link, methodType, auth=null, data=null, contentType='application/json') => {

    let fetchObject = {
        method: methodType,
        headers: {
        }
    }

    if (contentType !== null)
        fetchObject['headers']['Content-Type'] = contentType

    if (auth !== null)
        fetchObject['headers']['Authorization'] = auth

    if (data !== null)
        fetchObject['data'] = data

    return fetch(link, fetchObject)
        .then(response => {
            response = response.json()
            return response
        })
        .then(data => {
            console.log('Success:', data);
            return data
        })
}

function calculateTrackTier(popularityScore)
{
    return Math.trunc(100 / popularityScore)
}


function getColorByPopularity(tier)
{
    console.log(tier)
    if (tier === 1)
        return '#539f2e'
    else if (tier === 2)
        return '#c29a1f'
    else
        return '#883424'
}

export {makeFormDict, showErrors, callAPI, getRequest, postRequest, calculateTrackTier, getColorByPopularity};