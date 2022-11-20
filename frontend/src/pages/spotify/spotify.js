import {useContext, useEffect, useState} from "react";
import {getSpotifyAccount, getSpotifyTaste} from "../../requests/spotify";
import {useAuth, UserContext} from "../../utils/auth";
import {Box, Button, Card, CardContent, CardMedia, Chip, Grid, IconButton, Stack, Typography} from "@mui/material";
import GenreGraph from "./elements/genreGraph";
import GenericCarousel from "../../components/carousel/carousel";
import {getSpotifyImage} from "../../utils/spotify";
import AlbumIcon from '@mui/icons-material/Album';
import "./spotify.scss"
import {ReactComponent as SpotifyPlaceholder} from "../../images/spotify/disc.svg";
import Page from "../../components/common/page";
import variables from "../../styling/theme.module.scss"
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import {useTheme} from "@emotion/react";
import {MusicPlayer} from "./elements/musicPlayer";

const Spotify = (props) => {
    const auth = useContext(UserContext)
    const [genres, setGenres] = useState(null)
    const [artists, setArtists] = useState(null)
    const [tracks, setTracks] = useState(null)
    const [loading, setLoading] = useState(true)
    const [spotifyLoggedIn, setSpotifyLoggedIn] = useState(false)
    const theme = useTheme();

    useEffect(() => {
        if(auth?.user?.token) {
            setLoading(false)
        }
    }, [auth?.user])

    console.log(auth)
    useEffect(() => {
        if(auth?.user?.token)
        {
            console.log('This is the token', auth.user.token)
            getSpotifyTaste(auth.user.token).then(response => {
                if(response.status)
                {
                    response = response.data
                    setGenres(response?.genres)
                    setArtists(response?.artists)
                    setTracks(response?.tracks)
                }
            })
        }

        return () => {
            setGenres(null);
            setTracks(null);
            setLoading(true);
            setArtists(null);
        }
    }, [spotifyLoggedIn])

    const getArtistCarousel = () => {
        const artistsVisuals = Object.keys(artists).map(key => {
            let imageLink = getSpotifyImageElement(artists[key]?.image_ids[0])
            return (
                <Grid container item className="spotify-carousel-container" xs={12}>
                    <Grid container xs={12} item p={1}>
                        {imageLink ? <img alt={artists[key].name} src={imageLink}/> :
                            <SpotifyPlaceholder/>
                        }
                    </Grid>
                    <Grid item xs={12} p={1} sx={{fontWeight: 900}}>
                        {artists[key].name}
                    </Grid>
                </Grid>);

        })

        return <GenericCarousel hasControls={true}
                                hasLoop={true}
                                itemsPerSlide={3}
                                items={artistsVisuals}
                                buttonProps={{color: "spotify"}}
                                className="spotify-carousel-wrapper"
                />
    }

    const getTrackCarousel = () => {
        const artistsVisuals = Object.keys(tracks).map(key => {
            let imageLink = getSpotifyImageElement(tracks[key]?.album?.image_ids[0])
            return (
                <Grid container item className="spotify-carousel-container" alignContent="flex-start">
                    <Grid container xs={12} item p={1}>
                        {imageLink ? <img alt={tracks[key].name} src={imageLink}/> :
                            <SpotifyPlaceholder/>
                        }
                    </Grid>
                    <Grid item xs={12} p={1} sx={{fontWeight: 900}}>
                        {tracks[key].name}
                    </Grid>
                </Grid>);

        })

        return <GenericCarousel
                                hasLoop={true}
                                slideShowTime={2000}
                                itemsPerSlide={3}
                                items={artistsVisuals}
                                buttonProps={{color: "spotify"}}
                                className="spotify-carousel-wrapper"
        />
    }

    const getSpotifyImageElement = (imageData) => {
        if(imageData)
            return getSpotifyImage(false, imageData.size, imageData.id)
        return null
    }

    const getSpotifyGenreTaste = (top=3) => {
        const orderedGenres = Object.keys(genres).map(x => {return {key: x, value: genres[x]}}).sort((a, b) => {
            return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
        }).slice(0, top)

        // " " + item.value.toFixed(1) + "%"

        return orderedGenres.map(item => <Chip label={item.key} color="spotify"/>)
    }

    const getMediaPlayerObject = (trackId) => {
        const mediaPlayerObject = {}
        const track = tracks[trackId]
        console.log("Track found", track)
        mediaPlayerObject.trackImage = getSpotifyImage(false, track?.album?.image_ids[0].size, track?.album?.image_ids[0].id)
        mediaPlayerObject.trackName = track?.name
        mediaPlayerObject.genreScore = track?.genre_score
        mediaPlayerObject.albumName = track?.album?.name
        mediaPlayerObject.trackPreview = track?.preview_url
        mediaPlayerObject.trackDuration = track?.duration / 1000

        const artist = artists[track?.artists[0]?.id]
        mediaPlayerObject.artistName = artist?.name
        mediaPlayerObject.artistImage = getSpotifyImage(false, artist?.image_ids[0]?.size, artist?.image_ids[0]?.id)
        mediaPlayerObject.artistsGenres = artist?.genres
        console.log(mediaPlayerObject)
        return mediaPlayerObject
    }

    //TODO make dialogues for artists and tracks, add also a card with user info from spotify
    return (
        <Page>
            {
                spotifyLoggedIn ? <>
                    <Grid container item p={3} xs>
                        {genres && artists && tracks &&
                            <MusicPlayer musicData={getMediaPlayerObject(Object.keys(tracks)[0])}/>
                        }
                    </Grid>
                    <Grid container item p={3}>
                        {genres &&
                        <Grid container item gap={1} alignItems="center">
                            <h3>Straga sure is interested in</h3>
                            {getSpotifyGenreTaste()}
                        </Grid>
                        }
                    </Grid>
                    <Grid container item p={3}>
                        <Grid item xs={12}>
                            <h3>Straga's favourite artists</h3>
                        </Grid>
                        <Grid container item xs={7}>
                            {artists && getArtistCarousel()}
                        </Grid>
                    </Grid>
                    <Grid container item p={3}>
                        <Grid container item xs={7}>
                            {tracks && getTrackCarousel()}
                        </Grid>
                    </Grid>
                    <Grid container item p={3}>
                        <Grid container item xs={7}>
                            {tracks && getTrackCarousel()}
                        </Grid>
                    </Grid>
                </> : <>
                    {!loading && <Button onClick={() => {
                        getSpotifyAccount(auth.user.token)
                        setSpotifyLoggedIn(true)
                    }}>Connect spotify</Button>}
                    {loading && 'Loading....'}
                </>
            }
        </Page>);
        // <Grid item container xs={12} p={3}>
        //
        //
        //     {/*{genres && <GenreGraph data={genres} top={10} variant="dark"/>}*/}
        // </Grid>);
}

export default Spotify;