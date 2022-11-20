import {useContext, useEffect, useState} from "react";
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";
import {makeFormDict, showErrors, callAPI, getRequest} from "../Helpers/mainHelpers";
import {getLink} from "../StaticLinks";
import {UserContext, userDefault} from "../Config/contexts";
import {Col, Container, Row} from "react-bootstrap";
import "../Styles/LoginRegister.css"
import {useNavigate} from "react-router-dom";

function Register() {
    const [errors, setErrors] = useState([])
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()
    // useEffect(() => {
    //     document.title = `You clicked ${counter} times`;
    // }, [counter]); // Only re-run the effect if count changes

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

    const disconnect = () => {
        setUser(userDefault)
        navigate('/login')
    }

    const registerDefault = (e) => {
        e.preventDefault()
        let processedDict = makeFormDict(e)

        let apiResult = getRequest('default register', processedDict)

        apiResult.then(data => {
            setErrors(data.errors === null? []: data.errors)

            if (data.results != null)
            {
                data = data['results']
                data['isLoggedIn'] = true
                setUser(data)
                navigate('/spotify')
            }

        }).catch(data => {
            console.log()
            console.log('error', data)
        })
    }

    return (
        <Container className="flex w-100">
            <Row style={{height: "150px"}}/>
            <Row style={{justifyContent: "center", justifyItems: "center", marginBottom: "20px"}}>
                <h3 style={{color: "white"}}>
                    {user === null && <div>Register on <span className="glow">Reaction</span></div>}
                    {user !== null && <div>You are already logged as <span className="glow">{user.user.username}</span></div>}
                </h3>
            </Row>
            <Row style={{justifyContent: "center", justifyItems: "center"}}>
                <Alert variant={"light"} className="w-50">
                    {user === null &&
                    <div>
                        <br/>
                        {/*<Alert variant={'warning'}>{JSON.stringify(user)}</Alert>*/}
                        {showErrors(errors)}
                        <Form onSubmit={registerDefault}>
                            <Form.Group controlId="email">
                                <Form.Label className="fieldLabel">Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" required={true}/>
                                {/*<Form.Text className="text-muted">*/}
                                {/*    We'll never share your email with anyone else.*/}
                                {/*</Form.Text>*/}
                            </Form.Group>
                            <br/>

                            <Form.Group controlId="username">
                                <Form.Label className="fieldLabel">Username</Form.Label>
                                <Form.Control type="text" placeholder="Username" required={true}/>
                            </Form.Group>
                            <br/>

                            <Form.Group controlId="first_name">
                                <Form.Label className="fieldLabel">First name</Form.Label>
                                <Form.Control type="text" placeholder="First name" />
                            </Form.Group>
                            <br/>

                            <Form.Group controlId="last_name">
                                <Form.Label className="fieldLabel">Last name</Form.Label>
                                <Form.Control type="text" placeholder="Last name" />
                            </Form.Group>
                            <br/>

                            <Form.Group controlId="password">
                                <Form.Label className="fieldLabel">Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" required={true}/>
                            </Form.Group>
                            <br/>

                            <button className="submitButton btn" type="submit">
                                Join now
                            </button>
                            <br/>
                            <br/>
                            <Row style={{justifyItems: "center", justifyContent: "center"}}>
                                <Form.Text className="text-muted">You have an account?
                                    <a href="/login"> Login</a>
                                </Form.Text>
                            </Row>
                            <br/>
                        </Form>
                    </div>}
                    {user !== null && <div>
                        <br/>
                        <Form.Label className="fieldLabel">Connect to another account?</Form.Label>
                        <br/>
                        <button className="submitButton btn" onClick={disconnect}>
                            Logout
                        </button>
                        <br/>
                    </div>}
                </Alert>
            </Row>


        </Container>
    );
}

export default Register;
