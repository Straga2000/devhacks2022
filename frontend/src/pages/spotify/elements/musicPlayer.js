import {Box, Button, Card, CardContent, CardMedia, Chip, Grid, IconButton, Slider, Typography} from "@mui/material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {useEffect, useRef, useState} from "react";
import "./musicPlayer.scss"
import {getSpotifyImage} from "../../../utils/spotify";
import FavoriteIcon from '@mui/icons-material/Favorite';
import variables from "../../../styling/theme.module.scss"

export const MusicPlayer = ({musicData}) => {

    const [toggleContent, setToggleContent] = useState(true)
    const [audioSource, setAudioSource] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const useCardToggle = () => {
        setToggleContent((prev) => {return !prev})
    }

    const useToggleAudioState = () => {
        if(isPlaying) {
            audioSource.pause();
        } else {
            audioSource.play();
        }
        setIsPlaying((prevState => !prevState))
    }

    useEffect(() => {
        setAudioSource(new Audio(musicData.trackPreview))

        return () => {
            setAudioSource(null)
        }
    }, [])

    const getSliderValue = (e) => {
        console.log(e.target.value)
    }
    return (
        <Grid container item xs={12} gap={1} p={1}>
            {toggleContent ? <>
                <Grid container item flexBasis="content" sx={{maxWidth: {sm: "200px", md: "250px", lg: "300px"}}}>
                    <img src={musicData.trackImage}
                         style={{width: "100%", height: "auto"}}
                         alt="Live from space album cover"/>
                </Grid>
                <Grid container item xs justifyContent="space-between" flexDirection="row" rowGap={3}>
                    <Grid container item xs={11} flexDirection="column">
                        <h3>{musicData.trackName}</h3>
                        <p onClick={useCardToggle} style={{color: variables.spotifyDark}}>
                            {musicData.albumName} by {musicData.artistName}
                        </p>
                    </Grid>
                    <Grid container item xs={1} justifyContent="flex-end">
                        <FavoriteIcon/>
                    </Grid>
                    <Grid container item gap={1} xs={12} alignItems="flex-end" justifyContent={{xs: "flex-start", sm: "flex-end"}}>
                        <Button onClick={useToggleAudioState} color="spotify" variant="contained">PLAY ON SPOTIFY</Button>
                        <Button onClick={useToggleAudioState} color="spotify" variant="contained">PREVIEW</Button>
                    </Grid>
                </Grid>
            </> : <>
                <Grid container item flexBasis="content" sx={{maxWidth: {sm: "200px", md: "250px", lg: "300px"}}}>
                    <img src={toggleContent ? musicData.trackImage : musicData.artistImage}
                         style={{width: "100%", height: "auto"}}
                         alt="Live from space album cover"/>
                </Grid>
                <Grid container item xs justifyContent="space-between" flexDirection="row" rowGap={3}>
                    <Grid container item xs={11} flexDirection="column" gap={1}>
                        <h3>{musicData.artistName}</h3>
                        <Grid container item gap={1} alignItems="center">
                            <p>Genres</p>
                            {musicData.artistsGenres.map(item => <Chip label={item} color="spotify"/>)}
                        </Grid>
                    </Grid>
                    <Grid container item xs={1} justifyContent="flex-end">
                        <FavoriteIcon/>
                    </Grid>
                    <Grid container item gap={1} xs={12} alignItems="flex-end" justifyContent={{xs: "flex-start", sm: "flex-end"}}>
                        <Button onClick={useToggleAudioState} color="spotify" variant="contained">PLAY ON SPOTIFY</Button>
                        <Button onClick={useCardToggle} color="spotify" variant="contained">SHOW SONG</Button>
                    </Grid>
                </Grid>

            </>}

            {/*{toggleContent ? <>*/}
            {/*    <Grid item xs={3} justifyContent="center">*/}
            {/*        <img src={musicData.trackImage}*/}
            {/*             style={{width: "100%", height: "auto"}}*/}
            {/*             alt="Live from space album cover"/>*/}
            {/*    </Grid>*/}
            {/*    <Grid container item xs={5}>*/}
            {/*        <Grid content item xs={12}>*/}
            {/*            <h3>{musicData.trackName}</h3>*/}
            {/*            <p>{musicData.albumName}</p>*/}
            {/*        </Grid>*/}
            {/*        <Grid content item xs={12}>*/}
            {/*            <Button onClick={useToggleAudioState} color="spotify" variant="contained">PLAY ON SPOTIFY</Button>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</> : <>*/}
            {/*    <Grid container item xs={3} p={1}>*/}
            {/*        <img src={musicData.artistImage}*/}
            {/*             style={{width: "100%", height: "auto"}}*/}
            {/*             alt="Live from space album cover"/>*/}
            {/*        <Grid item xs={12}>*/}
            {/*            <h3>{musicData.artistName}</h3>*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={12}>*/}
            {/*            {musicData.artistsGenres.map(genreName => {*/}
            {/*                return <Chip label={genreName} color="spotify"/>*/}
            {/*            })}*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</>}*/}
        </Grid>
    );
}

//
// {/*mediaPlayerObject.trackImage = getSpotifyImage(false, track?.album?.image_ids[0].size, track?.album?.image_ids[0].id)*/}
// {/*mediaPlayerObject.trackName = track?.name*/}
// {/*mediaPlayerObject.genreScore = track?.genre_score*/}
// {/*mediaPlayerObject.albumName = track?.album?.name*/}
// {/*mediaPlayerObject.trackPreview = track?.preview_url*/}
//
// {/*const artist = artists[track?.artists[0]?.id]*/}
// {/*mediaPlayerObject.artistName = artist?.name*/}
// {/*mediaPlayerObject.artistImage = getSpotifyImage(false, artist?.image_ids[0]?.size, artist?.image_ids[0]?.id)*/}
// {/*mediaPlayerObject.artistsGenres = artist?.genres*/}
//
//
//
// {/*<Card sx={{ display: 'flex', width: "100%" }}>*/}
// {/*    <Box sx={{ display: 'flex', flexDirection: 'column' }}>*/}
// {/*        <CardContent sx={{ flex: '1 0 auto' }}>*/}
// {/*            <Typography component="div" variant="h5">*/}
// {/*                Live From Space*/}
// {/*            </Typography>*/}
// {/*            <Typography variant="subtitle1" color="text.secondary" component="div">*/}
// {/*                Mac Miller*/}
// {/*            </Typography>*/}
// {/*        </CardContent>*/}
// {/*        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>*/}
// {/*            <IconButton aria-label="previous">*/}
// {/*                 <SkipPreviousIcon />*/}
// {/*            </IconButton>*/}
// {/*            <IconButton aria-label="play/pause">*/}
// {/*                <PlayArrowIcon sx={{ height: 38, width: 38 }} />*/}
// {/*            </IconButton>*/}
// {/*            <IconButton aria-label="next">*/}
// {/*               <SkipNextIcon />*/}
// {/*            </IconButton>*/}
// {/*        </Box>*/}
// {/*    </Box>*/}
// {/*    <CardMedia*/}
// {/*        component="img"*/}
// {/*        sx={{ width: 151 }}*/}
// {/*        image={musicImage}*/}
// {/*        alt="Live from space album cover"*/}
// {/*    />*/}
// {/*</Card>*/}