import {Card} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import manageAudio from "./Audio";
import {AudioContext} from "../Config/contexts";
import TrackDetails from "./TrackDetails";
import {calculateTrackTier, getColorByPopularity} from "../Helpers/mainHelpers";

export default function Track(props){

    let {image, preview_link, name, popularity} = {...props}
    const [show, setShow] = useState(false)
    const [hover, setHover] = useState(false)
    const [audioPlayer, setAudioPlayer] = useState(new Audio(preview_link))
    const [shadow, setShadow] = useState('unset')

    useEffect(() => {
        if (show === false)
            setAudioPlayer(() => {
                audioPlayer.pause();
                let savedTime = audioPlayer.currentTime
                audioPlayer.currentTime = 0;

                let newAudioPlayer = new Audio(preview_link)
                newAudioPlayer.currentTime = savedTime
                return newAudioPlayer
            })

    }, [show, setShow])

    useEffect(() => {
        console.log('Hover state changed to', hover)
        setShadow(() => {
            let color = getColorByPopularity(calculateTrackTier(popularity))
            console.log(color)
            return hover ? "0 4px 60px 0 " + color : 'unset'
        })
    }, [hover, setHover])

    function toggleHover() {
        setHover(!hover)
    }

    return (
            <div className="track">
                <TrackDetails show={show}
                              onHide={()=> {setShow(false)}}
                              className="overlay-box" {...props}
                              audioPlayer={audioPlayer}/>
                <Card.Img onMouseOver={toggleHover}
                          onMouseOut={toggleHover}
                          src={image} onClick={()=>{setShow(true)}}
                          style={{boxShadow: shadow}}
                />
            </div>)
}