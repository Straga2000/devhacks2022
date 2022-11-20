import {Card, Col, Modal, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import closeButton from "../Resources/close.svg"
import manageAudio from "./Audio";
import {useEffect, useState} from "react";
import {calculateTrackTier, getColorByPopularity} from "../Helpers/mainHelpers";
import AudioPlayerButton from "./Audio";

export default function TrackDetails(props) {
    let {image, name, popularity, show, onHide, audioPlayer, artists} = props
    popularity = calculateTrackTier(popularity)
    let symbol = popularity === 1 ? '😎' : (popularity === 2 ? '😮' : '😟')
    let author = artists.length >= 1 ? artists[0]['name'] : "unknown"
    // console.log('This is the symbol' + symbol)

    console.log(props)
    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered style={{backfaceVisibility: "hidden", }}>
            {/*<Modal.Header>*/}
            {/*</Modal.Header>*/}
            <Modal.Body style={{padding: "0", borderRadius: "0"}}>
                {/*make it round and added it to the bottom center of the track*/}
                {/**/}
                <Card onMouseLeave={onHide} style={
                    {
                    borderWidth: "0px",
                    borderColor: "black"
                    }
                }>
                    <Card.Img src={image}/>
                    <Card.ImgOverlay style={{color: "white", padding: "0", width: "inherit"}}>
                        <Row style={{ backgroundColor: "black",  borderRadius: "0", margin: "0"}}>
                            <Card.Header style={{width: "100%"}}>
                                <Card.Title>
                                    <h2 style={{fontWeight: "bolder", color: getColorByPopularity(popularity), display: "inline-flex", direction: "flex-row", width: "100%"}}>
                                        <span className="mr-2">{symbol} {name}</span>
                                        <span style={{color: "white"}}>by {author}</span>
                                    </h2>
                                </Card.Title>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    {/*<Card.Text className="m-0 p-1">*/}
                                    {/*    <h3 className="m-0 p-0" style={{fontWeight: "light", color: getColorByPopularity(popularity)}}>*/}
                                    {/*        {symbol} Tier #{popularity}*/}
                                    {/*    </h3>*/}
                                    {/*</Card.Text>*/}
                                    <AudioPlayerButton className="p-1 m-0" style={{direction: "row",float: "right", borderWidth: "0", width: "30%"}} audioPlayer={audioPlayer}/>
                                </div>
                            </Card.Header>
                            {/*<Col style={{margin: "1%", width: "25%"}}>*/}
                            {/*    <AudioPlayerButton style={{float: "right", borderWidth: "0", width: "30%"}} audioPlayer={audioPlayer}/>*/}
                            {/*</Col>*/}
                        </Row>
                    </Card.ImgOverlay>
                </Card>
            </Modal.Body>
        </Modal>
    )
}