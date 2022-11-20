import {useContext, useEffect, useState} from "react";
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";
import {makeFormDict, showErrors, callAPI, getRequest} from "../Helpers/mainHelpers";
import {getLink} from "../StaticLinks";
import {UserContext, userDefault} from "../Config/contexts";
import {Container, Row} from "react-bootstrap";
import '../Styles/LoginRegister.css'
import { useNavigate } from "react-router-dom";


function Login() {
    const [errors, setErrors] = useState([])
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const disconnect = () => {
        setUser(userDefault)
        navigate('/login')
    }

    const loginDefault = (e) => {
        e.preventDefault()
        let processedDict = makeFormDict(e)

        if(user.isLoggedIn) {
            setErrors(['You are already logged in'])
            return
        }

        ///verify if it has the username AND the email
        if('username' in processedDict && 'email' in processedDict)
            if(processedDict['username'].length !== 0 && processedDict['email'].length !==0) {
                setErrors(['You can\'t complete username AND email'])
                return
            }

        let apiResult = getRequest('default login', processedDict)
        apiResult.then(data => {
            setErrors(data.errors === null? []: data.errors)

            if (data.results != null)
            {
                data = data['results']
                data['isLoggedIn'] = true
                setUser(data)
                navigate('/profile')
            }

        }).catch(data => {
            console.log()
            console.log('error', data)
        })
    }

    // console.log(user)

    return (
        <Container className="flex w-100">
            <Row style={{height: "200px"}}/>
            <Row style={{justifyContent: "center", justifyItems: "center", marginBottom: "20px"}}>
                <h3 style={{color: "white"}}>
                    {user === null && <div>Login on <span className="glow">Reaction</span></div>}
                    {user !== null && <div>You are already logged as <span className="glow">{user.user.username}</span></div>}
                </h3>
            </Row>
            <Row style={{justifyContent: "center", justifyItems: "center"}}>
                {/*<Alert variant={'warning'}>{JSON.stringify(user)}</Alert>*/}
                   <Alert variant={"light"} className="w-50">
                       {user === null &&
                       <div>
                       <br/>
                        {/*<h4 style={{"color": "grey"}}>Email <span className='bold' style={{"color": "#0b78d8"}}>OR</span> username is required</h4>*/}
                        {showErrors(errors)}
                        <Form onSubmit={loginDefault}>
                            <Form.Group controlId="email">
                                <Form.Label className="fieldLabel">Email</Form.Label>
                                <Form.Control type="email" placeholder="Email"/>
                                {/*<Form.Text className="text-muted">*/}
                                {/*    We'll never share your email with anyone else.*/}
                                {/*</Form.Text>*/}
                            </Form.Group>
                            <br/>

                            <Form.Group controlId="username">
                                <Form.Label className="fieldLabel">Username</Form.Label>
                                <Form.Control type="text" placeholder="Username"/>
                            </Form.Group>
                            <br/>

                            <Form.Group controlId="password">
                                <Form.Label className="fieldLabel">Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <br/>

                            <button className="submitButton btn" type="submit">
                                Login
                            </button>
                            <br/>
                            <br/>
                            <Row style={{justifyItems: "center", justifyContent: "center"}}>
                                <Form.Text className="text-muted">You don't have an account?
                                    <a href="/register"> Register</a>
                                </Form.Text>
                            </Row>
                            <br/>
                        </Form></div>}
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

export default Login;
