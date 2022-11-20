import {useContext, useEffect, useState} from "react";
import {UserContext} from "../Config/contexts";
import {callAPI, getRequest} from "../Helpers/mainHelpers";
import {Col, Row, Container, Card, Spinner, Image, CardImg, ModalTitle} from "react-bootstrap";
import Gallery from "./Gallery";
import "../Styles/Gallery.css"
import "../Styles/Utils.css"
import CardHeader from "react-bootstrap/CardHeader";
import Track from "./Track";

function Profile(){
    const {user, setUser} = useContext(UserContext)
    const [profile, setProfile] = useState(null)


    useEffect(()=>{
        if(profile === null)
        {
            let apiResult = getRequest('get profile', null, 'Token ' + user.token)
            apiResult.then((data) => {
                // console.log("This is data", data.results)
                setProfile(data.results)
            })
        }
    }, [])

    function getProfileName(profile)
    {
        if(profile === null)
            return (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )

        let user = profile.user

        if(user.username !== "" || user.username !== null)
            return <h1>{profile.user.username}'s profile</h1>

        if(user.firstName !== "" || user.lastName !== "")
            return <h1>{user.firstName + user.lastName} profile</h1>

        return <h1>My profile</h1>
    }

    function showTracks(tracks){
        console.log(tracks)
        if(tracks === null)
            return (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )

        return (
                <Card style={{padding: "1%", margin: "0", width: "100%"}} as={Row}>
                    <CardHeader className="subtitle" style={{backgroundColor: "unset", borderWidth: 0, paddingLeft: "unset"}}><h3>Top #20 tracks from your <span className="glow">spotify</span></h3></CardHeader>
                    <br/>
                    <div className="basic-grid">
                            {tracks.map(track => {
                                return(
                                    <Track key={track.external_id} {...track}/>
                                )
                            })}
                    </div>
                </Card>
        )
    }

    return (
        <Container fluid>
            <Col>
                {
                    profile === null? (
                        <span>
                            <Row style={{height: "475px"}}/>
                            <Row style={{height: "60%"}}>
                                <Col>
                                    <Row style={{alignItems: "center", alignSelf: "center", justifyContent: "center"}}>
                                        <Spinner style={{position: "absolute", margin: "25%", color: "#1DB954"}} animation="border" role="status"/>
                                    </Row>
                                </Col>
                            </Row>
                        </span>) :
                    <div>
                        <br/>
                        <Card style={{backgroundColor: "unset",borderWidth:0, paddingLeft: "unset"}}>
                            <CardHeader style={{paddingLeft: "unset", color: "white"}}>
                                {getProfileName(profile)}
                            </CardHeader>
                        </Card>
                        <br/>
                        {showTracks(profile.spotify.top_tracks)}
                        {/*<Row>{JSON.stringify(user)}</Row>*/}
                        {/*<Row>{JSON.stringify(profile)}</Row>*/}
                    </div>
                }
            </Col>
        </Container>
    )
}

export default Profile;