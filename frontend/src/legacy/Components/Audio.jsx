import {useState} from "react";
import Button from "react-bootstrap/Button";

// let isPlayed = false
//
// audioPlayer.addEventListener("ended", event => {
//     return "ended"
//     // setAudio({"ended": true})
// })
//
// export default function manageAudio(link) {
//
//     if (link === null) {
//         isPlayed = false
//         audioPlayer.pause()
//         return isPlayed
//     }
//
//     if (audioPlayer.src === link) {
//         isPlayed = !isPlayed
//         isPlayed === true? audioPlayer.pause(): audioPlayer.play()
//         return isPlayed
//     }
//
//     /// set link as source
//     audioPlayer.pause()
//     audioPlayer.src = link
//     isPlayed = true
//     audioPlayer.play()
//     return isPlayed
// }


// define an audio player component synchronized between all tracks
export default function AudioPlayerButton(props) {
    let {audioPlayer} = props
    const [audioStatus, setAudioStatus] = useState(false)

    // console.log('The audio player has link ' + audioPlayer.link)

    const onAudioChange = () => {
        setAudioStatus((audioStatus) => {
            audioStatus = !audioStatus
            audioPlayer.loop = audioStatus
            audioStatus ? audioPlayer.play() : audioPlayer.pause()

            return audioStatus
        })
    }

    return (
        <button className="btn pr-5 pl-5" onClick={onAudioChange} style={{backgroundColor: audioStatus ? "red" : "green", color: "#FFF"}}>{audioStatus ? "Pause" : "Play"}</button>
    )
}
