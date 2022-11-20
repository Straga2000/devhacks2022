// import {useEffect, useState} from "react";
// import Alert from "react-bootstrap/Alert";
// import {makeFormDict} from "../Helpers/mainHelpers";
//
// const [counter, setCounter] = useState(0)
// const [link, setLink] = useState('')
// const [errors, setErrors] = useState([])
// useEffect(() => {
//     document.title = `You clicked ${counter} times`;
// }, [counter]); // Only re-run the effect if count changes
//
// function increase(){
//     setCounter(counter + 1)
// }
//
// function showErrors(){
//     if (errors.length === 0)
//         return null
//     else
//         return (
//             <Alert variant={'danger'}>
//                 {errors.map((stringValue, index) => <span key={index}>{stringValue}</span>)}
//             </Alert>)
// }
//
// function registerSpotify(){
//     return fetch('http://localhost:8000/spotify/register/', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     }).then(response => {
//         response = response.json()
//         console.log(response)
//         return response
//     }).then(response => setLink(response['result']))
// }
//
//
// const loginDefault = (e) => {
//     e.preventDefault()
//     let processedDict = makeFormDict(e)
//     let link = 'http://localhost:8000/default/login/?' + new URLSearchParams(processedDict).toString()
//     console.log(link)
//     fetch(link, {
//         method: 'GET', // or 'PUT'
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success:', data);
//             setErrors(errorList => data.errors === null? []: data.errors)
//             /// TODO redirect to profile page
//         })
// }