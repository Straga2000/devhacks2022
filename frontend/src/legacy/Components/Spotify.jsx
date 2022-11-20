import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getRequest} from "../Helpers/mainHelpers";
import {UserContext} from "../Config/contexts";
import Button from "react-bootstrap/Button";
import '../Styles/LoginRegister.css'
import '../Styles/Spotify.css'

import {Col, Container, Image, Row} from "react-bootstrap";

export default function Spotify()
{
    const {user, setUser} = useContext(UserContext)
    const [code, setCode] = useState(null)
    let navigate = useNavigate()

    const connectSpotify = (e) => {
        getRequest('get spotify auth').then((result) => {
            window.open(result.link,'_self')
            // console.log(result)
        })
    }

    /// at init
    useEffect(() => {

        if (code !== null)
            getRequest('get spotify callback', {'code': code}).then((result) => {

                result = result['results']
                result['isLoggedIn'] = true
                setUser(result)

                console.log('The new user', user)
                getRequest('get spotify tracks', null, 'Token ' + user.token).then((result) => {
                    console.log('tracks', result)
                })
            })
        else
        {
            if (window.document.documentURI.split("?").length > 1)
            {
                let value = window.document.documentURI.split("?")[1].split("code=")[1]
                console.log("value", value)
                setCode(value)
                navigate('/spotify')
            }
        }
    }, [code, user, setUser, navigate])

    // useEffect(() => {
    //
    // }, [code, user, setUser])

    return (
        <Container className="flex w-100">
            <Row style={{height: "350px"}}/>
            <Row style={{height: "60%"}}>
                <Col>
                    <Row style={{alignItems: "start", alignSelf: "center", justifyContent: "center"}}>
                    {code === null &&
                    <div className="w-100" style={{padding: "0 15%"}}>
                        <h3 style={{color: "white"}}>Connect your <Image onClick={connectSpotify} className="m-0 p-0" src="https://cdn.cdnlogo.com/logos/s/1/spotify.svg" style={{width: "50%"}}/> account now!</h3>
                    </div>}
                    {code !== null &&
                    <div className="flex" style={{alignItems: "center", alignSelf: "center", justifyContent: "center"}}>
                        <h3 style={{color: "white"}}>Congratulation! Your <span className="glow">spotify</span> is connected!</h3>
                        <button className="submitButton btn" onClick={() => {navigate('/profile')}}>
                            My profile
                        </button>
                    </div>}
                    </Row>
                </Col>
            </Row>
            <Row style={{height: "500px"}}/>
        </Container>
    )
}