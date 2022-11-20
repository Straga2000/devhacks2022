import {baseUrl, apiController} from "./common";

export const getSpotifyTaste = (token) => {
    const GET_SPOTIFY_TASTE = baseUrl('spotify/tracks/taste/');
    return apiController(GET_SPOTIFY_TASTE, 'GET',null, token)
}

export const getSpotifyAccount = (token) => {
    const GET_SPOTIFY_ACCOUNT = baseUrl('spotify/');
    return apiController(GET_SPOTIFY_ACCOUNT, 'GET', null, token)
}